
import React, { useState } from 'react';
import './ProductCard.css';
const ProductCard = ({ item }) => {
  const [quantity, setQuantity] = useState(0);
  const handleAddToCart = () => {
    // Logic to add the item to the cart
    console.log(`Added ${quantity} ${item.item} to cart`);
  };
  const handleAdd = () => {
    setQuantity(quantity + 1);
  };
  const handleRemove = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };
  return (
    <div className="product">
      <div className="s1">
        <img src="profileIcon.svg" className="ButcherMenuImg" alt="Item" />
      </div>
      <div className="s2">
        <h3>{item.item}</h3>
        <div className="price">£{item.price}</div>
        <p className="quantity">
          {item.quantity > 0 ? (
            <>
              <b>{item.quantity}</b>
            </>
          ) : (
            'Out of Stock'
          )}
        </p>
      </div>
      <div className="s3">
        {/* <p className="quantityOfItems">
          <button className="quantityButton" onClick={handleRemove}>-</button>
          <span>{quantity}</span>
          <button className="quantityButton" onClick={handleAdd}>+</button>
        </p> */}
        {/* <button className="btn btn-primary ProductCardButton" onClick={handleAddToCart}>View Item</button> */}
      </div>
    </div>
  );
};
export default ProductCard;
