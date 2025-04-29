import React from "react";
import { useEffect, useState } from "react";

const categories = [
  {
    name: "Electronics",
    subcategories: ["Mobiles", "Laptops", "Accessories", "Gaming"],
  },
  {
    name: "Fashion",
    subcategories: ["Men", "Women", "Kids"],
  },
  {
    name: "Home & Kitchen",
    subcategories: ["Furniture", "Decor", "Appliances"],
  },
  {
    name: "Books",
    subcategories: ["Fiction", "Non-Fiction", "Children"],
  },
  {
    name: "Sports",
    subcategories: ["Outdoor", "Indoor", "Fitness"],
  },
];

const ProductDialog = ({ onClose, onSave, product }) => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    image: "",
    category: "",
    subcategory: "",
    Description: "",
  });
  const [availableSubcategories, setAvailableSubcategories] = useState([]);

  useEffect(() => {
    // If product is provided, populate form with product data
    if (product) {
      setFormData({
        title: product.title || "",
        price: product.price || "",
        image: product.image || "",
        category: product.category || "",
        subcategory: product.subcategory || "",
      });

      // Set available subcategories based on the product's category
      if (product.category) {
        const categoryObj = categories.find(
          (cat) => cat.name === product.category
        );
        if (categoryObj) {
          setAvailableSubcategories(categoryObj.subcategories);
        }
      }
    }
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Prevent negative prices
    if (name === "price" && (value === "-" || Number.parseInt(value) < 0)) {
      return;
    }

    setFormData({ ...formData, [name]: value });

    // If category changes, update available subcategories and reset subcategory
    if (name === "category") {
      const categoryObj = categories.find((cat) => cat.name === value);
      if (categoryObj) {
        setAvailableSubcategories(categoryObj.subcategories);
        setFormData((prev) => ({ ...prev, subcategory: "" }));
      } else {
        setAvailableSubcategories([]);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  // Dialog overlay styles
  const overlayStyles = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  };

  // Dialog container styles
  const dialogStyles = {
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "20px",
    width: "90%",
    maxWidth: "500px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    zIndex: 1001,
  };

  // Dialog header styles
  const headerStyles = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  };

  // Dialog title styles
  const titleStyles = {
    fontSize: "20px",
    fontWeight: "bold",
  };

  // Close button styles
  const closeButtonStyles = {
    backgroundColor: "transparent",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
  };

  // Form styles
  const formStyles = {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  };

  // Form group styles
  const formGroupStyles = {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  };

  // Label styles
  const labelStyles = {
    fontSize: "14px",
    fontWeight: "bold",
  };

  // Input styles
  const inputStyles = {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    fontSize: "14px",
  };

  // Select styles
  const selectStyles = {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    fontSize: "14px",
    backgroundColor: "white",
  };

  // Button container styles
  const buttonContainerStyles = {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    marginTop: "20px",
  };

  // Cancel button styles
  const cancelButtonStyles = {
    padding: "10px 15px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    backgroundColor: "#f5f5f5",
    cursor: "pointer",
  };

  // Save button styles
  const saveButtonStyles = {
    padding: "10px 15px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#4CAF50",
    color: "white",
    cursor: "pointer",
  };

  return (
    <div style={overlayStyles}>
      <div style={dialogStyles}>
        <div style={headerStyles}>
          <h2 style={titleStyles}>
            {product ? "Edit Product" : "Add Product"}
          </h2>
          <button style={closeButtonStyles} onClick={onClose}>
            ×
          </button>
        </div>
        <form style={formStyles} onSubmit={handleSubmit}>
          <div style={formGroupStyles}>
            <label style={labelStyles} htmlFor="title">
              Title
            </label>
            <input
              style={inputStyles}
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div style={formGroupStyles}>
            <label style={labelStyles} htmlFor="price">
              Price
            </label>
            <input
              style={inputStyles}
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
          </div>
          <div style={formGroupStyles}>
            <label style={labelStyles} htmlFor="image">
              Image URL
            </label>
            <input
              style={inputStyles}
              type="text"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              required
            />
          </div>

          <div style={formGroupStyles}>
            <label style={labelStyles} htmlFor="Description">
              Desciption
            </label>
            <input
              style={inputStyles}
              type="text"
              id="Description"
              name="Description"
              value={formData.Description}
              onChange={handleInputChange}
              required
            />
          </div>

          <div style={formGroupStyles}>
            <label style={labelStyles} htmlFor="category">
              Category
            </label>
            <select
              style={selectStyles}
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.name} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div style={formGroupStyles}>
            <label style={labelStyles} htmlFor="subcategory">
              Subcategory
            </label>
            <select
              style={selectStyles}
              id="subcategory"
              name="subcategory"
              value={formData.subcategory}
              onChange={handleInputChange}
              disabled={!formData.category}
              required
            >
              <option value="">Select Subcategory</option>
              {availableSubcategories.map((subcategory) => (
                <option key={subcategory} value={subcategory}>
                  {subcategory}
                </option>
              ))}
            </select>
          </div>
          <div style={buttonContainerStyles}>
            <button type="button" style={cancelButtonStyles} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" style={saveButtonStyles}>
              {product ? "Update" : "Add"} Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductDialog;
