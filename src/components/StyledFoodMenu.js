import React from "react";
import StyledItem from "./StyledItem";
import Accordion from "react-bootstrap/Accordion";


const FoodMenu = ({ foods }) => {
  return (
    <Accordion>
      {foods.map((food, index) => {
        return (
          <Accordion.Item eventKey={index} key={index}>
            <StyledItem item={food} index={index} />
          </Accordion.Item>
        );
      })}
    </Accordion>
  );
};

export default FoodMenu;
