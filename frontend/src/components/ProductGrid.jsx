import React from "react";
import Product from "../Product";

function ProductGrid({ title, products, columns = 4 }) {
  return (
    <div style={{
      marginBottom: '30px'
    }}>
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
        
        <a href="#" style={{
          color: '#007185',
          textDecoration: 'none',
          fontSize: '14px'
        }}>
          See more
        </a>
      </div>
      
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        margin: '0 -10px',
        justifyContent: 'space-between',
        width: '95%',
      }}>
        {products.map((product) => (
          <div 
            key={product.id} 
            style={{ 
              width: `${100 / columns}%`, 
              padding: '0 10px',
              marginBottom: '20px',
              '@media (max-width: 992px)': {
                width: columns > 3 ? '33.333%' : `${100 / columns}%`
              },
              '@media (max-width: 768px)': {
                width: columns > 2 ? '50%' : `${100 / columns}%`
              },
              '@media (max-width: 480px)': {
                width: '100%'
              }
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
    </div>
  );
}

export default ProductGrid;