import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDirections, faShoppingBasket, faStar, faComment, faCrosshairs, faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import useFetchData from "./useFetchData";
import 'leaflet/dist/leaflet.css';
import Stars from "./Stars";
import Footer from "./Footer/Footer";

const Map = ({ userLocation }) => {
  const { status, butchers } = useFetchData();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeButcher, setActiveButcher] = useState({});
  const [userMarker, setUserMarker] = useState(null);
  const [nearestButcher, setNearestButcher] = useState(null);
  const [nearestButcherPopupOpen, setNearestButcherPopupOpen] = useState(false);
  const mapRef = useRef();

  const position = [55.860916, -4.251433];

  let currentLocationIcon = null;
  if (status === 'fetched') {
    currentLocationIcon = L.icon({
      iconUrl: "/locationIcon.svg",
      iconSize: [30, 30],
    });
  }

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

  const handleCurrentLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserMarker({
            lat: position.coords.latitude,
            long: position.coords.longitude,
          });
          if (mapRef.current) {
            const map = mapRef.current;
            map.flyTo([position.coords.latitude, position.coords.longitude], 11, {
              duration: 1, // Duration of the animation in seconds
              easeLinearity: 0.5 // A decimal less than 1 that determines the rate of deceleration during animation
            });
          }
        },
        (error) => {
          console.error("Error getting user location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }



  const handleNearestButcherClick = () => {
    if (userMarker) {
      // Calculate distance to each butcher and find the nearest one
      const distances = butchers.map(butcher => ({
        id: butcher.id,
        distance: calculateDistance(
          userMarker.lat,
          userMarker.long,
          parseFloat(butcher.latitude),
          parseFloat(butcher.longitude)
        )
      }));
      const nearest = distances.reduce((prev, current) =>
        prev.distance < current.distance ? prev : current
      );
      const nearestButcher = filteredLocations.find(location => location.id === nearest.id);
      if (nearestButcher) {
        setNearestButcher(nearestButcher.id);
        setNearestButcherPopupOpen(true); // Open the popup
        const map = mapRef.current;
        map.flyTo([nearestButcher.latitude, nearestButcher.longitude], 13, {
          duration: 1,
          easeLinearity: 0.5
        });
      }
    }
  }


  const handleSearch = async () => {
    if (!searchQuery) {
      return; // Do nothing if searchQuery is empty
    }
  
    try {
      // Make a request to the Nominatim API to geocode the entered location (town)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`
      );
  
      if (!response.ok) {
        throw new Error('Failed to fetch location data');
      }
  
      const data = await response.json();
  
      if (data.length === 0) {
        throw new Error('No results found');
      }
  
      // Extract the latitude and longitude coordinates of the first result
      const { lat, lon } = data[0];
  
      // Update state with the coordinates of the searched location
      setUserMarker({ lat: parseFloat(lat), long: parseFloat(lon) });
  
      // Calculate the nearest butcher using the obtained coordinates
      const nearestButcher = handleNearestButcherClick(parseFloat(lat), parseFloat(lon));
  
      // Update state with the nearest butcher
      setNearestButcher(nearestButcher);
  
    } catch (error) {
      console.error('Error searching:', error.message);
      // Handle errors (e.g., display an error message to the user)
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
    const d = R * c; // Distance in km
    return d;
  }

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180)
  }

  useEffect(() => {
    if (userLocation && userLocation.lat && userLocation.long) {
      setUserMarker({
        lat: userLocation.lat,
        long: userLocation.long,
      });
    }
  }, [userLocation, nearestButcherPopupOpen]);

  const filteredLocations = butchers.filter((location) => {
    const lowerCaseQuery = searchQuery.toLowerCase();

    const titleMatch = location.title.toLowerCase().includes(lowerCaseQuery);
    const categoryMatch = location.category.toLowerCase().includes(lowerCaseQuery);

    return titleMatch || categoryMatch;
  });

  return (
    <>
      <div className="container-fluid">
        <div className="inner-container">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text crosshairs-box" style={{ cursor: "pointer" }} onClick={handleCurrentLocationClick}>
                <FontAwesomeIcon className="crosshairs" icon={faLocationArrow} />
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Search butchers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="button">
                Search
              </button>
            </div>
          </div>
  
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
  
            {status === 'fetched' && (
              <>
               {filteredLocations.map((location) =>
  location.latitude && location.longitude ? (
    <Marker
      key={location.id}
      position={[parseFloat(location.latitude), parseFloat(location.longitude)]}
      icon={butcherIcon}
      onClick={() => markerClicked(location)}
    >
      <Popup className="custom-popup">
        <div>
          <h3>{location.title}</h3>
          <div className="info-container">
            <div className="rating-info">
              <Stars selectedStars={location.ratings} />
              <p className="reviews-count">{location.reviews_no}</p>
            </div>
            <p className="category-info">{location.category}</p>
          </div>
          <div className="icons-container">
            <FontAwesomeIcon icon={faDirections} />
            {/* Update the link to navigate to the butcher's title */}
            <Link to={`/butchers/${location.title}`}>
              <FontAwesomeIcon icon={faShoppingBasket} />
            </Link>
            <Link to="/reviews">
              <FontAwesomeIcon icon={faComment} />
            </Link>
          </div>
          <div className="address-info">
            <p>{location.address}</p>
            <p>{location.contact}</p>
            <p>Opening Hours Today:</p>
            {getCurrentDayOpeningHours(location.opening)}
          </div>
        </div>
      </Popup>
    </Marker>
  ) : null
  )}
  
              </>
            )}
  
            {userMarker && (
              <Marker position={[userMarker.lat, userMarker.long]} icon={pinIcon}>
                <Popup id="location-popup">Your location</Popup>
              </Marker>
            )}
  
            {nearestButcher && (
              filteredLocations.find(location => location.id === nearestButcher) &&
              <Marker
                position={[
                  parseFloat(filteredLocations.find(location => location.id === nearestButcher).latitude),
                  parseFloat(filteredLocations.find(location => location.id === nearestButcher).longitude)
                ]}
                icon={redMarkerIcon}
              >
                <Popup className="custom-popup" open={nearestButcherPopupOpen}>
                  <div>
                    <h3>{filteredLocations.find(location => location.id === nearestButcher).title}</h3>
                    <div className="info-container">
                      <div className="rating-info">
                        <Stars selectedStars={filteredLocations.find(location => location.id === nearestButcher).ratings} />
                        <p className="reviews-count">{filteredLocations.find(location => location.id === nearestButcher).reviews_no}</p>
                      </div>
                      <p className="category-info">{filteredLocations.find(location => location.id === nearestButcher).category}</p>
                    </div>
                    <div className="icons-container">
                      <FontAwesomeIcon icon={faDirections} />
                      <FontAwesomeIcon icon={faShoppingBasket} />
                      <Link to="/reviews">
                        <FontAwesomeIcon icon={faComment} />
                      </Link>
                    </div>
                    <div className="address-info">
                      <p>{filteredLocations.find(location => location.id === nearestButcher).address}</p>
                      <p>{filteredLocations.find(location => location.id === nearestButcher).contact}</p>
                      <p>Opening Hours Today:</p>
                      {getCurrentDayOpeningHours(filteredLocations.find(location => location.id === nearestButcher).opening)}
                    </div>
                  </div>
                </Popup>
              </Marker>
            )}
  
          </MapContainer>
  
          <div className="info">
            The butchers you have currently selected is {activeButcher.title}.
          </div>
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


export default Map;









































































































// import React, { useState, useEffect, useRef } from "react";
// import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
// import L from "leaflet";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faDirections, faShoppingBasket, faComment, faSearch, faLocationArrow } from '@fortawesome/free-solid-svg-icons';
// import { Link } from 'react-router-dom';
// import useFetchData from "./useFetchData";
// import 'leaflet/dist/leaflet.css';
// import Stars from "./Stars";
// import Footer from "./Footer/Footer";
// import axios from "axios";

// const Map = ({ userLocation }) => {
//   const { status, butchers } = useFetchData();

//   const [searchQuery, setSearchQuery] = useState("");
//   const [activeButcher, setActiveButcher] = useState({});
//   const [userMarker, setUserMarker] = useState(null);
//   const [searchedLocation, setSearchedLocation] = useState(null);
//   const [radius, setRadius] = useState(5); // Default radius of 5 miles
//   const mapRef = useRef();

//   const position = [55.860916, -4.251433];

//   let currentLocationIcon = null;
//   if (status === 'fetched') {
//     currentLocationIcon = L.icon({
//       iconUrl: "/locationIcon.svg",
//       iconSize: [30, 30],
//     });
//   }

//   let butcherIcon = null;
//   if (status === 'fetched') {
//     butcherIcon = L.icon({
//       iconUrl: "/markerIcon.svg",
//       iconSize: [30, 30],
//     });
//   }

//   let redMarkerIcon = null;
//   if (status === 'fetched') {
//     redMarkerIcon = L.icon({
//       iconUrl: "/redMarkerIcon.svg",
//       iconSize: [38, 38],
//     });
//   }

//   let pinIcon = null;
//   if (status === 'fetched') {
//     pinIcon = L.icon({
//       iconUrl: "/pinIcon.svg",
//       iconSize: [30, 30],
//     });
//   }

//   const markerClicked = (properties) => {
//     setActiveButcher(properties);
//   }

//   const handleCurrentLocationClick = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setUserMarker({
//             lat: position.coords.latitude,
//             long: position.coords.longitude,
//           });
//           if (mapRef.current) {
//             const map = mapRef.current;
//             map.flyTo([position.coords.latitude, position.coords.longitude], 11, {
//               duration: 1, // Duration of the animation in seconds
//               easeLinearity: 0.5 // A decimal less than 1 that determines the rate of deceleration during animation
//             });
//             handleNearestButcherClick(position.coords.latitude, position.coords.longitude);
//           }
//         },
//         (error) => {
//           console.error("Error getting user location:", error.message);
//         }
//       );
//     } else {
//       console.error("Geolocation is not supported by this browser.");
//     }
//   }

//   const handleNearestButcherClick = (lat, lon) => {
//     if (lat && lon) {
//       // Calculate distance to each butcher and find the nearest one
//       const distances = butchers.map(butcher => ({
//         id: butcher.id,
//         distance: calculateDistance(
//           lat,
//           lon,
//           parseFloat(butcher.latitude),
//           parseFloat(butcher.longitude)
//         )
//       }));
//       const nearest = distances.reduce((prev, current) =>
//         prev.distance < current.distance ? prev : current
//       );
//       const nearestButcher = butchers.find(location => location.id === nearest.id);
//       if (nearestButcher) {
//         setSearchedLocation({ lat, lon });
//         const map = mapRef.current;
//         map.flyTo([parseFloat(nearestButcher.latitude), parseFloat(nearestButcher.longitude)], 13, {
//           duration: 1,
//           easeLinearity: 0.5
//         });
//       }
//     }
//   }

//   const calculateDistance = (lat1, lon1, lat2, lon2) => {
//     const R = 6371; // Radius of the earth in km
//     const dLat = deg2rad(lat2 - lat1);
//     const dLon = deg2rad(lon2 - lon1);
//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
//       Math.sin(dLon / 2) * Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     const d = R * c; // Distance in km
//     return d;
//   }

//   const deg2rad = (deg) => {
//     return deg * (Math.PI / 180)
//   }

//   const handleSearch = async () => {
//     console.log("Searching for location:", searchQuery);
//     try {
//       if (searchQuery.trim() === "") {
//         // If searchQuery is empty, reset to default coordinates
//         setSearchedLocation(null);
//         return;
//       }
  
//       const response = await axios.get(`https://nominatim.openstreetmap.org/search?q=${searchQuery}&format=json&limit=1`);
//       if (response.data && response.data.length > 0) {
//         const { lat, lon } = response.data[0];
//         console.log("Geocoded Location:", lat, lon);
  
//         // Update the searched location state
//         setSearchedLocation({ lat, lon });
  
//         // Pan to the searched location
//         if (mapRef.current) {
//           mapRef.current.setView([lat, lon], 13);
//         }
//       } else {
//         console.log("Location not found");
//       }
//     } catch (error) {
//       console.error("Error geocoding location:", error);
//     }
//   };
  

//   // Convert miles to degrees
//   const milesToDegrees = (miles) => {
//     return miles / 69; // Approximate conversion, adjust as needed
//   };

//   // Trigger search when input changes
//   useEffect(() => {
//     // Only trigger search if searchQuery is not empty
//     if (searchQuery.trim() !== "") {
//       handleSearch();
//     }
//   }, [searchQuery]); // No need to include radius as a dependency

//   // Function to handle search button click
//   const handleSearchButtonClick = () => {
//     handleSearch();
//   };

//   return (
//     <>
//       <div className="container-fluid">
//         <div className="inner-container">
//           <div className="input-group mb-3">
//             <div className="input-group-prepend">
//               <span className="input-group-text crosshairs-box" style={{ cursor: "pointer" }} onClick={handleCurrentLocationClick}>
//                 <FontAwesomeIcon className="crosshairs" icon={faLocationArrow} />
//               </span>
//             </div>
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Search butchers..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             <div className="input-group-append">
//               <button className="btn btn-outline-secondary" type="button" onClick={handleSearchButtonClick}>
//                 <FontAwesomeIcon icon={faSearch} />
//               </button>
//             </div>
//           </div>

//           {userMarker && (
//             <button className="btn btn-primary" onClick={() => handleNearestButcherClick(userMarker.lat, userMarker.long)}>
//               Nearest halal butcher
//             </button>
//           )}

//           <MapContainer
//             center={position}
//             zoom={9}
//             scrollWheelZoom={true}
//             className="map"
//             ref={mapRef}
//           >
//             <TileLayer
//               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />

//             {searchedLocation && (
//               <Circle
//                 center={[searchedLocation.lat, searchedLocation.lon]}
//                 pathOptions={{ color: 'blue', fillColor: 'blue', fillOpacity: 0.2 }}
//                 radius={milesToDegrees(radius)}
//               />
//             )}

//             {status === 'fetched' && (
//               <>
//                 {butchers.map((location) =>
//                   location.latitude && location.longitude ? (
//                     <Marker
//                       key={location.id}
//                       position={[parseFloat(location.latitude), parseFloat(location.longitude)]}
//                       icon={butcherIcon}
//                       onClick={() => markerClicked(location)}
//                     >
//                       <Popup className="custom-popup">
//                         <div>
//                           <h3>{location.title}</h3>
//                           <div className="info-container">
//                             <div className="rating-info">
//                               <Stars selectedStars={location.ratings} />
//                               <p className="reviews-count">{location.reviews_no}</p>
//                             </div>
//                             <p className="category-info">{location.category}</p>
//                           </div>
//                           <div className="icons-container">
//                             <FontAwesomeIcon icon={faDirections} />
//                             {/* Update the link to navigate to the butcher's title */}
//                             <Link to={`/butchers/${location.title}`}>
//                               <FontAwesomeIcon icon={faShoppingBasket} />
//                             </Link>
//                             <Link to="/reviews">
//                               <FontAwesomeIcon icon={faComment} />
//                             </Link>
//                           </div>
//                           <div className="address-info">
//                             <p>{location.address}</p>
//                             <p>{location.contact}</p>
//                             <p>Opening Hours Today:</p>
//                             {getCurrentDayOpeningHours(location.opening)}
//                           </div>
//                         </div>
//                       </Popup>
//                     </Marker>
//                   ) : null
//                 )}
//               </>
//             )}

//             {userMarker && (
//               <Marker position={[userMarker.lat, userMarker.long]} icon={pinIcon}>
//                 <Popup id="location-popup">Your location</Popup>
//               </Marker>
//             )}
//           </MapContainer>

//           <div className="info">
//             The butchers you have currently selected is {activeButcher.title}.
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// const getCurrentDayOpeningHours = (openingHours) => {
//   const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });
//   const hours = openingHours[currentDay];

//   return hours ? <li><strong>{currentDay}:</strong> {hours}</li> : <li>Closed today.</li>;
// };

// export default Map;


























































// import React, { useState, useEffect, useRef } from "react";
// import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
// import L from "leaflet";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faDirections, faShoppingBasket, faComment, faSearch, faLocationArrow } from '@fortawesome/free-solid-svg-icons';
// import { Link } from 'react-router-dom';
// import useFetchData from "./useFetchData";
// import 'leaflet/dist/leaflet.css';
// import Search from "./Search";
// import Stars from "./Stars";
// import axios from 'axios'; // If you choose Axios

// const Map2 = ({ userLocation }) => {
//     const { status, butchers } = useFetchData();

//     const [activeButcher, setActiveButcher] = useState({});
//     const [userMarker, setUserMarker] = useState(null);
//     const [searchLocation, setSearchLocation] = useState("");
//     const [radius, setRadius] = useState(5); // Default radius of 5 miles
//     const [searchedLocation, setSearchedLocation] = useState(null); // to store searched location
//     const [nearestButcher, setNearestButcher] = useState(null); // Nearest halal butcher
//     const mapRef = useRef();

//     // Define position for the map center
//     const position = [55.860916, -4.251433];

//     const butcherIcon = status === 'fetched' ? L.icon({
//         iconUrl: "/markerIcon.svg",
//         iconSize: [30, 30],
//     }) : null;

//     const redMarkerIcon = status === 'fetched' ? L.icon({
//         iconUrl: "/redMarkerIcon.svg",
//         iconSize: [30, 30],
//     }) : null;

//     // Define pinIcon for user's location
//     const pinIcon = status === 'fetched' ? L.icon({
//         iconUrl: "/locationIcon.svg",
//         iconSize: [30, 30],
//     }) : null;


//     const markerClicked = (properties) => {
//         setActiveButcher(properties);
//     };
    
//     // Function to handle the click event for getting current location
//     const handleCurrentLocationClick = () => {
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(
//                 (position) => {
//                     setUserMarker({
//                         lat: position.coords.latitude,
//                         long: position.coords.longitude,
//                     });
//                     if (mapRef.current) {
//                         const map = mapRef.current;
//                         map.flyTo([position.coords.latitude, position.coords.longitude], 11, {
//                             duration: 1,
//                             easeLinearity: 0.5
//                         });
//                     }
//                 },
//                 (error) => {
//                     console.error("Error getting user location:", error.message);
//                 }
//             );
//         } else {
//             console.error("Geolocation is not supported by this browser.");
//         }
//     };

//     // Function to find the nearest halal butcher based on user's location
//     const findNearestButcher = () => {
//         if (userMarker && mapRef.current) {
//             const distances = butchers.map(butcher => ({
//                 id: butcher.id,
//                 distance: calculateDistance(
//                     userMarker.lat,
//                     userMarker.long,
//                     parseFloat(butcher.latitude),
//                     parseFloat(butcher.longitude)
//                 )
//             }));
//             const nearest = distances.reduce((prev, current) =>
//                 prev.distance < current.distance ? prev : current
//             );
//             const nearestButcher = butchers.find(butcher => butcher.id === nearest.id);
//             if (nearestButcher) {
//                 setNearestButcher(nearestButcher);
//                 const map = mapRef.current;
//                 map.flyTo([nearestButcher.latitude, nearestButcher.longitude], 13, {
//                     duration: 1,
//                     easeLinearity: 0.5
//                 });
//             }
//         } else {
//             console.log("User marker or mapRef.current is not properly set.");
//         }
//     };



    
    
//     // Function to calculate distance between two points using Haversine formula
//     const calculateDistance = (lat1, lon1, lat2, lon2) => {
//         const R = 6371; // Radius of the Earth in kilometers
//         const dLat = deg2rad(lat2 - lat1);
//         const dLon = deg2rad(lon2 - lon1);
//         const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//             Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
//             Math.sin(dLon / 2) * Math.sin(dLon / 2);
//         const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//         const d = R * c; // Distance in kilometers
//         return d;
//     };

//     // Function to convert degrees to radians
//     const deg2rad = (deg) => {
//         return deg * (Math.PI / 180)
//     };

//     // Function to handle search button click
//     const handleSearchButtonClick = () => {
//         handleSearch();
//     };

//     // Function to handle search
//     const handleSearch = async () => {
//         console.log("Searching for location:", searchLocation);
//         try {
//             const response = await axios.get(`https://nominatim.openstreetmap.org/search?q=${searchLocation}&format=json&limit=1`);
//             if (response.data && response.data.length > 0) {
//                 const { lat, lon } = response.data[0];
//                 console.log("Geocoded Location:", lat, lon);

//                 // Update the searched location state
//                 setSearchedLocation({ lat, lon });

//                 // Pan to the searched location
//                 if (mapRef.current) {
//                     mapRef.current.setView([lat, lon], 13);
//                 }
//             } else {
//                 console.log("Location not found");
//             }
//         } catch (error) {
//             console.error("Error geocoding location:", error);
//         }
//     };

//     // Convert miles to degrees
//     const milesToDegrees = (miles) => {
//         return miles / 69; // Approximate conversion, adjust as needed
//     };

//     // Trigger search when input changes
//     useEffect(() => {
//         // Only trigger search if searchLocation is not empty
//         if (searchLocation.trim() !== "") {
//             handleSearch();
//         }

//         // Update userMarker based on userLocation
//         if (userLocation && userLocation.lat && userLocation.long) {
//             setUserMarker({
//                 lat: userLocation.lat,
//                 long: userLocation.long,
//             });
//         }
//     }, [searchLocation, userLocation]);

//     // Find nearest butcher when userMarker changes
//     useEffect(() => {
//         findNearestButcher();
//     }, [userMarker]);

//     return (
//         <div className="container-fluid">
//             <div className="inner-container">
//                 <div className="input-group mb-3">
//                     <span className="input-group-text crosshairs-box" style={{ cursor: "pointer" }} onClick={handleCurrentLocationClick}>
//                         <FontAwesomeIcon className="crosshairs" icon={faLocationArrow} />
//                     </span>
//                     <input
//                         type="text"
//                         className="form-control"
//                         placeholder="Search location..."
//                         value={searchLocation}
//                         onChange={(e) => setSearchLocation(e.target.value)}
//                     />
//                     <div className="input-group-append">
//                         {/* Dropdown for selecting radius */}
//                         <select
//                             className="form-control"
//                             value={radius}
//                             onChange={(e) => setRadius(parseInt(e.target.value))}
//                         >
//                             <option value={2}>2 miles</option>
//                             <option value={5}>5 miles</option>
//                             <option value={10}>10 miles</option>
//                             <option value={15}>15 miles</option>
//                             <option value={20}>20 miles</option>
//                             {/* Add more options as needed */}
//                         </select>
//                     </div>
//                     <div className="input-group-append">
//                         {/* Search button */}
//                         <button className="btn btn-outline-secondary" type="button" onClick={handleSearchButtonClick}>
//                             <FontAwesomeIcon icon={faSearch} />
//                         </button>
//                     </div>
//                 </div>

//                 <MapContainer
//                     center={position}
//                     zoom={8}
//                     scrollWheelZoom={true}
//                     className="map"
//                     whenCreated={(mapInstance) => {
//                         mapRef.current = mapInstance;
//                     }}
//                 >
//                     <TileLayer
//                         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                     />

//                     {searchedLocation && (
//                         <Circle
//                             center={[searchedLocation.lat, searchedLocation.lon]}
//                             pathOptions={{ color: 'blue', fillColor: 'blue', fillOpacity: 0.2 }}
//                             radius={milesToDegrees(radius)}
//                         />
//                     )}

//                     {status === 'fetched' && (
//                         <>
//                             {butchers.map((location) => {
//                                 if (location.latitude && location.longitude) {
//                                     const distance = searchedLocation ? Math.sqrt((parseFloat(location.latitude) - searchedLocation.lat) ** 2 + (parseFloat(location.longitude) - searchedLocation.lon) ** 2) : null;
//                                     const icon = distance && distance < milesToDegrees(radius) ? redMarkerIcon : butcherIcon;
//                                     return (
//                                         <Marker
//                                             key={location.id}
//                                             position={[parseFloat(location.latitude), parseFloat(location.longitude)]}
//                                             icon={icon}
//                                             onClick={() => markerClicked(location)}
//                                         >
//                                             <Popup className="custom-popup">
//                                                 <div>
//                                                     <h3>{location.title}</h3>
//                                                     <div className="info-container">
//                                                         <div className="rating-info">
//                                                             <Stars selectedStars={location.ratings} />
//                                                             <p className="reviews-count">{location.reviews_no}</p>
//                                                         </div>
//                                                         <p className="category-info">{location.category}</p>
//                                                     </div>
//                                                     <div className="icons-container">
//                                                         <FontAwesomeIcon icon={faDirections} />
//                                                         {/* Update the link to navigate to the butcher's title */}
//                                                         <Link to={`/butchers/${location.title}`}>
//                                                             <FontAwesomeIcon icon={faShoppingBasket} />
//                                                         </Link>
//                                                         <Link to="/reviews">
//                                                             <FontAwesomeIcon icon={faComment} />
//                                                         </Link>
//                                                     </div>
//                                                     <div className="address-info">
//                                                         <p>{location.address}</p>
//                                                         <p>{location.contact}</p>
//                                                         <p>Opening Hours Today:</p>
//                                                         {getCurrentDayOpeningHours(location.opening)}
//                                                     </div>
//                                                 </div>
//                                             </Popup>
//                                         </Marker>
//                                     );
//                                 }
//                                 return null;
//                             })}
//                         </>
//                     )}

//                     {userMarker && (
//                         <Marker position={[userMarker.lat, userMarker.long]} icon={pinIcon}>
//                             <Popup id="location-popup">Your location</Popup>
//                         </Marker>
//                     )}

//                     {nearestButcher && (
//                         <Marker position={[nearestButcher.latitude, nearestButcher.longitude]} icon={redMarkerIcon}>
//                             <Popup className="custom-popup">
//                                 <div>
//                                     <h3>{nearestButcher.title}</h3>
//                                     <div className="info-container">
//                                         <div className="rating-info">
//                                             <Stars selectedStars={nearestButcher.ratings} />
//                                             <p className="reviews-count">{nearestButcher.reviews_no}</p>
//                                         </div>
//                                         <p className="category-info">{nearestButcher.category}</p>
//                                     </div>
//                                     <div className="icons-container">
//                                         <FontAwesomeIcon icon={faDirections} />
//                                         {/* Update the link to navigate to the nearest butcher's title */}
//                                         <Link to={`/butchers/${nearestButcher.title}`}>
//                                             <FontAwesomeIcon icon={faShoppingBasket} />
//                                         </Link>
//                                         <Link to="/reviews">
//                                             <FontAwesomeIcon icon={faComment} />
//                                         </Link>
//                                     </div>
//                                     <div className="address-info">
//                                         <p>{nearestButcher.address}</p>
//                                         <p>{nearestButcher.contact}</p>
//                                         <p>Opening Hours Today:</p>
//                                         {getCurrentDayOpeningHours(nearestButcher.opening)}
//                                     </div>
//                                 </div>
//                             </Popup>
//                         </Marker>
//                     )}
//                 </MapContainer>

//                 <div className="info">
//                     The butchers you have currently selected is {activeButcher.title}.
//                 </div>
//             </div>
//         </div>
//     );
// };

// // Function to get opening hours for the current day
// const getCurrentDayOpeningHours = (openingHours) => {
//     const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });
//     const hours = openingHours[currentDay];

//     return hours ? <li><strong>{currentDay}:</strong> {hours}</li> : <li>Closed today.</li>;
// };

// export default Map2;
