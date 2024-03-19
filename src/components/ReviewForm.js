import React, { useState } from "react";
import Star from './star'; // Import the Star component

const ReviewForm = ({ onReviewSubmit, butcherTitle, topic }) => {
  const [reviewer, setReviewer] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form data
    if (!reviewer || !rating || !comment) {
      alert("Please fill in all fields.");
      return;
    }

    // Create a review object
    const review = {
      reviewer,
      rating,
      comment,
      butcherTitle: butcherTitle || "", // Auto-fill butcher title if provided
      topic: topic || "", // Auto-fill topic if provided
    };

    // Call the onReviewSubmit callback with the review data
    onReviewSubmit(review);

    // Clear form fields
    setReviewer("");
    setRating(0);
    setComment("");
  };

  const handleStarClick = (starValue) => {
    setRating(starValue);
  };

  return (
    <form onSubmit={handleSubmit} className="review-form">
      {butcherTitle && (
        <div className="form-group">
          <label htmlFor="butcherTitle">Butcher Title:</label>
          <input
            type="text"
            id="butcherTitle"
            value={butcherTitle}
            readOnly
            className="form-control"
          />
        </div>
      )}

      {topic && (
        <div className="form-group">
          <label htmlFor="topic">Topic:</label>
          <input
            type="text"
            id="topic"
            value={topic}
            readOnly
            className="form-control"
          />
        </div>
      )}

      <div className="star-form-group">
        <label>Rating:</label>
        <div>
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              selected={index < rating}
              onClick={() => handleStarClick(index + 1)}
            />
          ))}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="reviewer">Reviewer:</label>
        <input
          type="text"
          id="reviewer"
          value={reviewer}
          onChange={(e) => setReviewer(e.target.value)}
          className="form-control"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="comment">Comment:</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="form-control"
          required
        ></textarea>
      </div>

      <button type="submit" className="btn btn-primary review-submit-button">
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
