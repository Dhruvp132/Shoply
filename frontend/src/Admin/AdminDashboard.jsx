import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";
import ProductManagement from "../components/ProductManagement";
import UserManagement from "../components/UserManagement";
import ProductDialog from "../components/ProductDialog";
import { useHistory } from "react-router-dom";

function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard"); // dashboard, products, users, etc.
  const history = useHistory();

  // Set appropriate search placeholder
  const searchPlaceholder = activeTab === "products" 
    ? "Search products by name, category..." 
    : activeTab === "users" 
      ? "Search users by email, name..." 
      : "Search...";

  // Fetch products and users on mount
  useEffect(() => {
    fetchUsers();
    fetchProducts();
    
    // Handle window resize for responsive sidebar
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setSidebarOpen(true);
      } else if (window.innerWidth <= 768) {
        setSidebarOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get("http://localhost:5001/admin/products");
      setProducts(data.products || []);
      console.log("Products fetched:", data.products);
    } catch (err) {
      console.error("Error fetching products:", err);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get("http://localhost:5001/admin/users");
      setUsers(data || []);
      console.log("Users fetched:", data);
    } catch (err) {
      console.error("Error fetching users:", err);
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle sidebar navigation
  const handleNavigation = (tab) => {
    setActiveTab(tab);
    if (window.innerWidth <= 768) {
      setSidebarOpen(false); // Close sidebar on mobile after navigation
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
      alert("Error deleting product");
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      // Assuming you have a delete user endpoint
      await axios.delete(`http://localhost:5001/admin/users/${userId}`);
      alert("User deleted successfully");
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Error deleting user");
    }
  };

  const handleSaveProduct = async (productData) => {
    try {
      const payload = {
        ...productData,
        price: Number(productData.price),
        subCategory: productData.subCategory || productData.subcategory || "",
      };
      
      if (editProduct) {
        await axios.put(
          `http://localhost:5001/admin/updateProduct/${editProduct._id}`, 
          payload, 
          {
            headers: {
              Authorization: `${localStorage.getItem("adminToken")}`,
            },
          }
        );
        alert("Product updated successfully");
      } else {
        await axios.post(
          "http://localhost:5001/admin/addproduct",
          payload, 
          {
            headers: {
              Authorization: `${localStorage.getItem("adminToken")}`,
            },
          }
        );
        alert("Product added successfully");
      }
      
      fetchProducts();
      setIsDialogOpen(false);
    } catch (err) {
      console.error("Error saving product:", err);
      alert("Error saving product");
    }
  };

  // Filter products based on search term
  const filteredProducts = products.filter(product => 
    product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.subcategory?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.uid?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Render the appropriate content based on activeTab
  const renderContent = () => {
    switch (activeTab) {
      case "products":
        return (
          <ProductManagement 
            products={filteredProducts}
            isLoading={isLoading}
            onAddProduct={handleAddProduct}
            onEditProduct={handleEditProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        );
      case "users":
        return (
          <UserManagement 
            users={filteredUsers}
            isLoading={isLoading}
            onDeleteUser={handleDeleteUser}
          />
        );
      case "dashboard":
      default:
        return (
          <div style={{ padding: '20px' }}>
            <h1>Dashboard Overview</h1>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '20px',
              marginTop: '20px'
            }}>
              <DashboardCard 
                title="Products" 
                count={products.length} 
                icon="📦" 
                color="#4CAF50" 
                onClick={() => handleNavigation("products")}
              />
              <DashboardCard 
                title="Users" 
                count={users.length} 
                icon="👥" 
                color="#2196F3" 
                onClick={() => handleNavigation("users")}
              />
              <DashboardCard 
                title="Orders" 
                count="0" 
                icon="🛒" 
                color="#FF9800" 
              />
              <DashboardCard 
                title="Revenue" 
                count="$0" 
                icon="💰" 
                color="#9C27B0" 
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar with direct navigation */}
      <div style={{
        width: sidebarOpen ? '240px' : '60px',
        transition: 'width 0.3s ease-in-out',
        backgroundColor: '#232f3e',
        color: 'white',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000,
        boxShadow: '2px 0 5px rgba(0,0,0,0.2)',
        overflow: 'hidden'
      }}>
        {/* Sidebar Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: sidebarOpen ? 'space-between' : 'center',
          padding: sidebarOpen ? '15px' : '15px 0',
          borderBottom: '1px solid #3a4553'
        }}>
          {sidebarOpen && (
            <h2 style={{
              margin: 0,
              fontSize: '18px',
              fontWeight: 'bold'
            }}>Admin Panel</h2>
          )}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '20px',
              cursor: 'pointer',
              padding: '5px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>

        {/* Navigation Links */}
        <nav style={{
          padding: sidebarOpen ? '15px' : '15px 0',
        }}>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0
          }}>
            {[
              { id: "dashboard", label: "Dashboard", icon: "📊" },
              { id: "products", label: "Products", icon: "📦" },
              { id: "users", label: "Users", icon: "👥" },
              { id: "orders", label: "Orders", icon: "🛒" },
              { id: "settings", label: "Settings", icon: "⚙️" },
            ].map((item) => (
              <li key={item.id} style={{ marginBottom: '5px' }}>
                <button 
                  onClick={() => handleNavigation(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: sidebarOpen ? '10px 15px' : '10px 0',
                    width: '100%',
                    border: 'none',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    color: 'white',
                    backgroundColor: activeTab === item.id ? '#37475A' : 'transparent',
                    transition: 'background-color 0.2s',
                    justifyContent: sidebarOpen ? 'flex-start' : 'center',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ fontSize: '18px', marginRight: sidebarOpen ? '10px' : '0' }}>
                    {item.icon}
                  </span>
                  {sidebarOpen && (
                    <span>{item.label}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        {sidebarOpen && (
          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '15px',
            right: '15px'
          }}>
            <button style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#e47911',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'background-color 0.2s'
            }}
            onClick={() => {
              localStorage.removeItem("adminToken");
              history.push("/admin");
            }}>
              Logout
            </button>
          </div>
        )}
      </div>
      
      {/* Main Content */}
      <div style={{
        flex: 1,
        marginLeft: sidebarOpen ? '240px' : '60px',
        transition: 'margin-left 0.3s ease-in-out',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        padding: '80px 20px 20px'
      }}>
        {/* Header with Search */}
        <AdminHeader 
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder={searchPlaceholder}
        />
        
        {/* Debug info - remove after fixing */}
        <div style={{ 
          padding: '10px', 
          margin: '10px 0', 
          backgroundColor: '#fff8e1', 
          border: '1px solid #ffe082',
          borderRadius: '4px'
        }}>
          <p><strong>Debug Info:</strong></p>
          <p>Active Tab: {activeTab}</p>
          <p>Products count: {products.length}</p>
          <p>Users count: {users.length}</p>
        </div>
        
        {/* Render content based on active tab */}
        {renderContent()}
      </div>

      {/* Product Dialog */}
      {isDialogOpen && (
        <ProductDialog
          onClose={() => setIsDialogOpen(false)}
          onSave={handleSaveProduct}
          product={editProduct}
        />
      )}
    </div>
  );
}

// Dashboard Card Component
function DashboardCard({ title, count, icon, color, onClick }) {
  return (
    <div 
      style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        display: 'flex',
        alignItems: 'center',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'transform 0.2s, box-shadow 0.2s',
      }}
      onClick={onClick}
      onMouseOver={onClick ? (e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
      } : undefined}
      onMouseOut={onClick ? (e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
      } : undefined}
    >
      <div style={{
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        backgroundColor: `${color}20`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px',
        marginRight: '15px'
      }}>
        {icon}
      </div>
      <div>
        <h3 style={{ margin: '0 0 5px', color: '#333' }}>{title}</h3>
        <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color }}>{count}</p>
      </div>
    </div>
  );
}

export default AdminDashboard;