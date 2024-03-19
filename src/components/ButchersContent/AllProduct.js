
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './AllProduct.css';
import ProductCard from './ProductCard';
import useFetchData from '../useFetchData';
const AllProduct = ({ selectedCategory }) => {
    const { butcherTitle } = useParams();
    const { status, butchers } = useFetchData();
    const [searchQuery, setSearchQuery] = useState('');
    // Find the butcher with the matching title
    const butcher = butchers.find((butcher) => butcher.title === butcherTitle);
    if (status !== 'fetched' || !butcher) {
        return <p>Loading...</p>;
    }
    // Filter items based on selected category and search query
    let filteredItems = Object.entries(butcher.inventory);
    if (selectedCategory) {
        filteredItems = filteredItems.filter(([category]) => category === selectedCategory);
    }
    if (searchQuery.trim() !== '') {
        filteredItems = filteredItems.map(([group, items]) => [
            group,
            items.filter((item) =>
                item.item.toLowerCase().includes(searchQuery.trim().toLowerCase())
            ),
        ]);
    }
    return (
        <div className="allproducts">
            <div className="search-bar">
                <input
                    className="form-control product-search"
                    type="text"
                    placeholder="Search for Product ..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className="products">
                {filteredItems.map(([group, items]) => {
                    return (
                        <div key={group} className="inventory-group">
                            <div className="group-content">
                                {items.map((item) => (
                                    <Link
                                        key={item.item}
                                        className="product-link"
                                        to={`/butchers/${encodeURIComponent(butcher.title)}/product/${encodeURIComponent(
                                            item.item
                                        )}`}
                                    >
                                        <ProductCard key={item.item} item={item} />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
export default AllProduct;
