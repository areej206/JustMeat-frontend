import React from "react";
import Star from "./star";
import { useLocalStorage } from "./useLocalStorage";

export default function StarRating({ ratings }) {
  const totalStars = 5;

  const averageRating =
    ratings.reduce((acc, rating) => acc + rating, 0) / ratings.length;

  const [selectedStars, setSelectedStars] = useLocalStorage(
    "hostelRating",
    averageRating
  );

  const handleStarClick = (starValue) => {
    setSelectedStars(starValue);
  };

  return (
    <div>
      {[...Array(totalStars)].map((_, i) => (
        <Star
          key={i}
          selected={selectedStars > i}
          halfFilled={selectedStars > i && selectedStars < i + 1}
          onClick={() => handleStarClick(i + 1)}
        />
      ))}
      <p>
        Average Rating: {averageRating.toFixed(1)} out of {totalStars}
      </p>
    </div>
  );
}
