import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useStateValue } from '../StateProvider';
import CheckoutProduct from '../CheckoutProduct';

function CollabCart() {
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [{ basket, user }, dispatch] = useStateValue();
    const [, setBasket] = useState([]);
    const [collabCart, setCollabCart] = useState([]);
    const [previewCart, setPreviewCart] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const dropdownRef = useRef(null);

    // Styles
    const styles = {
        container: {
            maxWidth: '1000px',
            margin: '0 auto',
            padding: '20px',
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        },
        header: {
            color: '#333',
            borderBottom: '2px solid #e47911',
            paddingBottom: '10px',
            marginBottom: '20px',
            fontSize: '24px'
        },
        section: {
            marginBottom: '30px'
        },
        sectionTitle: {
            fontSize: '18px',
            color: '#333',
            marginBottom: '15px',
            fontWeight: 'bold'
        },
        userSelectionContainer: {
            marginBottom: '20px'
        },
        inputContainer: {
            position: 'relative',
            marginBottom: '15px'
        },
        label: {
            display: 'block',
            marginBottom: '8px',
            fontWeight: 'bold',
            color: '#333'
        },
        input: {
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            boxSizing: 'border-box'
        },
        dropdown: {
            position: 'absolute',
            top: '100%',
            left: '0',
            width: '100%',
            maxHeight: '200px',
            overflowY: 'auto',
            backgroundColor: 'white',
            border: '1px solid #ddd',
            borderRadius: '0 0 4px 4px',
            zIndex: '10',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
        },
        dropdownItem: {
            padding: '10px',
            cursor: 'pointer',
            borderBottom: '1px solid #f0f0f0',
            transition: 'background-color 0.2s'
        },
        dropdownItemHover: {
            backgroundColor: '#f5f5f5'
        },
        selectedUsersContainer: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            marginTop: '10px'
        },
        selectedUserTag: {
            backgroundColor: '#e47911',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
        },
        removeButton: {
            background: 'none',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            fontSize: '16px',
            padding: '0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        buttonContainer: {
            display: 'flex',
            gap: '10px',
            marginBottom: '20px'
        },
        button: {
            padding: '10px 15px',
            backgroundColor: '#e47911',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'background-color 0.2s'
        },
        buttonHover: {
            backgroundColor: '#c45500'
        },
        basketContainer: {
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '15px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        },
        collabCartContainer: {
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '15px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            marginTop: '20px'
        },
        productList: {
            listStyle: 'none',
            padding: '0',
            margin: '0'
        },
        productItem: {
            display: 'flex',
            alignItems: 'center',
            padding: '15px',
            borderBottom: '1px solid #f0f0f0'
        },
        productImage: {
            width: '80px',
            height: '80px',
            objectFit: 'contain',
            marginRight: '15px'
        },
        productDetails: {
            flex: '1'
        },
        productTitle: {
            margin: '0 0 5px',
            fontSize: '16px',
            fontWeight: 'bold'
        },
        productPrice: {
            margin: '0 0 5px',
            color: '#e47911',
            fontWeight: 'bold'
        },
        productAddedBy: {
            margin: '0',
            fontSize: '14px',
            color: '#555'
        },
        emptyMessage: {
            textAlign: 'center',
            padding: '20px',
            color: '#888'
        }
    };

    useEffect(() => {
        // Fetch all users
        axios.get('http://localhost:5001/admin/users')
            .then(response => setUsers(response.data))
            .catch(error => console.error('Error fetching users:', error));

        // Fetch current user's basket
        setBasket(JSON.parse(localStorage.getItem('basket')) || []);

        // Add click outside listener to close dropdown
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Filter users based on input
    useEffect(() => {
        if (inputValue) {
            const filtered = users.filter(
                user => user.email && 
                user.email.toLowerCase().includes(inputValue.toLowerCase()) && 
                !selectedUsers.includes(user.email)
            );
            setFilteredUsers(filtered);
        } else {
            setFilteredUsers(users.filter(user => !selectedUsers.includes(user.email)));
        }
    }, [inputValue, users, selectedUsers]);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowDropdown(false);
        }
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        setShowDropdown(true);
    };

    const handleSelectUser = (email) => {
        if (email && selectedUsers.length < 1 && !selectedUsers.includes(email)) {
            setSelectedUsers([...selectedUsers, email]);
            setInputValue('');
            setShowDropdown(false);
        }
    };

    const handleRemoveUser = (email) => {
        setSelectedUsers(selectedUsers.filter(u => u !== email));
    };

    const handleAddToCollabCart = () => {
        if (selectedUsers.length === 0) {
            alert("Please select at least one user to share your cart with.");
            return;
        }

        const cartId = `collab-cart-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        axios.post('http://localhost:5001/api/collabCart', {
            cartId,
            userEmail: [user?.email, ...selectedUsers],
            products: basket,
        })
            .then(response => {
                setCollabCart(response.data.collabCart);
                alert("Cart shared successfully!");
            })
            .catch(error => {
                console.error('Error updating collab cart:', error);
                alert("Failed to share cart. Please try again.");
            });
    };

    const handlePreviewCollabCart = () => {
        if (!selectedUsers.length) {
            alert("Please select a user to preview their collab cart.");
            return;
        }
    
        const selectedUser = selectedUsers[selectedUsers.length - 1];
        const currentUser = user?.email;
    
        if (!currentUser) {
            alert("Current user is not logged in.");
            return;
        }
    
        axios
            .get(`http://localhost:5001/api/collabCart/shared/${currentUser}/${selectedUser}`)
            .then(response => {
                if (response.data.length > 0) {
                    setPreviewCart(response.data);
                } else {
                    alert("No shared collab carts found.");
                }
            })
            .catch(error => {
                console.error('Error fetching shared collab cart:', error);
                alert("Failed to preview cart. Please try again.");
            });
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Collaborative Shopping Cart</h1>
            
            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Share Your Cart</h2>
                
                <div style={styles.userSelectionContainer}>
                    <div style={styles.inputContainer} ref={dropdownRef}>
                        <label style={styles.label}>Select Users to Share With:</label>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={handleInputChange}
                            onFocus={() => setShowDropdown(true)}
                            placeholder="Type to search users..."
                            style={styles.input}
                            disabled={selectedUsers.length >= 1}
                        />
                        
                        {showDropdown && filteredUsers.length > 0 && (
                            <div style={styles.dropdown}>
                                {filteredUsers.map(user => (
                                    <div 
                                        key={user.email} 
                                        style={styles.dropdownItem}
                                        onClick={() => handleSelectUser(user.email)}
                                        onMouseOver={(e) => {
                                            e.currentTarget.style.backgroundColor = '#f5f5f5';
                                        }}
                                        onMouseOut={(e) => {
                                            e.currentTarget.style.backgroundColor = 'transparent';
                                        }}
                                    >
                                        {user.email}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    
                    {selectedUsers.length > 0 && (
                        <div style={styles.selectedUsersContainer}>
                            {selectedUsers.map(email => (
                                <div key={email} style={styles.selectedUserTag}>
                                    <span>{email}</span>
                                    <button 
                                        onClick={() => handleRemoveUser(email)} 
                                        style={styles.removeButton}
                                        title="Remove user"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                
                <div style={styles.buttonContainer}>
                    <button 
                        onClick={handleAddToCollabCart} 
                        style={styles.button}
                        onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = '#c45500';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = '#e47911';
                        }}
                    >
                        Share My Cart
                    </button>
                    <button 
                        onClick={handlePreviewCollabCart} 
                        style={styles.button}
                        onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = '#c45500';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = '#e47911';
                        }}
                    >
                        Preview Shared Cart
                    </button>
                </div>
            </div>
            
            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Your Current Cart</h2>
                <div style={styles.basketContainer}>
                    {basket && basket.length > 0 ? (
                        basket.map(item => (
                            <CheckoutProduct
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))
                    ) : (
                        <p style={styles.emptyMessage}>Your cart is empty</p>
                    )}
                </div>
            </div>
            
            {collabCart && collabCart.products && collabCart.products.length > 0 && (
                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>Shared Cart</h2>
                    <div style={styles.collabCartContainer}>
                        <ul style={styles.productList}>
                            {collabCart.products.map((product, index) => (
                                <li key={index} style={styles.productItem}>
                                    <img 
                                        src={product.image || "/placeholder.svg"} 
                                        alt={product.title} 
                                        style={styles.productImage} 
                                    />
                                    <div style={styles.productDetails}>
                                        <h3 style={styles.productTitle}>{product.title}</h3>
                                        <p style={styles.productPrice}>${product.price}</p>
                                        <p style={styles.productAddedBy}>Added by: {product.addedBy || 'Unknown'}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            {previewCart && previewCart.length > 0 && (
                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>Previewed Shared Carts</h2>
                    {previewCart.map((cart, cartIndex) => (
                        <div key={cartIndex} style={styles.collabCartContainer}>
                            <h3 style={{...styles.sectionTitle, fontSize: '16px'}}>Cart #{cartIndex + 1}</h3>
                            <ul style={styles.productList}>
                                {cart.products?.map((product, index) => (
                                    <li key={index} style={styles.productItem}>
                                        <img 
                                            src={product.image || "/placeholder.svg"} 
                                            alt={product.title} 
                                            style={styles.productImage} 
                                        />
                                        <div style={styles.productDetails}>
                                            <h3 style={styles.productTitle}>{product.title}</h3>
                                            <p style={styles.productPrice}>${product.price}</p>
                                            <p style={styles.productAddedBy}>Added by: {product.addedBy || 'Unknown'}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CollabCart;