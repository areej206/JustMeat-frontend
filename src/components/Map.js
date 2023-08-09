import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import cafeData from "../data/locations.json";
import { Icon } from "leaflet";

const Map = () => {
  const icon = new Icon({
    iconUrl: "/markerIcon.svg",
    iconSize: [30, 30],
  });

  // const initialMarker =  [55.86639, -4.24919]
  const initialMarker =  {}
  const [activeCafe, setActiveCafe] = useState(initialMarker);
  const position = [55.86639, -4.24919];

//   const markerClicked = (position) => {   
//     setActiveCafe(position)
// }

const markerClicked = (properties) => {   
  setActiveCafe(properties)
}




return (
    <>
      <MapContainer
        center={position}
        zoom={9}
        scrollWheelZoom={true}
        className="map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {cafeData.features.map((cafe) => (
          <Marker
            key={cafe.properties.cafe_id}
            position={[
              cafe.geometry.coordinates[0],
              cafe.geometry.coordinates[1],
            ]}
            icon={icon}
            // eventHandlers={{ click: () => markerClicked(cafe.geometry.coordinates) }}  
            eventHandlers={{ click: () => markerClicked(cafe.properties) }}  

          >
            <Popup>
              <div className="popup" role="alert">
              Here is the location of the {cafe.properties.name} cafe. <br />
                {cafe.properties.desc} <br />
              </div>
            </Popup>
          </Marker>
        ))}

      </MapContainer>
       {/* <div className="info">The cafe you have currently selected is located at latitude:{activeCafe[0]} longitude:{activeCafe[1]}.</div>  */}
       <div className="info">The cafe you have currently selected is {activeCafe.name} {activeCafe.desc}.</div>
    </>
  );
};
export default Map;

