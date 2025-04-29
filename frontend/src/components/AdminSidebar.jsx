import React from "react";
import { Link, useLocation } from "react-router-dom";

function AdminSidebar({ isOpen, onToggle }) {
  const location = useLocation();
  
  // Navigation items
  const navItems = [
    { path: "/admin", label: "Dashboard", icon: "📊" },
    { path: "/admin/products", label: "Products", icon: "📦" },
    { path: "/admin/users", label: "Users", icon: "👥" },
    { path: "/admin/orders", label: "Orders", icon: "🛒" },
    { path: "/admin/settings", label: "Settings", icon: "⚙️" },
  ];

  return (
    <div style={{
      width: isOpen ? '240px' : '60px',
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
        justifyContent: isOpen ? 'space-between' : 'center',
        padding: isOpen ? '15px' : '15px 0',
        borderBottom: '1px solid #3a4553'
      }}>
        {isOpen && (
          <h2 style={{
            margin: 0,
            fontSize: '18px',
            fontWeight: 'bold'
          }}>Admin Panel</h2>
        )}
        <button 
          onClick={onToggle}
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
          {isOpen ? '◀' : '▶'}
        </button>
      </div>

      {/* Navigation Links */}
      <nav style={{
        padding: isOpen ? '15px' : '15px 0',
      }}>
        <ul style={{
          listStyle: 'none',
          padding: 0,
          margin: 0
        }}>
          {navItems.map((item) => (
            <li key={item.path} style={{ marginBottom: '5px' }}>
              <Link 
                to={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: isOpen ? '10px 15px' : '10px 0',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  color: 'white',
                  backgroundColor: location.pathname === item.path ? '#37475A' : 'transparent',
                  transition: 'background-color 0.2s',
                  justifyContent: isOpen ? 'flex-start' : 'center'
                }}
              >
                <span style={{ fontSize: '18px', marginRight: isOpen ? '10px' : '0' }}>
                  {item.icon}
                </span>
                {isOpen && (
                  <span>{item.label}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      {isOpen && (
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
          }}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default AdminSidebar;