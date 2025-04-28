import React, { useState } from "react";

function FilterBar({ 
  categories, 
  onCategoryChange, 
  onSubcategoryChange, 
  onGenderChange,
  onSortChange,
  selectedCategory,
  selectedSubcategory,
  selectedGender,
  selectedSort
}) {
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showSubcategoryDropdown, setShowSubcategoryDropdown] = useState(false);
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // Get subcategories for selected category
  const getSubcategories = () => {
    if (!selectedCategory) return [];
    const category = categories.find(cat => cat.name === selectedCategory);
    return category ? category.subcategories : [];
  };

  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "priceLow", label: "Price: Low to High" },
    { value: "priceHigh", label: "Price: High to Low" },
    { value: "newest", label: "Newest Arrivals" }
  ];

  const genderOptions = ["Men", "Women", "Kids"];

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      padding: '10px 15px',
      backgroundColor: '#232f3e',
      color: 'white',
      position: 'sticky',
      top: '60px',
      zIndex: 100,
      width: '100%',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      {/* Category Filter */}
      <div style={{ position: 'relative', marginRight: '15px', marginBottom: '5px' }}>
        <button 
          onClick={() => {
            setShowCategoryDropdown(!showCategoryDropdown);
            setShowSubcategoryDropdown(false);
            setShowGenderDropdown(false);
            setShowSortDropdown(false);
          }}
          style={{
            backgroundColor: selectedCategory ? '#f0c14b' : '#37475A',
            border: 'none',
            borderRadius: '3px',
            padding: '8px 12px',
            color: selectedCategory ? 'black' : 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            fontSize: '14px'
          }}
        >
          {selectedCategory || "All Categories"}
          <span style={{ marginLeft: '5px' }}>▼</span>
        </button>
        
        {showCategoryDropdown && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: '0',
            backgroundColor: 'white',
            border: '1px solid #ddd',
            borderRadius: '3px',
            width: '200px',
            maxHeight: '300px',
            overflowY: 'auto',
            zIndex: 1000,
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
          }}>
            <div 
              onClick={() => {
                onCategoryChange("");
                setShowCategoryDropdown(false);
              }}
              style={{
                padding: '8px 12px',
                cursor: 'pointer',
                color: 'black',
                borderBottom: '1px solid #eee',
                backgroundColor: selectedCategory === "" ? '#f5f5f5' : 'white'
              }}
            >
              All Categories
            </div>
            {categories.map(category => (
              <div 
                key={category.name}
                onClick={() => {
                  onCategoryChange(category.name);
                  setShowCategoryDropdown(false);
                }}
                style={{
                  padding: '8px 12px',
                  cursor: 'pointer',
                  color: 'black',
                  borderBottom: '1px solid #eee',
                  backgroundColor: selectedCategory === category.name ? '#f5f5f5' : 'white'
                }}
              >
                {category.name}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Subcategory Filter - Only show if category is selected */}
      {selectedCategory && (
        <div style={{ position: 'relative', marginRight: '15px', marginBottom: '5px' }}>
          <button 
            onClick={() => {
              setShowSubcategoryDropdown(!showSubcategoryDropdown);
              setShowCategoryDropdown(false);
              setShowGenderDropdown(false);
              setShowSortDropdown(false);
            }}
            style={{
              backgroundColor: selectedSubcategory ? '#f0c14b' : '#37475A',
              border: 'none',
              borderRadius: '3px',
              padding: '8px 12px',
              color: selectedSubcategory ? 'black' : 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              fontSize: '14px'
            }}
          >
            {selectedSubcategory || "All Subcategories"}
            <span style={{ marginLeft: '5px' }}>▼</span>
          </button>
          
          {showSubcategoryDropdown && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: '0',
              backgroundColor: 'white',
              border: '1px solid #ddd',
              borderRadius: '3px',
              width: '200px',
              maxHeight: '300px',
              overflowY: 'auto',
              zIndex: 1000,
              boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
            }}>
              <div 
                onClick={() => {
                  onSubcategoryChange("");
                  setShowSubcategoryDropdown(false);
                }}
                style={{
                  padding: '8px 12px',
                  cursor: 'pointer',
                  color: 'black',
                  borderBottom: '1px solid #eee',
                  backgroundColor: selectedSubcategory === "" ? '#f5f5f5' : 'white'
                }}
              >
                All Subcategories
              </div>
              {getSubcategories().map(subcategory => (
                <div 
                  key={subcategory}
                  onClick={() => {
                    onSubcategoryChange(subcategory);
                    setShowSubcategoryDropdown(false);
                  }}
                  style={{
                    padding: '8px 12px',
                    cursor: 'pointer',
                    color: 'black',
                    borderBottom: '1px solid #eee',
                    backgroundColor: selectedSubcategory === subcategory ? '#f5f5f5' : 'white'
                  }}
                >
                  {subcategory}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Gender Filter */}
      <div style={{ position: 'relative', marginRight: '15px', marginBottom: '5px' }}>
        <button 
          onClick={() => {
            setShowGenderDropdown(!showGenderDropdown);
            setShowCategoryDropdown(false);
            setShowSubcategoryDropdown(false);
            setShowSortDropdown(false);
          }}
          style={{
            backgroundColor: selectedGender ? '#f0c14b' : '#37475A',
            border: 'none',
            borderRadius: '3px',
            padding: '8px 12px',
            color: selectedGender ? 'black' : 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            fontSize: '14px'
          }}
        >
          {selectedGender || "All Genders"}
          <span style={{ marginLeft: '5px' }}>▼</span>
        </button>
        
        {showGenderDropdown && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: '0',
            backgroundColor: 'white',
            border: '1px solid #ddd',
            borderRadius: '3px',
            width: '150px',
            zIndex: 1000,
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
          }}>
            <div 
              onClick={() => {
                onGenderChange("");
                setShowGenderDropdown(false);
              }}
              style={{
                padding: '8px 12px',
                cursor: 'pointer',
                color: 'black',
                borderBottom: '1px solid #eee',
                backgroundColor: selectedGender === "" ? '#f5f5f5' : 'white'
              }}
            >
              All Genders
            </div>
            {genderOptions.map(gender => (
              <div 
                key={gender}
                onClick={() => {
                  onGenderChange(gender);
                  setShowGenderDropdown(false);
                }}
                style={{
                  padding: '8px 12px',
                  cursor: 'pointer',
                  color: 'black',
                  borderBottom: '1px solid #eee',
                  backgroundColor: selectedGender === gender ? '#f5f5f5' : 'white'
                }}
              >
                {gender}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sort Options */}
      <div style={{ position: 'relative', marginLeft: 'auto', marginBottom: '5px' }}>
        <button 
          onClick={() => {
            setShowSortDropdown(!showSortDropdown);
            setShowCategoryDropdown(false);
            setShowSubcategoryDropdown(false);
            setShowGenderDropdown(false);
          }}
          style={{
            backgroundColor: '#37475A',
            border: 'none',
            borderRadius: '3px',
            padding: '8px 12px',
            color: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            fontSize: '14px'
          }}
        >
          Sort by: {sortOptions.find(option => option.value === selectedSort)?.label || "Featured"}
          <span style={{ marginLeft: '5px' }}>▼</span>
        </button>
        
        {showSortDropdown && (
          <div style={{
            position: 'absolute',
            top: '100%',
            right: '0',
            backgroundColor: 'white',
            border: '1px solid #ddd',
            borderRadius: '3px',
            width: '200px',
            zIndex: 1000,
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
          }}>
            {sortOptions.map(option => (
              <div 
                key={option.value}
                onClick={() => {
                  onSortChange(option.value);
                  setShowSortDropdown(false);
                }}
                style={{
                  padding: '8px 12px',
                  cursor: 'pointer',
                  color: 'black',
                  borderBottom: '1px solid #eee',
                  backgroundColor: selectedSort === option.value ? '#f5f5f5' : 'white'
                }}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Clear Filters Button - Only show if any filter is applied */}
      {(selectedCategory || selectedSubcategory || selectedGender || selectedSort !== "featured") && (
        <button 
          onClick={() => {
            onCategoryChange("");
            onSubcategoryChange("");
            onGenderChange("");
            onSortChange("featured");
          }}
          style={{
            backgroundColor: '#e7e9ec',
            border: '1px solid #adb1b8',
            borderRadius: '3px',
            padding: '6px 10px',
            marginLeft: '10px',
            color: '#111',
            cursor: 'pointer',
            fontSize: '12px'
          }}
        >
          Clear Filters
        </button>
      )}
    </div>
  );
}

export default FilterBar;