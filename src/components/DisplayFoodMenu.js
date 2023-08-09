import React from "react";
import useFetchData from "./useFetchData";
import FoodOrder from "./FoodOrder"

const DisplayFoodMenu = () => {
  const {status, foods} = useFetchData();
  if (status==='fetched')
  return (
    <div>
    <FoodOrder items={foods} /> 
    </div>
  );
  return<p>There is currently an issue displaying the food menu</p>
};

export default DisplayFoodMenu;
