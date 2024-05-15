import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams,useNavigate, useLocation } from "react-router-dom";
import './roomSelection.css';
import '../Auth/register.css';
import ReviewsList from "./ReviewsList";


const RoomSelection = () => {
        const location=useLocation();
        const navigate = useNavigate();
        const [selectedHotel, setSelectedHotel] = useState({});
        const [adults, setAdults] = useState(parseInt(localStorage.getItem('adults')) || 1);
        const [children, setChildren] = useState(parseInt(localStorage.getItem('children')) || 0);
        const [showPopup, setShowPopup] = useState(false);
        const [availabilityResults, setAvailabilityResults] = useState(null);
        const [totalPrice, setTotalPrice] = useState(0);//localStorage.getItem('totalPrice') || 0
        const [availableRoomsCount, setAvailableRoomsCount] = useState(0);
        const [showModal, setShowModal] = useState(false);
        const [showModal1, setShowModal1] = useState(false);
        const [hotelImages, setHotelImages] = useState('');


        const [formDataLogin, setFormDataLogin] = useState({
          username: '',
          password: '',
        });
  
        const [formDataSignUp, setFormDataSignUp] = useState({
          username: '',
          email:'',
          password: '',
          confirmationPassword:''
        });
      
       



       
        const [unbookedRoomCounts, setUnbookedRoomCounts] = useState({
          singleRoom: 0,
          doubleRoom: 0,
          deluxeRoom: 0,
        });

        const [roomCount, setRoomCount] = useState({
          singleRoom: 0,
          doubleRoom: 0,
          deluxeRoom: 0,
        });
      
        const [roomPrices, setRoomPrices] = useState({
          singleRoom: null,
          doubleRoom: null,
          deluxeRoom: null,
        });

        const togglePopup = () => {
             setShowPopup((prevShowPopup) => !prevShowPopup);          
              
        };
        useEffect(() => {
          // Retrieve selected hotel information from local storage
          const selectedHotelCity = localStorage.getItem('selectedHotelCity');
          const selectedHotelStars = localStorage.getItem('selectedHotelStars');
          const selectedHotelName = localStorage.getItem('selectedHotelName');
          let selectedHotelMapIframe=localStorage.getItem('selectedHotelMapIframe');
        
          
          const checkInDate = localStorage.getItem('checkInDate') || '';
          const checkOutDate = localStorage.getItem('checkOutDate') || '';

          const hotelImagesString = localStorage.getItem('hotelImages');
          const hotelImages = hotelImagesString ? JSON.parse(hotelImagesString) : null;
          const availabilityResults = JSON.parse(localStorage.getItem('availabilityResults')) || [];
          const totalAvailableRooms = JSON.parse(localStorage.getItem('totalAvailableRooms')) || '';
          const roomCountData = JSON.parse(localStorage.getItem('roomCount')) || {
            singleRoom: 0,
            doubleRoom: 0,
            deluxeRoom: 0,
          };
          const roomPricesData = JSON.parse(localStorage.getItem('roomPrices')) || {
            singleRoom: null,
            doubleRoom: null,
            deluxeRoom: null,
          };

          if(selectedHotelMapIframe===null){
            selectedHotelMapIframe="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14469017.676004378!2d-8.987459755321106!3d27.702616244642265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd7e8a6a28037bd1%3A0x7140bee3abd7f8a2!2zQWxnw6lyaWU!5e0!3m2!1sfr!2sdz!4v1714932207668!5m2!1sfr!2sdz";
          }
      
        
          setHotelImages(hotelImages);
          // Update the state with the retrieved information
          setSelectedHotel({
            city: selectedHotelCity,
            stars: selectedHotelStars,
            name: selectedHotelName,
            checkInDate: checkInDate,
            checkOutDate: checkOutDate,
            selectedHotelMapIframe:selectedHotelMapIframe
          });

          setAvailableRoomsCount(totalAvailableRooms);
          setAvailabilityResults(availabilityResults);
          setRoomCount(roomCountData);
          setRoomPrices(roomPricesData);
        }, []);
      
        const handleAdultsChange = (value) => {
          const newAdults = Math.max(1, Math.min(5, adults + value));
          setAdults(newAdults);
          localStorage.setItem('adults', newAdults);
          
        };
      
        const handleChildrenChange = (value) => {
          const newChildren = Math.max(0, Math.min(5, children + value));
          setChildren(newChildren);
          localStorage.setItem('children', newChildren);
          
        };

    const handleCheckInDateChange = (event) => {
        const newCheckInDate = event.target.value;
        setSelectedHotel({
          ...selectedHotel,
          checkInDate: newCheckInDate,
        });
        localStorage.setItem('checkInDate', newCheckInDate);
      };
    
      const handleCheckOutDateChange = (event) => {
        const newCheckOutDate = event.target.value;
        setSelectedHotel({
          ...selectedHotel,
          checkOutDate: newCheckOutDate,
        });
        localStorage.setItem('checkOutDate', newCheckOutDate);
      };

      const handleVerifyAvailability = async () => {
        try {
            const id=localStorage.getItem('selectedHotelId')
          
          // Send a request to the API with check-in and check-out dates
          const response = await axios.post('http://localhost:8080/available', {
            checkIn: selectedHotel.checkInDate,
            checkOut: selectedHotel.checkOutDate,
            hotelId: id,
          });
         
          
        
          
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

          const totalAvailableRooms = response.data.length;
          setAvailableRoomsCount(totalAvailableRooms);

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
       




          setAvailabilityResults(response.data)
          setRoomCount(roomCount)
          setRoomPrices(roomPrices);

          // Handle the API response as needed
          console.log('Availability response:', response.data);

          console.log("deluxe room price",);
          console.log("deluxe room count",);
          console.log("double room price",);
          console.log("double room count",);
          console.log("single room price",);
          console.log("single room count",);
          

    
          
        } catch (error) {
          // Handle error if needed
          console.error('Error checking availability:', error);
        }
      };

      const handleSingleRoomCountChange = (selectedCount) => {
        const baseSingleRoomPrice = roomPrices.singleRoom * selectedCount;
        const taxSingleRoomPrice = baseSingleRoomPrice * 0.09; // 9% tax
        const newPrice = baseSingleRoomPrice + taxSingleRoomPrice;

        const singleRoomIds = availabilityResults
        .filter((room) => {
          let roomTypeId;
          if (typeof room.roomType === 'object' && room.roomType !== null) {
            roomTypeId = room.roomType.id;
          } else {
            roomTypeId = room.roomType;
          }
          return roomTypeId === 1;
        })
        .map((room) => room.id)
        .slice(0, selectedCount); // Keep only the selected count of ids
    
      // Save the selected count, corresponding price, and room ids in local storage
      localStorage.setItem('selectedSingleRoomCount', selectedCount);
      localStorage.setItem('selectedSingleRoomPrice', newPrice);
      localStorage.setItem('selectedSingleRoomIds', JSON.stringify(singleRoomIds));
    
      
       

        const selectedDoubleRoomPrice = parseInt(localStorage.getItem('selectedDoubleRoomPrice') || 0);
        const selectedDeluxeRoomPrice = parseInt(localStorage.getItem('selectedDeluxeRoomPrice') || 0);
        const newTotalPrice = newPrice + selectedDoubleRoomPrice + selectedDeluxeRoomPrice;

        setTotalPrice(newTotalPrice);
        localStorage.setItem('totalPrice', newTotalPrice);

        
     
        
        console.log("count+price",selectedCount+" "+newPrice);
      
      };

      const handleDoubleRoomCountChange = (selectedCount) => {
        const baseDoubleRoomPrice = roomPrices.doubleRoom * selectedCount;
        const taxDoubleRoomPrice = baseDoubleRoomPrice * 0.09; // 9% tax
        const newPrice = baseDoubleRoomPrice + taxDoubleRoomPrice;
      
        const doubleRoomIds = availabilityResults
        .filter((room) => {
          let roomTypeId;
          if (typeof room.roomType === 'object' && room.roomType !== null) {
            roomTypeId = room.roomType.id;
          } else {
            roomTypeId = room.roomType;
          }
          return roomTypeId === 2;
        })
        .map((room) => room.id)
        .slice(0, selectedCount); // Keep only the selected count of ids

      // Save the selected count, corresponding price, and room ids in local storage
      localStorage.setItem('selectedDoubleRoomCount', selectedCount);
      localStorage.setItem('selectedDoubleRoomPrice', newPrice);
      localStorage.setItem('selectedDoubleRoomIds', JSON.stringify(doubleRoomIds));

    
        

        const selectedSingleRoomPrice = parseInt(localStorage.getItem('selectedSingleRoomPrice') || 0);
        const selectedDeluxeRoomPrice = parseInt(localStorage.getItem('selectedDeluxeRoomPrice') || 0);
        const newTotalPrice = newPrice + selectedSingleRoomPrice + selectedDeluxeRoomPrice;

        setTotalPrice(newTotalPrice);
        localStorage.setItem('totalPrice', newTotalPrice);

       

      
        
        console.log("count+price",selectedCount+" "+newPrice);
      
      };

      const handleDeluxeRoomCountChange = (selectedCount) => {
        const baseDeluxeRoomPrice = roomPrices.deluxeRoom * selectedCount;
        const taxDeluxeRoomPrice = baseDeluxeRoomPrice * 0.09; // 9% tax
        const newPrice = baseDeluxeRoomPrice + taxDeluxeRoomPrice;
      
        const deluxeRoomIds = availabilityResults
        .filter((room) => {
          let roomTypeId;
          if (typeof room.roomType === 'object' && room.roomType !== null) {
            roomTypeId = room.roomType.id;
          } else {
            roomTypeId = room.roomType;
          }
          return roomTypeId === 3;
        })
        .map((room) => room.id)
        .slice(0, selectedCount); // Keep only the selected count of ids

      // Save the selected count, corresponding price, and room ids in local storage
      localStorage.setItem('selectedDeluxeRoomCount', selectedCount);
      localStorage.setItem('selectedDeluxeRoomPrice', newPrice);
      localStorage.setItem('selectedDeluxeRoomIds', JSON.stringify(deluxeRoomIds));

        const selectedSingleRoomPrice = parseInt(localStorage.getItem('selectedSingleRoomPrice') || 0);
        const selectedDoubleRoomPrice = parseInt(localStorage.getItem('selectedDoubleRoomPrice') || 0);
        const newTotalPrice = newPrice + selectedSingleRoomPrice + selectedDoubleRoomPrice;

        setTotalPrice(newTotalPrice);
        localStorage.setItem('totalPrice', newTotalPrice);

          
        
        console.log("count+price",selectedCount+" "+newPrice);
      
      };

     

      const handleBook = () => {
      
      const isAuthenticated = !!localStorage.getItem('jwtToken');
      const selectedSingleRoomCount = parseInt(localStorage.getItem('selectedSingleRoomCount') || 0);
      const selectedDoubleRoomCount = parseInt(localStorage.getItem('selectedDoubleRoomCount') || 0);
      const selectedDeluxeRoomCount = parseInt(localStorage.getItem('selectedDeluxeRoomCount') || 0);
      const allSelectedRoomIds = [
        ...JSON.parse(localStorage.getItem('selectedSingleRoomIds') || '[]'),
        ...JSON.parse(localStorage.getItem('selectedDoubleRoomIds') || '[]'),
        ...JSON.parse(localStorage.getItem('selectedDeluxeRoomIds') || '[]'),
      ];
    
      localStorage.setItem('allSelectedRoomIds', JSON.stringify(allSelectedRoomIds));

      console.log("jj",allSelectedRoomIds);

      if (selectedSingleRoomCount > 0 || selectedDoubleRoomCount > 0 || selectedDeluxeRoomCount > 0) {
        if (isAuthenticated) {
          navigate('/bookUserDetails');
        } else {
          // navigate('/login', { state: { from: '/roomSelection' } });
          setShowModal(true);
        }
      } else {
        // Display a message or handle the case where no rooms are selected
        console.log('Please select at least one room before reserving.');
      }
      };










      const handleInputChangeLogIn = (e) => {
        setFormDataLogin({ ...formDataLogin, [e.target.name]: e.target.value });
      };  
    
      const handleInputChangeSignUp = (e) => {
        setFormDataSignUp({ ...formDataSignUp, [e.target.name]: e.target.value });
      };



      const handleModalClose1 = () => {
        setShowModal1(false);
      };
    
      const handleModalClose = () => {
        setShowModal(false);
      };
    
      const handleCreateOne=()=>{
        setShowModal1(true);
        setShowModal(false);
      }

      const handleLogIn = async () => {
        try {
          const response = await axios.post('http://localhost:8080/auth/login', formDataLogin);
          
          // Extract the new token from the response
          const token = response.data.token;
      
          // Store the new token in local storage
          localStorage.setItem('jwtToken', token);
    
          const email = await axios.post('http://localhost:8080/auth/getEmail', {token});
    
          const userEmail=email.data
    
          const isAdmin = await axios.get(`http://localhost:8080/isAdmin?token=${token}`);

          localStorage.setItem('isAdmin',JSON.stringify(isAdmin));

          localStorage.setItem('userEmail', userEmail);
    
    
          setShowModal(false);
          window.location.reload();
    
          console.log('User logged in:', response.data);
    
     
          
        } catch (error) {
          console.error('Error logging in:', error.response.data);
          // Handle error, show an error message, etc.
        }
      }
    
      const handleSignUp = async () => {
        try {
          const response = await axios.post('http://localhost:8080/auth/register', formDataSignUp);
          
          // Extract the token from the response
          const token = response.data.token;
    
          // Store the token in local storage
          localStorage.setItem('jwtToken', token);
    
          localStorage.setItem('userEmail', formDataSignUp.email);
    
          setShowModal1(false);
          window.location.reload();
          
          console.log('User signed up:', response.data);
          // Handle success, redirect, or show a success message
         
          
            } catch (error) {
          console.error('Error signing up:', error.response.data);
          // Handle error, show an error message, etc.
        }
      }

      const today = new Date();
      // Format the current date to 'YYYY-MM-DD' for the input field
      const formattedDate = today.toISOString().split('T')[0];
    
    return (
        <>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <title>Desktop - 4</title>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Inter%3A400%2C700"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Source+Sans+Pro%3A400%2C700"
        />
        <link rel="stylesheet" href="./styles/desktop-4.css" />
        <div className="desktop-4-WBG">
          <div className="auto-group-2uyz-Rp2">Hotel {selectedHotel.name}</div>
          <div className="auto-group-asj2-6vA">
            <img className="vector-pbG" src="./assets/vector-ymY.png" />
            <p className="item-4-LpW">{selectedHotel.stars}</p>
            <p className="adrar-algeria-UQv">{selectedHotel.city}, Algeria</p>
          </div>
          <div className="component-7-1Qr">
{!hotelImages || !hotelImages.image1 ? (
  <div className="rectangle-7-9GA" />
) : (
  <img className="rectangle-7-9GA" src={hotelImages.image3} />
)}
            <div className="auto-group-lbkl-gG6">
              <div className="auto-group-47ya-pNJ">
              {!hotelImages || !hotelImages.image2 ? (<div className="rectangle-8-9fU"/>) : ( <img className="rectangle-8-9fU" src={hotelImages.image2} />)}
              {!hotelImages || !hotelImages.image3 ? (<div className="rectangle-9-Hmg"/>) : (<img className="rectangle-9-Hmg"src={hotelImages.image3}/> )}
                
              </div>
              <div className="auto-group-1fkc-Egv">
              {!hotelImages || !hotelImages.image4 ? (<div className="rectangle-10-Lzr"/>) : (<img className="rectangle-10-Lzr" src={hotelImages.image4}/>)}
                
              {!hotelImages || !hotelImages.image5 ? (<div className="rectangle-12-UrA"/>  ) : (<img className="rectangle-12-UrA" src={hotelImages.image5}/>)}
              {!hotelImages || !hotelImages.image6 ? (<div className="rectangle-11-chU"/> ) : ( <img className="rectangle-11-chU"src={hotelImages.image6}/>)}
              </div>
            </div>
          </div>
          
          <div style={{position:'absolute',top:'607px',right:'119px',  width:'1200px',height:'450px',display:'flex'}}><div style={{width:'600px',height:'450px'}}> 
          <div className="availibility-1jc"style={{fontSize:'100px',position:'relative',textAlign:'center',top:'160px',right:'300px',left:'184px'}}>Here</div> 
          </div>
          <div style={{width:'600px',height:'450px'}}>
            <iframe   src={selectedHotel.selectedHotelMapIframe} width={600}height={450}style={{ border: 0 }}allowFullScreen=""loading="lazy"referrerPolicy="no-referrer-when-downgrade"/>
          </div>
          </div>

          <p className="rooms-available-k2z"> {availableRoomsCount} room{availableRoomsCount !== 1 ? 's' : ''} available</p>
          <p className="availibility-1jc">Availibility</p>
          <p className="roomtypes-6FG">RoomTypes</p>
          <div className="component-3-y4A">
            <div className="auto-group-1qrc-2Rk">
              <p className="room-for-XtJ">
                <span className="room-for-XtJ-sub-0"> </span>
                <span className="room-for-XtJ-sub-1">Total:</span>
              </p>
              <div className="frame-33-rJJ">
                <p className="item-4522-QKp">{totalPrice}</p>
                <p className="item--8mc">د.ج</p>
              </div>
            </div>

            <p className="adults-1-children-1-m3t">From {selectedHotel.checkInDate}  to {selectedHotel.checkOutDate}</p>
            <p className="adults-1-children-1-m3t">Adults {adults} / Children {children}</p>
            <div className="frame-34-54a">
              <button onClick={handleBook} style={{border:'none',background:'black'}} className="reserve-RPL">Book</button>
            </div>
          </div>
          <div className="component-2-oPt">
        <button  onClick={handleVerifyAvailability} className="rectangle-14-VnW"></button>
        <p className="verify-availibility-wuQ">Verify Availibility</p>
        <div className="rectangle-15-PmQ">
          <input
          min={formattedDate}
            type="date"
            value={selectedHotel.checkInDate}
            onChange={handleCheckInDateChange}
          />
          <input
            min={selectedHotel.checkInDate}
            type="date"
            value={selectedHotel.checkOutDate}
            onChange={handleCheckOutDateChange}
          />
        </div>
        <button onClick={togglePopup} className="rectangle-16-QRc"></button>
            {showPopup && (
          <div style={{paddingTop:'40px',width:'200px',height:'200px', position: 'absolute', top: 60, left:455 , background: 'white', padding: '15px', borderRadius: '20px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', zIndex: 2 }}>
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
        <p className="adults-1-children-1-UwG">
          Adults {adults} / Children {children}
        </p>
        <img className="calendar-8W2" src="./assets/calendar-FjU.png" />
      </div>
          <div className="component-4-ocA">
            <div className="auto-group-u5pa-GEr">Single Room</div>
            <div className="auto-group-bhxu-gpN">
              <div className="auto-group-upk4-z4N">
                <img className="customer-5rW" src="./assets/customer-tcn.png" />
                <p className="person-mzE">1 person</p>
                <div className="frame-27-fpi">
                  <p className="item-4522-pSi">{roomPrices.singleRoom}</p>
                  <p className="item--x38">د.ج</p>
                </div>
              </div>
              <div className="auto-group-nduj-HLJ">
                <div  className="auto-group-fggn-ctN">
                  <img className="single-bed-Yn2" src="./assets/single-bed.png" />
                  <p className="x-taz">1x</p>
                </div>
                <div className="auto-group-nvtq-cmt">
                  <p className="night-AYW">1 night</p>
                  <p className="tax-GbY">
                    <span className="tax-GbY-sub-0">+9% tax</span>
                    <span className="tax-GbY-sub-1"> </span>
                  </p>
                </div>
              </div>
              <div className="auto-group-jvq2-Xvn">
                <div  className="frame-32-fGJ">
                  <div className="auto-group-mgdc-zJa">
                    <img className="tv-show-uRY" src="./assets/tv-show.png" />
                    <img className="wi-fi-FVQ" src="./assets/wi-fi.png" />
                    <img
                      className="air-conditioner-Q7Q"
                      src="./assets/air-conditioner.png"
                    />
                    <img className="fridge-kBG" src="./assets/fridge-Pnn.png" />
                    <img
                      className="coffee-maker-6F8"
                      src="./assets/coffee-maker-FbU.png"
                    />
                    <img className="desk-3RG" src="./assets/desk.png" />
                  </div>
                  <img
                    className="washing-machine-nte"
                    src="./assets/washing-machine.png"
                  />
                  <img className="spachelor-jJ6" src="./assets/spachelor-WoQ.png" />
                </div>
                <div  className="auto-group-bpkj-s9Q">
                  {roomCount.singleRoom > 0 && (
                  <select       onChange={(e) => handleSingleRoomCountChange(parseInt(e.target.value))}  style={{background:'white', border: 'none', fontSize: '16px' ,margin:0,padding:0}}>
                    <option value={0}>0 rooms</option>
                    {[...Array(roomCount.singleRoom)].map((_, index) => (
                      <option key={index + 1} value={index + 1}>
                        {index + 1} room(s) - {roomPrices.singleRoom * (index + 1)} د.ج
                      </option>
                    ))}
                  </select>
                )}
                </div>
              </div>
            </div>
            <div className="auto-group-hwis-Hyp">Double Room</div>
            <div className="auto-group-gxae-zNS">
              <div className="auto-group-sdhg-iJS">
                <img className="customer-35p" src="./assets/customer-Xrv.png" />
                <img className="customer-PQa" src="./assets/customer-omQ.png" />
                <p className="people-vvJ">2 people</p>
                <div className="frame-28-fcz">
                  <p className="item-4522-R6N">{roomPrices.doubleRoom}</p>
                  <p className="item--ZCa">د.ج</p>
                </div>
              </div>
              <div className="auto-group-5fze-tke">
                <div className="auto-group-dwkn-D2E">
                  <img className="bed-LMk" src="./assets/bed-4Xg.png" />
                  <p className="x-5aE">1x</p>
                </div>
                <div className="auto-group-qn3g-cq4">
                  <p className="night-aWz">1 night</p>
                  <p className="tax-Jht">
                    <span className="tax-Jht-sub-0">+9% tax</span>
                    <span className="tax-Jht-sub-1"> </span>
                  </p>
                </div>
              </div>
              <div className="auto-group-3pm4-4aa">
                <div  className="frame-30-nFg">
                  <div className="auto-group-ucb8-Jjp">
                    <img className="tv-show-pCN" src="./assets/tv-show-56W.png" />
                    <img className="wi-fi-LRc" src="./assets/wi-fi-r5t.png" />
                    <img
                      className="air-conditioner-Tm8"
                      src="./assets/air-conditioner-SXx.png"
                    />
                    <img className="fridge-nYW" src="./assets/fridge-Yaa.png" />
                    <img
                      className="coffee-maker-K2e"
                      src="./assets/coffee-maker.png"
                    />
                    <img className="desk-EvJ" src="./assets/desk-8Vk.png" />
                  </div>
                  <img
                    className="washing-machine-Mzv"
                    src="./assets/washing-machine-Js8.png"
                  />
                  <img className="spachelor-syG" src="./assets/spachelor-yQA.png" />
                </div>
                <div className="auto-group-mlzj-oc2">
                  {roomCount.doubleRoom > 0 && (
                  <select  onChange={(e) => handleDoubleRoomCountChange(parseInt(e.target.value))} style={{background:'white', border: 'none', fontSize: '16px' }}>
                    <option value={0}>0 rooms</option>
                    {[...Array(roomCount.doubleRoom)].map((_, index) => (
                      <option key={index + 1} value={index + 1}>
                        {index + 1} room(s) - {roomPrices.doubleRoom * (index + 1)} د.ج
                      </option>
                    ))}
                  </select>
                )}
                </div>
              </div>
            </div>
            <div className="auto-group-tsvr-nir">Deluxe Room</div>
            <div className="auto-group-2yae-pQe">
              <div className="auto-group-7my2-hjL">
                <div className="auto-group-woev-ygr">
                  <div className="auto-group-fvjy-6Fg">
                    <div className="auto-group-rufg-ovn">
                      <img className="customer-gDt" src="./assets/customer-Nir.png" />
                      <div className="auto-group-cccn-bLr">
                        <img
                          className="customer-7KC"
                          src="./assets/customer-FnE.png"
                        />
                        <img className="customer-nRL" src="./assets/customer.png" />
                      </div>
                    </div>
                    <p className="people-JPg">2+ people</p>
                  </div>
                  <div className="auto-group-xt46-nJr">
                    <img className="bed-5Hx" src="./assets/bed.png" />
                    <p className="x-QLE">2x</p>
                  </div>
                </div>
                <div className="auto-group-dwya-Ki6">
                  <div className="frame-29-4va">
                    <p className="item-4522-otA">{roomPrices.deluxeRoom}</p>
                    <p className="item--jmp">د.ج</p>
                  </div>
                  <p className="night-Gmk">1 night</p>
                  <p className="tax-Qsx">
                    <span className="tax-Qsx-sub-0">+9% tax</span>
                    <span className="tax-Qsx-sub-1"> </span>
                  </p>
                </div>
              </div>
              <div className="auto-group-1gpg-uCS">
                <div className="frame-31-Div">
                  <div className="auto-group-kvbc-yCJ">
                    <img className="tv-show-Uuk" src="./assets/tv-show-XR8.png" />
                    <img className="wi-fi-pyc" src="./assets/wi-fi-gES.png" />
                    <img
                      className="air-conditioner-ybc"
                      src="./assets/air-conditioner-kuk.png"
                    />
                    <img className="fridge-8Dc" src="./assets/fridge.png" />
                    <img
                      className="coffee-maker-sBC"
                      src="./assets/coffee-maker-Kyx.png"
                    />
                    <img className="desk-RCi" src="./assets/desk-hAW.png" />
                  </div>
                  <img
                    className="washing-machine-McA"
                    src="./assets/washing-machine-gQn.png"
                  />
                  <img className="spachelor-tc6" src="./assets/spachelor.png" />
                </div>
                <div className="auto-group-41ae-qXL">
                  {roomCount.deluxeRoom > 0 && (
                  <select  onChange={(e) => handleDeluxeRoomCountChange(parseInt(e.target.value))} style={{background:'white', border: 'none', fontSize: '16px' }}>
                    <option value={0}>0 rooms</option>
                    {[...Array(roomCount.deluxeRoom)].map((_, index) => (
                      <option key={index + 1} value={index + 1}>
                        {index + 1} room(s) - {roomPrices.deluxeRoom * (index + 1)} د.ج
                      </option>
                    ))}
                  </select>
                )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {showModal && (
            <>
                              <div className="modal-backdrop"></div>

                 <div style={{position:'absolute',top:'330px',right:'3600px',height:'490px'}}  className="component-16-b7C">
                 <button style={{position:'relative',left:'200px',top:'-30px'}} onClick={handleModalClose}>
                  X
                </button> 
                        <div  className="frame-JGW">
                       
                                  
                    <div className="frame-e5U">
                    <div className="frame-31-oDG">

                      <input
                      type="text"
                      id="username"
                      name="username"
                      className="enter-your-eamil-8FY" placeholder='Enter a username'
                      style={{ outline:'none', width: '400px', height: '5.5rem', marginLeft: '5px'

                    }} // Adjust dimensions as needed
                    onChange={handleInputChangeLogIn}/>
                      <img className="envelope-pu4" src="./assets/envelope.png" />
                    </div>
                  </div>
                    <div className="frame-Kqp">
                          <div className="frame-33-fug">
                          <input
                      type="password"
                      id="password"
                      name="password"
                      className="enter-your-eamil-8FY" placeholder='Enter a password'
                      style={{ outline:'none', width: '400px', height: '5.5rem', marginLeft: '5px'

                    }} 
                    onChange={handleInputChangeLogIn}/>
                          <img className="lock-g46" src="./assets/lock.png" />
                      </div>


                  </div>
                  <div className="frame-BFk">
            <button onClick={handleLogIn} className="frame-34-LPY">Sign in</button>
          </div>
            <div style={{fontSize:'16px',marginTop:'-16px'}}>No Account? <span style={{ color: 'blue', cursor: 'pointer' }}   onClick={handleCreateOne} >Create one</span></div>

                 </div>
         </div>
       </>
          )}
          {showModal1 && ( <div> 
            <div className="modal-backdrop"></div>

            <div className="component-16-b7C">
            <button style={{position:'relative',left:'200px',top:'-30px'}} onClick={handleModalClose1}>
                  X
                </button> 
            <div className="frame-JGW">
                  <div className="frame-e5U">
                  <div className="frame-31-oDG">

                    <input
                    type="text"
                    id="username"
                    name="username"
                    className="enter-your-eamil-8FY" placeholder='Enter a username'
                    style={{ outline:'none', width: '400px', height: '5.5rem', marginLeft: '5px'

                  }} // Adjust dimensions as needed
                  onChange={handleInputChangeSignUp}/>
                    <img className="envelope-pu4" src="./assets/envelope.png" />
                  </div>
                </div>

                <div className="frame-Kqp">
                          <div className="frame-33-fug">
                          <input
                      type="email"
                      id="email"
                      name="email"
                      className="enter-your-eamil-8FY" placeholder='Enter an email'
                      style={{ outline:'none', width: '400px', height: '5.5rem', marginLeft: '5px'

                    }} 
                    onChange={handleInputChangeSignUp}/>
                    <img className="envelope-pu4" src="./assets/envelope.png" />
                      </div>
                  </div>
                  <div className="frame-Kqp">
                        <div className="frame-33-fug">
                        <input
                    type="password"
                    id="password"
                    name="password"
                    className="enter-your-eamil-8FY" placeholder='Enter a password'
                    style={{ outline:'none', width: '400px', height: '5.5rem', marginLeft: '5px'

                  }} 
                  onChange={handleInputChangeSignUp}/>
                        <img className="lock-g46" src="./assets/lock.png" />
                    </div>
                </div>

                <div className="frame-Kqp">
                        <div className="frame-33-fug">
                        <input
                    type="password"
                    id="confirmationPassword"
                    name="confirmationPassword"
                    className="enter-your-eamil-8FY" placeholder='Confirm your password'
                    style={{ outline:'none', width: '400px', height: '5.5rem', marginLeft: '5px'

                  }} 
                  onChange={handleInputChangeSignUp}/>
                        <img className="lock-g46" src="./assets/lock.png" />
                    </div>
                </div>
                <div className="frame-BFk">
          <button onClick={handleSignUp} className="frame-34-LPY">Sign in</button>
        </div>
            
              </div>
              </div>
              </div>
            )}
             <p style={{top: '2208px',width: '81px'}} className="roomtypes-6FG">Reviews</p>
             <div style={{position:'absolute',top:'2192px',marginLeft:'115px',width:'1207px'}}> <ReviewsList/></div>
           
      </>
      
      );



}

export default RoomSelection;

