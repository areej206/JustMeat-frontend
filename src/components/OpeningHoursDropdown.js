import React, { useState } from 'react';

const OpeningHoursDropdown = ({ openingHours }) => {
    const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });

    const [selectedDay, setSelectedDay] = useState(currentDay); // Default to the current day

    const handleChangeDay = (event) => {
        setSelectedDay(event.target.value);
    };

    return (
        <div className="opening-hours-dropdown">
            <select value={selectedDay} onChange={handleChangeDay}>
                {Object.keys(openingHours).map(day => (
                    <option key={day} value={day}>{day}</option>
                ))}
            </select>
            <div className="hours">{openingHours[selectedDay] || 'Closed'}</div>
        </div>
    );
};

export default OpeningHoursDropdown;
