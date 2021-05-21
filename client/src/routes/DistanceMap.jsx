import React, { useContext } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import "../app.css"
import {FeatureContext} from '../FeaturesContext'
import { useLocation } from "react-router-dom";

//const coords = [ -73.96633891933756,40.6823254481556]

const DistanceMap = () =>{
  const [features,setFeatures] = useContext(FeatureContext)   
  const location = useLocation();
  const coords = location.coords
  console.log(features.features)
  return(
    <MapContainer center={coords} zoom={16} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {features.features.map(park => (
        <Marker
          key={Math.floor(Math.random() * 1000000)}
          position={[
          park.geometry.coordinates[1],
          park.geometry.coordinates[0]
          ]}
        >
          <Popup>
              {park.properties.name}
              {park.properties.amenity}
          </Popup>
        </Marker>  
      ))}
    </MapContainer>
  )
}

export default DistanceMap
