import React, { useState, useEffect } from "react";
import Footer from "./Footer/Footer";

const Settings = () => {
    const [appSize, setAppSize] = useState(100); // Initial size of the web application
    const [selectedColor, setSelectedColor] = useState(""); // State to store selected color

    // Function to handle changing the size of the web application
    const handleSizeChange = (size) => {
        setAppSize(size);
    };

    // Function to handle selecting a color
    const handleColorChange = (color) => {
        setSelectedColor(color);
    };

    // Load the selected color from local storage on component mount
    useEffect(() => {
        const storedColor = localStorage.getItem("selectedColor");
        if (storedColor) {
            setSelectedColor(storedColor);
        }
    }, []);

    // Save the selected color to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem("selectedColor", selectedColor);
    }, [selectedColor]);

    const coloredLayerStyle = {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: selectedColor,
        opacity: 0.7, // Set opacity to 0.7 for 30% transparency
        zIndex: 9999, // Ensure the layer is above other content
        pointerEvents: "none", // Allow interaction with underlying content
    };

    return (
        <>
            <div className="container-fluid">
                <div className="border-container">
                    <h2>Accessibility Settings</h2>

                    <div className="size-control">
                        <p>Change Application Size</p>
                        <button onClick={() => handleSizeChange(appSize - 10)}>Decrease Size</button>
                        <span> {appSize}% </span>
                        <button onClick={() => handleSizeChange(appSize + 10)}>Increase Size</button>
                    </div>

                    <div className="color-control">
                        <p>Select Color</p>
                        <select value={selectedColor} onChange={(e) => handleColorChange(e.target.value)}>
                            <option value="">Select Color</option>
                            <option value="">None</option> 
                            <option value="rgba(255, 0, 0, 0.3)">Red</option>
                            <option value="rgba(255, 165, 0, 0.3)">Orange</option> 
                            <option value="rgba(255, 255, 0, 0.3)">Yellow</option>
                            <option value="rgba(0, 128, 0, 0.3)">Green</option>
                            <option value="rgba(0, 0, 255, 0.3)">Blue</option>
                            <option value="rgba(128, 0, 128, 0.3)">Violet</option> 
                        </select>
                    </div>
                </div>
            </div>

            {selectedColor && <div style={coloredLayerStyle}></div>} {/* Render the colored layer if a color is selected */}

            <Footer />
        </>
    );
};

export default Settings;
