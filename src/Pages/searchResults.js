import {React, useEffect,useState,useCallback  }from 'react';
import { useLocation,useNavigate} from 'react-router-dom';
import axios from 'axios'
import SearchBar from './SearchBar';  
import SearchBarR from './SearchBarR';  
import SearchBarC from './SearchBarC'; 
import './searchResults.css';
import './car_search_rs.css';

{/*const SearchResults = () => {
  const location = useLocation();
  const results = location.state.results;

  return (
    <div>
      <SearchBar/>
      
      <h2>Search Results</h2>
      {results.map((hotel) => (
        <div key={hotel.id} style={{ border: '1px solid #ddd', padding: '10px', margin: '10px' }}>
          <h3>{hotel.name}</h3>
          <p>Description: {hotel.description}</p>
          <p>Stars: {hotel.stars}</p>
          <p>
            City: {hotel.city.cityName}, ID: {hotel.city.id}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
 */}



 const SearchResults = () => {
  const location = useLocation();
  const results = location.state.results;
  const query=localStorage.getItem('query');
  const navigate = useNavigate();
  const [isForRestaurants, setIsForRestaurants] = useState(JSON.parse(localStorage.getItem('isForRestaurants')));// JSON.parse(localStorage.getItem('isForCars'))
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



  useEffect(() => {   
    // const storedIsForCars = JSON.parse(localStorage.getItem('isForCars'));
    const storedIsForRestaurants = JSON.parse(localStorage.getItem('isForRestaurants'));
   
 
    //  setIsForCars(storedIsForCars);
    
    setIsForRestaurants(storedIsForRestaurants);

    const showCarsBar=JSON.parse(localStorage.getItem('showCarsBar'));
    const showRestaurantsBar=JSON.parse(localStorage.getItem('showRestaurantsBar'));
    const showHotelsBar=JSON.parse(localStorage.getItem('showHotelsBar'));

    if(showCarsBar!==null){
      setShowCars(showCarsBar);
    }
    if(showRestaurantsBar!==null){
      setShowRestaurants(showRestaurantsBar);
    }
    if(showHotelsBar!==null){
      setShowHotels(showHotelsBar);
    }
    
  
  }, [isForRestaurants]);


  const handleCarClick=async (car)=>{

    const mapIframe = await axios.get(`http://localhost:8080/auth/${query}/map`);

    localStorage.setItem('selectedCarPickUpLocationMap', mapIframe.data);



    localStorage.setItem('selectedCarId', car.id);
    localStorage.setItem('selectedCarBrand', car.brand);
    localStorage.setItem('selectedCarModel', car.model);
    localStorage.setItem('selectedCarBodyType', car.bodyType);
    localStorage.setItem('selectedCarSeatingCapacity',car.seatingCapacity);
    localStorage.setItem('selectedCarLuggageCapacity',car.luggageCapacity);
    localStorage.setItem('selectedCarHasAC',car.hasAC);
    localStorage.setItem('selectedCarAutomatic',car.automatic);
    localStorage.setItem('selectedCarEngineType',car.engineType.type);
    localStorage.setItem('selectedCarPrice',car.price);
    localStorage.setItem('selectedCarPrimaryImage',car.primaryImage);



    console.log('selectedCarId', car.id);
    console.log('selectedCarBrand', car.brand);
    console.log('selectedCarModel', car.model);
    console.log('selectedCarBodyType', car.bodyType);
    console.log('selectedCarSeatingCapacity',car.seatingCapacity);
    console.log('selectedCarLuggageCapacity',car.luggageCapacity);
    console.log('selectedCarHasAC',car.hasAC);
    console.log('selectedCarAutomatic',car.automatic);
    console.log('selectedCarEngineType',car.engineType.type);
    console.log('selectedCarPrice',car.price);

    navigate("/carSelection");
  } 

  // console.log('isForRestaurants',isForRestaurants);
  // console.log('isForRestaurantsStorage',localStorage.getItem('isForRestaurants',isForRestaurants));
 
  const handleHotelClick = async (hotel,city) => {
    try {   
    if ((localStorage.getItem('isForRestaurants'))==="true") {
      const time= localStorage.getItem('selectedTime');
        const id=localStorage.getItem('selectedHotelId', hotel.id);

      const reservationDate=localStorage.getItem('reservationDate');
      

      console.log("resDate",reservationDate);

        // Send a request to the API with check-in and check-out dates
        const response = await axios.post('http://localhost:8080/availableHours', {
          restaurantId: id,
          hour: time,
          reservationDate:reservationDate
          
        });

        const imageResponse = await axios.get(`http://localhost:8080/auth/${id}/restaurantImages`);
          

        localStorage.setItem('selectedHotelId', hotel.id);
        localStorage.setItem('selectedHotelName', hotel.name);
        localStorage.setItem('selectedHotelStars', hotel.stars);
        localStorage.setItem('selectedHotelCity', city);
        localStorage.setItem('selectedHotelMapIframe', hotel.mapIframe);
        


        console.log("availableTimes",JSON.stringify(response.data));

       if(response.data.length===0){
        localStorage.setItem('messageEmptyAvailableHours','Sorry, there’s no online availability for ' +  reservationDate +  ' within 1 hour of ' +  time);
        console.log('message',localStorage.getItem('messageEmptyAvailableHours'));
      }
        localStorage.setItem('restaurantImages', JSON.stringify(imageResponse.data));
        localStorage.setItem('availableTimes', JSON.stringify(response.data));
        localStorage.setItem('isForRestaurants',JSON.stringify(false));      
        localStorage.setItem('isForCars',JSON.stringify(false));

      navigate('/tableSelection');
    

    }else{ 
      const checkInDate = localStorage.getItem('checkInDate') || '';
      const checkOutDate = localStorage.getItem('checkOutDate') || '';
    // Save hotel information to local storage
    localStorage.setItem('selectedHotelId', hotel.id);
    localStorage.setItem('selectedHotelName', hotel.name);
    localStorage.setItem('selectedHotelStars', hotel.stars);
    localStorage.setItem('selectedHotelCity', city);
   
   

    const id = hotel.id; // Use the hotel id directly from the selected hotel

    // Send a request to the API with check-in and check-out dates
    const response = await axios.post('http://localhost:8080/available', {
      checkIn: checkInDate,
      checkOut: checkOutDate,
      hotelId: id,
    });

    const imageResponse = await axios.get(`http://localhost:8080/auth/${id}/hotelImages`);



    const roomCount = {
      singleRoom: 0,
      doubleRoom: 0,
      deluxeRoom: 0,
    };

    const roomPrices = {
      singleRoom: null,
      doubleRoom: null,
      deluxeRoom: null,
    };

    localStorage.setItem('totalAvailableRooms', JSON.stringify(response.data.length));

    response.data.forEach((room) => {
      let roomTypeId;
    
      if (typeof room.roomType === 'object' && room.roomType !== null) {
        roomTypeId = room.roomType.id;
      } else {
        roomTypeId = room.roomType;
      }
    
      if (roomTypeId === 1) {
        roomCount.singleRoom += 1;
        roomPrices.singleRoom = room.price;
      } else if (roomTypeId === 2) {
        roomCount.doubleRoom += 1;
        roomPrices.doubleRoom = room.price;
      } else if (roomTypeId === 3) {
        roomCount.deluxeRoom += 1;
        roomPrices.deluxeRoom = room.price;
      }
    });

    // Update local storage with availability results
    localStorage.setItem('selectedHotelMapIframe', hotel.mapIframe);
    localStorage.setItem('hotelImages', JSON.stringify(imageResponse.data));
    localStorage.setItem('availabilityResults', JSON.stringify(response.data));
    localStorage.setItem('roomCount', JSON.stringify(roomCount));
    localStorage.setItem('roomPrices', JSON.stringify(roomPrices));
    
    console.log("b:" ,response.data);
    // Redirect to /roomselection
    localStorage.setItem('isForRestaurants', JSON.stringify(false));      
    localStorage.setItem('isForCars',JSON.stringify(false));
      navigate('/roomSelection');
    }
      } catch (error) {
        // Handle error if needed
        console.error('Error checking availability:', error);
      }
  };


 
 

 return( <>
  <div className='desktop-2-aCn'>
    <div className="frame-Vbt">
          <button style={{ border: 'none', backgroundColor: '#ffffff' }} className="frame-23-CmC">
            All results
          </button>
          <button onClick={handleHotelsButtonClick} style={{ border: 'none', backgroundColor: '#ffffff' }} className="frame-24-iDk">
            Hotels
          </button>
          <button onClick={handleRestaurantsButtonClick} style={{ border: 'none', backgroundColor: '#ffffff' }} className="frame-24-iDk">
            Restaurants
          </button><button onClick={handleCarsButtonClick} style={{ border: 'none', backgroundColor: '#ffffff' }} className="frame-24-iDk">
            Cars
          </button>
        </div>
        {showHotels && <SearchBar />}
      {showRestaurants && <SearchBarR />}
      {showCars && <SearchBarC />}
    <div className="frame-Br6">
      <div className="frame-YAr">
        
        <div className="frame-23-component-8-2VL">
          <div className="frame-kw8">
            <div className="frame-WvJ">{`Results matching "${query}"`}</div>
            {results && (
            <div>
              
              {!(JSON.parse(localStorage.getItem('isForCars')))   &&( 
              <div>
            {results.map((hotel) => (
              <button
                key={hotel.id}
                style={{ border: 'none', backgroundColor: '#ffffff' }}
                onClick={() => handleHotelClick(hotel,results[0].city.cityName)}
              >
                <div className="component-14-Nhc">
                  <img
                    src={hotel.primaryImage}
                    className="rectangle-18-VGS"
                  />
                  <div className="auto-group-cdne-EE2">
                    <p className="place1-P6v">{hotel.name}</p>
                    <div className="frame-27-WxE">
                      <img
                        className="frame-26-faE"
                        src="./assets/frame-26-b4S.png"
                        alt="star"
                      />
                      <p className="item-43-zcW">{hotel.stars}</p>
                    </div>
                    <p className="location-Hbc">{results[0].city.cityName}</p>
                    <p className="location-Hbc">{hotel.description}</p>
                  </div>
                  <div> </div>
                </div>
              </button>
            ))}</div>)}
        { (JSON.parse(localStorage.getItem('isForCars'))) &&(<div> {results.map((car) => (<div   key={car.id}>   
            <meta charSet="utf-8" />
            <meta name="viewport" content="initial-scale=1, width=device-width" />
            <link rel="stylesheet" href="./global.css" />
            <link rel="stylesheet" href="./index.css" />
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
            />
            <div className="mobile8">
              <section  className="mobile-child8" />
              <div className="frontend-developer-ui-designe-parent8">
                
                <b className="fiat-tipo-168">{car.brand} {car.model} {car.bodyType}</b>
              </div>
              <section className="mobile-item8" />
              <section className="hi-i-am-parent8">
                <img   className="hi-i-am8"  rows="{9}" cols="{12}" src={car.primaryImage}  />
                <div className="frame-child8" />
                <div
                  className="frame-item8"
                  rows="{7}"
                  cols="{13}"
                  defaultValue={" "}
                />
                <div className="frame-inner8" />
                <div className="rectangle-div8" />
                <div className="frame-child18" />
                <div className="frame-wrapper8">
                  <div className="checkmarks-parent8">
                    <div className="checkmarks8">
                      <div className="features8">
                        <img
                          className="customer-icon8"
                          loading="lazy"
                          alt=""
                          src="./public/customer@2x.png"
                        />
                        <div className="x5-wrapper8">
                          <div className="x58">x{car.seatingCapacity}</div>
                        </div>
                        <div className="suitcase-wrapper8">
                          <img
                            className="suitcase-icon8"
                            loading="lazy"
                            alt=""
                            src="./public/suitcase@2x.png"
                          />
                        </div>
                        <div className="x4-wrapper8">
                          <div className="x48">x{car.luggageCapacity}</div>
                        </div>
                        {car.hasAC &&( 
                          <>
                        <img
                          className="fan-speed-icon8"
                          loading="lazy"
                          alt=""
                          src="./public/fan-speed@2x.png"
                        />
                        <div className="ac-wrapper8">
                          <div className="ac8">AC</div>
                        </div></>)}
                        <img
                          className="gearbox-icon8"
                          loading="lazy"
                          alt=""
                          src="./public/gearbox@2x.png"
                        />
                        <div className="m-wrapper8">
                          <div className="m8">{car.automatic ? 'A' : 'M'}</div>
                        </div>
                        <div className="gas-station-wrapper8">
                          <img
                            className="gas-station-icon8"
                            loading="lazy"
                            alt=""
                            src="./public/gas-station@2x.png"
                          />
                        </div>
                        <div className="ess-wrapper8">
                          <div className="ess8">{car.engineType.type}</div>
                        </div>
                      </div>
                      <div className="checkmarks-inner8">
                        <div className="frame-parent8">
                          <div className="checkmark-parent8">
                            <img
                              className="checkmark-icon8"
                              loading="lazy"
                              alt=""
                              src="./public/checkmark@2x.png"
                            />
                            <div className="unlimited-milieage8">Unlimited Milieage</div>
                          </div>
                          <div className="checkmark-group8">
                            <img
                              className="checkmark-icon18"
                              loading="lazy"
                              alt=""
                              src="./public/checkmark-1@2x.png"
                            />
                            <div className="basic-protection-included8">
                              Basic protection included
                            </div>
                          </div>
                          <div className="checkmark-container8">
                            <img
                              className="checkmark-icon28"
                              loading="lazy"
                              alt=""
                              src="./public/checkmark-2@2x.png"
                            />
                            <div className="charged-at-pick8">Charged at pick up</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="frame-group8">
                      <div className="total-for-3-days-wrapper8">
                        <h3 className="total-for-38">Total: </h3>
                      </div>
                      <div className="frame-container8">
                        {/* <div className="shape-for-currency-parent8">
                          <div className="shape-for-currency8" />
                          <div className="div8"><span  >   {car.price *3} د.ج</span>      </div>
                        </div> */}
                          <div className="frame-div8">
                          <div className="parent8">
                            <div className="div188">  د.ج </div>
                            <div style={{marginLeft:'9px'}} className="day88"> {car.price}/day </div>
                          </div>
                        </div>
                        <div className="frame-div8">
                          <div className="parent8">
                             <div className="div18">{/*د.ج*/}</div> 
                            <div className="day8"> {/*{car.price} /day */}Pay at desk </div>
                          </div>
                        </div>
                        <div className="rectangle-wrapper8">
                          <button onClick={() =>handleCarClick(car)} style={{border:'none'}} className="frame-child28" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>))}</div>)}</div>)}
          </div>
        </div>
      </div>
    </div>
  </div>
</>
);

 }

 export default SearchResults;