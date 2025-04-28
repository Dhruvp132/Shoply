import React from 'react';
import { CardElement } from '@stripe/react-stripe-js';

function CardElementComponent({ onChange }) {
    // Styles
    const styles = {
        cardContainer: {
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '15px',
            backgroundColor: 'white',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        },
        cardHeader: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '15px',
        },
        cardTitle: {
            fontSize: '16px',
            fontWeight: 'bold',
            margin: 0,
        },
        cardLogos: {
            display: 'flex',
        },
        cardLogo: {
            marginLeft: '5px',
            width: '40px',
            height: '25px',
        },
        cardElement: {
            padding: '10px 0',
        },
        secureText: {
            fontSize: '12px',
            color: '#888',
            marginTop: '10px',
            display: 'flex',
            alignItems: 'center',
        },
        lockIcon: {
            marginRight: '5px',
            fontSize: '14px',
        }
    };

    return (
        <div style={styles.cardContainer}>
            <div style={styles.cardHeader}>
                <h4 style={styles.cardTitle}>Credit Card Information</h4>
                <div style={styles.cardLogos}>
                    <span style={styles.cardLogo}>💳</span>
                </div>
            </div>
            
            <div style={styles.cardElement}>
                <CardElement 
                    onChange={onChange}
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                                padding: '10px 0',
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                        hidePostalCode: true,
                    }}
                />
            </div>
            
            <div style={styles.secureText}>
                <span style={styles.lockIcon}>🔒</span> Your payment information is secure
            </div>
        </div>
    );
}

export default CardElementComponent;