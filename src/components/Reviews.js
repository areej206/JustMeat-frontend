import React, { useState } from "react";
import useFetchData from "./useFetchData";
import Stars from "./Stars";
import Footer from "./Footer/Footer";
import ReviewForm from "./ReviewForm";
import ButcherReviewForm from "./ButcherReviewForm";
import { faArrowDownShortWide, faSortDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Reviews = () => {
  const { status, butchers } = useFetchData();
  const [searchField, setSearchField] = useState("");
  const [selectedButcher, setSelectedButcher] = useState(null);
  const [ratingFilter, setRatingFilter] = useState("date"); // Set default filter to "date"
  const [showReviewForm, setShowReviewForm] = useState(false); // State to track review form visibility

  const handleAddReviewClick = () => {
    setShowReviewForm(!showReviewForm); // Toggle the showReviewForm state
  };

  const handleReviewSubmit = (review) => {
    console.log("Review Submitted:", review);
    setSelectedButcher(null);
    setShowReviewForm(false); // Hide the review form after submission
  };

  let butcherTitles = []; // Initialize an array to store butcher titles

  if (status === "fetched" && butchers) {
    // If data is fetched and butchers is not null or undefined
    butcherTitles = butchers.map((butcher) => butcher.title); // Extract butcher titles
  }

  // Flatten all reviews from all butchers into a single array
  const allReviews = butchers ? butchers.flatMap((butcher) => {
    return butcher.reviews.map((review) => {
      return { ...review, butcherTitle: butcher.title };
    });
  }) : [];

  // Apply rating filter if selected
  let filteredReviews = allReviews;
  if (ratingFilter === "highestToLowest") {
    filteredReviews = filteredReviews.sort((a, b) => b.rating - a.rating);
  } else if (ratingFilter === "lowestToHighest") {
    filteredReviews = filteredReviews.sort((a, b) => a.rating - b.rating);
  } else if (ratingFilter === "date") { // Add sorting by date
    filteredReviews = filteredReviews.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  // Apply search filter
  filteredReviews = filteredReviews.filter((review) => {
    return (
      (review.butcherTitle?.toLowerCase().includes(searchField.toLowerCase()) ||
        (review.reviewer && review.reviewer.toLowerCase().includes(searchField.toLowerCase())) ||
        (review.comment && review.comment.toLowerCase().includes(searchField.toLowerCase())) ||
        (review.specific_item && review.specific_item.toLowerCase().includes(searchField.toLowerCase())))
    );
  });

  console.log("Filtered Reviews:", filteredReviews);

  return (
    <>
      <div className="border-container">
        <input
          className="form-control"
          type="text"
          placeholder="Search for Users, Butchers, or Reviews..."
          onChange={(e) => setSearchField(e.target.value)}
        />

        <div className="reviews-container">
          <div className="add-review-button">
            <button className="btn btn-primary" onClick={handleAddReviewClick}>
              {showReviewForm ? "Cancel" : "Add a Review"} {/* Change button text based on review form visibility */}
            </button>
          </div>

          <div className="sort-by">
            <select
              className="form-control"
              onChange={(e) => setRatingFilter(e.target.value)}
              value={ratingFilter} // Ensure the default value is selected
            >
              <option value="date"> Sort by Date (Newest First) </option>
              <option value="butchers"> Sort by Butchers </option>
              <option value="highestToLowest">Sort by Ratings: Highest to Lowest</option>
              <option value="lowestToHighest">Sort by Ratings: Lowest to Highest</option>
            </select>

          </div>
        </div>

        {showReviewForm && (
          <ButcherReviewForm
            onReviewSubmit={handleReviewSubmit}
            butcherTitles={butcherTitles} // Pass the array of butcher titles to the ButcherReviewForm component
          />
        )}

        {status === "fetched" && (
          <ul className="idekkkk">
            {filteredReviews.map((review, index) => (
              <div key={index} className="inner-container-reviewsss">
                <h5>{review.reviewer}</h5>
                <div className="review-conta">
                <p>{review.date}</p>
                <p>
                  <Stars selectedStars={review.rating} />
                </p>
                </div>
                <div className="butcherReviewCont">
                <p>{review.butcherTitle}</p>
                <p>{review.specific_item}</p>
                </div>
                
                <p>{review.comment}</p>
                

{/* 

                <h5>{review.butcherTitle}</h5>
                <p>{review.reviewer}</p>
                <p>
                  <Stars selectedStars={review.rating} />
                </p>
                <p>{review.date}</p>
                <p>{review.comment}</p>
                <p>{review.specific_item}</p> */}
              </div>
            ))}
          </ul>
        )}
        {status === "error" && (
          <p>Error fetching data from the backend.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Reviews;
