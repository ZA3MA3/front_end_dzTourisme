import React, { useState,useEffect } from 'react';
import SearchBar from './SearchBar';  
import SearchBarR from './SearchBarR';  
import SearchBarC from './SearchBarC';  

export default function Home() {
  const [showHotels, setShowHotels] = useState(true);
  const [showRestaurants, setShowRestaurants] = useState(false);
  const [showCars, setShowCars] = useState(false);


  const handleHotelsButtonClick = () => {
    setShowHotels(true);
    setShowRestaurants(false);
    setShowCars(false);
  };

  const handleRestaurantsButtonClick = () => {
    setShowHotels(false);
    setShowRestaurants(true);
    setShowCars(false);
  };

  const handleCarsButtonClick = () => {
    setShowHotels(false);
    setShowRestaurants(false);
    setShowCars(true);
  };




   const storedIsForRestaurants = JSON.parse(localStorage.getItem('isForRestaurants'));
  const storedIsForCars = JSON.parse(localStorage.getItem('isForCars'));
  console.log("isForRestaurants",storedIsForRestaurants);
  

  return (
    <div style={{width:'1366px'}}>    
      
     

    <div style={{ width: '1366px', paddingLeft: '193px', marginBottom: '0px' }}>
      <div className="vhotels-parent">
        <button onClick={handleHotelsButtonClick} style={{  border:'none',borderBottom: 'none', background: 'white' }}>
          <p className="vhotels" style={{ borderBottom: !showRestaurants && !showCars ? '2px solid black' : 'none' }}>
            Hotels
          </p>
        </button>
        <button onClick={handleRestaurantsButtonClick} style={{ border:'none',borderBottom: 'none', background: 'white' }}>
          <p className="vrestaurants" style={{ borderBottom: showRestaurants ? '2px solid black' : 'none' }}>
            Restaurants
          </p>
        </button>
        <button onClick={handleCarsButtonClick} style={{  border:'none',borderBottom: 'none', background: 'white' }}>
          <p className="vcars" style={{ borderBottom: showCars ? '2px solid black' : 'none' }}>
            Cars
          </p>
        </button>
      </div>
    </div>
    
  
      
      {showHotels    && <SearchBar />}
      {showRestaurants  && <SearchBarR />}
      {showCars && <SearchBarC />}
      
    </div>
  );
}
