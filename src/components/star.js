// import React from "react";
// import { FaStar } from "react-icons/fa";

// export default function Star( props) {
//   return <FaStar 
//         color={props.selected ? "red" : "grey"}
//         onClick={props.onSelect} 
//         />;
// }
import React from "react";
import {LuCoffee} from "react-icons/lu";

export default function Star( props) {
  console.log (props.selected)
  return <LuCoffee 
        color={props.selected ? "#7863FE" : "#dddddd"}
        onClick={props.onSelect} 
        />;
}
