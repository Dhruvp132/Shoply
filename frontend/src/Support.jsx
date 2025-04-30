import React, { useState } from "react";
import { Link } from "react-router-dom";

function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIssue, setSelectedIssue] = useState(null);

  // Common support topics
  const supportTopics = [
    { id: 1, title: "Where's my stuff?", icon: "📦", description: "Track your package, view orders, shipping & delivery" },
    { id: 2, title: "Returns & refunds", icon: "↩️", description: "Return or exchange items, print return labels" },
    { id: 3, title: "Manage Prime", icon: "⭐", description: "Learn about Prime benefits, cancel membership" },
    { id: 4, title: "Payments & gift cards", icon: "💳", description: "Add or edit payment methods, check gift card balance" },
    { id: 5, title: "Account settings", icon: "👤", description: "Change email or password, update personal info" },
     ];

  // Recent orders (mock data)
  const recentOrders = [
    { id: "112-5559876-4442223", date: "August 15, 2023", items: 2, status: "Delivered Aug 17" },
    { id: "112-9987654-3332211", date: "July 29, 2023", items: 1, status: "Delivered Aug 2" },
    { id: "112-3344556-7788990", date: "July 10, 2023", items: 3, status: "Delivered July 12" }
  ];

  // FAQ items
  const faqItems = [
    { 
      question: "How do I track my package?", 
      answer: "You can track your package by going to Your Orders, finding your order, and clicking on 'Track Package'. You'll see the estimated delivery date and tracking information." 
    },
    { 
      question: "How do I return an item?", 
      answer: "To return an item, go to Your Orders, select the order with the item you want to return, click on 'Return or Replace Items', and follow the instructions. You'll receive a return label that you can print." 
    },
    { 
      question: "I received a damaged item. What should I do?", 
      answer: "If you received a damaged item, you can request a replacement or refund by going to Your Orders, selecting the order, and clicking on 'Return or Replace Items'. Choose the reason 'Item arrived damaged' and follow the instructions." 
    },
    { 
      question: "How do I change my payment method?", 
      answer: "To change your payment method, go to Account & Lists > Your Account > Payment options. From there, you can add, edit, or remove payment methods." 
    },
    { 
      question: "How do I cancel my order?", 
      answer: "To cancel an order, go to Your Orders, find the order you want to cancel, and click on 'Cancel items'. If the order has already shipped, you may need to wait until it arrives and then return it." 
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching for: ${searchQuery}`);
    // Implement search functionality here
  };

  const handleTopicClick = (topicId) => {
    setSelectedIssue(topicId);
    // In a real app, this would navigate to a specific help page
    alert(`Navigating to help for: ${supportTopics.find(topic => topic.id === topicId).title}`);
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>Customer Service</h1>
      </div>

      <div style={styles.container}>
        {/* Left Column - Help Topics */}
        <div style={styles.leftColumn}>
          <div style={styles.searchBox}>
            <h2 style={styles.sectionTitle}>What do you need help with?</h2>
            <form onSubmit={handleSearch} style={styles.searchForm}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search our help library"
                style={styles.searchInput}
              />
              <button type="submit" style={styles.searchButton}>Search</button>
            </form>
          </div>

          <div style={styles.helpTopics}>
            <h2 style={styles.sectionTitle}>Browse Help Topics</h2>
            <div style={styles.topicsGrid}>
              {supportTopics.map(topic => (
                <div 
                  key={topic.id} 
                  style={styles.topicCard}
                  onClick={() => handleTopicClick(topic.id)}
                >
                  <div style={styles.topicIcon}>{topic.icon}</div>
                  <div style={styles.topicContent}>
                    <h3 style={styles.topicTitle}>{topic.title}</h3>
                    <p style={styles.topicDescription}>{topic.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.faqSection}>
            <h2 style={styles.sectionTitle}>Frequently Asked Questions</h2>
            <div style={styles.faqList}>
              {faqItems.map((faq, index) => (
                <div key={index} style={styles.faqItem}>
                  <h3 style={styles.faqQuestion}>{faq.question}</h3>
                  <p style={styles.faqAnswer}>{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Orders and Contact */}
        <div style={styles.rightColumn}>
          <div style={styles.recentOrders}>
            <h2 style={styles.sectionTitle}>Your Recent Orders</h2>
            {recentOrders.map(order => (
              <div key={order.id} style={styles.orderCard}>
                <div style={styles.orderHeader}>
                  <div>
                    <div style={styles.orderDate}>ORDER PLACED: {order.date}</div>
                    <div style={styles.orderId}>Order# {order.id}</div>
                  </div>
                  <div style={styles.orderStatus}>{order.status}</div>
                </div>
                <div style={styles.orderActions}>
                  <Link to={`/orders/${order.id}`} style={styles.orderLink}>View order details</Link>
                  <span style={styles.separator}>|</span>
                  <Link to={`/orders/${order.id}/track`} style={styles.orderLink}>Track package</Link>
                </div>
              </div>
            ))}
            <Link to="/orders" style={styles.viewAllLink}>View all orders</Link>
          </div>

          <div style={styles.contactSection}>
            <h2 style={styles.sectionTitle}>Need More Help?</h2>
            <div style={styles.contactCard}>
              <h3 style={styles.contactTitle}>Contact Customer Service</h3>
              <div style={styles.contactOptions}>
                <div style={styles.contactOption}>
                  <div style={styles.contactIcon}>📞</div>
                  <div>
                    <h4 style={styles.contactOptionTitle}>Phone Support</h4>
                    <p style={styles.contactDescription}>Talk to a representative</p>
                    <button style={styles.contactButton}>Call Us</button>
                  </div>
                </div>
                <div style={styles.contactOption}>
                  <div style={styles.contactIcon}>💬</div>
                  <div>
                    <h4 style={styles.contactOptionTitle}>Chat Support</h4>
                    <p style={styles.contactDescription}>Chat with a representative</p>
                    <button style={styles.contactButton}>Start Chat</button>
                  </div>
                </div>
                <div style={styles.contactOption}>
                  <div style={styles.contactIcon}>✉️</div>
                  <div>
                    <h4 style={styles.contactOptionTitle}>Email Support</h4>
                    <p style={styles.contactDescription}>Get email assistance</p>
                    <button style={styles.contactButton}>Email Us</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

const styles = {
  pageWrapper: {
    backgroundColor: "#fff",
    fontFamily: "'Segoe UI', 'Arial', sans-serif",
    color: "#0F1111",
    minHeight: "100vh"
  },
  header: {
    backgroundColor: "#232F3E",
    padding: "15px 20px",
    color: "#fff"
  },
  headerTitle: {
    fontSize: "24px",
    fontWeight: "500",
    margin: "0",
    maxWidth: "1200px",
    margin: "0 auto"
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    gap: "30px",
    maxWidth: "1200px",
    margin: "20px auto",
    padding: "0 20px"
  },
  leftColumn: {
    flex: "1 1 600px"
  },
  rightColumn: {
    flex: "1 1 300px"
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: "700",
    marginBottom: "15px",
    color: "#0F1111"
  },
  searchBox: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "20px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
  },
  searchForm: {
    display: "flex",
    gap: "10px"
  },
  searchInput: {
    flex: "1",
    padding: "10px 15px",
    fontSize: "16px",
    border: "1px solid #D5D9D9",
    borderRadius: "8px",
    outline: "none"
  },
  searchButton: {
    backgroundColor: "#FFD814",
    border: "1px solid #FCD200",
    borderRadius: "8px",
    padding: "0 15px",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: "500"
  },
  helpTopics: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "20px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
  },
  topicsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "15px"
  },
  topicCard: {
    display: "flex",
    alignItems: "center",
    padding: "15px",
    border: "1px solid #D5D9D9",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    backgroundColor: "#F7F8F8"
  },
  topicIcon: {
    fontSize: "24px",
    marginRight: "15px",
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: "50%",
    border: "1px solid #eee"
  },
  topicContent: {
    flex: "1"
  },
  topicTitle: {
    fontSize: "16px",
    fontWeight: "700",
    margin: "0 0 5px 0",
    color: "#0F1111"
  },
  topicDescription: {
    fontSize: "14px",
    margin: "0",
    color: "#565959"
  },
  faqSection: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "20px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
  },
  faqList: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  faqItem: {
    borderBottom: "1px solid #eee",
    paddingBottom: "15px"
  },
  faqQuestion: {
    fontSize: "16px",
    fontWeight: "700",
    margin: "0 0 10px 0",
    color: "#0F1111"
  },
  faqAnswer: {
    fontSize: "14px",
    margin: "0",
    color: "#333",
    lineHeight: "1.5"
  },
  recentOrders: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "20px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
  },
  orderCard: {
    border: "1px solid #D5D9D9",
    borderRadius: "8px",
    padding: "15px",
    marginBottom: "15px"
  },
  orderHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px"
  },
  orderDate: {
    fontSize: "12px",
    color: "#565959"
  },
  orderId: {
    fontSize: "14px",
    fontWeight: "500"
  },
  orderStatus: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#007600"
  },
  orderActions: {
    fontSize: "14px"
  },
  orderLink: {
    color: "#007185",
    textDecoration: "none"
  },
  separator: {
    margin: "0 10px",
    color: "#D5D9D9"
  },
  viewAllLink: {
    display: "block",
    textAlign: "center",
    color: "#007185",
    textDecoration: "none",
    padding: "10px 0",
    fontSize: "14px"
  },
  contactSection: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "20px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
  },
  contactCard: {
    border: "1px solid #D5D9D9",
    borderRadius: "8px",
    padding: "15px"
  },
  contactTitle: {
    fontSize: "16px",
    fontWeight: "700",
    margin: "0 0 15px 0",
    color: "#0F1111"
  },
  contactOptions: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  contactOption: {
    display: "flex",
    alignItems: "center",
    gap: "15px"
  },
  contactIcon: {
    fontSize: "24px",
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F7F8F8",
    borderRadius: "50%",
    border: "1px solid #eee"
  },
  contactOptionTitle: {
    fontSize: "14px",
    fontWeight: "700",
    margin: "0 0 5px 0"
  },
  contactDescription: {
    fontSize: "12px",
    margin: "0 0 10px 0",
    color: "#565959"
  },
  contactButton: {
    backgroundColor: "#FFD814",
    border: "1px solid #FCD200",
    borderRadius: "20px",
    padding: "6px 12px",
    fontSize: "12px",
    cursor: "pointer",
    fontWeight: "500"
  },
  digitalServices: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
  },
  digitalServicesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "15px"
  },
  digitalServiceCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "15px",
    border: "1px solid #D5D9D9",
    borderRadius: "8px",
    cursor: "pointer",
    backgroundColor: "#F7F8F8"
  },
  digitalServiceIcon: {
    fontSize: "24px",
    marginBottom: "10px"
  },
  digitalServiceTitle: {
    fontSize: "14px",
    fontWeight: "500"
  }
};

export default SupportPage;