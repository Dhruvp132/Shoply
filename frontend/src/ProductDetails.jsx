import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5001/admin/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data.product);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div style={{ padding: 40 }}>Loading...</div>;
  if (!product) return <div style={{ padding: 40 }}>Product not found.</div>;

  return (
    <div style={{
      display: "flex",
      flexDirection: "row",
      padding: "40px",
      background: "#fff",
      borderRadius: "8px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      maxWidth: "900px",
      margin: "40px auto"
    }}>
      <div style={{ flex: "1", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.title}
          style={{ maxWidth: "350px", maxHeight: "350px", objectFit: "contain" }}
        />
      </div>
      <div style={{ flex: "2", marginLeft: "40px" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "10px" }}>{product.title}</h1>
        <div style={{ marginBottom: "10px", color: "#565959" }}>
          {product.category && <span>{product.category}</span>}
          {product.subCategory && <span> &gt; {product.subCategory}</span>}
          {product.gender && <span> | {product.gender}</span>}
        </div>
        <div style={{ marginBottom: "10px" }}>
          {Array(product.rating || 0).fill().map((_, i) => (
            <span key={i} style={{ color: "#FFA41C", fontSize: "20px" }}>★</span>
          ))}
        </div>
        <div style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "20px" }}>
          ${product.price}
        </div>
        <button
          style={{
            backgroundColor: "#f0c14b",
            border: "1px solid #a88734",
            color: "#111",
            padding: "12px 24px",
            borderRadius: "3px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
            marginRight: "16px"
          }}
        >
          Add to Basket
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;