import React from "react";
import Item from "./Item";

const FoodMenu = ({ foods }) => {
  return (
    <ul className="list-group">
      {foods.map((food) => {
        return (
          <li className="list-group-item" key={food.name}>
            <Item item={food} />
          </li>
        );
      })}
    </ul>
  );
};

export default FoodMenu;
