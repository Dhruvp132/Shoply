import React, { useState, useEffect } from "react";

function CollapsibleSidebar({ 
  categories, 
  selectedCategory, 
  selectedSubcategory, 
  selectedGender,
  onCategoryChange, 
  onSubcategoryChange, 
  onGenderChange,
  isOpen,
  onToggle
}) {
  const genderOptions = ["Men", "Women", "Kids"];

  return (
    <div style={{
      width: isOpen ? '280px' : '0',
      transition: 'width 0.3s ease-in-out',
      overflow: 'hidden',
      backgroundColor: 'white',
      borderRight: '1px solid #ddd',
      position: 'sticky',
      top: '100px',
      height: 'calc(100vh - 60px)',
      zIndex: 100,
      boxShadow: isOpen ? '2px 0 5px rgba(0,0,0,0.1)' : 'none'
    }}>
      <div style={{
        width: '260px', // Fixed content width
        padding: '20px',
        overflowY: 'auto',
        height: '100%'
      }}>
        {/* Sidebar Header with Close Button */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '15px'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#232f3e',
            margin: 0
          }}>Filters</h3>
          <button 
            onClick={onToggle}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '20px',
              color: '#555'
            }}
          >
            ×
          </button>
        </div>
        
        {/* Categories */}
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{
            fontSize: '16px',
            fontWeight: 'bold',
            marginBottom: '10px',
            color: '#232f3e',
            paddingBottom: '5px',
            borderBottom: '1px solid #eee'
          }}>Categories</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {categories.map((cat) => (
              <li key={cat.name} style={{ marginBottom: '10px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <button
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontWeight: selectedCategory === cat.name ? 'bold' : 'normal',
                      color: selectedCategory === cat.name ? '#e47911' : '#111',
                      textAlign: 'left',
                      padding: '5px 0',
                      fontSize: '14px'
                    }}
                    onClick={() => onCategoryChange(cat.name)}
                  >
                    {cat.name}
                  </button>
                  <span style={{
                    fontSize: '12px',
                    color: '#555',
                    cursor: 'pointer'
                  }}>
                    {selectedCategory === cat.name ? '▼' : '▶'}
                  </span>
                </div>
                
                {selectedCategory === cat.name && (
                  <ul style={{ 
                    listStyle: 'none', 
                    padding: '0 0 0 15px',
                    marginTop: '5px',
                    maxHeight: '150px',
                    overflowY: 'auto',
                    transition: 'max-height 0.3s ease-in-out'
                  }}>
                    {cat.subcategories.map((sub) => (
                      <li key={sub} style={{ marginBottom: '5px' }}>
                        <button
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontWeight: selectedSubcategory === sub ? 'bold' : 'normal',
                            color: selectedSubcategory === sub ? '#e47911' : '#111',
                            textAlign: 'left',
                            padding: '5px 0',
                            fontSize: '13px'
                          }}
                          onClick={() => onSubcategoryChange(sub)}
                        >
                          {sub}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
        
        {/* Gender */}
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{
            fontSize: '16px',
            fontWeight: 'bold',
            marginBottom: '10px',
            color: '#232f3e',
            paddingBottom: '5px',
            borderBottom: '1px solid #eee'
          }}>Gender</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {genderOptions.map((gender) => (
              <li key={gender} style={{ marginBottom: '8px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <input
                    type="checkbox"
                    id={`gender-${gender}`}
                    checked={selectedGender === gender}
                    onChange={() => onGenderChange(selectedGender === gender ? "" : gender)}
                    style={{ marginRight: '8px' }}
                  />
                  <label
                    htmlFor={`gender-${gender}`}
                    style={{
                      cursor: 'pointer',
                      fontWeight: selectedGender === gender ? 'bold' : 'normal',
                      color: selectedGender === gender ? '#e47911' : '#111',
                      fontSize: '14px'
                    }}
                  >
                    {gender}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Price Range */}
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{
            fontSize: '16px',
            fontWeight: 'bold',
            marginBottom: '10px',
            color: '#232f3e',
            paddingBottom: '5px',
            borderBottom: '1px solid #eee'
          }}>Price</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {['Under $25', '$25 to $50', '$50 to $100', '$100 to $200', 'Over $200'].map((range) => (
              <li key={range} style={{ marginBottom: '8px' }}>
                <button
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    padding: '5px 0',
                    fontSize: '14px',
                    color: '#111'
                  }}
                >
                  {range}
                </button>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Customer Reviews */}
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{
            fontSize: '16px',
            fontWeight: 'bold',
            marginBottom: '10px',
            color: '#232f3e',
            paddingBottom: '5px',
            borderBottom: '1px solid #eee'
          }}>Customer Reviews</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {[4, 3, 2, 1].map((stars) => (
              <li key={stars} style={{ marginBottom: '8px' }}>
                <button
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    padding: '5px 0',
                    fontSize: '14px',
                    color: '#111',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <div style={{ display: 'flex', marginRight: '5px' }}>
                    {Array(stars).fill().map((_, i) => (
                      <span key={i} style={{ color: '#FFA41C' }}>★</span>
                    ))}
                    {Array(5-stars).fill().map((_, i) => (
                      <span key={i} style={{ color: '#DDD' }}>★</span>
                    ))}
                  </div>
                  <span>& Up</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Clear Filters */}
        <button
          onClick={() => {
            onCategoryChange("");
            onSubcategoryChange("");
            onGenderChange("");
          }}
          style={{
            backgroundColor: '#f0f2f2',
            border: '1px solid #d5d9d9',
            borderRadius: '8px',
            padding: '8px 12px',
            cursor: 'pointer',
            fontSize: '14px',
            width: '100%',
            marginTop: '10px',
            transition: 'background-color 0.2s',
            fontWeight: 'bold'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e7e9ec'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f0f2f2'}
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );
}

export default CollapsibleSidebar;