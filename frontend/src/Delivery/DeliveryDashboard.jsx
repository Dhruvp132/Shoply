import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import axios from "axios"
import "./DeliveryDashboard.css"

function DeliveryDashboard() {
  const [deliveries, setDeliveries] = useState([])
  const [updatedDeliveries, setUpdatedDeliveries] = useState({})
  const [addressModal, setAddressModal] = useState({ open: false, address: null, editable: false, deliveryId: null })
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const history = useHistory()

  // Fetch deliveries from backend
  useEffect(() => {
    const fetchDeliveries = async () => {
      setLoading(true)
      try {
        const response = await axios.get("http://localhost:5001/delivery", {
          headers: {
            Authorization: `${localStorage.getItem("deliveryToken")}`,
          },
        })
        setDeliveries(response.data.deliveries)
      } catch (error) {
        console.error("Error fetching deliveries:", error)
      }
      setLoading(false)
    }
    fetchDeliveries()
  }, [])

  const handleChange = (id, field, value) => {
    setUpdatedDeliveries((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }))
  }

  const handleAddressDetails = (delivery) => {
    setAddressModal({
      open: true,
      address: delivery.deliveryAddress || {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      },
      editable: false,
      deliveryId: delivery._id,
    })
  }

  const handleUpdate = async (id) => {
    const deliveryData = updatedDeliveries[id]
    if (deliveryData) {
      try {
        await axios.put(
          "http://localhost:5001/delivery/update",
          {
            deliveryId: id,
            ...deliveryData,
          },
          {
            headers: {
              Authorization: `${localStorage.getItem("deliveryToken")}`,
            },
          }
        )
        setDeliveries((prev) =>
          prev.map((delivery) =>
            delivery._id === id ? { ...delivery, ...deliveryData } : delivery
          )
        )
        setUpdatedDeliveries((prev) => ({ ...prev, [id]: undefined }))
        alert("Delivery updated successfully!")
      } catch (error) {
        console.error("Error updating delivery:", error)
      }
    }
  }

  const handleDetails = (id) => {
    history.push(`/delivery/cartDetails/${id}`)
  }

  const handleAddressEdit = () => {
    setAddressModal((prev) => ({ ...prev, editable: !prev.editable }))
  }

  const handleAddressChange = (field, value) => {
    setAddressModal((prev) => ({
      ...prev,
      address: { ...prev.address, [field]: value },
    }))
  }

  const handleAddressSave = async () => {
    try {
      await axios.put(
        "http://localhost:5001/delivery/update-address",
        {
          deliveryId: addressModal.deliveryId,
          address: addressModal.address,
        },
        {
          headers: {
            Authorization: `${localStorage.getItem("deliveryToken")}`,
          },
        }
      )
      setDeliveries((prev) =>
        prev.map((delivery) =>
          delivery._id === addressModal.deliveryId
            ? { ...delivery, deliveryAddress: addressModal.address }
            : delivery
        )
      )
      setAddressModal({ open: false, address: null, editable: false, deliveryId: null })
      alert("Address updated successfully!")
    } catch (error) {
      console.error("Error updating address:", error)
    }
  }

  const handleAddressClose = () => {
    setAddressModal({ open: false, address: null, editable: false, deliveryId: null })
  }

  const getStatusClass = (status) => {
    switch (status) {
      case "completed":
        return "status-completed"
      case "pending":
        return "status-pending"
      case "failed":
        return "status-failed"
      default:
        return ""
    }
  }

  const filteredDeliveries = deliveries.filter((delivery) => {
    if (activeTab !== "all" && delivery.orderStatus !== activeTab) {
      return false
    }
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      return (
        delivery.orderId.toLowerCase().includes(searchLower) ||
        delivery.userId.toLowerCase().includes(searchLower) ||
        delivery.deliveryId.toLowerCase().includes(searchLower) ||
        delivery.deliveryAgentId.toLowerCase().includes(searchLower)
      )
    }
    return true
  })

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Delivery Dashboard</h1>
          <div className="header-actions">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search orders, users, agents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <span className="search-icon">🔍</span>
            </div>
            {/* Optionally add a refresh button */}
          </div>
        </div>
        <div className="tab-navigation">
          <button className={`tab-button ${activeTab === "all" ? "active" : ""}`} onClick={() => setActiveTab("all")}>
            All Orders
          </button>
          <button className={`tab-button ${activeTab === "pending" ? "active" : ""}`} onClick={() => setActiveTab("pending")}>
            Pending
          </button>
          <button className={`tab-button ${activeTab === "completed" ? "active" : ""}`} onClick={() => setActiveTab("completed")}>
            Completed
          </button>
          <button className={`tab-button ${activeTab === "failed" ? "active" : ""}`} onClick={() => setActiveTab("failed")}>
            Failed
          </button>
        </div>
      </header>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Orders</h3>
          <p>{deliveries.length}</p>
        </div>
        <div className="stat-card">
          <h3>Pending</h3>
          <p>{deliveries.filter((d) => d.orderStatus === "pending").length}</p>
        </div>
        <div className="stat-card">
          <h3>Completed</h3>
          <p>{deliveries.filter((d) => d.orderStatus === "completed").length}</p>
        </div>
        <div className="stat-card">
          <h3>Failed</h3>
          <p>{deliveries.filter((d) => d.orderStatus === "failed").length}</p>
        </div>
      </div>

      <div className="table-container">
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading deliveries...</p>
          </div>
        ) : filteredDeliveries.length === 0 ? (
          <div className="no-data">
            <p>No deliveries found matching your criteria.</p>
          </div>
        ) : (
          <table className="delivery-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>User ID/Email</th>
                <th>Order Status</th>
                <th>Payment Status</th>
                <th>Delivery ID</th>
                <th>Delivery Agent</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDeliveries.map((delivery) => (
                <tr key={delivery._id}>
                  <td>{delivery.orderId}</td>
                  <td>{delivery.userId}</td>
                  <td>
                    <select
                      className={`status-select ${getStatusClass(delivery.orderStatus)}`}
                      value={updatedDeliveries[delivery._id]?.orderStatus || delivery.orderStatus}
                      onChange={(e) => handleChange(delivery._id, "orderStatus", e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="failed">Failed</option>
                    </select>
                  </td>
                  <td>
                    <select
                      className={`status-select ${getStatusClass(delivery.paymentStatus)}`}
                      value={updatedDeliveries[delivery._id]?.paymentStatus || delivery.paymentStatus}
                      onChange={(e) => handleChange(delivery._id, "paymentStatus", e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="failed">Failed</option>
                    </select>
                  </td>
                  <td>{delivery.deliveryId.substring(0, 8)}...</td>
                  <td>
                    <input
                      type="text"
                      className="agent-input"
                      value={updatedDeliveries[delivery._id]?.deliveryAgentId || delivery.deliveryAgentId}
                      onChange={(e) => handleChange(delivery._id, "deliveryAgentId", e.target.value)}
                    />
                  </td>
                  <td>
                    <button className="address-button" onClick={() => handleAddressDetails(delivery)}>
                      View Address
                    </button>
                  </td>
                  <td className="action-buttons">
                    {updatedDeliveries[delivery._id] && (
                      <button className="update-button" onClick={() => handleUpdate(delivery._id)}>
                        Update
                      </button>
                    )}
                    <button className="details-button" onClick={() => handleDetails(delivery._id)}>
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Address Modal */}
      {addressModal.open && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Address Details</h2>
              <button className="close-button" onClick={handleAddressClose}>
                ×
              </button>
            </div>
            <div className="modal-body">
              {["street", "city", "state", "zipCode", "country"].map((field) => (
                <div className="form-group" key={field}>
                  <label>{field.charAt(0).toUpperCase() + field.slice(1)}: </label>
                  {addressModal.editable ? (
                    <input
                      type="text"
                      className="address-input"
                      value={addressModal.address?.[field] || ""}
                      onChange={(e) => handleAddressChange(field, e.target.value)}
                    />
                  ) : (
                    <span className="address-value">{addressModal.address?.[field]}</span>
                  )}
                </div>
              ))}
            </div>
            <div className="modal-footer">
              <button
                className={addressModal.editable ? "save-button" : "edit-button"}
                onClick={addressModal.editable ? handleAddressSave : handleAddressEdit}
              >
                {addressModal.editable ? "Save Changes" : "Edit Address"}
              </button>
              <button className="cancel-button" onClick={handleAddressClose}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DeliveryDashboard