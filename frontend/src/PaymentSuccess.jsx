import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function PaymentSuccess() {
    const history = useHistory();
    
    useEffect(() => {
        if (!history.location.state || !history.location.state.paymentSuccess) {
            history.replace('/');
            return;
        }
        
        const timer = setTimeout(() => {
            history.push('/');
        }, 5000);
        
        return () => clearTimeout(timer);
    }, [history]);

    // Styles
    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '80vh',
            padding: '20px',
            backgroundColor: '#f8f8f8',
        },
        card: {
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            padding: '40px',
            maxWidth: '500px',
            width: '100%',
            textAlign: 'center',
        },
        icon: {
            color: '#4CAF50',
            fontSize: '64px',
            marginBottom: '20px',
        },
        title: {
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '15px',
        },
        message: {
            fontSize: '16px',
            color: '#666',
            marginBottom: '30px',
            lineHeight: '1.5',
        },
        orderInfo: {
            backgroundColor: '#f9f9f9',
            padding: '15px',
            borderRadius: '4px',
            marginBottom: '30px',
            textAlign: 'left',
        },
        orderInfoTitle: {
            fontWeight: 'bold',
            marginBottom: '10px',
        },
        orderDetail: {
            margin: '5px 0',
            fontSize: '14px',
        },
        countdown: {
            fontSize: '14px',
            color: '#888',
            marginBottom: '20px',
        },
        button: {
            backgroundColor: '#f0c14b',
            border: 'none',
            borderRadius: '4px',
            padding: '10px 20px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            borderColor: '#a88734 #9c7e31 #846a29',
            color: '#111',
        }
    };

    // If the state is not present, return null (redirect handled in useEffect)
    if (!history.location.state || !history.location.state.paymentSuccess) {
        return null;
    }

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.icon}>✓</div>
                <h1 style={styles.title}>Payment Successful!</h1>
                <p style={styles.message}>
                    Thank you for your purchase. Your order has been confirmed and will be shipped soon.
                    A confirmation email has been sent to your registered email address.
                </p>
                
                <div style={styles.orderInfo}>
                    <div style={styles.orderInfoTitle}>Order Information:</div>
                    <p style={styles.orderDetail}>Order ID: #ORD-{Math.floor(Math.random() * 1000000)}</p>
                    <p style={styles.orderDetail}>Date: {new Date().toLocaleDateString()}</p>
                    <p style={styles.orderDetail}>Payment Method: Credit Card</p>
                </div>
                
                <p style={styles.countdown}>You will be redirected to the homepage in 5 seconds</p>
                
                <button 
                    style={styles.button}
                    onClick={() => history.push("/")}
                >
                    Return to Home
                </button>
            </div>
        </div>
    );
}

export default PaymentSuccess;