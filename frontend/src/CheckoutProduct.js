import React from 'react';
import { useStateValue } from './StateProvider';

function CheckoutProduct({ id, image, title, price, rating, hideButton }) {
    const [{ basket }, dispatch] = useStateValue();
    
    const removeFromBasket = () => {
        // remove the item from the basket
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id,
        });
    };
    
    // Styles
    const styles = {
        product: {
            display: 'flex',
            marginTop: '20px',
            marginBottom: '20px',
        },
        image: {
            objectFit: 'contain',
            width: '180px',
            height: '180px',
        },
        info: {
            paddingLeft: '20px',
        },
        title: {
            fontSize: '17px',
            fontWeight: '800',
        },
        price: {
            marginTop: '5px',
        },
        rating: {
            display: 'flex',
            marginTop: '5px',
        },
        button: {
            backgroundColor: '#f0c14b',
            border: '1px solid',
            marginTop: '10px',
            borderColor: '#a88734 #9c7e31 #846a29',
            color: '#111',
            padding: '5px 10px',
            cursor: 'pointer',
        },
    };
    
    return (
        <div style={styles.product}>
            <img src={image || "/placeholder.svg"} alt={title} style={styles.image} />
            
            <div style={styles.info}>
                <p style={styles.title}>{title}</p>
                <p style={styles.price}>
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div style={styles.rating}>
                    {Array(rating)
                        .fill()
                        .map((_, i) => (
                            <p key={i}>⭐</p>
                        ))}
                </div>
                {!hideButton && (
                    <button style={styles.button} onClick={removeFromBasket}>Remove from Basket</button>
                )}
            </div>
        </div>
    );
}

export default CheckoutProduct;