import React from "react";
import StyledItem from "./StyledItem";
import Accordion from "react-bootstrap/Accordion";
import ButcherAdminItem from "./ButcherAdminItem";


const Butchers = ({ butchers }) => {
  return (
    <Accordion>
      {butchers.map((butcher, index) => {
        return (
          <Accordion.Item eventKey={index} key={index}>
            {/* <StyledItem item={butcher} index={index} /> */}
            <ButcherAdminItem item={butcher} index={index} />
          </Accordion.Item>
        );
      })}
    </Accordion>
  );
};

export default Butchers;
