import React, { useState } from "react";
import Footer from "./Footer/Footer";
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const ShoppingBasket = ({ basketItems, setBasketItems }) => {
  const [orderDetails, setOrderDetails] = useState(null);

  const handleProceedToCheckout = () => {
    // Store the current basket items in orderDetails
    setOrderDetails(basketItems);
    // Clear the shopping cart
    setBasketItems([]);
  };

  const handleDeleteItem = (index) => {
    // Create a copy of the current basket items array
    const updatedBasketItems = [...basketItems];
    // Remove the item at the specified index
    updatedBasketItems.splice(index, 1);
    // Update the state with the new basket items array
    setBasketItems(updatedBasketItems);
  };

  const calculateTotalPrice = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const calculateTotalItems = (items) => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const handleIncreaseQuantity = (index) => {
    const updatedBasketItems = [...basketItems];
    updatedBasketItems[index].quantity += 1;
    setBasketItems(updatedBasketItems);
  };

  const handleDecreaseQuantity = (index) => {
    const updatedBasketItems = [...basketItems];
    if (updatedBasketItems[index].quantity > 0) {
      updatedBasketItems[index].quantity -= 1;
      setBasketItems(updatedBasketItems);
    }
  };

  return (
    <>
      <div className="container-fluid checkout-container">
        <h2 className="CheckoutHeading">Your Shopping Basket</h2>
        <div className="cart-subheadings">
          <p>Product Name</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Subtotal</p>
        </div>
        <div className="inner-container">
          {basketItems.length > 0 ? (
            basketItems.map((item, index) => (
              <div key={index} className="single-item-container">
                <div className="basket-item-container">
                  <img src="https://via.placeholder.com/150" alt="Item Placeholder" style={{ width: "100%", height: "100%" }} />
                  <div className="basket-right-section">
                    <p><b>{item.item}</b></p>
                    <p>{item.price}</p>
                    <div className="quantity-items">
                      <button className="quantity-button" onClick={() => handleDecreaseQuantity(index)}>-</button>
                      <span className="quantity-button-bg">{item.quantity}</span>
                      <button className="quantity-button" onClick={() => handleIncreaseQuantity(index)}>+</button>
                    </div>
                    <p>{item.price * item.quantity}</p>
                    <span style={{ width: "30px", height: "20px", color: "red", cursor: "pointer" }} onClick={() => handleDeleteItem(index)}>
                      <FontAwesomeIcon icon={faCircleXmark} />
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="emptyBasket">
              <p className="emptyBasketText">Your cart is empty</p>

              <Link className="emptyBasketLink" to="/butchers">Browse our inventory now</Link>

            </div>

          )}
        </div>
        {basketItems.length > 0 && (
          <div>
            <div className="checkout-summary">
              <h3>Order Summary</h3>
              <div className="summary-details">
                <p>Total Items: {calculateTotalItems(basketItems)}</p>
                <p>Total Price: £{calculateTotalPrice(basketItems)}</p>
              </div>
              <button className="btn btn-primary checkout-button" onClick={handleProceedToCheckout}>Proceed to Checkout</button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ShoppingBasket;
