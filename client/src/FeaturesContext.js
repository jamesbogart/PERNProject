import React,{useState, createContext} from 'react'

export const FeatureContext = createContext();

export const FeaturesProvider = (props) => {
    const [features,setFeatures] = useState([])
    return(
        <FeatureContext.Provider value={[features,setFeatures]}>
            {props.children}
        </FeatureContext.Provider>
    )
}