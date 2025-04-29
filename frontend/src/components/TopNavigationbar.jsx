import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function TopNavigation({ 
  categories, 
  selectedCategory, 
  onCategoryChange,
  onToggleSidebar
}) {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const history = useHistory(); 

  return (
    <div style={{
      backgroundColor: '#232f3e',
      color: 'white',
      position: 'sticky',
      top: '60px',
      zIndex: 100,
      width: '100%',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0 15px',
        height: '39px'
      }}>
        {/* Hamburger Menu */}
        <button 
          onClick={onToggleSidebar}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '24px',
            cursor: 'pointer',
            padding: '0 15px 0 0',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          ☰
        </button>
        
        {/* All Categories */}
        <div 
          style={{
            position: 'relative',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            padding: '0 15px',
            cursor: 'pointer',
            backgroundColor: !selectedCategory ? '#37475A' : 'transparent',
            fontWeight: !selectedCategory ? 'bold' : 'normal'
          }}
          onClick={() => onCategoryChange("")}
          onMouseEnter={() => setHoveredCategory("all")}
          onMouseLeave={() => setHoveredCategory(null)}
        >
          <span>All</span>
        </div>
        
        {/* Category Navigation */}
        <div style={{
          display: 'flex',
          overflowX: 'auto',
          whiteSpace: 'nowrap',
          height: '100%',
          scrollbarWidth: 'none', // Firefox
          msOverflowStyle: 'none', // IE/Edge
        }}>
          {categories.map((category) => (
            <div 
              key={category.name}
              style={{
                position: 'relative',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                padding: '0 15px',
                cursor: 'pointer',
                backgroundColor: selectedCategory === category.name ? '#37475A' : 'transparent',
                fontWeight: selectedCategory === category.name ? 'bold' : 'normal',
                transition: 'background-color 0.2s'
              }}
              onClick={() => onCategoryChange(category.name)}
              onMouseEnter={() => setHoveredCategory(category.name)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <span>{category.name}</span>
              
              {/* Dropdown for subcategories */}
              {hoveredCategory === category.name && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  backgroundColor: 'white',
                  border: '1px solid #ddd',
                  borderRadius: '0 0 3px 3px',
                  width: '200px',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                  zIndex: 1000,
                  padding: '10px 0'
                }}>
                  {category.subcategories.map(sub => (
                    <div 
                      key={sub}
                      style={{
                        padding: '8px 15px',
                        color: '#111',
                        cursor: 'pointer',
                        fontSize: '14px',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      onClick={(e) => {
                        e.stopPropagation();
                        onCategoryChange(category.name);
                      }}
                    >
                      {sub}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Additional Navigation Items */}
        <div style={{
          marginLeft: 'auto',
          display: 'flex',
          height: '100%'
        }}>
          {["Today's Deals", "Customer Service", "Registry", "Gift Cards"].map(item => (
            <div 
              key={item}
              style={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                padding: '0 15px',
                cursor: 'pointer',
                fontSize: '14px',
                whiteSpace: 'nowrap'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#37475A'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              onClick={() => {
                if (item === "Customer Service") {
                  history.push("/support");
                }
              }}
            >
              {item}
            </div>
          ))}
          
          <div style={{
          marginLeft: 'auto',
          display: 'flex',
          height: '100%'
        }}>
          <div 
              style={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                padding: '0 15px',
                cursor: 'pointer',
                fontSize: '14px',
                whiteSpace: 'nowrap'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#37475A'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              onClick={() => history.push("/support")} // <-- Use history here
            >
              Support
            </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default TopNavigation;