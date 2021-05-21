import React, { useState, useContext } from 'react'
import LocationFinder from "../API/LocationFinder";
import { useHistory } from "react-router-dom";
import axios from 'axios'
import {FeatureContext} from '../FeaturesContext'


const Location = () => {
  const {features, selectedFeature } = React.useContext(FeatureContext);
  const [queriedFeatures, setQueriedFeatures] = features;
  const [address,setAddress] = useState('')
  const [subway, setLine] = useState('')
  const [cuisine,setCuisine] = useState('')

  const handleAddressChange = (event) =>{
    setAddress(event.target.value)
  }
  const handleSubway = (event) =>{
    setLine(event.target.value)
  }
  const handleCuisineChange = (event) =>{
    setCuisine(event.target.value)
  }
  let history = useHistory();
  const sendAddress = (event) =>{
    event.preventDefault()
    const body = {address:address,subway:subway,cuisine:cuisine}
    const fetchData = async () =>{
      try{
        const response = await LocationFinder.get('/',{params:body})
        setQueriedFeatures(response.data.features[0].json_build_object)
        if (queriedFeatures.length == 0){
          alert('no features found')
        } else{
          console.log(queriedFeatures)
          history.push({
          pathname:"/nearest",
          coords: response.data.coords
        })
        }
      } catch(err){console.log(err)}  
    }
    fetchData();
  }
  

  return (
   <>   
    <form onSubmit={sendAddress}>
      <div>
          enter address: <input value={address} onChange={handleAddressChange} /> 
      </div>
      <div>
        taking a subway? what line?           
          <select value={subway} onChange={(e) => setLine(e.target.value)}>
            <option value=''>No</option>
            <option value="C">C</option>
            <option value="G">G</option>
            <option value="2">2</option>
            <option value="A">A</option>
          </select>
      </div>
        Cuisine Preference?
          <input value={cuisine} onChange={handleCuisineChange}/>
      <div>
          <button type="submit">submit</button>
      </div>
    </form>
  </>
  );
}

export default Location
