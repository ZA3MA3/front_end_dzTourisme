import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams,useNavigate } from "react-router-dom";
import './searchBarC.css'
import  './tableSelection.css'


const SearchBarC = () => {
    const navigate=useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [pickUpTime, setPickUpTime] = useState(localStorage.getItem('selectedPickUpTime') || '');
    const [dropOffTime, setDropOffTime] = useState(localStorage.getItem('selectedDropOffTime') || '');
    const [pickUpDate, setPickUpDate] = useState('');
    const [dropOffDate, setDropOffDate] = useState('');
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(true);

    
    useEffect(() => {
      if (query.length >= 3) {
       
        // Make an asynchronous request to your backend API
        axios.get(`http://localhost:8080/auth/pick-up-locations/suggestions?query=${query}`)
          .then(response => {
            setSuggestions(response.data); 
          
          })
          .catch(error => {
            console.error('Error fetching suggestions:', error);
          });

        
      } else {
        // If the query is empty, clear the suggestions
        setSuggestions([]);
      }

     const pickUpDate= localStorage.getItem('pickUpDate');
     const selectedPickUpTime= localStorage.getItem('selectedPickUpTime');
     const dropOffDate= localStorage.getItem('dropOffDate');
     const selectedDropOffTime= localStorage.getItem('selectedDropOffTime');
     const storedQuery= localStorage.getItem('query');


     if(pickUpDate!==null){
      setPickUpDate(pickUpDate);
     }
     if(selectedPickUpTime!==null){
      setPickUpTime(selectedPickUpTime);
     }
     if(dropOffDate!==null){
      setDropOffDate(dropOffDate);
     }
     if(selectedDropOffTime!==null){
      setDropOffTime(selectedDropOffTime);
     }

     if(storedQuery!==null){
      setQuery(storedQuery);
     }


    }, [query]); 

   

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handlePickUpDateChange = (event) => {
      const newPickUpDate = event.target.value;
      setPickUpDate(newPickUpDate);
      localStorage.setItem('pickUpDate', newPickUpDate);
    };
     
    const handleDropOffDateChange = (event) => {
      
      const newDropOffDate = event.target.value;
      setDropOffDate(newDropOffDate);
      localStorage.setItem('dropOffDate', newDropOffDate);
    };

    const handlePickUpTimeSelection = (selectedpickUpTime) => {
        setPickUpTime(selectedpickUpTime);
        setIsOpen(false);
        localStorage.setItem('selectedPickUpTime', selectedpickUpTime);
      };

      
    const handleDropOffTimeSelection = (selectedDropOffTime) => {
        setDropOffTime(selectedDropOffTime);
        setIsOpen(false);
        localStorage.setItem('selectedDropOffTime', selectedDropOffTime);
      };

     
    const handleQueryChange = (event) => {
      setDropdownOpen(true);
      const newQuery = event.target.value;
      setQuery(newQuery);
      localStorage.setItem('query', newQuery);
    }; 

    const handleSuggestionItemClick = (suggestion) => {
     
      setQuery(suggestion.name);
      localStorage.setItem('query', suggestion.name);
      setDropdownOpen(false);
    };


    const formatTime = (timeString) => {
        const [hours, minutes] = timeString.split(':');
        const time = new Date();
        time.setHours(hours);
        time.setMinutes(minutes);
        return time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      };
    

    
      const handleSearchClick = async () => {
        try {        
             // Use axios to fetch data from the server
          const response = await axios.post(`http://localhost:8080/auth/carSearch/${query}`,{
            pickUp:pickUpDate,
            dropOff:dropOffDate
          });

          localStorage.setItem('query', query); 
          localStorage.setItem('isForCars', JSON.stringify(true));   
          localStorage.setItem('isForRestaurants', JSON.stringify(false));
            

          console.log("responsecars",response.data);
         
          localStorage.setItem('isFromHotelEditButton',false);
          localStorage.setItem('isFromCarEditButton',false);
          localStorage.setItem('isFromRestaurantEditButton',false);
   
          navigate('/searchResults', { state: { results: response.data } });

        } catch (error) {
          // Handle error if needed
          console.error('Error during search:', error);
        }
      };
       

      const pickUpTimeOptions = [];
      for (let i = 0; i < 24; i++) {
        for (let j = 0; j < 60; j += 30) {
          const hour = `${i < 10 ? '0' + i : i}`;
          const minute = `${j === 0 ? '00' : '30'}`;
          const pickUpTimeValue = `${hour}:${minute}`;
          pickUpTimeOptions.push(
            <div className="dropdown-item137" key={pickUpTimeValue} onClick={() => handlePickUpTimeSelection(pickUpTimeValue)}>
              {pickUpTimeValue}
            </div>
          );
        }
      }

      const dropOffTimeOptions = [];
      for (let i = 0; i < 24; i++) {
        for (let j = 0; j < 60; j += 30) {
          const hour = `${i < 10 ? '0' + i : i}`;
          const minute = `${j === 0 ? '00' : '30'}`;
          const dropOffTimeValue = `${hour}:${minute}`;
          dropOffTimeOptions.push(
            <div className="dropdown-item137" key={dropOffTimeValue} onClick={() => handleDropOffTimeSelection(dropOffTimeValue)}>
              {dropOffTimeValue}
            </div>
          );
        }
      }

      const today = new Date();
      // Format the current date to 'YYYY-MM-DD' for the input field
      const formattedDate = today.toISOString().split('T')[0];

      const getMinCheckOutDate = () => {
        if (pickUpDate) {
          const minDate = new Date(pickUpDate); 
          minDate.setDate(minDate.getDate() + 1); 
          return minDate.toISOString().split('T')[0]; 
        } else {
          return '';
        }
      };


return(
    <>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <link rel="stylesheet" href="./global.css" />
      <link rel="stylesheet" href="./index.css" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400&display=swap"
      />
      <div style={{margin: 'auto'}} className="component-77">
        <div className="component-7-child7" />
        <div className="component-7-item7" />
        <div className="location-picker-parent7">
          <div className="location-picker7">
            <input  value={query} onChange={handleQueryChange}  style={{outline:'none',width:'160px'}} type="text" placeholder="Pick-up location..." className="pick-up-location7"></input>
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
          <div className="rectangle-parent7">
            <input min={formattedDate} value={pickUpDate} onChange={handlePickUpDateChange}  type='date'style={{outline:'none',marginLeft:'5px'}} className="frame-child7" />
            <div style={{marginLeft:'5px'}} className="frame-item7" ><div  className="time-wrapper3">
                <div className="time-wrapper3">
                {/*  <div className="pickUpTime">pickUpTime</div>*/ }  
                    <div style={{top:'28px'}} class="dropdown13">
                <div  class="dropdown-toggle13" id="dropdownMenuButton3" onClick={toggleDropdown}>
                Pick-up {pickUpTime && ` ${formatTime(pickUpTime)}`}
                </div>
                {isOpen && (
                <div class="dropdown-menu13">
                <div class="dropdown-content13">
                {pickUpTimeOptions}
                </div>
                </div>
                )}
                </div> 
                </div>
                </div></div>
            <input value={dropOffDate} onChange={handleDropOffDateChange}   min={getMinCheckOutDate()} type='date'style={{outline:'none',marginLeft:'55px'}} className="frame-inner7" />
            <div  style={{marginLeft:'5px'}} className="rectangle-div7" ><div  className="time-wrapper3">
                <div className="time-wrapper3">
                {/*  <div className="pickUpTime">pickUpTime</div>*/ }  
                    <div style={{top:'28px'}} class="dropdown13">
                <div  class="dropdown-toggle13" id="dropdownMenuButton3" onClick={toggleDropdown}>
                Drop-off {dropOffTime && ` ${formatTime(dropOffTime)}`}
                </div>
                {isOpen && (
                <div class="dropdown-menu13">
                <div class="dropdown-content13">
                {dropOffTimeOptions}
                </div>
                </div>
                )}
                </div> 
                </div>
                </div></div>
          </div>
        </div>
        
        <div className="round-element7">
           <button   onClick={handleSearchClick}  style={{border:'none'}} className="search-box7" > 
           <img
          className="search-icon7"
          loading="lazy"
          alt=""
          src="./public/search@2x.png"
        />
        </button>
        </div>
       
      </div>
    </>
    );



}

export default SearchBarC;
