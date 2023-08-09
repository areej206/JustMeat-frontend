import React, { useState } from "react";
// import FoodMenu from "./FoodMenu"
import StyledFoodMenu from "./StyledFoodMenu"

function Search({ foods }) {
   const [searchField, setSearchField] = useState("");

  const filtered = foods.filter((entry) => {
    return entry.name.toLowerCase().includes(searchField.toLowerCase())|| entry.description.toLowerCase().includes(searchField.toLowerCase());
  });

  return (
      <div>
          <div>
            <input
              className="form-control"
              type="text"
              placeholder="Search ..."
              onChange={(e) =>  setSearchField(e.target.value)}
            />
          </div>
          <StyledFoodMenu foods={filtered} />
      </div>
  
  );
}
export default Search;
