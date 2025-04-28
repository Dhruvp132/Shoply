import React, { useState, useEffect } from "react";
import axios from "axios";
import { db } from "../firebase"; // Import Firestore from firebase.js
import ProductDialog from "../components/ProductDialog.jsx";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
<<<<<<< Updated upstream
  const [form, setForm] = useState({ title: "", price: "", image: "",category: "", subCategory: "" });
  const [editMode, setEditMode] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
=======
  const [activeTab, setActiveTab] = useState("products");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
>>>>>>> Stashed changes

  // Fetch products and users on mount
  useEffect(() => {
    fetchUsers();
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:5001/admin/products");
      setProducts(data.products);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("http://localhost:5001/admin/users");
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      // Remove from Firestore
      await db.collection("users").doc(userId).delete();
      alert("User deleted from Firestore");
      fetchUsers(); // Refresh user list
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const handleAddProduct = () => {
    setEditProduct(null);
    setIsDialogOpen(true);
  };

  const handleEditProduct = (product) => {
    setEditProduct(product);
    setIsDialogOpen(true);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:5001/admin/delete/${productId}`);
      alert("Product deleted successfully");
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  const handleSaveProduct = async (productData) => {
    try {
      if (editProduct) {
        await axios.put(`http://localhost:5001/admin/updateProduct/${editProduct._id}`, productData);
        alert("Product updated successfully");
      } else {
        await axios.post("http://localhost:5001/admin/addproduct", productData);
        alert("Product added successfully");
      }
      fetchProducts();
      setIsDialogOpen(false);
    } catch (err) {
      console.error("Error submitting product:", err);
      alert("Error saving product");
    }
  };

  const dashboardStyles = {
    padding: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
  };

  const headerStyles = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  };

  const titleStyles = {
    fontSize: "24px",
    fontWeight: "bold",
  };

  const addButtonStyles = {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background-color 0.3s",
  };

  const toggleContainerStyles = {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
    borderRadius: "4px",
    overflow: "hidden",
    border: "1px solid #ddd",
    width: "300px",
    margin: "0 auto 20px auto",
  };

  const toggleButtonStyles = (isActive) => ({
    padding: "10px 20px",
    border: "none",
    backgroundColor: isActive ? "#007bff" : "#f0f0f0",
    color: isActive ? "white" : "#333",
    cursor: "pointer",
    flex: 1,
    transition: "background-color 0.3s",
  });

  const productListStyles = {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "flex-start",
  };

  const productCardStyles = {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "15px",
    width: "250px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    transition: "transform 0.3s, box-shadow 0.3s",
    overflow: "hidden",
  };

  const productImageStyles = {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "4px",
    marginBottom: "10px",
  };

  const productTitleStyles = {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "5px",
  };

  const productPriceStyles = {
    fontSize: "14px",
    color: "#666",
    marginBottom: "10px",
  };

  const productCategoryStyles = {
    fontSize: "14px",
    color: "#666",
    marginBottom: "10px",
  };

  const productButtonsStyles = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  };

  const editButtonStyles = {
    backgroundColor: "#FFA500",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "4px",
    cursor: "pointer",
  };

  const deleteButtonStyles = {
    backgroundColor: "#FF0000",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "4px",
    cursor: "pointer",
  };

  const tableStyles = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  };

  const thStyles = {
    backgroundColor: "#f2f2f2",
    padding: "12px",
    textAlign: "left",
    borderBottom: "1px solid #ddd",
  };

  const tdStyles = {
    padding: "12px",
    borderBottom: "1px solid #ddd",
  };

  return (
<<<<<<< Updated upstream
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      {/* Form for adding/editing product */}
      <form onSubmit={handleSubmit} className="product-form">
        <input
          type="text"
          name="title"
          value={form.title}
          placeholder="Product Title"
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="price"
          value={form.price}
          placeholder="Product Price"
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="image"
          value={form.image}
          placeholder="Product Image URL"
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="category"
          value={form.category}
          placeholder="Product Category"
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="subCategory"
          value={form.subCategory}
          placeholder="Product subCategory"
          onChange={handleInputChange}
          required
        />
        <button type="submit">{editMode ? "Update Product" : "Add Product"}</button>
      </form>

      {/* Product List */}
      <div className="product-list">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <img src={product.image} alt={product.title} className="product-image" />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <div className="product-buttons">
              <button onClick={() => handleEdit(product)} className="edit-btn">
                Edit
              </button>
              <button onClick={() => handleDelete(product._id)} className="delete-btn">
                Delete
              </button>
            </div>
          </div>
        ))}
=======
    <div style={dashboardStyles}>
      <div style={headerStyles}>
        <h1 style={titleStyles}>Admin Dashboard</h1>
        {activeTab === "products" && (
          <button style={addButtonStyles} onClick={handleAddProduct}>
            Add Product
          </button>
        )}
>>>>>>> Stashed changes
      </div>

      <div style={toggleContainerStyles}>
        <button
          style={toggleButtonStyles(activeTab === "products")}
          onClick={() => setActiveTab("products")}
        >
          Products
        </button>
        <button
          style={toggleButtonStyles(activeTab === "users")}
          onClick={() => setActiveTab("users")}
        >
          Users
        </button>
      </div>

      {activeTab === "products" ? (
        <div style={productListStyles}>
          {products.map((product) => (
            <div key={product._id} style={productCardStyles}>
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                style={productImageStyles}
              />
              <h3 style={productTitleStyles}>{product.title}</h3>
              <p style={productPriceStyles}>${product.price}</p>
              {product.category && (
                <p style={productCategoryStyles}>
                  {product.category} {product.subcategory ? `> ${product.subcategory}` : ""}
                </p>
              )}
              <div style={productButtonsStyles}>
                <button
                  onClick={() => handleEditProduct(product)}
                  style={editButtonStyles}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteProduct(product._id)}
                  style={deleteButtonStyles}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <table style={tableStyles}>
          <thead>
            <tr>
              <th style={thStyles}>Email</th>
              <th style={thStyles}>UID</th>
              <th style={thStyles}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td style={tdStyles}>{user.email}</td>
                <td style={tdStyles}>{user.uid}</td>
                <td style={tdStyles}>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    style={deleteButtonStyles}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {isDialogOpen && (
        <ProductDialog
          onClose={() => setIsDialogOpen(false)}
          onSave={handleSaveProduct}
          product={editProduct}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
