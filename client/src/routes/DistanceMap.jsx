import React, { useContext } from 'react'
import { useHistory } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import "../app.css"
import {FeatureContext, FeaturesProvider} from '../FeaturesContext'
import {useLocation} from "react-router-dom";
import {Table} from '../components/Table'


//const coords = [ -73.96633891933756,40.6823254481556]

const DistanceMap = () =>{
  const { features, selectedfeature } = React.useContext(FeatureContext);
  const [queriedFeatures, setQueriedFeatures] = features;
  const [highlightedFeature, setHighlighted] = selectedfeature;  
  const location = useLocation();
  const coords = location.coords
  console.log(queriedFeatures.features)
  let history = useHistory();
  const tableData = queriedFeatures.features.map(f => f.properties)

  return(
   <div> 
    <MapContainer center={coords} zoom={16} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {queriedFeatures.features.map(park => (
        <Marker
          key={Math.floor(Math.random() * 10000000)}
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
    <button onClick = {() => history.push({pathname:"/"})}>back</button>
    <Table tabledata = {tableData}></Table>
   </div>
  )
}

export default DistanceMap
