import React from "react";

function ProductManagement({ products, isLoading, onAddProduct, onEditProduct, onDeleteProduct }) {
  return (
    <div style={{ padding: '20px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h1 style={{ margin: 0 }}>Product Management</h1>
        <button 
          onClick={onAddProduct}
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            padding: '10px 15px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <span style={{ marginRight: '5px' }}>+</span> Add Product
        </button>
      </div>

      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <p>Loading products...</p>
        </div>
      ) : products.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px 0',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <p>No products found.</p>
          <button 
            onClick={onAddProduct}
            style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              padding: '10px 15px',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            Add Your First Product
          </button>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '20px'
        }}>
          {products.map((product) => (
            <div 
              key={product._id} 
              style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
              }}
            >
              <div style={{
                height: '150px',
                overflow: 'hidden',
                position: 'relative'
              }}>
                <img 
                  src={product.image || "https://via.placeholder.com/300x150"}
                  alt={product.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  color: 'white',
                  padding: '5px 10px',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}>
                  ${product.price}
                </div>
              </div>
              
              <div style={{ padding: '15px' }}>
                <h3 style={{ 
                  margin: '0 0 10px',
                  fontSize: '16px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {product.title}
                </h3>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '10px'
                }}>
                  <span style={{
                    backgroundColor: '#f0f0f0',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    color: '#666'
                  }}>
                    {product.category || 'Uncategorized'}
                  </span>
                  
                  {product.subcategory && (
                    <span style={{
                      backgroundColor: '#f0f0f0',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      color: '#666',
                      marginLeft: '5px'
                    }}>
                      {product.subcategory}
                    </span>
                  )}
                </div>
                
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '10px'
                }}>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditProduct(product);
                    }}
                    style={{
                      backgroundColor: '#2196F3',
                      color: 'white',
                      border: 'none',
                      padding: '8px 12px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      flex: 1,
                      marginRight: '5px'
                    }}
                  >
                    Edit
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm('Are you sure you want to delete this product?')) {
                        onDeleteProduct(product._id);
                      }
                    }}
                    style={{
                      backgroundColor: '#F44336',
                      color: 'white',
                      border: 'none',
                      padding: '8px 12px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      flex: 1,
                      marginLeft: '5px'
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductManagement;