import React from "react";

function AdminHeader({ sidebarOpen, onToggleSidebar, searchTerm, onSearchChange, searchPlaceholder }) {
  return (
    <header style={{
      backgroundColor: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      padding: '10px 20px',
      display: 'flex',
      alignItems: 'center',
      position: 'fixed',
      top: 0,
      right: 0,
      left: sidebarOpen ? '240px' : '60px',
      zIndex: 900,
      transition: 'left 0.3s ease-in-out',
      height: '60px'
    }}>
      {/* Mobile Sidebar Toggle */}
      <button 
        onClick={onToggleSidebar}
        style={{
          background: 'none',
          border: 'none',
          fontSize: '24px',
          cursor: 'pointer',
          marginRight: '15px',
          display: window.innerWidth <= 768 ? 'block' : 'none'
        }}
      >
        ☰
      </button>

      {/* Search Bar */}
      <div style={{
        flex: 1,
        maxWidth: '600px',
        position: 'relative'
      }}>
        <input 
          type="text"
          placeholder={searchPlaceholder || "Search..."}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          style={{
            width: '100%',
            padding: '10px 15px',
            paddingLeft: '40px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            fontSize: '14px'
          }}
        />
        <span style={{
          position: 'absolute',
          left: '15px',
          top: '50%',
          transform: 'translateY(-50%)',
          color: '#666',
          fontSize: '16px'
        }}>
          🔍
        </span>
      </div>

      {/* Admin Profile */}
      <div style={{
        marginLeft: 'auto',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: '#f0f0f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: '10px',
          fontSize: '18px'
        }}>
          👤
        </div>
        <div style={{
          display: window.innerWidth > 768 ? 'block' : 'none'
        }}>
          <div style={{ fontWeight: 'bold', fontSize: '14px' }}>Admin User</div>
          <div style={{ fontSize: '12px', color: '#666' }}>Administrator</div>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;