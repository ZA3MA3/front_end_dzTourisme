import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams,useNavigate } from "react-router-dom";
import './bookUserDetails.css'

const BookUserDetails = () => {
   const navigate =useNavigate();
   const totalPrise=localStorage.getItem('totalPrice');
   const adults=localStorage.getItem('adults');
   const children=localStorage.getItem('children');
   const checkInDate =localStorage.getItem('checkInDate');
   const checkOutDate=localStorage.getItem('checkOutDate');
   const reservationDate=localStorage.getItem('reservationDate');
   const time=localStorage.getItem('selectedTime');
   const clients=localStorage.getItem('clients');
   const selectedHotelName=localStorage.getItem('selectedHotelName');
   const selectedHotelCity=localStorage.getItem('selectedHotelCity');
   const selectedHotelStars=localStorage.getItem('selectedHotelStars');
   const isForRestaurants=localStorage.getItem('isForRestaurants');
   




    const [email, setEmail] = useState(localStorage.getItem('userEmail') || '');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');


   useEffect(() => {
    // Fetch the email from localStorage and update the state
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleNextClick = () => {
    // Store information in localStorage
    localStorage.setItem('firstName', firstName);
    localStorage.setItem('lastName', lastName);
    localStorage.setItem('phoneNumber', phoneNumber); 

  
    if (firstName && lastName && email && phoneNumber) {
      navigate("/payment");}

    
  };
console.log("isForR",isForRestaurants);




return(<>
    <meta charSet="utf-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <title>Desktop - 2</title>
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Inter%3A400%2C700"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Source+Sans+Pro%3A400%2C700"
    />
    <link rel="stylesheet" href="./styles/desktop-2.css" />
    <div className="desktop-2-9jk">
      <div className="auto-group-5jsu-sfk">Hotel {selectedHotelName}</div>
      <div className="auto-group-dh8j-jT4">
        <img className="vector-FRQ" src="REPLACE_IMAGE:22:140" />
        <p className="item-4-AHU">{selectedHotelStars}</p>
        <p className="adrar-algeria-UZ4">{selectedHotelCity}, Algeria</p>
      </div>
      <div className="component-8-Mcr">
        <div className="rectangle-13-HmQ"></div>
        <div className="auto-group-r1yq-q2E">
          <div className="auto-group-c9pi-y8S">
            <div className="rectangle-14-JAi"></div>
            <div className="rectangle-18-3PC"></div>
          </div>
          <div className="auto-group-mhre-b9p">
            <div className="rectangle-15-vxn"></div>
            <div className="rectangle-17-HYS"></div>
            <div className="rectangle-16-pYN"></div>
          </div>
        </div>
      </div>
      <p className="reserve-8ox">Reserve</p>
      <div className="component-6-dVp">
              {isForRestaurants===true && (

        <div className="auto-group-sxtt-Mwc">
          <div className="auto-group-9cke-sQA">
            <p className="single-room-for-DU2">
              <span className="single-room-for-DU2-sub-0"></span>
              <span className="single-room-for-DU2-sub-1"></span>
              <span className="single-room-for-DU2-sub-2"></span>
              <span className="single-room-for-DU2-sub-3"> Time : </span>
            </p>
            <div className="frame-35-eBx">
              <p className="item-4522-Nte">{time}</p>
              <p className="item--7LS"></p>
            </div>
          </div>
          <p className="adults-and-1-children-qnE">
        clients {clients}        </p>
                <p className="adults-and-1-children-qnE">Date : {reservationDate}  </p>
        </div>)}
      {isForRestaurants===false && (

        <div className="auto-group-sxtt-Mwc">
          <div className="auto-group-9cke-sQA">
            <p className="single-room-for-DU2">
              <span className="single-room-for-DU2-sub-0"></span>
              <span className="single-room-for-DU2-sub-1"></span>
              <span className="single-room-for-DU2-sub-2"></span>
              <span className="single-room-for-DU2-sub-3"> Tolal:</span>
            </p>
            <div className="frame-35-eBx">
              <p className="item-4522-Nte">{totalPrise}</p>
              <p className="item--7LS">د.ج</p>
            </div>
          </div>
          <p className="adults-and-1-children-qnE">
          {adults} {adults === 1 ? 'Adult' : 'Adults'} and {children} Child{children !== 1 ? 'ren' : ''}        </p>
                <p className="adults-and-1-children-qnE">From {checkInDate} to {checkOutDate} </p>
        </div>)}
        <div className="auto-group-1q7c-T2v">
          <div className="auto-group-ywue-kni">
            <p className="first-name-UCv">First Name</p>
            <p className="last-name-b2e">Last Name</p>
          </div>
          <div className="auto-group-qrhc-tXY">
            <input value={firstName}
            onChange={(e) => setFirstName(e.target.value)} style={{outline:'none',fontSize:'16px',  textIndent: '4px'}} type="text"  className="rectangle-28-F7C"></input>
            <input  value={lastName}
            onChange={(e) => setLastName(e.target.value)} style={{outline:'none',fontSize:'16px',  textIndent: '4px'}} type="text" className="rectangle-29-xXQ"></input>
          </div>
          <div className="auto-group-pzpq-tR4">
            <p className="email-2XG">Email</p>
            <p className="phone-number-NLE">Phone Number</p>
          </div>
          <div className="auto-group-b8kw-7Hp">
            <input  style={{outline:'none',fontSize:'16px',  textIndent: '4px'}} type="email" value={email}
          onChange={(e) => setEmail(e.target.value)} className="rectangle-30-rWJ"></input>
            <div className="auto-group-tuzu-NjY">
              <img className="algeria-tSz" src="./assets/algeria.png" />
              <input style={{outline:'none',fontSize:'16px',  textIndent: '4px'}} placeholder="+213" type="text" className="item-213-bcJ"  onInput={(e) => {
                e.preventDefault();
                const value = e.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
                e.target.value = value;setPhoneNumber(value);}}  ></input>
            </div>
          </div>
          <button  onClick={handleNextClick} style={{border:'none'}} className="frame-35-tbQ">Next: Final Details &gt;</button>
        </div>
      </div>
    </div>
  </>
  );

}

export default BookUserDetails;