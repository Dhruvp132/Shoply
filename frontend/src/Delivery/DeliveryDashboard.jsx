// ...existing imports...
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './DeliveryDashboard.css';

function DeliveryDashboard() {
  const [deliveries, setDeliveries] = useState([]);
  const [updatedDeliveries, setUpdatedDeliveries] = useState({});
  const [addressModal, setAddressModal] = useState({ open: false, address: null, editable: false, deliveryId: null });

  const history = useHistory();

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const response = await axios.get('http://localhost:5001/delivery', {
          headers: {
            Authorization: `${localStorage.getItem('deliveryToken')}`,
          },
        });
        setDeliveries(response.data.deliveries);
      } catch (error) {
        console.error('Error fetching deliveries:', error);
      }
    };

    fetchDeliveries();
  }, []);

  const handleChange = (id, field, value) => {
    setUpdatedDeliveries((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  // Parse address string to object for modal
  const handleAddressDetails = (delivery) => {
    setAddressModal({
      open: true,
      address: delivery.deliveryAddress || {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: ''
      },
      editable: false,
      deliveryId: delivery._id,
    });
  };

  const handleUpdate = async (id) => {
    const deliveryData = updatedDeliveries[id];
    if (deliveryData) {
      try {
        await axios.put(
          'http://localhost:5001/delivery/update',
          {
            deliveryId: id,
            ...deliveryData,
          },
          {
            headers: {
              Authorization: `${localStorage.getItem('deliveryToken')}`,
            },
          }
        );
        setUpdatedDeliveries((prev) => ({ ...prev, [id]: undefined }));
        // Optionally, refresh the deliveries list
        // fetchDeliveries();
      } catch (error) {
        console.error('Error updating delivery:', error);
      }
    }
  };

  const handleDetails = (id) => {
    history.push(`/delivery/cartDetails/${id}`);
  };

  const handleAddressEdit = () => {
    setAddressModal((prev) => ({ ...prev, editable: !prev.editable }));
  };

  const handleAddressChange = (field, value) => {
    setAddressModal((prev) => ({
      ...prev,
      address: { ...prev.address, [field]: value },
    }));
  };

  // Stringify address object before sending to backend
  const handleAddressSave = async () => {
    try {
      await axios.put('http://localhost:5001/delivery/update-address', {
        deliveryId: addressModal.deliveryId,
        address: addressModal.address, // send as object
      });
      setAddressModal({ open: false, address: null, editable: false, deliveryId: null });
    } catch (error) {
      console.error('Error updating address:', error);
    }
  };

  const handleAddressClose = () => {
    setAddressModal({ open: false, address: null, editable: false, deliveryId: null });
  };

  return (
    <div>
      <h1>Delivery Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User ID/Email</th>
            <th>Order Status</th>
            <th>Payment Status</th>
            <th>Delivery ID</th>
            <th>Delivery Agent ID</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {deliveries.map((delivery) => {
            // Parse address for display
            let addressObj = {};
            try {
              addressObj = JSON.parse(delivery.deliveryAddress);
            } catch {
              addressObj = { street: delivery.deliveryAddress || '' };
            }
            return (
              <tr key={delivery._id}>
                <td>{delivery.orderId}</td>
                <td>{delivery.userId}</td>
                <td>
                  <select
                    defaultValue={delivery.orderStatus}
                    onChange={(e) => handleChange(delivery._id, 'orderStatus', e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="failed">Failed</option>
                  </select>
                </td>
                <td>
                  <select
                    defaultValue={delivery.paymentStatus}
                    onChange={(e) => handleChange(delivery._id, 'paymentStatus', e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="failed">Failed</option>
                  </select>
                </td>
                <td>{delivery.deliveryId}</td>
                <td>
                  <input
                    type="text"
                    defaultValue={delivery.deliveryAgentId}
                    onChange={(e) => handleChange(delivery._id, 'deliveryAgentId', e.target.value)}
                  />
                </td>
                <td>
                  <button onClick={() => handleAddressDetails(delivery)}>Details</button>
                </td>
                <td>
                  {updatedDeliveries[delivery._id] && (
                    <button onClick={() => handleUpdate(delivery._id)}>Update</button>
                  )}
                  <button onClick={() => handleDetails(delivery._id)}>Details</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Address Modal */}
      {addressModal.open && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Address Details</h2>
            {['street', 'city', 'state', 'zipCode', 'country'].map((field) => (
              <div key={field}>
                <label>{field.charAt(0).toUpperCase() + field.slice(1)}: </label>
                {addressModal.editable ? (
                  <input
                    type="text"
                    value={addressModal.address?.[field] || ''}
                    onChange={(e) => handleAddressChange(field, e.target.value)}
                  />
                ) : (
                  <span>{addressModal.address?.[field]}</span>
                )}
              </div>
            ))}
            <div style={{ marginTop: '1em' }}>
              <button onClick={addressModal.editable ? handleAddressSave : handleAddressEdit}>
                {addressModal.editable ? 'Save' : 'Edit'}
              </button>
              <button onClick={handleAddressClose} style={{ marginLeft: '1em' }}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeliveryDashboard;