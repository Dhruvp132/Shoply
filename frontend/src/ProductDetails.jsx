import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { useStateValue } from "./StateProvider";


function ProductDetails() {
  const { id } = useParams();
  const history = useHistory();
  const [{ basket }, dispatch] = useStateValue();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState("");
  const [reviewsExpanded, setReviewsExpanded] = useState(false);

  // Mock data for additional images and reviews
  const additionalImages = [
    "/placeholder.svg?width=80&height=80",
    "/placeholder.svg?width=80&height=80",
    "/placeholder.svg?width=80&height=80",
    "/placeholder.svg?width=80&height=80"
  ];

  const mockReviews = [
    { id: 1, user: "John D.", rating: 5, title: "Excellent product!", date: "January 15, 2023", content: "This product exceeded my expectations. The quality is outstanding and it works perfectly for my needs." },
    { id: 2, user: "Sarah M.", rating: 4, title: "Great value", date: "February 3, 2023", content: "Good quality for the price. Would recommend to others looking for this type of product." },
    { id: 3, user: "Michael T.", rating: 5, title: "Perfect fit", date: "March 22, 2023", content: "Exactly what I was looking for. Fast shipping and excellent customer service." }
  ];

  // Mock related products
  const relatedProducts = [
    { id: 101, title: "Similar Product 1", price: 49.99, rating: 4, image: "/placeholder.svg?width=150&height=150" },
    { id: 102, title: "Similar Product 2", price: 39.99, rating: 5, image: "/placeholder.svg?width=150&height=150" },
    { id: 103, title: "Similar Product 3", price: 59.99, rating: 4, image: "/placeholder.svg?width=150&height=150" },
    { id: 104, title: "Similar Product 4", price: 44.99, rating: 3, image: "/placeholder.svg?width=150&height=150" }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`http://localhost:5001/admin/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data.product);
        setMainImage(data.product.image || "/placeholder.svg");
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= 10) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    // Add to basket with the selected quantity
    for (let i = 0; i < quantity; i++) {
      dispatch({
        type: "ADD_TO_BASKET",
        item: {
          id: product._id,
          title: product.title,
          image: product.image,
          price: product.price,
          rating: product.rating || 0,
          category: product.category,
          subcategory: product.subcategory,
          gender: product.gender,
          variant: selectedVariant || undefined
        },
      });
    }
    alert(`Added ${quantity} item(s) to cart`);
  };

  const handleBuyNow = () => {
    // Add to basket and redirect to checkout
    handleAddToCart();
    history.push('/checkout');
  };

  if (loading) return <div style={styles.loading}>Loading...</div>;
  if (!product) return <div style={styles.loading}>Product not found.</div>;

  return (
    <div style={styles.pageWrapper}>
      {/* Breadcrumb Navigation */}
      <div style={styles.breadcrumb}>
        <Link to="/" style={styles.breadcrumbLink}>Home</Link>
        <span style={styles.breadcrumbSeparator}>›</span>
        <Link to={`/category/${product.category}`} style={styles.breadcrumbLink}>{product.category || "Category"}</Link>
        <span style={styles.breadcrumbSeparator}>›</span>
        <span style={styles.breadcrumbCurrent}>{product.title}</span>
      </div>

      <div style={styles.container}>
        {/* Left Side - Image Gallery */}
        <div style={styles.imageGallery}>
          <div style={styles.thumbnailColumn}>
            {additionalImages.map((img, index) => (
              <div 
                key={index} 
                style={{
                  ...styles.thumbnail,
                  ...(mainImage === img ? styles.activeThumbnail : {})
                }}
                onClick={() => setMainImage(img)}
              >
                <img src={img || "/placeholder.svg"} alt={`Product view ${index + 1}`} style={styles.thumbnailImage} />
              </div>
            ))}
          </div>
          <div style={styles.mainImageContainer}>
            <img
              src={mainImage || "/placeholder.svg"}
              alt={product.title}
              style={styles.mainImage}
            />
            <div style={styles.imageZoomHint}>
              <span style={styles.zoomIcon}>🔍</span> Hover to zoom
            </div>
          </div>
        </div>

        {/* Middle - Product Details */}
        <div style={styles.detailsSection}>
          <h1 style={styles.title}>{product.title}</h1>
          <Link to={`/brand/${product.brand}`} style={styles.brandLink}>by {product.brand || "Generic Brand"}</Link>

          {/* Rating */}
          <div style={styles.rating}>
            {Array(product.rating || 0)
              .fill()
              .map((_, i) => (
                <span key={i} style={styles.star}>★</span>
              ))}
            <span style={styles.ratingText}>
              <Link to="#reviews" style={styles.reviewsLink}>
                {product.rating || 0}.0 out of 5
              </Link>
            </span>
            <span style={styles.ratingCount}>
              <Link to="#reviews" style={styles.reviewsLink}>
                {Math.floor(Math.random() * 1000) + 50} ratings
              </Link>
            </span>
          </div>

          {/* Price Section */}
          <div style={styles.priceSection}>
            <div style={styles.priceLabel}>Price:</div>
            <div style={styles.price}>${product.price}</div>
            {product.originalPrice && (
              <div style={styles.savings}>
                <span style={styles.originalPrice}>${product.originalPrice}</span>
                <span style={styles.savingsAmount}>
                  Save ${(product.originalPrice - product.price).toFixed(2)} ({Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%)
                </span>
              </div>
            )}
          </div>

          {/* Tags */}
          <div style={styles.tags}>
            {product.category && <span style={styles.tag}>{product.category}</span>}
            {product.subCategory && <span style={styles.tag}>{product.subCategory}</span>}
            {product.gender && <span style={styles.tag}>{product.gender}</span>}
          </div>

          {/* About This Item */}
          <div style={styles.aboutSection}>
            <h3 style={styles.aboutTitle}>About this item</h3>
            <ul style={styles.bulletPoints}>
              <li>Premium quality materials ensure durability and long-lasting performance</li>
              <li>Ergonomic design for maximum comfort and ease of use</li>
              <li>Versatile functionality makes it perfect for various applications</li>
              <li>Easy to clean and maintain for years of reliable service</li>
            </ul>
          </div>
        </div>

        {/* Right Side - Buy Box */}
        <div style={styles.buyBox}>
          <div style={styles.price}>${product.price}</div>
          
          <div style={styles.delivery}>
            <span style={styles.freeDelivery}>FREE delivery </span>
            <span style={styles.deliveryDate}>{new Date(Date.now() + 2*24*60*60*1000).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
          </div>
          
          <div style={styles.stock}>
            <span style={styles.inStock}>✓ In Stock</span>
          </div>
          
          <div style={styles.quantitySelector}>
            <label style={styles.quantityLabel}>Quantity: </label>
            <select 
              value={quantity} 
              onChange={handleQuantityChange}
              style={styles.quantityDropdown}
            >
              {[1,2,3,4,5,6,7,8,9,10].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
          
          {product.variants && product.variants.length > 0 && (
            <div style={styles.variantSelector}>
              <label style={styles.variantLabel}>Size: </label>
              <select 
                value={selectedVariant} 
                onChange={(e) => setSelectedVariant(e.target.value)}
                style={styles.variantDropdown}
              >
                <option value="">Select</option>
                {product.variants.map(variant => (
                  <option key={variant} value={variant}>{variant}</option>
                ))}
              </select>
            </div>
          )}
          
          <button 
            style={styles.addToCartButton}
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
          
          <button 
            style={styles.buyNowButton}
            onClick={handleBuyNow}
          >
            Buy Now
          </button>
          
          <div style={styles.secureTransaction}>
            <span style={styles.lockIcon}>🔒</span> Secure transaction
          </div>
          
          <div style={styles.shippingInfo}>
            <div style={styles.shippingDetail}>
              <span style={styles.shippingLabel}>Ships from</span>
              <span style={styles.shippingValue}>Amazon.com</span>
            </div>
            <div style={styles.shippingDetail}>
              <span style={styles.shippingLabel}>Sold by</span>
              <span style={styles.shippingValue}>Amazon.com</span>
            </div>
            <div style={styles.shippingDetail}>
              <span style={styles.shippingLabel}>Returns</span>
              <span style={styles.shippingValue}>Eligible for Return, Refund or Replacement within 30 days</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Description */}
      <div style={styles.descSection}>
        <h2 style={styles.sectionTitle}>Product Description</h2>
        <p style={styles.descText}>
          {product.Description || "No detailed description available for this product."}
        </p>
      </div>

      {/* Customer Reviews Section */}
      <div style={styles.reviewsSection} id="reviews">
        <h2 style={styles.sectionTitle}>Customer Reviews</h2>
        
        <div style={styles.reviewsSummary}>
          <div style={styles.overallRating}>
            <div style={styles.bigRating}>{product.rating || 0}.0</div>
            <div style={styles.ratingStars}>
              {Array(5)
                .fill()
                .map((_, i) => (
                  <span key={i} style={i < product.rating ? styles.star : styles.emptyStar}>★</span>
                ))}
            </div>
            <div style={styles.totalRatings}>{Math.floor(Math.random() * 1000) + 50} global ratings</div>
          </div>
          
          <div style={styles.ratingBreakdown}>
            <div style={styles.ratingBar}>
              <span style={styles.ratingLabel}>5 star</span>
              <div style={styles.progressBarContainer}>
                <div style={{...styles.progressBar, width: "70%"}}></div>
              </div>
              <span style={styles.ratingPercent}>70%</span>
            </div>
            <div style={styles.ratingBar}>
              <span style={styles.ratingLabel}>4 star</span>
              <div style={styles.progressBarContainer}>
                <div style={{...styles.progressBar, width: "20%"}}></div>
              </div>
              <span style={styles.ratingPercent}>20%</span>
            </div>
            <div style={styles.ratingBar}>
              <span style={styles.ratingLabel}>3 star</span>
              <div style={styles.progressBarContainer}>
                <div style={{...styles.progressBar, width: "5%"}}></div>
              </div>
              <span style={styles.ratingPercent}>5%</span>
            </div>
            <div style={styles.ratingBar}>
              <span style={styles.ratingLabel}>2 star</span>
              <div style={styles.progressBarContainer}>
                <div style={{...styles.progressBar, width: "3%"}}></div>
              </div>
              <span style={styles.ratingPercent}>3%</span>
            </div>
            <div style={styles.ratingBar}>
              <span style={styles.ratingLabel}>1 star</span>
              <div style={styles.progressBarContainer}>
                <div style={{...styles.progressBar, width: "2%"}}></div>
              </div>
              <span style={styles.ratingPercent}>2%</span>
            </div>
          </div>
        </div>
        
        <div style={styles.reviewsList}>
          {mockReviews.map(review => (
            <div key={review.id} style={styles.reviewItem}>
              <div style={styles.reviewerInfo}>
                <span style={styles.reviewerName}>{review.user}</span>
              </div>
              <div style={styles.reviewRating}>
                {Array(5)
                  .fill()
                  .map((_, i) => (
                    <span key={i} style={i < review.rating ? styles.star : styles.emptyStar}>★</span>
                  ))}
                <span style={styles.reviewTitle}>{review.title}</span>
              </div>
              <div style={styles.reviewDate}>Reviewed on {review.date}</div>
              <p style={styles.reviewContent}>{review.content}</p>
              <div style={styles.reviewHelpful}>
                <span>Was this review helpful?</span>
                <button style={styles.helpfulButton}>Yes</button>
                <button style={styles.helpfulButton}>No</button>
                <span style={styles.reportLink}>Report</span>
              </div>
            </div>
          ))}
          
          <button 
            style={styles.seeAllReviewsButton}
            onClick={() => setReviewsExpanded(!reviewsExpanded)}
          >
            {reviewsExpanded ? "Show less reviews" : "See all reviews"}
          </button>
        </div>
      </div>

      {/* Related Products */}
      <div style={styles.relatedProductsSection}>
        <h2 style={styles.sectionTitle}>Products related to this item</h2>
        <div style={styles.relatedProductsGrid}>
          {relatedProducts.map(item => (
            <div key={item.id} style={styles.relatedProductCard}>
              <img src={item.image || "/placeholder.svg"} alt={item.title} style={styles.relatedProductImage} />
              <div style={styles.relatedProductTitle}>{item.title}</div>
              <div style={styles.relatedProductRating}>
                {Array(item.rating)
                  .fill()
                  .map((_, i) => (
                    <span key={i} style={styles.smallStar}>★</span>
                  ))}
                <span style={styles.smallRatingCount}>({Math.floor(Math.random() * 500) + 10})</span>
              </div>
              <div style={styles.relatedProductPrice}>${item.price}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageWrapper: {
    padding: "20px",
    background: "#fff",
    fontFamily: "'Segoe UI', 'Arial', sans-serif",
    color: "#0F1111",
    maxWidth: "1500px",
    margin: "0 auto"
  },
  breadcrumb: {
    fontSize: "14px",
    marginBottom: "10px",
    padding: "8px 0"
  },
  breadcrumbLink: {
    color: "#007185",
    textDecoration: "none",
    marginRight: "5px"
  },
  breadcrumbSeparator: {
    margin: "0 5px",
    color: "#555"
  },
  breadcrumbCurrent: {
    color: "#555"
  },
  container: {
    display: "grid",
    gridTemplateColumns: "minmax(300px, 40%) minmax(300px, 35%) minmax(200px, 25%)",
    gap: "20px",
    marginBottom: "30px"
  },
  imageGallery: {
    display: "flex",
    gap: "15px"
  },
  thumbnailColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  thumbnail: {
    width: "40px",
    height: "40px",
    border: "1px solid #ddd",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2px"
  },
  activeThumbnail: {
    borderColor: "#e77600",
    boxShadow: "0 0 3px 2px rgba(228, 121, 17, 0.5)"
  },
  thumbnailImage: {
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain"
  },
  mainImageContainer: {
    position: "relative",
    flex: "1",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "500px"
  },
  mainImage: {
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain"
  },
  imageZoomHint: {
    position: "absolute",
    bottom: "10px",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: "5px 10px",
    borderRadius: "3px",
    fontSize: "12px",
    display: "flex",
    alignItems: "center",
    gap: "5px"
  },
  zoomIcon: {
    fontSize: "14px"
  },
  detailsSection: {
    padding: "10px 20px 10px 0"
  },
  title: {
    fontSize: "24px",
    fontWeight: "500",
    marginBottom: "5px",
    lineHeight: "32px",
    color: "#0F1111"
  },
  brandLink: {
    color: "#007185",
    textDecoration: "none",
    fontSize: "14px",
    display: "inline-block",
    marginBottom: "10px"
  },
  rating: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
    flexWrap: "wrap"
  },
  star: {
    color: "#FFA41C",
    fontSize: "18px",
    marginRight: "2px"
  },
  emptyStar: {
    color: "#E7E7E7",
    fontSize: "18px",
    marginRight: "2px"
  },
  ratingText: {
    marginLeft: "8px",
    fontSize: "14px",
    color: "#007185"
  },
  ratingCount: {
    marginLeft: "10px",
    fontSize: "14px",
    color: "#007185"
  },
  reviewsLink: {
    color: "#007185",
    textDecoration: "none"
  },
  priceSection: {
    marginBottom: "15px",
    borderBottom: "1px solid #ddd",
    paddingBottom: "15px"
  },
  priceLabel: {
    fontSize: "14px",
    color: "#565959"
  },
  price: {
    fontSize: "28px",
    fontWeight: "500",
    color: "#B12704"
  },
  savings: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginTop: "5px"
  },
  originalPrice: {
    textDecoration: "line-through",
    color: "#565959",
    fontSize: "14px"
  },
  savingsAmount: {
    color: "#B12704",
    fontSize: "14px"
  },
  tags: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "15px"
  },
  tag: {
    background: "#f0f2f2",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "13px",
    color: "#0F1111"
  },
  aboutSection: {
    marginBottom: "20px"
  },
  aboutTitle: {
    fontSize: "16px",
    fontWeight: "700",
    marginBottom: "10px"
  },
  bulletPoints: {
    paddingLeft: "20px",
    margin: "0",
    fontSize: "14px",
    lineHeight: "20px",
    color: "#333"
  },
  buyBox: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "20px",
    backgroundColor: "#fff"
  },
  delivery: {
    marginTop: "10px",
    fontSize: "14px"
  },
  freeDelivery: {
    fontWeight: "700"
  },
  deliveryDate: {
    fontWeight: "700"
  },
  stock: {
    color: "#007600",
    fontSize: "18px",
    fontWeight: "500",
    margin: "10px 0"
  },
  inStock: {
    display: "flex",
    alignItems: "center",
    gap: "5px"
  },
  quantitySelector: {
    marginBottom: "15px"
  },
  quantityLabel: {
    fontSize: "14px",
    marginRight: "10px"
  },
  quantityDropdown: {
    padding: "5px",
    borderRadius: "7px",
    border: "1px solid #ddd",
    backgroundColor: "#F0F2F2",
    cursor: "pointer"
  },
  variantSelector: {
    marginBottom: "15px"
  },
  variantLabel: {
    fontSize: "14px",
    marginRight: "10px"
  },
  variantDropdown: {
    padding: "5px",
    borderRadius: "7px",
    border: "1px solid #ddd",
    backgroundColor: "#F0F2F2",
    cursor: "pointer"
  },
  addToCartButton: {
    width: "100%",
    padding: "10px",
    fontSize: "14px",
    backgroundColor: "#FFD814",
    border: "1px solid #FCD200",
    borderRadius: "20px",
    cursor: "pointer",
    fontWeight: "500",
    marginBottom: "10px",
    transition: "background-color 0.3s",
    boxShadow: "0 2px 5px 0 rgba(213,217,217,.5)"
  },
  buyNowButton: {
    width: "100%",
    padding: "10px",
    fontSize: "14px",
    backgroundColor: "#FFA41C",
    border: "1px solid #FF8F00",
    borderRadius: "20px",
    cursor: "pointer",
    fontWeight: "500",
    marginBottom: "15px",
    transition: "background-color 0.3s",
    boxShadow: "0 2px 5px 0 rgba(213,217,217,.5)"
  },
  secureTransaction: {
    fontSize: "12px",
    color: "#565959",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    marginBottom: "15px"
  },
  lockIcon: {
    fontSize: "12px"
  },
  shippingInfo: {
    borderTop: "1px solid #ddd",
    paddingTop: "15px",
    fontSize: "14px"
  },
  shippingDetail: {
    display: "flex",
    marginBottom: "5px"
  },
  shippingLabel: {
    color: "#565959",
    width: "80px"
  },
  shippingValue: {
    flex: "1"
  },
  descSection: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "30px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)"
  },
  sectionTitle: {
    fontSize: "24px",
    fontWeight: "500",
    marginBottom: "15px",
    paddingBottom: "10px",
    borderBottom: "1px solid #ddd"
  },
  descText: {
    fontSize: "16px",
    lineHeight: "24px",
    color: "#333"
  },
  reviewsSection: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "30px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)"
  },
  reviewsSummary: {
    display: "flex",
    gap: "40px",
    marginBottom: "30px",
    flexWrap: "wrap"
  },
  overallRating: {
    minWidth: "200px"
  },
  bigRating: {
    fontSize: "48px",
    fontWeight: "500",
    marginBottom: "5px"
  },
  totalRatings: {
    fontSize: "14px",
    color: "#565959",
    marginTop: "5px"
  },
  ratingBreakdown: {
    flex: "1",
    minWidth: "300px"
  },
  ratingBar: {
    display: "flex",
    alignItems: "center",
    marginBottom: "8px"
  },
  ratingLabel: {
    width: "60px",
    fontSize: "14px",
    color: "#007185",
    textDecoration: "none"
  },
  progressBarContainer: {
    flex: "1",
    height: "20px",
    backgroundColor: "#f0f2f2",
    borderRadius: "4px",
    margin: "0 10px"
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#FFA41C",
    borderRadius: "4px"
  },
  ratingPercent: {
    width: "40px",
    fontSize: "14px",
    color: "#565959"
  },
  reviewsList: {
    borderTop: "1px solid #ddd",
    paddingTop: "20px"
  },
  reviewItem: {
    marginBottom: "25px",
    paddingBottom: "25px",
    borderBottom: "1px solid #ddd"
  },
  reviewerInfo: {
    display: "flex",
    alignItems: "center",
    marginBottom: "5px"
  },
  reviewerName: {
    fontWeight: "500"
  },
  reviewRating: {
    display: "flex",
    alignItems: "center",
    marginBottom: "5px"
  },
  reviewTitle: {
    marginLeft: "10px",
    fontWeight: "700"
  },
  reviewDate: {
    fontSize: "12px",
    color: "#565959",
    marginBottom: "10px"
  },
  reviewContent: {
    fontSize: "14px",
    lineHeight: "20px",
    marginBottom: "10px"
  },
  reviewHelpful: {
    fontSize: "12px",
    color: "#565959",
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
  helpfulButton: {
    padding: "3px 10px",
    backgroundColor: "#f0f2f2",
    border: "1px solid #d5d9d9",
    borderRadius: "3px",
    cursor: "pointer",
    fontSize: "12px"
  },
  reportLink: {
    color: "#565959",
    textDecoration: "none",
    borderLeft: "1px solid #ddd",
    paddingLeft: "10px",
    cursor: "pointer"
  },
  seeAllReviewsButton: {
    backgroundColor: "#fff",
    border: "1px solid #d5d9d9",
    borderRadius: "8px",
    padding: "8px 16px",
    fontSize: "14px",
    cursor: "pointer",
    display: "block",
    margin: "0 auto"
  },
  relatedProductsSection: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "30px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)"
  },
  relatedProductsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
    gap: "20px"
  },
  relatedProductCard: {
    padding: "15px",
    border: "1px solid #eee",
    borderRadius: "8px",
    transition: "transform 0.2s",
    cursor: "pointer"
  },
  relatedProductImage: {
    width: "100%",
    height: "150px",
    objectFit: "contain",
    marginBottom: "10px"
  },
  relatedProductTitle: {
    fontSize: "14px",
    marginBottom: "5px",
    color: "#0F1111",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    height: "40px"
  },
  relatedProductRating: {
    display: "flex",
    alignItems: "center",
    marginBottom: "5px"
  },
  smallStar: {
    color: "#FFA41C",
    fontSize: "14px"
  },
  smallRatingCount: {
    fontSize: "12px",
    color: "#565959",
    marginLeft: "5px"
  },
  relatedProductPrice: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#B12704"
  },
  loading: {
    padding: "60px",
    textAlign: "center",
    fontSize: "18px",
    color: "#555",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
    margin: "40px auto",
    maxWidth: "600px"
  }
};

export default ProductDetails;