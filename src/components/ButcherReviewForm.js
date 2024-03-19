import React, { useState, useEffect } from 'react';
import ButcherAutocomplete from './ButcherAutocomplete';
import Star from './star'; // Import the Star component

const ButcherReviewForm = ({ onReviewSubmit, butcherTitles }) => {
    const [reviewerName, setReviewerName] = useState('');
    const [date, setDate] = useState('');
    const [stars, setStars] = useState(0);
    const [selectedButcherTitle, setSelectedButcherTitle] = useState('');
    const [topic, setTopic] = useState('');
    const [comment, setComment] = useState('');

    // Set initial date value to current date
    useEffect(() => {
        const currentDate = new Date().toISOString().split('T')[0];
        setDate(currentDate);
    }, []);

    // Handle change in star rating
    const handleStarClick = (starValue) => {
        setStars(starValue);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const review = {
            reviewerName,
            date,
            stars,
            butcherTitle: selectedButcherTitle,
            topic,
            comment,
        };
        onReviewSubmit(review);
        // Reset form fields after submission
        setReviewerName('');
        setStars(0);
        setTopic('');
        setComment('');
    };

    return (
        <form className="butcher-review-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="reviewerName">Reviewer Name:</label>
                <input
                    type="text"
                    id="reviewerName"
                    placeholder="Enter your name"
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    className="form-control"
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="date">Date:</label>
                <input
                    type="date"
                    id="date"
                    className="form-control"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    readOnly
                />
            </div>
            <div className="star-form-group">
                <label>Stars:</label>
                <div>
                    {[...Array(5)].map((_, index) => (
                        <Star
                            key={index}
                            selected={index < stars}
                            halfFilled={index === stars - 0.5}
                            onClick={() => handleStarClick(index + 1)} // Add onClick handler
                        />
                    ))}
                </div>
            </div>
            <div className="butcher-form-group">
                <label htmlFor="butcherTitle">Butcher:</label>
                <ButcherAutocomplete
                    id="butcherTitle"
                    butcherTitles={butcherTitles}
                    onSelection={setSelectedButcherTitle}
                />
            </div>
            <div className="topic-form-group">
                <label htmlFor="topic">Product (Optional):</label>
                <input
                    type="text"
                    id="topic"
                    placeholder="Enter product name"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label htmlFor="comment">Comment:</label>
                <textarea
                    id="comment"
                    placeholder="Enter your comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="form-control"
                    required
                ></textarea>
            </div>
            <button type="submit" className="btn btn-primary  review-submit-button">Submit Review</button>
        </form>
    );
};

export default ButcherReviewForm;
