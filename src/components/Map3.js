import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDirections, faShoppingBasket, faComment, faSearch, faLocationArrow, faCrosshairs, faPhone } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import useFetchData from "./useFetchData";
import 'leaflet/dist/leaflet.css';
import Search from "./Search";
import Stars from "./Stars";
import axios from 'axios';
import debounce from 'lodash/debounce';
import Footer from "./Footer/Footer";
import OpeningHoursDropdown from "./OpeningHoursDropdown";
import OpeningHoursDisplay from "./OpeningHoursDropdown";

const Map3 = ({ }) => {
    const { status, butchers } = useFetchData();

    const [activeButcher, setActiveButcher] = useState({});
    const [userMarker, setUserMarker] = useState(null);
    const [searchLocation, setSearchLocation] = useState("");
    const [searchedLocation, setSearchedLocation] = useState(null);
    const [nearestButcher, setNearestButcher] = useState(null);
    const [nearestButcherPopupOpen, setNearestButcherPopupOpen] = useState(false);

    const [radius, setRadius] = useState(5);
    const mapRef = useRef();
    const nearestButcherMarkerRef = useRef(null);

    const position = [56.294327, -4.544957];

    // 56.290529, -4.509313
    let butcherIcon = null;
    if (status === 'fetched') {
        butcherIcon = L.icon({
            iconUrl: "/markerIcon.svg",
            iconSize: [34, 34],
        });
    }

    let redMarkerIcon = null;
    if (status === 'fetched') {
        redMarkerIcon = L.icon({
            iconUrl: "/redMarkerIcon.svg",
            iconSize: [30, 30],
        });
    }

    let nearestButcherIcon = null;
    if (status === 'fetched') {
        nearestButcherIcon = L.icon({
            iconUrl: "/nearestButcherIcon.svg",
            iconSize: [38, 38],
        });
    }

    let pinIcon = null;
    if (status === 'fetched') {
        pinIcon = L.icon({
            iconUrl: "/pinIcon.svg",
            iconSize: [30, 30],
        });
    }

    const markerClicked = (properties) => {
        setActiveButcher(properties);
    }

    const handleSearch = async () => {
        console.log("Searching for location:", searchLocation);
        nearestButcherIcon = null;

        try {
            const response = await axios.get(`https://nominatim.openstreetmap.org/search?q=${searchLocation}&format=json&limit=1`);
            console.log("Response from geocoding API:", response.data);
            if (response.data && response.data.length > 0) {
                const { lat, lon } = response.data[0];
                console.log("Geocoded Location:", lat, lon);
                setSearchedLocation({ lat, lon });
                if (mapRef.current) {
                    console.log("Panning to searched location:", lat, lon);
                    mapRef.current.setView([lat, lon], 12);
                    console.log("Map panned to searched location.");
                }

                console.log("Resetting userMarker to null.");
                setUserMarker(null);
            } else {
                console.log("Location not found");
            }
        } catch (error) {
            console.error("Error geocoding location:", error);
        }
    };

    const milesToDegrees = (miles) => {
        return miles / 69;
    };

    useEffect(() => {
        let timeoutId;

        const delayedSearch = () => {
            clearTimeout(timeoutId);

            timeoutId = setTimeout(() => {
                if (searchLocation.trim() !== "") {
                    handleSearch();
                }
            }, 500);
        };

        delayedSearch();

        return () => clearTimeout(timeoutId);
    }, [searchLocation]);


    const handleCurrentLocationClick = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    console.log("User's current location:", latitude, longitude);
                    setSearchedLocation({ lat: latitude, lon: longitude });
                    setUserMarker({ lat: latitude, lon: longitude }); // Set userMarker state
                    if (mapRef.current) {
                        console.log("Panning to user's current location:", latitude, longitude);
                        mapRef.current.setView([latitude, longitude], 10.5);
                        console.log("Map panned to user's current location.");
                    }

                    console.log("Resetting searchLocation to empty string.");
                    setSearchLocation("");

                    // Trigger logic to find nearest halal butcher
                    findNearestButcher(latitude, longitude);
                },
                (error) => {
                    console.error("Error getting user's location:", error);
                }
            );
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    };

    const findNearestButcher = async (latitude, longitude) => {
        try {
            let nearestButcher = null;
            let minDistance = Infinity;

            // Loop through each butcher location
            for (const location of butchers) {
                if (location.latitude && location.longitude) {
                    // Calculate distance between user's location and butcher location
                    const distance = calculateDistance(latitude, longitude, parseFloat(location.latitude), parseFloat(location.longitude));

                    // Update nearestButcher if this location is closer
                    if (distance < minDistance) {
                        minDistance = distance;
                        nearestButcher = location;
                    }
                }
            }

            // Set the nearest butcher in the state
            if (nearestButcher) {
                setNearestButcher(nearestButcher);
                setNearestButcherPopupOpen(true);
            }
        } catch (error) {
            console.error("Error finding nearest butcher:", error);
        }
    };

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radius of the Earth in km
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Distance in km
        return distance;
    };

    const deg2rad = (deg) => {
        return deg * (Math.PI / 180);
    };



    return (
        <>
            <div className="container-fluid">
                <div className="crosshairs-box" onClick={handleCurrentLocationClick}>
                    {/* <div className="crosshairs-box" > */}
                    <FontAwesomeIcon className="crosshairs" icon={faCrosshairs} />
                </div>

                <div className="border-container">

                    <div className="input-group mb-3">

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter location or postcode.."
                            value={searchLocation}
                            onChange={(e) => setSearchLocation(e.target.value)}
                        />
                        <div className="input-group-append">
                            <select
                                className="form-control"
                                value={radius}
                                onChange={(e) => setRadius(parseInt(e.target.value))}
                            >
                                <option value={2}>2 miles</option>
                                <option value={5}>5 miles</option>
                                <option value={10}>10 miles</option>
                                <option value={15}>15 miles</option>
                                <option value={20}>20 miles</option>
                            </select>
                        </div>
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary mapSearch" type="button" onClick={handleSearch}>
                                <FontAwesomeIcon icon={faSearch} />
                            </button>
                        </div>
                    </div>


                    <MapContainer
                        center={position}
                        zoom={8}
                        scrollWheelZoom={true}
                        className="map"
                        ref={mapRef}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />


                        {status === 'fetched' && (
                            <>
                                {butchers.map((location) => {
                                    if (location.latitude && location.longitude) {
                                        const distance = searchedLocation ? Math.sqrt((parseFloat(location.latitude) - searchedLocation.lat) ** 2 + (parseFloat(location.longitude) - searchedLocation.lon) ** 2) : null;

                                        // Determine the icon based on distance and whether it's the nearest butcher
                                        const icon = distance && distance < milesToDegrees(radius)
                                            ? nearestButcher === location
                                                ? nearestButcherIcon
                                                : butcherIcon
                                            : redMarkerIcon;

                                        return (
                                            <Marker
                                                key={location.id}
                                                position={[parseFloat(location.latitude), parseFloat(location.longitude)]}
                                                icon={icon}
                                                onClick={() => markerClicked(location)}
                                            >
                                                <Popup className="custom-popup">
                                                    <div>
                                                        <h3>
                                                            <Link to={`/butchers/${location.title}`}>
                                                                {location.title}
                                                            </Link>
                                                        </h3>
                                                        <div className="info-container">
                                                            <div className="rating-info">
                                                                <Stars selectedStars={location.ratings} />
                                                                <p className="reviews-count">{location.reviews_no}</p>
                                                            </div>
                                                            <p className="category-info">{location.category}</p>
                                                        </div>
                                                        <div className="icons-container">
                                                            <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location.title)}`}>
                                                                <FontAwesomeIcon icon={faDirections} />
                                                            </a>
                                                            <Link to={`/butchers/${location.title}`}>
                                                                <FontAwesomeIcon icon={faShoppingBasket} />
                                                            </Link>
                                                            <Link to="/reviews">
                                                                <FontAwesomeIcon icon={faComment} />
                                                            </Link>
                                                        </div>
                                                        <div className="address-info">
                                                            <p>
                                                                <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location.title)}`}>
                                                                    {location.address}
                                                                </a>
                                                            </p>
                                                            <p>
                                                                <a href={`tel:${location.phone_number}`} style={{ textDecoration: 'none', marginLeft: '5px' }}>
                                                                    <div className="contact-info-footer">
                                                                        <FontAwesomeIcon icon={faPhone} className="popup-phone" />
                                                                        {location.phone_number}
                                                                    </div>
                                                                </a>
                                                            </p>
                                                            <OpeningHoursDisplay openingHours={location.opening} />
                                                        </div>
                                                    </div>
                                                </Popup>
                                            </Marker>
                                        );
                                    }
                                    return null;
                                })}


                            </>

                        )}

                    </MapContainer>


                    {/* <Search butchers={butchers} /> */}
                    {/* <Search foods={foods} /> */}

                </div>
            </div>

            <Footer />
        </>

    );
};

const getCurrentDayOpeningHours = (openingHours) => {
    const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    const hours = openingHours[currentDay];

    return hours ? <li><strong>{currentDay}:</strong> {hours}</li> : <li>Closed today.</li>;
};

export default Map3;
