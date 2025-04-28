import React from "react";
import { useStateValue } from "./StateProvider";

function Product({ id, title, image, price, rating, category, subcategory, gender }) {
  const [{ basket }, dispatch] = useStateValue();

  const addToBasket = () => {
    // dispatch the item into the data layer
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id,
        title,
        image,
        price,
        rating,
        category,
        subcategory,
        gender,
      },
    });
  };

  return (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    margin: '20px',
    padding: '20px',
    width: '100%',
    maxHeight: '400px',
    minWidth: '100px',
    backgroundColor: 'white',
    zIndex: 1,
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    position: 'relative',
    overflow: 'hidden'
  }}
  onMouseOver={(e) => {
    e.currentTarget.style.transform = 'translateY(-5px)';
    e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
  }}
  onMouseOut={(e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
  }}
  >
    <img 
      src={image || "/placeholder.svg"} 
      alt={title} 
      style={{
        maxHeight: '200px',
        width: '100%',
        objectFit: 'contain',
        marginBottom: '15px'
      }}
    />

    <div style={{
      height: '100px',
      marginBottom: '15px',
      width: '100%',
      overflow: 'hidden'
    }}>
      <p style={{
        fontWeight: '500',
        marginBottom: '5px',
        fontSize: '16px',
        display: '-webkit-box',
        WebkitLineClamp: '2',
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}>{title}</p>
      
      <p style={{
        fontSize: '12px',
        color: '#565959',
        marginBottom: '5px'
      }}>
        {category && <span>{category}</span>}
        {subcategory && <span> &gt; {subcategory}</span>}
        {gender && <span> | {gender}</span>}
      </p>
      
      <p style={{
        marginTop: '5px',
        fontSize: '18px',
        fontWeight: 'bold'
      }}>
        <small style={{ fontSize: '14px' }}>$</small>
        <strong>{price}</strong>
      </p>
      
      <div style={{
        display: 'flex'
      }}>
        {Array(rating)
          .fill()
          .map((_, i) => (
            <p key={i} style={{ color: '#FFA41C' }}>★</p>
          ))}
      </div>
    </div>

    <button 
      onClick={addToBasket}
      style={{
        backgroundColor: '#f0c14b',
        border: '1px solid',
        marginTop: '10px',
        borderColor: '#a88734 #9c7e31 #846a29',
        color: '#111',
        padding: '8px 16px',
        borderRadius: '3px',
        cursor: 'pointer',
        width: '100%',
        fontSize: '14px',
        fontWeight: '500',
        transition: 'background-color 0.2s'
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = '#ddb347';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = '#f0c14b';
      }}
    >
      Add to Basket
    </button>
  </div>
);
}

export default Product;