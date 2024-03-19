// App.js

import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useLocalStorage } from "./components/useLocalStorage";
import Home from "./components/Home";
import Navigation from "./components/Navigation";
import NoPage from "./components/NoPage";
import 'bootstrap/dist/js/bootstrap.js';
import "./App.css";
import "leaflet/dist/leaflet.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Map from "./components/Map";
import Reviews from "./components/Reviews";
import ButcherMenu from "./components/ButcherMenu";
import Profile from "./components/Profile";
import ShoppingBasket from "./components/ShoppingBasket";
import Butcher from "./components/ButchersContent/Butcher";
import Butcher2 from "./components/ButchersContent/Butcher2";
import Product from "./components/ButchersContent/Product";
import About from "./components/AboutUs";
import AdditionalInformation from "./components/AdditionalInformation";
import Management from "./components/Management";
import Map2 from "./components/Map2";
import Settings from "./components/Settings";
import AccountDetails from "./components/AccountDetails";
import ProfileReviews from "./components/ProfileReviews";
import OrderHistory from "./components/OrderHistory";
import Map3 from "./components/Map3";

function App() {
  const [basketItems, setBasketItems] = useLocalStorage("basketItems", []);
  const [butcherTitle, setButcherTitle] = useState(""); // State to hold the butcherName
  const [basketItemCount, setBasketItemCount] = useState(0); // State to hold the basket item count

  const addToBasket = (item) => {
    setBasketItems(prevBasketItems => [...prevBasketItems, item]);
  };

  // Update basket item count when basket items change
  useEffect(() => {
    setBasketItemCount(basketItems.length);
  }, [basketItems]);

  console.log("Rendering App component. Basket items:", basketItems);
  console.log("Butcher Title:", butcherTitle);

  return (
    <>
      <div className="wrapper">
        <Navigation />
        {/* Conditionally render the basket item count */}
        {basketItemCount > 0 && (
          <div className={`basket-item-count ${basketItemCount === 0 ? 'hidden' : ''}`}>
            {basketItemCount}
          </div>
        )}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<Map3 />} />
            <Route path="/map1" element={<Map />} />
            <Route path="/map2" element={<Map2 />} />
            <Route path="/butchers" element={<ButcherMenu />} />
            <Route path="/butchers/:butcherTitle" element={<Butcher2 />} />
            {/* Pass addToBasket function to Product component */}
            <Route
              path="/butchers/:butcherTitle/product/:itemName"
              element={<Product addToBasket={addToBasket} setButcherTitle={setButcherTitle} />}
            />
            <Route path="/basket" element={<ShoppingBasket basketItems={basketItems} setBasketItems={setBasketItems} />} />

            <Route path="/reviews" element={<Reviews />} />

            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/system-preferences" element={<Settings />} />
            <Route path="/profile/account-details" element={<AccountDetails />} />
            <Route path="/profile/reviews" element={<ProfileReviews />} />
            <Route path="/profile/order-history" element={<OrderHistory />} />

            <Route path="/about" element={<About />} />
            <Route path="/info" element={<AdditionalInformation />} />
            <Route path="/admin" element={<Management />} />

            <Route path="*" element={<NoPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
