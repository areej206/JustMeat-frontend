import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import '../Management.css';

const ButcherAdminItem = ({ item, index }) => {
  console.log(item);

  const [selectedDays, setSelectedDays] = useState([]);

  const openingHoursList = item.opening ? Object.entries(item.opening).map(([day, hours]) => ({ day, hours })) : [];

  const handleDayClick = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  return (
    <>
      <div className="general-info-container">

      <h1>{item.title}</h1>

        <div>
          <span className="field-name">Title:</span>
          <span className="field-value">{item.title}</span>
        </div>
        <div>
          <span className="field-name">Address:</span>
          <span className="field-value">{item.address}</span>
        </div>
        <div>
          <span className="field-name">Category:</span>
          <span className="field-value">{item.category}</span>
        </div>
        <div>
          <span className="field-name">Contact Number:</span>
          <span className="field-value">{item.contact}</span>
        </div>
        <div className="opening-hours-container">
          <p className="opening-hours-title">Opening Hours:</p>
          <ul className="opening-hours-list">
            {openingHoursList.map((entry, i) => (
              <li key={entry.day} className="opening-hours-item">
                {entry.day}: {entry.hours}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="delivery-schedule-container">
        <h2 className="delivery-schedule-title">Delivery Schedule:</h2>
        <ul className="days-list">
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => (
            <li key={index} className="day-item">
              <label htmlFor={`day-${index}`} className="day-label">
                <input
                  type="checkbox"
                  id={`day-${index}`}
                  className="day-checkbox"
                  value={day}
                  checked={selectedDays.includes(day)}
                  onChange={() => handleDayClick(day)}
                />
                {day}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="inventory-container">
        <h2 className="inventory-title">Inventory:</h2>
        <ul>
          {Object.entries(item.inventory).map(([category, items]) => (
            <li key={category}>
              <strong className="inventory-category">{category}:</strong>
              <ul>
                {items.map((meatItem, j) => (
                  <li key={j}>
                    <div>
                      <span className="field-name">Name:</span>
                      <span className="field-value">{meatItem.item}</span>
                    </div>
                    <div>
                      <span className="field-name">Quantity:</span>
                      <span className="field-value">{meatItem.quantity}</span>
                    </div>
                    <div>
                      <span className="field-name">Price:</span>
                      <span className="field-value">{meatItem.price}</span>
                    </div>
                    <hr />
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ButcherAdminItem;




















// mport React, { useState } from "react";
// import Accordion from "react-bootstrap/Accordion";
// import '../Management.css';

// const ButcherAdminItem = ({ item, index }) => {
//   console.log(item);

//   const [selectedDays, setSelectedDays] = useState([]);

//   const openingHoursList = item.opening ? Object.entries(item.opening).map(([day, hours]) => ({ day, hours })) : [];

//   const handleDayClick = (day) => {
//     if (selectedDays.includes(day)) {
//       setSelectedDays(selectedDays.filter(d => d !== day));
//     } else {
//       setSelectedDays([...selectedDays, day]);
//     }
//   };

//   return (
//     <>
//       <div className="general-info-container">
//         {/* <h1 className="title">{item.title} </h1> */}
        
//         <h1>{item.title}</h1>


//         <p className="field-name">Title</p>
//         <p className="field-value">{item.title}</p>

//         <p className="field-name">Address</p>
//         <p className="field-value">{item.address}</p>



//         <p className="field-name">Category</p>
//         <p className="field-value">{item.category}</p>



//         <p className="field-name">Contact Number</p>
//         <p className="field-value">{item.contact}</p>

//         <div className="opening-hours-container">
//           <p className="opening-hours-title">Opening Hours:</p>
//           <ul className="opening-hours-list">
//             {openingHoursList.map((entry, i) => (
//               <li key={entry.day} className="opening-hours-item">
//                 {entry.day}: {entry.hours}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       <div className="delivery-schedule-container">
//         <h2 className="delivery-schedule-title">Delivery Schedule:</h2>
//         <ul className="days-list">
//           {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => (
//             <li key={index} className="day-item">
//               <label htmlFor={`day-${index}`} className="day-label">
//                 <input
//                   type="checkbox"
//                   id={`day-${index}`}
//                   className="day-checkbox"
//                   value={day}
//                   checked={selectedDays.includes(day)}
//                   onChange={() => handleDayClick(day)}
//                 />
//                 {day}
//               </label>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div className="inventory-container">
//         <h2 className="inventory-title">Inventory:</h2>
//         <ul>
//           {Object.entries(item.inventory).map(([category, items]) => (
//             <li key={category}>
//               <strong>{category}:</strong>
//               <ul>
//                 {items.map((meatItem, j) => (
//                   <li key={j}>
//                     <p className="field-name">Name:</p>
//                     <p className="field-value">{meatItem.item}</p>
//                     <p className="field-name">Quantity:</p>
//                     <p className="field-value">{meatItem.quantity}</p>
//                     <p className="field-name">Price:</p>
//                     <p className="field-value">{meatItem.price}</p>
//                     <hr />
//                   </li>
//                 ))}
//               </ul>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </>
//   );
// };

// export default ButcherAdminItem;
































// import React, { useState } from "react";
// import Accordion from "react-bootstrap/Accordion";
// import '../Management.css';

// const ButcherAdminItem = ({ item, index }) => {
//   console.log(item);

//   const [selectedDays, setSelectedDays] = useState([]);

//   const openingHoursList = item.opening ? Object.entries(item.opening).map(([day, hours]) => ({ day, hours })) : [];

//   const handleDayClick = (day) => {
//     if (selectedDays.includes(day)) {
//       setSelectedDays(selectedDays.filter(d => d !== day));
//     } else {
//       setSelectedDays([...selectedDays, day]);
//     }
//   };

//   return (
//     <>
//       <div className="general-info-container">
//         <h1 className="title">Title: {item.title}</h1>
//         <p className="address">Address: {item.address}</p>
//         <p className="category">Category: {item.category}</p>
//         <p className="contact">Contact Number: {item.contact}</p>
//         <div className="opening-hours-container">
//           <p className="opening-hours-title">Opening Hours:</p>
//           <ul className="opening-hours-list">
//             {openingHoursList.map((entry, i) => (
//               <li key={entry.day} className="opening-hours-item">
//                 {entry.day}: {entry.hours}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       <div className="delivery-schedule-container">
//         <h2 className="delivery-schedule-title">Delivery Schedule:</h2>
//         <ul className="days-list">
//           {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => (
//             <li key={index} className="day-item">
//               <label htmlFor={`day-${index}`} className="day-label">
//                 <input
//                   type="checkbox"
//                   id={`day-${index}`}
//                   className="day-checkbox"
//                   value={day}
//                   checked={selectedDays.includes(day)}
//                   onChange={() => handleDayClick(day)}
//                 />
//                 {day}
//               </label>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div className="inventory-container">
//         <h2 className="inventory-title">Inventory:</h2>
//         <ul>
//           {Object.entries(item.inventory).map(([category, items]) => (
//             <li key={category}>
//               <strong>{category}:</strong>
//               <ul>
//                 {items.map((meatItem, j) => (
//                   <li key={j}>
//                     <p>{meatItem.item}</p>
//                     <p>Quantity: {meatItem.quantity}</p>
//                     <p>Price: {meatItem.price}</p>
//                     <hr />
//                   </li>
//                 ))}
//               </ul>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </>
//   );
// };

// export default ButcherAdminItem;
