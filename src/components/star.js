import React from "react";
import { FaStar, FaStarHalf } from "react-icons/fa";

const Star = ({ selected, halfFilled, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return halfFilled ? (
    <FaStarHalf color={selected ? "gold" : "grey"} onClick={handleClick} />
  ) : (
    <FaStar color={selected ? "gold" : "grey"} onClick={handleClick} />
  );
};

export default Star;
