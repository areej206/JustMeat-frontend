import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import DisplayFoodMenu from "./components/DisplayFoodMenu";
import Navigation from "./components/Navigation";
import NoPage from "./components/NoPage";
import People from "./components/People";
import Person from "./components/Person";
import Placeholder from "./components/Placeholder";
import 'bootstrap/dist/js/bootstrap.js';
import "./App.css";
import "leaflet/dist/leaflet.css";
import "bootstrap/dist/css/bootstrap.min.css";
import{staff} from './data/staff';

function App() {
  return (
    <>
      <div className="wrapper">
        <Navigation />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/aboutus" element={<People people={staff} />}>
              <Route path=":personId" element={<Person people={staff} />} />
            </Route>
            <Route path="/order" element={<DisplayFoodMenu />} />
            <Route path="/staff" element={<Placeholder />} />
            <Route path="/contactus" element={<Placeholder />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}
export default App;
