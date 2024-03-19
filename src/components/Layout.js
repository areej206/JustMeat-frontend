import React, { useState } from "react";
import Settings from "./Settings"; // Assuming your settings component file is named Settings.js
import Navigation from "./Navigation";
import { Outlet } from "react-router-dom"; // Import Outlet from react-router-dom

const Layout = ({ children }) => {
    const [selectedColor, setSelectedColor] = useState(""); // State to store selected color

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

    // Function to handle selecting a color
    const handleColorChange = (color) => {
        setSelectedColor(color);
    };

    return (
        <>
            <Navigation />
            <Settings handleColorChange={handleColorChange} />
            <div style={coloredLayerStyle}></div>
            <Outlet /> {/* Render child routes */}
        </>
    );
};

export default Layout;
