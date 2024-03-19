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

const Map = ({ userLocation }) => {
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

    const position = [55.860916, -4.251433];
    let butcherIcon = null;
    if (status === 'fetched') {
        butcherIcon = L.icon({
            iconUrl: "/markerIcon.svg",
            iconSize: [30, 30],
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
            iconSize: [30, 30],
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
                    mapRef.current.setView([lat, lon], 13);
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


    const debouncedSearch = useRef(debounce(handleSearch, 500)).current;

    const handleCurrentLocationClick = () => {
        const handleSuccess = (position) => {
            console.log("User's position retrieved successfully:", position);

            setUserMarker({
                lat: position.coords.latitude,
                long: position.coords.longitude,
            });
            console.log("userMarker state set to:", userMarker);

            if (mapRef.current) {
                const map = mapRef.current;
                map.flyTo([position.coords.latitude, position.coords.longitude], 11, {
                    duration: 1,
                    easeLinearity: 0.5
                });
                console.log("Map view flown to user's current location");
            }
        };

        const handleError = (error) => {
            console.error("Error getting user location:", error.message);
            // You can handle the error here, e.g., show a message to the user.
        };

        if (navigator.geolocation) {
            console.log("Geolocation API is supported by the browser");

            // Ask for permission
            navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
        } else {
            console.error("Geolocation is not supported by this browser.");
            // You can handle the lack of support here, e.g., show a message to the user.
        }
    };



    const handleNearestButcherClick = () => {
        if (userMarker) {
            const distances = butchers.map(butcher => ({
                id: butcher.id,
                distance: calculateDistance(
                    userMarker.lat,
                    userMarker.long,
                    parseFloat(butcher.latitude),
                    parseFloat(butcher.longitude)
                )
            }));
            setNearestButcherPopupOpen(true); // Open the popup

            const nearest = distances.reduce((prev, current) =>
                prev.distance < current.distance ? prev : current
            );
            const nearestButcher = butchers.find(location => location.id === nearest.id);
            if (nearestButcher) {
                // Set searchedLocation to the nearest butcher's location
                setSearchedLocation({ lat: parseFloat(nearestButcher.latitude), lon: parseFloat(nearestButcher.longitude) });
                if (mapRef.current) {
                    const map = mapRef.current;
                    map.flyTo([parseFloat(nearestButcher.latitude), parseFloat(nearestButcher.longitude)], 13, {
                        duration: 1,
                        easeLinearity: 0.5
                    });

                    // Trigger click event on the nearest butcher marker to display its popup
                    if (nearestButcherMarkerRef.current) {
                        console.log("About to trigger click event on nearest butcher marker");
                        nearestButcherMarkerRef.current.fireEvent("click");
                        console.log("Click event triggered on nearest butcher marker");
                    } else {
                        console.log("nearestButcherMarkerRef.current is not initialized or null");
                    }
                }
            }
        }
    };


    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radius of the earth in km
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;
        return d;
    }

    const deg2rad = (deg) => {
        return deg * (Math.PI / 180)
    }

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

    return (

        <div className="container-fluid">
            <div className="crosshairs-box" onClick={handleCurrentLocationClick}>
                <FontAwesomeIcon className="crosshairs" icon={faCrosshairs} />
            </div>

            <div className="border-container">

                <div className="input-group mb-3">

                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search location..."
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
                        <button className="btn btn-outline-secondary" type="button" onClick={handleSearch}>
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </div>
                </div>

                {/* <div className="input-group-prepend">
                    <span className=" crosshairs-box" style={{ cursor: "pointer" }} onClick={handleCurrentLocationClick}>
                        <FontAwesomeIcon className="crosshairs" icon={faCrosshairs} />
                    </span>
                </div>
 */}


                {userMarker && (
                    <button className="btn btn-primary" onClick={handleNearestButcherClick}>
                        Nearest halal butcher
                    </button>
                )}

                <MapContainer
                    center={position}
                    zoom={9}
                    scrollWheelZoom={true}
                    className="map"
                    ref={mapRef}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {/* {searchedLocation && (
                        <Circle
                            center={[searchedLocation.lat, searchedLocation.lon]}
                            pathOptions={{ color: 'blue', fillColor: 'blue', fillOpacity: 0.2 }}
                            radius={milesToDegrees(radius)}
                        />
                    )} */}

                    {status === 'fetched' && (
                        <>
                            {butchers.map((location) => {
                                if (location.latitude && location.longitude) {
                                    const distance = searchedLocation ? Math.sqrt((parseFloat(location.latitude) - searchedLocation.lat) ** 2 + (parseFloat(location.longitude) - searchedLocation.lon) ** 2) : null;
                                    const icon = distance && distance < milesToDegrees(radius) ? redMarkerIcon : butcherIcon;
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
                                                        </p>                                                     <p>Opening Hours Today:</p>
                                                        {getCurrentDayOpeningHours(location.opening)}
                                                    </div>

                                                </div>
                                            </Popup>

                                        </Marker>
                                    );
                                }
                                return null;
                            })}


                            {userMarker && (
                                <Marker position={[userMarker.lat, userMarker.long]} icon={pinIcon}>
                                    <Popup id="location-popup">Your location</Popup>
                                </Marker>
                            )}

                            {searchedLocation && nearestButcher && !searchLocation && (
                                <Marker
                                    position={[searchedLocation.lat, searchedLocation.lon]}
                                    icon={nearestButcherIcon}
                                >
                                    <Popup className="custom-popup" open={nearestButcherPopupOpen}>
                                        <div>
                                            <h3>{nearestButcher.title}</h3>
                                            <div className="info-container">
                                                <div className="rating-info">
                                                    <Stars selectedStars={nearestButcher.ratings} />
                                                    <p className="reviews-count">{nearestButcher.reviews_no}</p>
                                                </div>
                                                <p className="category-info">{nearestButcher.category}</p>
                                            </div>
                                            <div className="icons-container">
                                                <FontAwesomeIcon icon={faDirections} />
                                                <FontAwesomeIcon icon={faShoppingBasket} />
                                                <Link to="/reviews">
                                                    <FontAwesomeIcon icon={faComment} />
                                                </Link>
                                            </div>
                                            <div className="address-info">
                                                <p>{nearestButcher.address}</p>
                                                <p>{nearestButcher.contact}</p>
                                                <p>Opening Hours Today:</p>
                                                {getCurrentDayOpeningHours(nearestButcher.opening)}
                                            </div>
                                        </div>
                                    </Popup>
                                </Marker>
                            )}

                        </>
                    )}
                </MapContainer>

                {/* <div className="info">
                    The butchers you have currently selected is {activeButcher.title}.
                </div> */}
            </div>
        </div>
    );
};

const getCurrentDayOpeningHours = (openingHours) => {
    const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    const hours = openingHours[currentDay];

    return hours ? <li><strong>{currentDay}:</strong> {hours}</li> : <li>Closed today.</li>;
};

export default Map;
