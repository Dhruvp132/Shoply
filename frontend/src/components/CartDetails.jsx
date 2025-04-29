"use client"
import React from "react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "./cart-details.css"
import { useHistory } from "react-router-dom"

function CartDetails() {
  const navigate = useHistory()
  const { userId } = useParams()
  const [basket, setBasket] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [orderSummary, setOrderSummary] = useState({
    subtotal: 0,
    shipping: 10.0,
    tax: 0,
    total: 0,
  })

// ...existing code...
useEffect(() => {
  const fetchDelivery = async () => {
    setLoading(true)
    try {
      // In a real app, this would be an API call
      const response = await fetch(`http://localhost:5001/delivery/cartDetails/${userId}`);
      const data = await response.json();
      setBasket(data.cartDetails.basket);

      // Calculate order summary based on fetched basket
      const subtotal = data.cartDetails.basket.reduce(
        (sum, item) => sum + item.price * (item.quantity || 1),
        0
      );
      const tax = subtotal * 0.08; // 8% tax

      setOrderSummary({
        subtotal,
        shipping: 10.0,
        tax,
        total: subtotal + 10.0 + tax,
      });

      setLoading(false)
    } catch (err) {
      console.error("Error fetching cart details:", err)
      setError("Failed to load cart details. Please try again later.")
      setLoading(false)
    }
  }

  fetchDelivery()
}, [userId])
// ...existing code...

  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`
  }

  return (
    <div className="cart-details-container">
      <div className="cart-header">
        <h1>Order Details</h1>
        <div className="order-id">Order ID: {userId || "ORD-12345"}</div>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading cart details...</p>
        </div>
      ) : error ? (
        <div className="error-message">
          <p>{error}</p>
          <button className="retry-button">Retry</button>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items-container">
            <h2>Items in Cart</h2>
            {basket.length === 0 ? (
              <div className="empty-cart">
                <p>No items in cart</p>
              </div>
            ) : (
              <ul className="cart-items-list">
                {basket.map((item, index) => (
                  <li key={index} className="cart-item">
                    <div className="item-image">
                      <img src={item.image || "/placeholder.svg"} alt={item.title} />
                    </div>
                    <div className="item-details">
                      <h3>{item.title}</h3>
                      <p className="item-description">{item.description || "No description available"}</p>
                      <div className="item-meta">
                        <span className="item-quantity">Qty: {item.quantity || 1}</span>
                        <span className="item-price">{formatPrice(item.price)}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="order-summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>{formatPrice(orderSummary.subtotal)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>{formatPrice(orderSummary.shipping)}</span>
            </div>
            <div className="summary-row">
              <span>Tax</span>
              <span>{formatPrice(orderSummary.tax)}</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-row total">
              <span>Total</span>
              <span>{formatPrice(orderSummary.total)}</span>
            </div>
          </div>
        </div>
      )}

      <div className="cart-actions">
        <button className="back-button" onClick={() => navigate.push("/delivery/dashboard")}>
          Back to Dashboard
        </button>
        <button className="print-button" onClick={() => window.print()}>
          Print Order Details
        </button>
      </div>
    </div>
  )
}

export default CartDetails
