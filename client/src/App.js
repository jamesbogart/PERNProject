import React from 'react'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Home from "./routes/Home"
import DistanceMap from "./routes/DistanceMap"
import ZipMap from "./routes/ZipMap"
import { useHistory } from "react-router-dom";
import {FeaturesProvider} from './FeaturesContext'

const App = () => {
  return <div>
    <FeaturesProvider>
      <Router>
          <Switch>
          <Route exact path = '/' component={Home}/>
          <Route exact path = '/nearest' component={DistanceMap}/>
          <Route exact path = '/zipsearch' component={ZipMap}/>
          </Switch>
      </Router>
    </FeaturesProvider>  
  </div>
}

export default App;