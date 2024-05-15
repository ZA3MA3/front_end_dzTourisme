import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams,useNavigate } from "react-router-dom";
import './payment.css'





const Payment = () => {
 
  const navigate =useNavigate();
  const totalPrise=localStorage.getItem('totalPrice');
  const adults=localStorage.getItem('adults');
  const children=localStorage.getItem('children');
  const checkInDate =localStorage.getItem('checkInDate');
  const checkOutDate=localStorage.getItem('checkOutDate');
  const firstname=localStorage.getItem('firstName');
  const lastname=localStorage.getItem('lastName');
  const phoneNumber=localStorage.getItem('phoneNumber'); 
  const restaurantId=localStorage.getItem('selectedHotelId');   
  const time=localStorage.getItem('selectedTime'); 
  const reservationDate=localStorage.getItem('reservationDate');
  const clients=localStorage.getItem('clients');
  const timeTableId=localStorage.getItem('timeTableId');

  const carId=localStorage.getItem('selectedCarId');
  const pickUpDate=localStorage.getItem('pickUpDate');
  const dropOffDate=localStorage.getItem('dropOffDate');
  const pickUpTime=localStorage.getItem('selectedPickUpTime');
  const dropOffTime=localStorage.getItem('selectedDropOffTime');
  const additionalDriver =localStorage.getItem('additionalDriver');
  const navigationalSystem=localStorage.getItem('navigationalSystem');
  const babySafetySeat=localStorage.getItem('babySafetySeat');
  const childBoosterSeat=localStorage.getItem('childBoosterSeat');
  const childSafetySeat=localStorage.getItem('childSafetySeat');
  const protection=localStorage.getItem('protection');

                                                                         



  const token=localStorage.getItem('jwtToken');
  const allSelectedRoomIds=localStorage.getItem('allSelectedRoomIds');

  const [isForRestaurants, setIsForRestaurants] = useState(false);
  const [isForCars, setIsForCars] = useState(false);

  const [isFromRestaurantEditButton, setIsFromRestaurantEditButton] = useState(false);
  const [isFromHotelEditButton, setIsFromHotelEditButton] = useState(false);
  const [isFromCarEditButton, setIsFromCarEditButton] = useState(false);

  console.log('isFromHotelEditButton',isFromHotelEditButton);
  console.log('isFromRestaurantEditButton',isFromRestaurantEditButton);
  console.log('isForCars',isForCars);
  console.log('isForRestaurants',isForRestaurants);



  useEffect(() => {
    const storedIsForRestaurants = JSON.parse(localStorage.getItem('isForRestaurants'));
    const storedIsForCars = JSON.parse(localStorage.getItem('isForCars'));

    const storedIsFromRestaurantEditButton = JSON.parse(localStorage.getItem('isFromRestaurantEditButton'));
    const storedIsFromHotelEditButton = JSON.parse(localStorage.getItem('isFromHotelEditButton'));
    const storedIsFromCarEditButton = JSON.parse(localStorage.getItem('isFromCarEditButton'));



    if (storedIsForRestaurants !== null) {
      setIsForRestaurants(storedIsForRestaurants);
    }
    
    if (storedIsFromRestaurantEditButton !== null) {
      setIsFromRestaurantEditButton(storedIsFromRestaurantEditButton);
    }

    if (storedIsFromCarEditButton !== null) {
      setIsFromCarEditButton(storedIsFromCarEditButton);
    }

    if (storedIsFromHotelEditButton !== null) {
      setIsFromHotelEditButton(storedIsFromHotelEditButton);
    }
    
    if (storedIsForCars !== null) {
      setIsForCars(storedIsForCars);
    }

   
  }, []);

  const handleCheckOut = async () => {
    try {
      const userId=localStorage.getItem('userId');
      const reservationId=localStorage.getItem('reservationId');


      if(isFromRestaurantEditButton){
        const response = await axios.put('http://localhost:8080/editReservation', {
          reservationId:reservationId,
          clients: clients,
          reservationDate: reservationDate,
          time: time,
          firstName: firstname,
          lastName: lastname,
          phoneNumber: phoneNumber,
          timeTableId: timeTableId,
          restaurantId: restaurantId,
          userId:userId
          
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        localStorage.setItem('isFromHotelEditButton',false);
        setIsFromHotelEditButton(false);
        localStorage.setItem('isFromRestaurantEditButton',false);
        setIsFromRestaurantEditButton(false);
        navigate("/profile");
        console.log('edit status:', response.data);


      }else if(isFromHotelEditButton){
        const BookedRoomIds = JSON.parse(allSelectedRoomIds);
        const bookingId=localStorage.getItem('bookingId');


        const response = await axios.put('http://localhost:8080/editBooking', {
          bookingId:bookingId,
          adults:adults,
          children: children,
          checkIn: checkInDate,
          checkOut: checkOutDate,
          firstName:firstname,
          lastName:lastname,
          PhoneNumber:phoneNumber,
          token:token,
          bookedRoomIds: BookedRoomIds


          
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        localStorage.setItem('isFromHotelEditButton',false);
        setIsFromHotelEditButton(false);
        
        localStorage.setItem('isFromRestaurantEditButton',false);
        setIsFromRestaurantEditButton(false);

        localStorage.setItem('showCarsBar',false);
        localStorage.setItem('showRestaurantsBar',false);
        localStorage.setItem('showHotelsBar',true);



        navigate("/profile");
     
        console.log('edit status:', response.data);


      }else if(isFromCarEditButton ){
     
        const rentalId=localStorage.getItem('rentalId');
        const locationName=localStorage.getItem('query');


        const response = await axios.put('http://localhost:8080/editRental', {
          rentalId:rentalId,
          protectionId:protection,
          pickUp:pickUpDate,
          pickUpTime:pickUpTime,
          dropOff:dropOffDate,
          dropOffTime:dropOffTime,
          additionalDriver:additionalDriver,
          navigationalSystem:navigationalSystem,
          babySeat:babySafetySeat,
          childSeat:childSafetySeat,
          childBoosterSeat:childBoosterSeat,
          carId:carId,
          locationName:locationName,
          userId:userId,
          firstName:firstname,
          lastName:lastname,
          phoneNumber:phoneNumber

        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        localStorage.setItem('isFromHotelEditButton',false);
        setIsFromHotelEditButton(false);
        
        localStorage.setItem('isFromRestaurantEditButton',false);
        setIsFromRestaurantEditButton(false);

        navigate("/profile");
     
        console.log('edit status:', response.data);


      }else{  if(isForRestaurants){

        const response = await axios.post('http://localhost:8080/reserveTable', {
        firstName: firstname,
        lastName: lastname,
        phoneNumber: phoneNumber,
        clients: clients,
        reservationDate: reservationDate,
        time: time,
        timeTableId: timeTableId,
        restaurantId: restaurantId,
        token:token
        
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      navigate("/profile");

      if (response.status === 201) {
          console.log('Reservation successful:', response.data);
      } else {
          console.error('Reservation failed:', response.data);
      }

      }else if(isForCars){
        const query=localStorage.getItem('query');
        const response = await axios.post('http://localhost:8080/rentCar', {
          firstName: firstname,
          lastName: lastname,
          phoneNumber: phoneNumber,
          pickUpDate: pickUpDate,
          pickUpTime: pickUpTime,
          dropOffDate: dropOffDate,
          dropOffTime: dropOffTime,
          additionalDriver: additionalDriver,
          navigationalSystem: navigationalSystem,
          babySeat: babySafetySeat,
          childSeat: childSafetySeat,
          childBoosterSeat: childBoosterSeat,
          carId: carId,
          protection: protection,
          token: token,
          query:query
          
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        navigate("/profile");

      if (response.status === 201) {
          console.log('Car rental successful:', response.data);
      } else {
          console.error('Car rental failed:', response.data);
      }
      }else{
      const BookedRoomIds = JSON.parse(allSelectedRoomIds);
      
      const response = await axios.post('http://localhost:8080/bookRoom', {
        adults: adults,     
        children: children,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        firstName: firstname,
        lastName: lastname,
        phoneNumber: phoneNumber,
        token:token,
        bookedRoomIds: BookedRoomIds
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });


      
      navigate("/profile");
      

      
      if (response.data.success) {

        console.log('Booking successful:', response.data.message);
      } else {

        console.error('Booking failed:', response.data.message);
      }
    }
  
  }

    
    } catch (error) {

      console.error('Error during booking:', error.message);
    }

  };




return(<>
    <meta charSet="utf-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <title>Desktop - 3</title>
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Inter%3A400%2C700"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Source+Sans+Pro%3A400%2C700"
    />
    <link rel="stylesheet" href="./styles/desktop-3.css" />
    <div className="desktop-3-m1g">
      <div className="component-9-u7t">
        <div className="component-6-Evr">
          <div className="rectangle-25-Pok"></div>
          <p className="your-details-8mL">Your Details</p>
          <p className="item-2-SX8">2</p>
          <div className="ellipse-3-win"></div>
          <p className="item-3-4Hc">3</p>
          <p className="final-step-NJJ">Final Step</p>
          <p className="your-selection-5iW">Your Selection</p>
          <div className="line-1-bRx"></div>
          <div className="line-2-jHG"></div>
          <img className="checkmark-Tj4" src="./assets/checkmark-1k2.png" />
          <img className="checkmark-CwY" src="./assets/checkmark-D1G.png" />
        </div>
      </div>
      <p className="hotel-ain-bouda-MJe">Hotel Ain Bouda</p>
      <div className="auto-group-jpdu-3xA">
        <img className="vector-yL2" src="./assets/vector-EFp.png" />
        <p className="item-4-txn">4</p>
        <p className="adrar-algeria-E14">Adrar, Algeria</p>
      </div>
      <div className="component-9-xBx">
        <div className="rectangle-13-fs4"></div>
        <div className="auto-group-cvqv-1R8">
          <div className="auto-group-ffi6-kNi">
            <div className="rectangle-14-UpW"></div>
            <div className="rectangle-18-pdU"></div>
          </div>
          <div className="auto-group-jbmx-ABY">
            <div className="rectangle-15-6L6"></div>
            <div className="rectangle-17-EBQ"></div>
            <div className="rectangle-16-NYW"></div>
          </div>
        </div>
      </div>
      <div className="component-11-XAW">
        <div className="auto-group-9nle-DZ8">
          <p className="single-room-for-Z7C">
            <span className="single-room-for-Z7C-sub-0"></span>
            <span className="single-room-for-Z7C-sub-1"></span>
            <span className="single-room-for-Z7C-sub-2"></span>
            <span className="single-room-for-Z7C-sub-3">Total:</span>
          </p>
          <div className="frame-36-17c">
            <p className="item-4522-Zup">{totalPrise}</p>
            <p className="item--uin">د.ج</p>
          </div>
        </div>
        <p className="adults-and-1-children-Sii">   {adults} {adults === 1 ? 'Adult' : 'Adults'} and {children} Child{children !== 1 ? 'ren' : ''}   </p>
        <p className="adults-and-1-children-Sii">From {checkInDate} to {checkOutDate} </p>
        <img className="calendar-Mqg" src="./assets/calendar-pke.png" />
      </div>
      <div className="component-10-frN">
        <div className="auto-group-tgkn-CbQ">
          <div className="auto-group-dye6-7yG">
            <div className="rectangle-38-F3t"></div>
            <p className="expiry-month-9f4">Expiry Month</p>
            <p className="mm-GUn">MM</p>
          </div>
          <img
            className="american-express-aVU"
            src="./assets/american-express.png"
          />
          <img className="visa-ha6" src="./assets/visa.png" />
          <img className="mastercard-2cN" src="./assets/mastercard.png" />
          <p className="item-4522-Z6W">4522</p>
          <p className="item--fvE">د.ج</p>
        </div>
        <div className="auto-group-on9c-CfG">
          <div className="rectangle-37-wMx"></div>
          <p className="transaction-cost-3A6">Transaction Cost</p>
        </div>
        <p className="card-holder-name-n7g">Card Holder Name</p>
        <div className="auto-group-rkkq-TzW">
          <div className="auto-group-1cmc-PNN">XXXX</div>
          <div className="auto-group-pmvq-4Dc">XXXX</div>
          <div className="auto-group-5xua-jae">XXXX</div>
          <div className="auto-group-dvaw-Rbt">XXXX</div>
          <div className="rectangle-33-qQi"></div>
        </div>
        <div className="auto-group-pfhq-Kqg">
          <div className="auto-group-bpyi-Dw4">
            <p className="expiry-year-9Jv">Expiry Year</p>
            <div className="rectangle-39-S38"></div>
            <p className="yyyy-hze">YYYY</p>
          </div>
          <button style={{border:'none'}} onClick={handleCheckOut} className="frame-36-BQ2">Check Out</button>
        </div>
        <div className="auto-group-pruv-ZfU">
          <p className="card-number-4cE">Card Number</p>
          <p className="cvc-no8">CVC</p>
        </div>
      </div>
    </div>
  </>
  );
}

  export default Payment;