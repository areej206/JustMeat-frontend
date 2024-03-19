
import React, { useState } from "react";
import CategorySidebar from "./CategorySidebar";
import AllProduct from "./AllProduct";
import "./Butcher2.css";
import Footer from "../Footer/Footer";
import useFetchData from "../useFetchData";
import { useParams } from "react-router-dom";

const Butcher2 = () => {
  const { butcherTitle } = useParams();
  const { status, butchers } = useFetchData();
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Find the butcher with the matching title
  const butcher = butchers.find((butcher) => butcher.title === butcherTitle);

  if (status !== "fetched" || !butcher) {
    return <p>Loading...</p>;
  }

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  
  return (
    <>
    <div className="container-fluid">
      <div className="border-container">
        <h2 className="ButcherHeading">{butcher.title}</h2>

        <div className="product_sidebar">
          <CategorySidebar onCategorySelect={handleCategorySelect} />
          <AllProduct selectedCategory={selectedCategory} />
        </div>
      </div>
    </div>
<Footer />
    </>

  );
};

export default Butcher2;