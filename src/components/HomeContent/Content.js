import React from "react";
import './Content.css';
import useFetchData from "../useFetchData";
import { Link } from "react-router-dom";

const Content = () => {
    const { status, butchers } = useFetchData();
    if (status === 'fetched')
        return (
            <div className='homecategories'>
                <div className='sectionContainer'>
                    <Link to="/map" className='container-link map-cont'>
                       
                        <div className='content'>
                            <h1>Locate the Halal Markets near you!</h1>
                        </div>
                        <div className='container-image '>
                        <img src="images/map.png"  className="map-img" alt='img3' />
                        </div>
                    </Link>
                </div>
                <div className='sectionContainer'>
                    <Link to="/butchers" className='container-link meat-cont'>
                        
                        <div className='content'>
                            <h1>View each Market's Live Inventory</h1>
                        </div>
                        <div className='container-image'>
                            <img src="images/meat.png " className="meat-img" alt='img3' />
                        </div>
                    </Link>
                </div>

                <div className='sectionContainer'>
                    <Link to="/reviews" className='container-link review-cont'>
                        
                        <div className='content'>
                            <h1>Review an Item of your choice</h1>
                        </div>
                        <div className='container-image'>
                        <img src="images/review.png" className="review-img" alt='img3' />
                        </div>
                    </Link>
                </div>

            </div>
        );
};

export default Content;
