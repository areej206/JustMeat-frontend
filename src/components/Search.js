import React, { useState } from "react";
import StyledButcherList from "./StyledButcherList"

function Search({ butchers }) {
   const [searchField, setSearchField] = useState("");

  const filtered = butchers.filter((entry) => {
    return entry.title.toLowerCase().includes(searchField.toLowerCase())|| entry.address.toLowerCase().includes(searchField.toLowerCase());
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
          <StyledButcherList butchers={filtered} />


      </div>
  
  );
}
export default Search;