import React, { createContext, useContext, useState } from "react";

const FontSizeContext = createContext();

export const useFontSize = () => useContext(FontSizeContext);

export const FontSizeProvider = ({ children }) => {
    const [fontSize, setFontSize] = useState(100);

    const increaseFontSize = () => setFontSize(prevSize => prevSize + 10);
    const decreaseFontSize = () => setFontSize(prevSize => prevSize - 10);

    return (
        <FontSizeContext.Provider value={{ fontSize, increaseFontSize, decreaseFontSize }}>
            {children}
        </FontSizeContext.Provider>
    );
};

export default FontSizeContext;
