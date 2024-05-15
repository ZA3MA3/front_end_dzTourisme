import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams,useNavigate } from "react-router-dom";
import './searchBarC.css';

const SearchBar = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const [isForRestaurants, setIsForRestaurants] = useState(false); // Default value  
    const [isForCars, setIsForCars] = useState(false); // Default value  
    const [suggestions, setSuggestions] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(true);
  
  
  
    useEffect(() => {
    if (query.length >= 3) {
         
      // Make an asynchronous request to your backend API
      axios.get(`http://localhost:8080/auth/hotelLocations/suggestions?query=${query}`)
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
  
    const handleAdultsChange = (value) => {
    const newAdults=Math.max(0, Math.min(5, adults + value));
    setAdults(newAdults);
    localStorage.setItem('adults', newAdults);
    };
  
    const handleChildrenChange = (value) => {
      const newChildren =Math.max(0, Math.min(5, children + value));
      setChildren(newChildren);
      localStorage.setItem('children', newChildren);
    };
  
    const handleCheckInDateChange = (event) => {
    const newCheckInDate = event.target.value;
      setCheckInDate(newCheckInDate);
      localStorage.setItem('checkInDate', newCheckInDate);
      
    };
    
    const handleCheckOutDateChange = (event) => {
      const newCheckOutDate = event.target.value;
      setCheckOutDate(newCheckOutDate);
      localStorage.setItem('checkOutDate', newCheckOutDate);
    };

    const handleQueryChange = (event) => {
      const newQuery = event.target.value;
      setQuery(newQuery);
      localStorage.setItem('query', newQuery);
    };

    const handleSearchClick = async () => {
      try {
         const currentAdults = adults;
         const currentChildren = children;

          // Update local storage with the current values
          localStorage.setItem('adults', currentAdults);
          localStorage.setItem('children', currentChildren);
        // Use axios to fetch data from the server
        const response = await axios.get(`http://localhost:8080/auth/search/${query}`);
       
        localStorage.setItem('isForRestaurants',JSON.stringify( false));      
        localStorage.setItem('isForCars', JSON.stringify(false));      

      

       
       localStorage.setItem('isFromHotelEditButton',false);
       localStorage.setItem('isFromCarEditButton',false);
       localStorage.setItem('isFromRestaurantEditButton',false);
       console.log("response",response.data);

        navigate('/searchResults', { state: { results: response.data } });
            } catch (error) {
        // Handle error if needed
        console.error('Error during search:', error);
      }
    };
   
  
    const today = new Date();
    // Format the current date to 'YYYY-MM-DD' for the input field
  
    const formattedDate = today.toISOString().split('T')[0];

    const getMinCheckOutDate = () => {
      if (checkInDate) {
        const minDate = new Date(checkInDate); 
        minDate.setDate(minDate.getDate() + 1); 
        return minDate.toISOString().split('T')[0]; 
      } else {
        return '';
      }
    };
  return (
    <div style={{width:'1366px'}}>
  <div style={{width: 1092, height: 76, position: 'relative', borderRadius: 50,margin:'auto',  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'}}>
  <button
          style={{

            fontSize: 18,
            fontFamily: 'Inter',
            fontWeight: '400',
            wordWrap: 'break-word',
            border:'none',
            width: 327,
            height: 76,
            left: 765,
            top: 0,
            position: 'absolute',
            background: 'white',
            borderLeft:'2px,solid,black',
            borderTopRightRadius: 50,
            borderBottomRightRadius: 50,
             // Make sure the button is above other elements
          }}
          onClick={togglePopup}
        >Who...</button>

        {showPopup && (
          <div style={{paddingTop:'40px',width:'200px',height:'200px', position: 'absolute', top: 80, left: 820, background: 'white', padding: '15px', borderRadius: '20px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', zIndex: 2 }}>
             <div style={{ fontSize: 18, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word',marginBottom: 10 }}>
              Adults <button style={{border:'none',background:'white',marginLeft:'50px'}} onClick={() => handleAdultsChange(-1)}>-</button>
               {adults} 
              <button style={{border:'none',background:'white'}} onClick={() => handleAdultsChange(1)}>+</button>
            </div>
            <div style={{ fontSize: 18, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word',marginBottom: 10}}>
              Children  
              <button style={{border:'none',background:'white',marginLeft:'50px'}} onClick={() => handleChildrenChange(-1)}>-</button>{children} 
              <button style={{border:'none',background:'white'}} onClick={() => handleChildrenChange(1)}>+</button>
            </div>
           
          </div>
        )}

<div style={{ position: 'relative' }}>
      <input
        type="date"
        onChange={handleCheckInDateChange}
        value={checkInDate}
        style={{
          outline: 'none',
          width: 200,
          height: 76,
          left: 265,
          top: 0,
          position: 'absolute',
          background: 'white',
          fontSize: 18,
          padding: '8px', // Optional: Add padding for styling
        }}
        min={formattedDate}

      />

      <input
       
        type="date"
        onChange={handleCheckOutDateChange}
        value={checkOutDate}
        style={{
          outline: 'none',
          width: 200,
          height: 76,
          left: 515,
          top: 0,
          position: 'absolute',
          background: 'white',
          fontSize: 18,
          padding: '8px', // Optional: Add padding for styling
        }}
        min={getMinCheckOutDate()}
      />
    </div>
    
    <div>  
      <input placeholder="Where to..." style={{textIndent: '30px', fontSize: 18,outline: 'none',width: 265, height: 76, left: 0, top: 0, position: 'absolute', background: 'white', borderTopLeftRadius: 50, borderBottomLeftRadius: 50}} value={query} onChange={handleQueryChange} />
      {suggestions.length > 0 &&  dropdownOpen && (
          <div style={{textAlign: 'left'}} className="suggestions-dropdown">
            {suggestions.map(suggestion => (
              <div key={suggestion.id} className="suggestion-item" onClick={() => handleSuggestionItemClick(suggestion)}>
                {suggestion.name}
              </div>
            ))}
          </div>
          )}
</div>

  <button onClick={handleSearchClick}><div style={{width: 60, height: 60, left: 1018, top: 8, position: 'absolute', background: '#D9D9D9', borderRadius: 9999}} />
  <img style={{width: 30, height: 23.03, left: 1033, top: 26, position: 'absolute'}} src="https://via.placeholder.com/30x23" /></button>
</div>
    </div>
  )
}  


export default SearchBar;
