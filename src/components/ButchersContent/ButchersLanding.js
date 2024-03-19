import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
import Footer from "../Footer/Footer";
import useFetchData from "../useFetchData";
import './ButchersLanding.css';
import Stars from "../Stars";

const ButchersLanding = () => {
    const { status, butchers } = useFetchData();
    const [searchField, setSearchField] = useState("");
    const [openGroup, setOpenGroup] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const getTopItems = (items) => {
        // Sort items based on ratings in descending order
        const sortedItems = items.sort((a, b) =>
            b.ratings.reduce((acc, rating) => acc + rating, 0) / b.ratings.length -
            a.ratings.reduce((acc, rating) => acc + rating, 0) / a.ratings.length
        );

        // Return the top 2 items
        return sortedItems.slice(0, 2);
    };

    const toggleGroup = (groupId) => {
        setOpenGroup(openGroup === groupId ? null : groupId);
    };

    const filteredButchers = butchers.filter((butcher) => {
        return (
            butcher.title.toLowerCase().includes(searchField.toLowerCase()) ||
            butcher.address.toLowerCase().includes(searchField.toLowerCase()) ||
            Object.values(butcher.inventory).some((items) =>
                items.some((item) =>
                    item.item.toLowerCase().includes(searchField.toLowerCase())
                )
            )
        );
    });

    const handleCategoryClick = (category, groupId) => {
        setSelectedCategory(category);
        setOpenGroup(groupId);
    };

    const resetOpenGroup = () => {
        setOpenGroup(null);
    };
    
    const extractTownFromAddress = (address) => {
        const parts = address.split(','); 
        if (parts.length >= 2) {
            const town = parts[parts.length - 2].trim(); 
            if (town.split(' ').length === 1) { 
                console.log("Extracted Town (Old Version):", town); 
                return town;
            }
        }
        
        const townMatch = address.match(/[A-Z][a-z]+/g); 
        if (townMatch && townMatch.length > 0) {
            const town = townMatch[townMatch.length - 1]; 
            console.log("Extracted Town (New Version):", town); 
            return town;
        }
    
        return address.trim(); 
    }

    return (
        <>
            <div className="container-fluid2">
                <div className="border-container">
                    {/* Search input for filtering content */}
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Search for a butcher and explore their inventory..."
                        onChange={(e) => setSearchField(e.target.value)}
                    />

                    {status === "fetched" && (
                        <ul>
                            {filteredButchers.map((butcher) => (
                                <div key={butcher.id} className="butcher-container">
                                    <Link to={`/butchers/${butcher.title}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <div className="title-container">
                                            <div className="profile-icon">
                                                <img src="profileIcon.svg" className="ButcherMenuImg" alt="Item Placeholder" />
                                            </div>
                                            <div className="title-details">
                                                {/* Linking title to Butcher.js */}
                                                <h3>{butcher.title}</h3>
                                                <p>{butcher.address}</p>
                                                <Stars selectedStars={parseFloat(butcher.ratings).toFixed(1)} />
                                            </div>
                                        </div>
                                    </Link>

                                    <div className="category-buttons">
                                        <button onClick={() => handleCategoryClick("chicken", butcher.id)}>Chicken</button>
                                        <button onClick={() => handleCategoryClick("lamb", butcher.id)}>Lamb</button>
                                        <button onClick={() => handleCategoryClick("beef", butcher.id)}>Beef</button>
                                        <button onClick={() => resetOpenGroup("location", extractTownFromAddress(butcher.address))}>{extractTownFromAddress(butcher.address)}</button>
                                        <button onClick={() => resetOpenGroup("category", butcher.category)}>{butcher.category}</button>
                                    </div>

                                    {openGroup === butcher.id && (
                                        <div className="extended-details">
                                            {/* Render extended details here */}
                                            {Object.entries(butcher.inventory).map(([group, items]) => {
                                                if (selectedCategory && group.toLowerCase() !== selectedCategory) {
                                                    return null; // Skip rendering if not selected category
                                                }
                                                const averageRating =
                                                    items.reduce(
                                                        (sum, item) =>
                                                            sum +
                                                            item.ratings.reduce(
                                                                (acc, rating) => acc + rating,
                                                                0
                                                            ) /
                                                            item.ratings.length,
                                                        0
                                                    ) / items.length;

                                                const displayedItems = getTopItems(items);

                                                return (
                                                    <div key={group} className="inventory-group">
                                                        <h4>{group}</h4>
                                                        <Stars selectedStars={averageRating.toFixed(1)} />

                                                        <div className="group-content">
                                                            {displayedItems.map((item) => (
                                                                <div key={item.item} className="inventory-item">
                                                                    <div className="item-image">
                                                                        <img src="profileIcon.svg" alt={item.item} />
                                                                    </div>
                                                                    <div className="item-details">
                                                                        <p><strong>{item.item}</strong></p>
                                                                        <p>{item.quantity} available</p>
                                                                    </div>
                                                                </div>
                                                            ))}

                                                            <div className="ViewMoreArrow">
                                                                <img src="rightArrowIcon.svg" alt="View more" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </ul>
                    )}

                    {status === "error" && (
                        <p>Error fetching data from the backend.</p>
                    )}
                </div>
            </div>

            <Footer />
        </>
    );
};

export default ButchersLanding;
