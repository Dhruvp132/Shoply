import React, { useState, useEffect, useRef, useCallback } from "react";
import Product from "../Product";

function ProductGrid({ title, products, columns = 4, categoryName }) {
  const incrementAmount = 4;
  const initialDisplayCount = incrementAmount;
  const [displayCount, setDisplayCount] = useState(initialDisplayCount);
  const [useInfiniteScroll, setUseInfiniteScroll] = useState(true);
  const loaderRef = useRef(null);
  
  const handleShowMore = () => {
    // Increase by increment amount, but don't exceed total products
    setDisplayCount(prevCount => 
      Math.min(prevCount + incrementAmount, products.length)
    );
  };
  
  const handleShowLess = () => {
    // Reset to initial count
    setDisplayCount(initialDisplayCount);
    // Scroll back to the top of the grid
    window.scrollTo({
      top: document.getElementById(`product-grid-${title.replace(/\s+/g, '-')}`).offsetTop - 100,
      behavior: 'smooth'
    });
  };
  
  // Only show products up to the current display count
  const visibleProducts = products.slice(0, displayCount);
  const isShowingAll = displayCount >= products.length;
  const hasMoreProducts = displayCount < products.length;
  
  // Setup intersection observer for infinite scrolling
  const handleObserver = useCallback((entries) => {
    const [entry] = entries;
    if (entry.isIntersecting && hasMoreProducts && useInfiniteScroll) {
      handleShowMore();
    }
  }, [hasMoreProducts, useInfiniteScroll]);
  
  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0
    });
    
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    
    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [handleObserver, loaderRef]);

  return (
    <div 
      id={`product-grid-${title.replace(/\s+/g, '-')}`}
      style={{
        marginBottom: '30px'
      }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '15px',
        padding: '0 10px'
      }}>
        <h2 style={{
          fontSize: '21px',
          fontWeight: 'bold',
          color: '#232f3e',
          margin: 0
        }}>{title}</h2>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '15px'
        }}>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: '14px',
            color: '#565959',
            cursor: 'pointer'
          }}>
            <input 
              type="checkbox" 
              checked={useInfiniteScroll} 
              onChange={() => setUseInfiniteScroll(!useInfiniteScroll)}
              style={{
                marginRight: '5px'
              }}
            />
            Auto-load
          </label>
          
          {hasMoreProducts ? (
            <button 
              onClick={handleShowMore}
              style={{
                color: '#007185',
                textDecoration: 'none',
                fontSize: '14px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '5px 10px',
                borderRadius: '3px',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#f7fafa';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              See more
            </button>
          ) : (
            displayCount > initialDisplayCount && (
              <button 
                onClick={handleShowLess}
                style={{
                  color: '#007185',
                  textDecoration: 'none',
                  fontSize: '14px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '5px 10px',
                  borderRadius: '3px',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#f7fafa';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                Show less
              </button>
            )
          )}
        </div>
      </div>
      
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        margin: '0 -10px',
        justifyContent: 'flex-start',
        width: '100%',
      }}>
        {visibleProducts.map((product) => (
          <div 
            key={product.id} 
            style={{ 
              width: `${100 / columns}%`, 
              padding: '0 10px',
              marginBottom: '20px',
              boxSizing: 'border-box'
            }}
          >
            <Product
              id={product.id}
              title={product.title}
              price={product.price}
              rating={product.rating || 4}
              image={product.image}
              category={product.category}
              subcategory={product.subcategory}
              gender={product.gender}
            />
          </div>
        ))}
      </div>
      
      {/* Bottom action buttons */}
      <div style={{
        textAlign: 'center',
        marginTop: '10px'
      }}>
        {hasMoreProducts ? (
          <button 
            onClick={handleShowMore}
            style={{
              backgroundColor: '#f0f2f2',
              border: '1px solid #d5d9d9',
              borderRadius: '8px',
              padding: '8px 20px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#e7e9ec';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#f0f2f2';
            }}
          >
            Show more {title} products
          </button>
        ) : (
          displayCount > initialDisplayCount && (
            <button 
              onClick={handleShowLess}
              style={{
                backgroundColor: '#f0f2f2',
                border: '1px solid #d5d9d9',
                borderRadius: '8px',
                padding: '8px 20px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#e7e9ec';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#f0f2f2';
              }}
            >
              Show less {title} products
            </button>
          )
        )}
      </div>
      
      {/* Invisible element for intersection observer */}
      {hasMoreProducts && useInfiniteScroll && (
        <div 
          ref={loaderRef}
          style={{
            height: '20px',
            margin: '20px 0',
            visibility: 'hidden'
          }}
        >
          Loading more...
        </div>
      )}
    </div>
  );
}

export default ProductGrid;