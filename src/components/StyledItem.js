import React, { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

const Item = ({ item, index }) => {
  console.log(item); // Log the entire item object
  console.log(item.opening); // Log the opening property

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const [selectedDay, setSelectedDay] = useState(null);

  // Check if item.opening is defined before using Object.entries
  const openingHoursList = item.opening ? Object.entries(item.opening).map(([day, hours]) => ({ day, hours })) : [];

  // Find the index of the current day in the openingHoursList
  const currentIndex = openingHoursList.findIndex((entry) => entry.day === selectedDay);

  // Get the current day
  const currentDayIndex = new Date().getDay();
  const currentDay = daysOfWeek[currentDayIndex];

  useEffect(() => {
    setSelectedDay(currentDay);
  }, [currentDay]);

  return (
    <>
      <Accordion.Header>{item.title}</Accordion.Header>
      <Accordion.Body>
        <p><b>Address: </b>{item.address}</p>
        <p><b>Contact: </b>{item.contact}</p>
        <p><b>Opening Hours:</b></p>

        {selectedDay && currentIndex !== -1 && openingHoursList[currentIndex].hours && (
          <ul>
            <li>{selectedDay === currentDay ? "Today" : selectedDay}: {openingHoursList[currentIndex].hours}</li>
          </ul>
        )}

      

        {/* Display the opening hours for other days in the dropdown menu */}
        <DropdownButton
          title="Opening Hours for Other Days"
          onSelect={(eventKey) => setSelectedDay(eventKey)}
        >
          {openingHoursList.map((entry, i) => (
            <Dropdown.Item key={entry.day} eventKey={entry.day} disabled={i === currentIndex}>
              {entry.day}: {entry.hours}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </Accordion.Body>
    </>
  );
};

export default Item;