import React, { useState } from "react";
import "./CategorySidebar.css";
import useFetchData from "../useFetchData";

const CategorySidebar = ({ onCategorySelect }) => {
  const { status, butchers } = useFetchData();
  const [selectedCategory, setSelectedCategory] = useState(null);

  if (status !== "fetched") {
    return <p>Loading...</p>;
  }

  // Extract categories from fetched data
  const categories = butchers.flatMap((butcher) =>
    Object.keys(butcher.inventory)
  );

  // Deduplicate categories and format data for rendering
  const uniqueCategories = [...new Set(categories)]
  
  ;

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    onCategorySelect(category);
  };

  return (
    <div className="categorysidebar">
      <div className="category" onClick={() => handleCategorySelect(null)}>
        <h3>All</h3>
      </div>
      {uniqueCategories.map((category, index) => (
        <div className="category" key={index} onClick={() => handleCategorySelect(category)}>
          <h3>{category}</h3>
        </div>
      ))}
    </div>
  );
};

export default CategorySidebar;
