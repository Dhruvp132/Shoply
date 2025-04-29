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

    if (loading) return <div style={styles.loading}>Loading...</div>;
    if (!product) return <div style={styles.loading}>Product not found.</div>;

    return (
      <div style={styles.pageWrapper}>
        <div style={styles.container}>
          {/* Image Section */}
          <div style={styles.imageSection}>
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.title}
              style={styles.image}
            />
          </div>

          {/* Details Section */}
          <div style={styles.detailsSection}>
            <h1 style={styles.title}>{product.title}</h1>
            <p style={styles.brand}>by {product.brand || "Generic Brand"}</p>

            {/* Rating */}
            <div style={styles.rating}>
              {Array(product.rating || 0)
                .fill()
                .map((_, i) => (
                  <span key={i} style={styles.star}>★</span>
                ))}
              <span style={styles.ratingText}>
                ({product.rating || 0}.0)
              </span>
            </div>

            {/* Price */}
            <div style={styles.price}>${product.price}</div>

            {/* Tags */}
            <div style={styles.tags}>
              {product.category && <span style={styles.tag}>{product.category}</span>}
              {product.subCategory && <span style={styles.tag}>{product.subCategory}</span>}
              {product.gender && <span style={styles.tag}>{product.gender}</span>}
            </div>

            {/* Stock */}
            <p style={styles.stock}>In Stock</p>

            {/* CTA */}
            <div style={{ marginTop: "20px" }}>
              <button style={styles.button}>Add to Cart</button>
              <button style={styles.buyButton}>Buy Now</button>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div style={styles.descSection}>
          <h2 style={styles.descTitle}>Product Description</h2>
          <p style={styles.descText}>
            {product.description || "No detailed description available for this product."}
          </p>
        </div>
      </div>
    );
  }

  const styles = {
    pageWrapper: {
      padding: "40px 20px",
      background: "#f9f9f9",
      fontFamily: "'Segoe UI', sans-serif"
    },
    container: {
      display: "flex",
      flexDirection: "row",
      backgroundColor: "#fff",
      borderRadius: "12px",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
      overflow: "hidden",
      maxWidth: "1100px",
      margin: "0 auto",
      padding: "40px",
      gap: "40px"
    },
    imageSection: {
      flex: "1",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
      background: "#fff"
    },
    image: {
      maxWidth: "100%",
      maxHeight: "500px",
      objectFit: "contain"
    },
    detailsSection: {
      flex: "1",
      display: "flex",
      flexDirection: "column"
    },
    title: {
      fontSize: "2rem",
      fontWeight: "bold",
      marginBottom: "10px",
      color: "#222"
    },
    brand: {
      fontSize: "1rem",
      color: "#666",
      marginBottom: "10px"
    },
    rating: {
      display: "flex",
      alignItems: "center",
      marginBottom: "10px"
    },
    star: {
      color: "#FFA41C",
      fontSize: "18px",
      marginRight: "2px"
    },
    ratingText: {
      marginLeft: "8px",
      fontSize: "14px",
      color: "#555"
    },
    price: {
      fontSize: "1.8rem",
      fontWeight: "600",
      color: "#B12704",
      margin: "10px 0"
    },
    tags: {
      display: "flex",
      flexWrap: "wrap",
      gap: "10px",
      marginBottom: "12px"
    },
    tag: {
      background: "#eee",
      padding: "6px 12px",
      borderRadius: "20px",
      fontSize: "0.85rem",
      color: "#333"
    },
    stock: {
      color: "green",
      fontWeight: "500",
      marginBottom: "10px"
    },
    button: {
      padding: "12px 24px",
      fontSize: "16px",
      backgroundColor: "#FFD814",
      border: "1px solid #FCD200",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "bold",
      marginRight: "12px",
      transition: "background 0.3s"
    },
    buyButton: {
      padding: "12px 24px",
      fontSize: "16px",
      backgroundColor: "#FFA41C",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      color: "#fff",
      fontWeight: "bold",
      transition: "background 0.3s"
    },
    descSection: {
      maxWidth: "1100px",
      margin: "40px auto 0",
      backgroundColor: "#fff",
      padding: "30px",
      borderRadius: "12px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)"
    },
    descTitle: {
      fontSize: "1.5rem",
      marginBottom: "10px",
      color: "#222"
    },
    descText: {
      fontSize: "1rem",
      color: "#444",
      lineHeight: "1.6"
    },
    loading: {
      padding: "60px",
      textAlign: "center",
      fontSize: "18px",
      color: "#555"
    }
  };

  export default ProductDetails;
