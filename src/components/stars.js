import React from "react";
import Star from "./star";

const Stars = ({ selectedStars, onSelect }) => {
  const renderStars = () => {
    const stars = [];
    const roundedStars = parseFloat(selectedStars);

    // Full stars
    for (let i = 0; i < Math.floor(roundedStars); i++) {
      stars.push(
        <Star key={i} selected={true} halfFilled={false} onClick={() => onSelect(i + 1)} />
      );
    }

    // Half star (if applicable)
    if (roundedStars % 1 !== 0) {
      stars.push(
        <Star key="half" selected={true} halfFilled={true} onClick={() => onSelect(Math.ceil(roundedStars))} />
      );
    }

    // Remaining empty stars
    const remainingStars = 5 - Math.ceil(roundedStars);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Star key={i + Math.ceil(roundedStars)} selected={false} halfFilled={false} onClick={() => onSelect(i + Math.ceil(roundedStars) + 1)} />
      );
    }

    return stars;
  };

  return (
    <div className="stars-container">
      {renderStars()}
      <span>({selectedStars})</span>
    </div>
  );
};

export default Stars;
