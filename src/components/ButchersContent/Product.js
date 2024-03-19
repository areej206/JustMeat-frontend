import React, { useState, useEffect } from "react";
import useFetchData from "../useFetchData";
import { useParams } from "react-router-dom";
import "./Product.css";
import Footer from "../Footer/Footer";
import Stars from "../Stars";
import ReviewForm from "../ReviewForm";

const Product = ({ addToBasket }) => {
  const { butcherTitle, itemName } = useParams();
  const { status, butchers } = useFetchData();

  // Local state for additional request
  const [additionalRequest, setAdditionalRequest] = useState(false);
  const [requestInput, setRequestInput] = useState("");

  const [weight, setWeight] = useState(1);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviews, setReviews] = useState([]);

  const [showDescription, setShowDescription] = useState(true); // State to track description visibility
  const [showReviews, setShowReviews] = useState(false); // State to track reviews visibility
  const [detailsContent, setDetailsContent] = useState(null); // State to store the content to be displayed

  const [quantity, setQuantity] = useState(0);

  const butcher = butchers.find((butcher) => butcher.title === butcherTitle);

  useEffect(() => {
    console.log("Product component mounted or updated.");
    if (butcher && itemName) {
      handleDescriptionToggle();
    }
  }, [butcher, itemName]);

  if (status !== "fetched" || !butcher) {
    return <p>Loading...</p>;
  }

  const selectedItem = Object.values(butcher.inventory)
    .flat()
    .find((item) => item.item === itemName);

  if (!selectedItem) {
    return <p>Item not found.</p>;
  }

  const itemReviews = butcher.reviews.filter(
    (review) => review.specific_item === itemName
  );

  const handleAddToCart = () => {
    if (quantity === 0) {
      alert("Please select the number of items before adding to cart");
      return;
    }

    const itemToAdd = { ...selectedItem, quantity };
    addToBasket(itemToAdd);
    console.log("Item added to basket:", itemToAdd);
    alert(`${quantity} ${selectedItem.item} has been added to cart`);
  };


  const handleAdd = () => {
    setQuantity(quantity + 1);
  };

  const handleRemove = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  };

  const handleAdditionalRequestChange = (e) => {
    setAdditionalRequest(e.target.value === "yes");
  };

  const handleRequestInputChange = (e) => {
    setRequestInput(e.target.value);
  };

  const handleAddReviewClick = () => {
    setShowReviewForm(!showReviewForm); // Toggle showReviewForm
  };

  const handleCancelReview = () => {
    setShowReviewForm(false); // Hide the review form
  };

  const handleReviewSubmit = (review) => {
    console.log("Review Submitted:", review);
    setReviews([...reviews, review]);
    setShowReviewForm(false);
  };

  const handleDescriptionToggle = () => {
    setShowDescription(true);
    setShowReviews(false);
    setDetailsContent(selectedItem.description);
  };

  const handleReviewsToggle = () => {
    setShowReviews(true);
    setShowDescription(false);
    const reviewsContent =
      itemReviews.length > 0 ? (
        itemReviews.map((review, index) => (
          <div key={index} className="inner-container">
            <p>{review.reviewer}</p>
            <p>
              <Stars selectedStars={review.rating} />
            </p>
            <p>{review.comment}</p>
          </div>
        ))
      ) : (
        <p>No reviews available for this item.</p>
      );

    setDetailsContent(reviewsContent);
  };

  return (
    <>
      <div className="container-fluid">
        <h2 className="ButcherHeading">{butcher.title}</h2>
        <div className="border-container">
          <div className="item-details-container">
            <div className="left-section">
              <div className="item-image-container">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Item Placeholder"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            </div>
            <div className="right-section">
              <h2>{selectedItem.item}</h2>
              <p>
                <Stars
                  selectedStars={
                    (selectedItem.ratings.reduce((acc, rating) => acc + rating, 0) / selectedItem.ratings.length).toFixed(1)
                  }
                />
              </p>

              <p>£{selectedItem.price}</p>


              <div className="quantity-container">
                <p className="quantity-items">
                  <button className="quantity-button" onClick={handleRemove}>
                    -
                  </button>
                  <span className="quantity-button-bg">{quantity}</span>
                  <button className="quantity-button" onClick={handleAdd}>
                    +
                  </button>
                </p>



                <button
                  className="btn btn-primary add-to-cart-button"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
              </div>

            </div>
          </div>
          <hr />
          <div className="tab-container">
            <div className={`left-tab ${showDescription ? "active" : ""}`}>
              <h3 className="tab-option" onClick={handleDescriptionToggle}>
                Description
              </h3>
            </div>
            <div className={`right-tab ${showReviews ? "active" : ""}`}>
              <h3 className="tab-option" onClick={handleReviewsToggle}>
                Item Reviews
              </h3>
            </div>
          </div>
          <div className="details-container">
            <div>
              {showReviews && showReviewForm && (
                <div>
                  <button className="btn btn-secondary cancel-review-buttonn" onClick={handleCancelReview}>
                    Cancel
                  </button>
                  <ReviewForm
                    onReviewSubmit={handleReviewSubmit}
                    butcherTitle={butcherTitle} // Pass the butcherTitle prop
                    topic={selectedItem.item} // Pass the itemName as topic
                  />
                </div>
              )}

              {showReviews && !showReviewForm && (
                <button className="btn btn-primary add-review-button" onClick={handleAddReviewClick}>
                  Add a Review
                </button>
              )}

            </div>
            <div className="description-container">{detailsContent}</div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product;
