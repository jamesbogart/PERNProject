import React from 'react'
import Location from "../components/Location";

const Home = () => {
    return (
      <div>
        <h1 className="text-center">Search</h1>
        <div> Nearest To You</div> <Location />
      </div>
    );
  };

export default Home
