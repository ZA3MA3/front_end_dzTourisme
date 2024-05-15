import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams,useNavigate } from "react-router-dom";
import  './searchBarR.css'
import './searchBarC.css'



const SearchBarR = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState(localStorage.getItem('selectedTime') || '');
  const [reservationDate, setReservationDate] = useState('');
  const [query, setQuery] = useState('');
  const [clients, setClients] = useState(1);
  const [isForRestaurants, setIsForRestaurants] = useState(false); // Default value
  const [isForCars, setIsForCars] = useState(false); // Default value  
  const [suggestions, setSuggestions] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(true);



  useEffect(() => {
  if (query.length >= 3) {
       
    // Make an asynchronous request to your backend API
    axios.get(`http://localhost:8080/auth/restaurantLocations/suggestions?query=${query}`)
      .then(response => {
        setSuggestions(response.data); 
        console.log('res',response.data);
      
      })
      .catch(error => {
        console.error('Error fetching suggestions:', error);
      });

    
  } else {
    // If the query is empty, clear the suggestions
    setSuggestions([]);
  }
  
 }, [query]); 

 const handleSuggestionItemClick = (suggestion) => {
     
  setQuery(suggestion.name);
  localStorage.setItem('query', suggestion.name);
  setDropdownOpen(false);
 };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleTimeSelection = (selectedTime) => {
    setTime(selectedTime);
    setIsOpen(false);
    localStorage.setItem('selectedTime', selectedTime);
  };

  const handleReservationDateChange = (event) => {
    const newReservationDate = event.target.value;
    setReservationDate(newReservationDate);
    localStorage.setItem('reservationDate', newReservationDate);
  };

  const handleQueryChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    localStorage.setItem('query', newQuery);
  };

  const handleClientsChange = (value) => {
    const newClients=Math.max(1, Math.min(6, clients + value));
    setClients(newClients);
    localStorage.setItem('clients', newClients);
    };
  

    const handleSearchClick = async () => {
      try {
         const currentClients = clients;

        
          // Update local storage with the current values
        localStorage.setItem('clients', currentClients);
        // Use axios to fetch data from the server
        const response = await axios.get(`http://localhost:8080/auth/restaurantSearch/${query}`);
       
        localStorage.setItem('isForRestaurants', JSON.stringify(true));
        localStorage.setItem('isForCars', JSON.stringify(false));      

    

       
        localStorage.setItem('isFromHotelEditButton',false);
        localStorage.setItem('isFromCarEditButton',false);
        localStorage.setItem('isFromRestaurantEditButton',false);
 
        navigate('/searchResults', { state: { results: response.data } });

       



        
      } catch (error) {
        // Handle error if needed
        console.error('Error during search:', error);
      }
    };
   

  const timeOptions = [];
  for (let i = 0; i < 24; i++) {
    for (let j = 0; j < 60; j += 30) {
      const hour = `${i < 10 ? '0' + i : i}`;
      const minute = `${j === 0 ? '00' : '30'}`;
      const timeValue = `${hour}:${minute}`;
      timeOptions.push(
        <div className="dropdown-item1" key={timeValue} onClick={() => handleTimeSelection(timeValue)}>
          {timeValue}
        </div>
      );
    }
  }

  const today = new Date();
  // Format the current date to 'YYYY-MM-DD' for the input field
  const formattedDate = today.toISOString().split('T')[0];

return(<>
    <meta charSet="utf-8" />
    <meta name="viewport" content="initial-scale=1, width=device-width" />
    <link rel="stylesheet" href="./global.css" />
    <link rel="stylesheet" href="./index.css" />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
    />
    <div className="desktop-31"  style={{width:'1366px'}}>
      
      <header className="component-21">
        <button  style={{border:'none'}}  onClick={togglePopup} className="parent-container1" >Who...</button>
        <div className="parent-container11" />
        <div className="parent-container21" />
        <div className="parent-container31" />
        <div className="parent-container41">
          <input value={query} onChange={handleQueryChange} style={{textIndent: '0px', fontSize: 18,outline: 'none',width: 150}} className="where-to1" placeholder='Where to...'></input> 
          {suggestions.length > 0 &&  dropdownOpen && (
          <div className="suggestions-dropdown">
            {suggestions.map(suggestion => (
              <div key={suggestion.id} className="suggestion-item" onClick={() => handleSuggestionItemClick(suggestion)}>
                {suggestion.name}
              </div>
            ))}
          </div>
          )}
        </div>
        <div className="reservation-date1">
          <input  type="date"id="reservationDate"name="reservationDate"onChange={handleReservationDateChange}style={{ outline: 'none' }} value={reservationDate} min={formattedDate} className="reservation-date11"></input>
        </div>
        <div className="time-wrapper1">
      {/*  <div className="time">Time</div>*/ }  
          <div  class="dropdown1">
      <div  class="dropdown-toggle1" id="dropdownMenuButton1" onClick={toggleDropdown}>
        Time {time && `- ${time}`}
      </div>
      {isOpen && (
      <div class="dropdown-menu1">
        <div class="dropdown-content1">
        {timeOptions}
        </div>
      </div>
      )}
    </div>

        </div>
        <div  className="parent-container51">
        {showPopup && (
          <div className='who1' style={{paddingTop:'40px',width:'200px',height:'200px', position: 'absolute', top: 80, left: 820, background: 'white', padding: '15px', borderRadius: '20px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', zIndex: 999 }}>
             <div style={{ fontSize: 18, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word',marginBottom: 10 }}>
              Clients <button style={{border:'none',background:'white',marginLeft:'50px'}} onClick={() => handleClientsChange(-1)}>-</button>
               {clients} 
              <button style={{border:'none',background:'white'}} onClick={() => handleClientsChange(1)}>+</button>
            </div>
            </div>
        )}
        </div>
        <button onClick={handleSearchClick}  style={{border:'none'}} className="component-2-child1" ><img
          className="search-icon1"
          loading="lazy"
          alt=""
          src="./public/search@2x.png"
        /></button>
        
      </header>
    </div>
  </>
  );



}

export default SearchBarR;
