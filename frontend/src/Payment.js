import React, { useState, useEffect } from 'react';
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useHistory } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import axios from './axios';

function Payment() {
    const [{ basket, user }, dispatch] = useStateValue();
    const history = useHistory();

    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);
    
    // Address state
    const [address, setAddress] = useState({
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'USA'
    });
    
    // Category and subcategory state
    const [category, setCategory] = useState('');
    const [subcategory, setSubcategory] = useState('');
    
    // Categories data
    const categories = [
        { 
            name: 'Electronics', 
            subcategories: ['Smartphones', 'Laptops', 'Accessories', 'Audio'] 
        },
        { 
            name: 'Clothing', 
            subcategories: ['Men', 'Women', 'Kids', 'Accessories'] 
        },
        { 
            name: 'Home', 
            subcategories: ['Kitchen', 'Furniture', 'Decor', 'Appliances'] 
        }
    ];

    // Handle address change
    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setAddress(prev => ({
            ...prev,
            [name]: value
        }));
    };

    useEffect(() => {
        // generate the special stripe secret which allows us to charge a customer
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                // Stripe expects the total in a currencies subunits
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret)
        }

        getClientSecret();
    }, [basket])

    console.log('THE SECRET IS >>>', clientSecret)
    console.log('👱', user)

    const handleSubmit = async (event) => {
        console.log('handleSubmit called')
        if (!user?.email) {
            alert("Please login to proceed with payment");
            history.push('/login');
            return;
        }
        // do all the fancy stripe stuff...
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(async ({ paymentIntent }) => {
            await axios.post('http://localhost:5001/delivery/add', {
                orderId: paymentIntent.id,
                userId: user?.email,
                orderStatus: 'pending',
                paymentStatus: 'completed',
                deliveryId: `DEL-${paymentIntent.id}`,
                deliveryAgentId: 'unassigned',
                basket: basket,
                deliveryAddress: address,
                category: category,
                subcategory: subcategory
            });

            setSucceeded(true);
            setError(null)
            setProcessing(false)

            dispatch({
                type: 'EMPTY_BASKET'
            })

            history.replace('/payment-success', {paymentSuccess : true})
        })
    }

    const handleChange = event => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }

    // Styles
    const styles = {
        payment: {
            backgroundColor: 'white',
        },
        paymentContainer: {
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto',
        },
        paymentHeader: {
            textAlign: 'center',
            padding: '10px',
            fontWeight: 400,
            backgroundColor: 'rgb(234, 237, 237)',
            borderBottom: '1px solid lightgray',
        },
        paymentLink: {
            textDecoration: 'none',
            color: '#0066c0',
        },
        paymentContent: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
        },
        formSection: {
            flex: '1',
            minWidth: '300px',
            padding: '20px',
            borderRight: '1px solid lightgray',
        },
        productsSection: {
            flex: '1',
            minWidth: '300px',
            padding: '20px',
        },
        sectionTitle: {
            marginBottom: '15px',
            fontWeight: 500,
        },
        formGroup: {
            marginBottom: '15px',
        },
        label: {
            display: 'block',
            marginBottom: '5px',
            fontWeight: 500,
        },
        input: {
            width: '100%',
            padding: '8px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '14px',
        },
        select: {
            width: '100%',
            padding: '8px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '14px',
            backgroundColor: 'white',
        },
        cardElement: {
            border: '1px solid #ddd',
            padding: '10px',
            borderRadius: '4px',
            marginBottom: '15px',
        },
        button: {
            backgroundColor: '#f0c14b',
            borderRadius: '2px',
            width: '100%',
            height: '40px',
            border: '1px solid',
            fontWeight: 'bold',
            marginTop: '10px',
            borderColor: '#a88734 #9c7e31 #846a29',
            color: '#111',
            cursor: 'pointer',
        },
        disabledButton: {
            opacity: 0.5,
            cursor: 'not-allowed',
        },
        error: {
            color: 'red',
            marginTop: '10px',
        },
        priceContainer: {
            marginTop: '20px',
        },
        totalPrice: {
            fontSize: '18px',
            fontWeight: 'bold',
            marginBottom: '10px',
        },
        processingText: {
            textAlign: 'center',
        }
    };

    return (
        <div style={styles.payment}>
            <div style={styles.paymentContainer}>
                <h1 style={styles.paymentHeader}>
                    Checkout (
                        <Link to="/checkout" style={styles.paymentLink}>{basket?.length} items</Link>
                    )
                </h1>

                <div style={styles.paymentContent}>
                    {/* Left side - Form */}
                    <div style={styles.formSection}>
                        <h3 style={styles.sectionTitle}>Delivery Information</h3>
                        
                        {/* Category dropdown */}
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Category</label>
                            <select 
                                style={styles.select}
                                value={category}
                                onChange={(e) => {
                                    setCategory(e.target.value);
                                    setSubcategory('');
                                }}
                            >
                                <option value="">Select Category</option>
                                {categories.map((cat) => (
                                    <option key={cat.name} value={cat.name}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                        
                        {/* Subcategory dropdown */}
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Subcategory</label>
                            <select 
                                style={styles.select}
                                value={subcategory}
                                onChange={(e) => setSubcategory(e.target.value)}
                                disabled={!category}
                            >
                                <option value="">Select Subcategory</option>
                                {category && categories.find(cat => cat.name === category)?.subcategories.map((subcat) => (
                                    <option key={subcat} value={subcat}>{subcat}</option>
                                ))}
                            </select>
                        </div>
                        
                        {/* Dynamic address fields */}
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Street Address</label>
                            <input 
                                type="text" 
                                name="street"
                                value={address.street}
                                onChange={handleAddressChange}
                                style={styles.input}
                                placeholder="Enter your street address"
                            />
                        </div>
                        
                        <div style={styles.formGroup}>
                            <label style={styles.label}>City</label>
                            <input 
                                type="text" 
                                name="city"
                                value={address.city}
                                onChange={handleAddressChange}
                                style={styles.input}
                                placeholder="Enter your city"
                            />
                        </div>
                        
                        <div style={styles.formGroup}>
                            <label style={styles.label}>State</label>
                            <input 
                                type="text" 
                                name="state"
                                value={address.state}
                                onChange={handleAddressChange}
                                style={styles.input}
                                placeholder="Enter your state"
                            />
                        </div>
                        
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Zip Code</label>
                            <input 
                                type="text" 
                                name="zipCode"
                                value={address.zipCode}
                                onChange={handleAddressChange}
                                style={styles.input}
                                placeholder="Enter your zip code"
                            />
                        </div>
                        
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Country</label>
                            <select 
                                name="country"
                                value={address.country}
                                onChange={handleAddressChange}
                                style={styles.select}
                            >
                                <option value="USA">United States</option>
                                <option value="Canada">Canada</option>
                                <option value="UK">United Kingdom</option>
                                <option value="Australia">Australia</option>
                            </select>
                        </div>
                        
                        {/* Payment method */}
                        <h3 style={styles.sectionTitle}>Payment Method</h3>
                        <form onSubmit={handleSubmit}>
                            <div style={styles.cardElement}>
                                <CardElement onChange={handleChange} options={{
                                    style: {
                                        base: {
                                            fontSize: '16px',
                                            color: '#424770',
                                            '::placeholder': {
                                                color: '#aab7c4',
                                            },
                                        },
                                        invalid: {
                                            color: '#9e2146',
                                        },
                                    },
                                }}/>
                            </div>

                            <div style={styles.priceContainer}>
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <div style={styles.totalPrice}>Order Total: {value}</div>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                                <button 
                                    disabled={processing || disabled || succeeded}
                                    style={{
                                        ...styles.button,
                                        ...(processing || disabled || succeeded ? styles.disabledButton : {})
                                    }}
                                >
                                    <span>{processing ? <p style={styles.processingText}>Processing</p> : "Complete Payment"}</span>
                                </button>
                            </div>

                            {/* Errors */}
                            {error && <div style={styles.error}>{error}</div>}
                        </form>
                    </div>

                    {/* Right side - Products */}
                    <div style={styles.productsSection}>
                        <h3 style={styles.sectionTitle}>Review Items</h3>
                        <div>
                            {basket.map(item => (
                                <CheckoutProduct
                                    key={item.id}
                                    id={item.id}
                                    title={item.title}
                                    image={item.image}
                                    price={item.price}
                                    rating={item.rating}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment;