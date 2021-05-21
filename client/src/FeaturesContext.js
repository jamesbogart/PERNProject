import React,{useState, createContext} from 'react'

export const FeatureContext = createContext();

export const FeaturesProvider = (props) => {
    const [features,setFeatures] = useState([])
    const [selectedFeature, setSelectedFeature] = useState('')
    return(
        <FeatureContext.Provider value={{features:[features,setFeatures], selectedfeature:[selectedFeature,setSelectedFeature]}}>
            {props.children}
        </FeatureContext.Provider>
    )
}