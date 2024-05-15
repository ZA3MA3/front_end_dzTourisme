import React, { useRef,useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams,useNavigate, useLocation } from "react-router-dom";
import './profile.css'
import './L_Restaurant.css'
import './L_Hotel.css'
import './L_Cars.css'
import './add_review.css'





const Profile = () => {
    
    const [listingResults, setListingResults] = useState(null);
    const navigate=useNavigate();
    const [isFromRestaurantEditButton, setIsFromRestaurantEditButton] = useState(localStorage.getItem('isFromRestaurantEditButton') || null);
    const [isFromHotelEditButton, setIsFromHotelEditButton] = useState(localStorage.getItem('isFromHotelEditButton') || null);
    const [isFromCarEditButton, setIsFromCarEditButton] = useState(localStorage.getItem('isFromCarEditButton') || null);
    const [isFromHotelListButton, setIsFromHotelListButton] = useState(localStorage.getItem('isFromHotelListButton') || null);
    const [isFromRestaurantListButton, setIsFromRestaurantListButton] = useState(localStorage.getItem('isFromRestaurantListButton') || null);
    const [errorMessage, setErrorMessage] = useState('');


    const [userId,setUserId]=useState(localStorage.getItem('userId'));
    const [userUsername   ,setUserUsername]=useState(localStorage.getItem('userUsername'));
    const [userEmail      ,setUserEmail]=      useState(localStorage.getItem('userEmail'));
    const [userFirstname  ,setUserFirstname]=  useState(localStorage.getItem('userFirstname'));
    const [userLastname   ,setUserLastname]=   useState(localStorage.getItem('userLastname'));
    const [userPhoneNumber,setUserPhoneNumber]=useState(localStorage.getItem('userPhoneNumber'));
    const [userRole       ,setUserRole]=       useState(localStorage.getItem('userRole'));
    const [reviewDropDown,setReviewDropDown]=useState(false);
    const [clickedIndex,setClickedIndex]=useState(null);
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [ commentValue, setCommentValue] = useState('');

  const handleCommentChange = (event) => {
    setCommentValue(event.target.value);
  };  

  const handleStarClick = (index) => {
   
    setRating(index + 1);
  };

  const handleStarHover = (index) => {
    setHoverRating(index + 1);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };



   
  const DefaultStar = () => (
    <svg width={17} height={17} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_2501_3063)">
        <path
          d="M11.049 2.92664C11.3483 2.00537 12.6517 2.00538 12.951 2.92664L14.4699 7.60055C14.6038 8.01254 14.9877 8.29148 15.4209 8.29149L20.3354 8.29168C21.3041 8.29172 21.7068 9.53127 20.9232 10.1007L16.9474 12.9895C16.5969 13.2441 16.4503 13.6955 16.5841 14.1075L18.1026 18.7815C18.4019 19.7028 17.3475 20.4689 16.5638 19.8995L12.5878 17.011C12.2373 16.7564 11.7627 16.7564 11.4122 17.011L7.43622 19.8995C6.65252 20.4689 5.5981 19.7028 5.8974 18.7815L7.41589 14.1075C7.54974 13.6955 7.40309 13.2441 7.05263 12.9895L3.07683 10.1007C2.29317 9.53127 2.69592 8.29172 3.66461 8.29168L8.57911 8.29149C9.01231 8.29148 9.39623 8.01254 9.53011 7.60055L11.049 2.92664Z"
          stroke="black"
          strokeWidth={2}
        />
      </g>
      <defs>
        <clipPath id="clip0_2501_3063">
          <rect width={24} height={24} fill="white" />
        </clipPath>
      </defs>
    </svg>
  );

  const SelectedStar = () => (
    <svg className="jiconsolidstar" width={9} height={9} viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4.07198 1.76712C4.20669 1.35253 4.79322 1.35253 4.92793 1.76712L5.40924 3.24843C5.46948 3.43384 5.64226 3.55937 5.83721 3.55937H7.39475C7.83068 3.55937 8.01193 4.1172 7.65926 4.37343L6.39918 5.28893C6.24146 5.40352 6.17547 5.60663 6.23571 5.79204L6.71701 7.27335C6.85172 7.68794 6.37721 8.0327 6.02454 7.77647L4.76446 6.86097C4.60674 6.74638 4.39317 6.74638 4.23545 6.86097L2.97538 7.77647C2.62271 8.0327 2.14819 7.68794 2.2829 7.27335L2.7642 5.79204C2.82445 5.60663 2.75845 5.40352 2.60073 5.28893L1.34066 4.37343C0.987985 4.1172 1.16923 3.55937 1.60516 3.55937H3.1627C3.35765 3.55937 3.53043 3.43384 3.59067 3.24843L4.07198 1.76712Z"
        fill="black"
      />
      
    </svg>
  );



  const handlePostHotelReview = async (hotelId) => {
    try {
      const userId = parseInt(localStorage.getItem('userId'));
      const token = localStorage.getItem('jwtToken');

      const response = await axios.post(
        'http://localhost:8080/postHotelReview',
        {
          userId: userId,
          comment: commentValue,
          rating: rating,
          hotelId: hotelId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
     
        setClickedIndex(null);
      console.log('Response:', response.data);
    } catch (error) { 
      console.error('Error:', error);
      throw error;
    }
  };


  const handlePostRestaurantReview = async (restaurantId) => {
    try {
      const userId = parseInt(localStorage.getItem('userId'));
      const token = localStorage.getItem('jwtToken');

      const response = await axios.post(
        'http://localhost:8080/postRestaurantReview',
        {
          userId: userId,
          comment: commentValue,
          rating: rating,
          restaurantId: restaurantId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
     
        setClickedIndex(null);
      console.log('Response:', response.data);
    } catch (error) { 
      console.log('restaurantId',restaurantId);
      console.log('userId',userId);
      console.log('commecnt',commentValue);
      console.error('Error:', error);
      throw error;
    }
  };
  

  


    
    const [editMode, setEditMode] = useState(false);
    const [editedUsername, setEditedUsername] = useState(userUsername);
    const [editedFirstname, setEditedFirstname] = useState(userFirstname);
    const [editedLastname, setEditedLastname] = useState(userLastname);
    const [editedEmail, setEditedEmail] = useState(userEmail);
    


    const handleRestaurantReviewDropDown = (index, reservationDate,time) => {
      const checkDate = new Date(`${reservationDate}T${time}`);
      const currentDate = new Date();

 
      const timeDiff =  currentDate.getTime()-checkDate.getTime() ;
      const daysDiff = timeDiff / (1000 * 3600 * 24);
     
      if (daysDiff >= 0 && daysDiff <= 14) {
        if (clickedIndex === index) {
          setClickedIndex(null);
          setRating(0);
          setHoverRating(0);
          setCommentValue('');
        } else {
          setClickedIndex(index);
          setRating(0);
          setHoverRating(0);
          setCommentValue('');
        }
      } else {
        console.log('reservation date is not within the allowed range.');
        setClickedIndex(null);
        setRating(0);
        setHoverRating(0);
        setCommentValue('');
        setErrorMessage('Cant post review reservation date out of range.')
      }
    };
    

     const handleReviewDropDown = (index, checkOut) => {
       const currentDate = new Date();
       const checkOutDate = new Date(checkOut);
  
       const timeDiff = currentDate.getTime()-checkOutDate.getTime()  ;
       const daysDiff = timeDiff / (1000 * 3600 * 24);
       console.log('outDate',checkOut);
        console.log('checkoutDate',checkOutDate);
       console.log('daysdiff',daysDiff);
      
       console.log('current',currentDate);
  
       if (daysDiff >= 0 && daysDiff <= 14) {
         if (clickedIndex === index) {
           setClickedIndex(null);
           setRating(0);
           setHoverRating(0);
           setCommentValue('');
         } else {
           setClickedIndex(index);
           setRating(0);
           setHoverRating(0);
           setCommentValue('');
         }
       } else {
         console.log('Check-out date is not within the allowed range.');
         setClickedIndex(null);
         setRating(0);
         setHoverRating(0);
         setCommentValue('');
         setErrorMessage('Cant post review check out date out of range.')
       }
     };
    
/*
    const handleReviewDropDown = (index, checkOut, pickUp, pickUpTime, reservationDate, reservationTime) => {
      const currentDate = new Date();
      let checkDate;
    
      if (checkOut) {
        checkDate = new Date(checkOut);
      } else if (pickUp) {
        checkDate = new Date(`${pickUp}T${pickUpTime}`);
      } else if (reservationDate) {
        checkDate = new Date(`${reservationDate}T${reservationTime}`);
      }
    
      const timeDiff = checkDate.getTime() - currentDate.getTime();
      const daysDiff = timeDiff / (1000 * 3600 * 24);
    
      if (daysDiff >= 0 && daysDiff <= 14) {
        if (clickedIndex === index) {

          setClickedIndex(null);
          setRating(0);
          setHoverRating(0);
          setCommentValue('');
        } else {

          setClickedIndex(index);
          setRating(0);
          setHoverRating(0);
          setCommentValue('');
        }
      } else {
        console.log('Check-out date is not within the allowed range.');
        setErrorMessage('Cannot post review.Date out of range');
      }
    };*/
    
  
    const handleEditProfile = () => {
        setEditMode(true);
      };
    
      const handleCancel = () => {
        setEditMode(false);
        // Reset edited values to original values
        setEditedUsername(userUsername);
        setEditedFirstname(userFirstname);
        setEditedLastname(userLastname);
        setEditedEmail(userEmail);
      };
    
      const handleSave = async () => {
        try {
            

            const tokenData = await axios.post(`http://localhost:8080/renewToken/${userId}`);
            const newToken=tokenData.data;

            localStorage.setItem('jwtToken',newToken);

            console.log('token',newToken);

            const response = await axios.put('http://localhost:8080/editUserProfile', {
            id:userId ,
            username:editedUsername,
            firstName: editedFirstname,
            lastName: editedLastname,
            email: editedEmail
            },{
                headers: {
                  Authorization: `Bearer ${newToken}`
                }
              });
    
            localStorage.setItem('userUsername', response.data.username);
            localStorage.setItem('userFirstname', response.data.firstname);
            localStorage.setItem('userLastname', response.data.lastname);
            localStorage.setItem('userEmail', response.data.email);

            setUserFirstname(response.data.firstname);
            setUserLastname(response.data.lastname);
            setUserEmail(response.data.email);
            setUserUsername(response.data.username);
    
            // Exit edit mode
            setEditMode(false);

            console.log('userUsername',userUsername);
            console.log('userLastname',userLastname);
            console.log('userFirstname',userFirstname);
            console.log('userEmail',userEmail);
            console.log('editedUsername',editedUsername);
            console.log('editedLastname',editedLastname);
            console.log('editedFirstname',editedFirstname);
            console.log('editedEmail',editedEmail);
        } catch (error) {
            // Handle errors
            console.log('userUsername',userUsername);
            console.log('userLastname',userLastname);
            console.log('userFirstname',userFirstname);
            console.log('userEmail',userEmail);
            console.log('editedUsername',editedUsername);
            console.log('editedLastname',editedLastname);
            console.log('editedFirstname',editedFirstname);
            console.log('editedEmail',editedEmail);
            
            console.error('Error updating user profile:', error);
        }
    };
    
    
    const handleRentalsClick=async ()=>{
        const token=localStorage.getItem('jwtToken');

        const response = await axios.post('http://localhost:8080/rentalsList', {token:token}, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          localStorage.setItem('isFromHotelListButton',false);
          setIsFromHotelListButton(false);
          localStorage.setItem('isFromRestaurantListButton',false);
          setIsFromRestaurantListButton(false);
         

          setListingResults(response.data);

    }

    const handleCarDeleteButton = async (rentalId, pickUp, pickUpTime) => {
        const token = localStorage.getItem('jwtToken');
    
        try {
           
            const pickUpDateTime = new Date(`${pickUp}T${pickUpTime}`);
    
            const currentDate = new Date();
    
            const timeDiff = pickUpDateTime.getTime() - currentDate.getTime();
    
            const daysDiff = timeDiff / (1000 * 3600 * 24);
    
            // If the pick-up date/time is less than a day away, don't proceed
            if (daysDiff < 1) {
                console.log('Pick-up date/time is less than a day away. Cannot delete rental.');
                setErrorMessage('Pick-up date/time is less than a day away. Cannot delete rental.');
                return;
            }
    
            setErrorMessage('');
    
            const response = await axios.delete(`http://localhost:8080/deleteRental/${rentalId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
    
            console.log('Rental deleted:', response.data);
            if (response.status === 200) {
                // Remove the deleted rental from the listingResults
                setListingResults(listingResults.filter(list => list.rentalId !== rentalId));
            } else {
                // Handle deletion failure
                console.error('Error deleting rental:', response.data);
            }
    
        } catch (error) {
            console.error('Error deleting rental:', error);
        }
    };
    

    const handleCarEditButton=async (rentalId, pickUp,pickUpTime,dropOff,dropOffTime, additionalDriver,navigationalSystem,babySeat,childSeat,childBoosterSeat,carId,locatioName,protectionId,userId)=>{
        
        const pickUpDateTime = new Date(`${pickUp}T${pickUpTime}`);
    
        const currentDate = new Date();

        const timeDiff = pickUpDateTime.getTime() - currentDate.getTime();

        const daysDiff = timeDiff / (1000 * 3600 * 24);

        // If the pick-up date/time is less than a day away, don't proceed
        if (daysDiff < 1) {
            console.log('Pick-up date/time is less than a day away. Cannot edit rental.');
            setErrorMessage('Pick-up date/time is less than a day away. Cannot edit rental.');
            return;
        }


        const response = await axios.post(`http://localhost:8080/auth/carSearch/${locatioName}`,{
            pickUp:pickUp,
            dropOff:dropOff
          });

      setErrorMessage('');

      localStorage.setItem('userId' ,userId);   
      localStorage.setItem('rentalId' ,rentalId);
      localStorage.setItem('pickUpDate',pickUp);
      localStorage.setItem('selectedPickUpTime',pickUpTime);
      localStorage.setItem('dropOffDate',dropOff);
      localStorage.setItem('selectedDropOffTime',dropOffTime);
      localStorage.setItem('additionalDriver',additionalDriver);
      localStorage.setItem('navigationalSystem',navigationalSystem);
      localStorage.setItem('babySafetySeat',babySeat);
      localStorage.setItem('childSafetySeat',childSeat);
      localStorage.setItem('childBoosterSeat',childBoosterSeat);
      localStorage.setItem('selectedCarId',carId);


  
      localStorage.setItem('isFromHotelEditButton',false);
      setIsFromHotelEditButton(false);
      localStorage.setItem('isFromCarEditButton',true);
      setIsFromCarEditButton(true);
      localStorage.setItem('isFromRestaurantEditButton',false);
      setIsFromRestaurantEditButton(false);

      localStorage.setItem('isForCars',JSON.stringify(true));
      localStorage.setItem('query',locatioName);

      localStorage.setItem('showCarsBar',JSON.stringify(true));
      localStorage.setItem('showHotelsBar',JSON.stringify(false));
      localStorage.setItem('showRestaurantsBar',JSON.stringify(false));


    

      navigate('/searchResults', { state: { results: response.data } });

     
    
  }


    const handleBookingsClick=async ()=>{
        const token=localStorage.getItem('jwtToken');

        const response = await axios.post('http://localhost:8080/bookingsList', {token:token}, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          localStorage.setItem('isFromHotelListButton',true);
          setIsFromHotelListButton(true);
          localStorage.setItem('isFromRestaurantListButton',false);
          setIsFromRestaurantListButton(false);
         

          setListingResults(response.data);

    }


    const handleHotelDeleteButton=async (bookingId,checkIn)=>{
        const token = localStorage.getItem('jwtToken');
    
        try {
            const checkInDate = new Date(checkIn);

            // Get the current date
            const currentDate = new Date();
            
            // Calculate the difference between the check-in date and the current date in milliseconds
            const timeDiff = checkInDate.getTime() - currentDate.getTime();
            
            // Convert the time difference from milliseconds to days
            const daysDiff = timeDiff / (1000 * 3600 * 24);
            
            // If the check-in date is less than a day away, don't proceed
            if (daysDiff < 1) {
                console.log('Check-in date is less than a day away. Cannot cancel booking.');
                setErrorMessage('Check-in date is less than a day away. Cannot cancel booking.');
               
                return;
            }
            setErrorMessage('');
        
          

            const response = await axios.delete(`http://localhost:8080/deleteBooking/${bookingId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
    
            console.log('Booking deleted:', response.data);
            if (response.status === 200) {
                // Remove the deleted reservation from the listingResults
                setListingResults(listingResults.filter(list => list.bookingId !== bookingId));
            } else {
                // Handle deletion failure
                console.error('Error deleting booking:', response.data);
            }

        } catch (error) {

            console.error('Error deleting booking:', error);
        }

    }

    const handleHotelEditButton=async (bookingId, adults,children,checkIn, checkOut, HotelName,HotelStars,HotelCity,HotelId)=>{
          // Convert the check-in date string to a Date object
        const checkInDate = new Date(checkIn);

        // Get the current date
        const currentDate = new Date();
        
        // Calculate the difference between the check-in date and the current date in milliseconds
        const timeDiff = checkInDate.getTime() - currentDate.getTime();
        
        // Convert the time difference from milliseconds to days
        const daysDiff = timeDiff / (1000 * 3600 * 24);
        
        // If the check-in date is less than a day away, don't proceed
        if (daysDiff < 1) {
            console.log('Check-in date is less than a day away. Cannot edit booking.');
            setErrorMessage('Check-in date is less than a day away. Cannot cancel booking.');
          
            return;
        }

        setErrorMessage('');
        
      
        localStorage.setItem('bookingId',bookingId);
        localStorage.setItem('checkInDate',checkIn);
        localStorage.setItem('checkOutDate',checkOut);
        localStorage.setItem('adults',adults);
        localStorage.setItem('children',children);
        localStorage.setItem('selectedHotelId',HotelId);
        localStorage.setItem('selectedHotelName',HotelName);
        localStorage.setItem('selectedHotelCity',HotelCity);
        localStorage.setItem('selectedHotelStars',HotelStars);

    
        localStorage.setItem('isFromHotelEditButton',true);
        setIsFromHotelEditButton(true);

        localStorage.setItem('isFromCarEditButton',false);
        setIsFromCarEditButton(false);
        
        localStorage.setItem('isFromRestaurantEditButton',false);
        setIsFromRestaurantEditButton(false);
    

        navigate("/roomSelection");

       
      
    }

    const handleReservationsClick=async ()=>{
        const token=localStorage.getItem('jwtToken');

        const response = await axios.post('http://localhost:8080/reservationsList', {token:token}, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          localStorage.setItem('isFromRestaurantListButton',true);
          setIsFromRestaurantListButton(true);
          localStorage.setItem('isFromHotelListButton',false);
          setIsFromHotelListButton(false);

          setListingResults(response.data);

    }

    const handleRestaurantDeleteButton = async (reservationId,reservationDate,reservationTime) => {
        const token = localStorage.getItem('jwtToken');
    
        try {

            const reservationDateTime = new Date(`${reservationDate}T${reservationTime}`);
    
            const currentDate = new Date();
    
            const timeDiff = reservationDateTime.getTime() - currentDate.getTime();
    
            const daysDiff = timeDiff / (1000 * 3600 * 24);
            
            // If the check-in date is less than a day away, don't proceed
            if (daysDiff < 1) {
                console.log('Reservation date is less than a day away. Cannot cancel reservation.');
                setErrorMessage('reservation date is less than a day away. Cannot cancel reservation.');
               
                return;
            }

            setErrorMessage('');
           

            const response = await axios.delete(`http://localhost:8080/deleteReservation/${reservationId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
    
            console.log('Reservation deleted:', response.data);
            if (response.status === 200) {
                // Remove the deleted reservation from the listingResults
                setListingResults(listingResults.filter(list => list.id !== reservationId));
            } else {
                // Handle deletion failure
                console.error('Error deleting reservation:', response.data);
            }

        } catch (error) {

            console.error('Error deleting reservation:', error);
        }
    }


    const handleRestaurantEditButton = async (reservationId,reservationTime,reserservationDate,reservationClients,restaurantName,restaurantCity,restaurantStars,restaurantTimeTableId,userId,restaurantId) => {
        

        const reservationDateTime = new Date(`${reserservationDate}T${reservationTime}`);
    
        const currentDate = new Date();

        const timeDiff = reservationDateTime.getTime() - currentDate.getTime();

        const daysDiff = timeDiff / (1000 * 3600 * 24);
        
        // If the check-in date is less than a day away, don't proceed
        if (daysDiff < 1) {
            console.log('Reservation date is less than a day away. Cannot edit reservation.');
            setErrorMessage('reservation date is less than a day away. Cannot edit reservation.');
            
            return;
        }

        setErrorMessage('');
      

        localStorage.setItem('reservationId',reservationId);
        localStorage.setItem('selectedTime', reservationTime);
        localStorage.setItem('reservationDate',reserservationDate);
        localStorage.setItem('clients',reservationClients);
        localStorage.setItem('selectedHotelId',restaurantId);

        localStorage.setItem('selectedHotelName',restaurantName);
        localStorage.setItem('selectedHotelCity',restaurantCity);
        localStorage.setItem('selectedHotelStars',restaurantStars);
        localStorage.setItem('restaurantTimeTableId',restaurantTimeTableId);
        localStorage.setItem('userId',userId);


        localStorage.setItem('isFromRestaurantEditButton',true);
        setIsFromRestaurantEditButton(true);
        localStorage.setItem('isFromCarEditButton',false);
        setIsFromCarEditButton(false);
        localStorage.setItem('isFromHotelEditButton',false);
        setIsFromHotelEditButton(false);

        navigate("/tableSelection");

        console.log('reservationId',reservationId);
        console.log('selectedTime',reservationTime);
        console.log('reservationDate',reserservationDate);
        console.log('clients',reservationClients);
        console.log('selectedHotelName',restaurantName);
        console.log('selectedHotelCity',restaurantCity);
        console.log('selectedHotelStars',restaurantStars);
        console.log('restaurantTimeTableId',restaurantTimeTableId);
        console.log('userId',userId);


    }

    const formatTime = (timeString) => {
        const [hours, minutes] = timeString.split(':');
        const time = new Date();
        time.setHours(hours);
        time.setMinutes(minutes);
        return time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      };
    

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { month: 'short', day: 'numeric'};
        return date.toLocaleDateString('en-US', options);
    };

   
      

    useEffect(() => {
            setUserId(localStorage.getItem('userId'));
            setUserUsername(localStorage.getItem('userUsername'));
            setUserFirstname(localStorage.getItem('userFirstname'));
            setUserLastname(localStorage.getItem('userLastname'));
            setUserEmail(localStorage.getItem('userEmail'));
            
            setEditedUsername(localStorage.getItem('userUsername'));
            setEditedFirstname(localStorage.getItem('userFirstname'));
            setEditedLastname(localStorage.getItem('userLastname'));
            setEditedEmail(localStorage.getItem('userEmail'));
       
        
        const timer = setTimeout(() => {
            setErrorMessage(null);
        }, 3000); 

     


        return () => clearTimeout(timer);

        

    }, [errorMessage]);

  
  



return(<>
    <meta charSet="utf-8" />
    <meta name="viewport" content="initial-scale=1, width=device-width" />
    <link rel="stylesheet" href="./global.css" />
    <link rel="stylesheet" href="./index.css" />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
    />
    <div className="desktop-44">
      {/* <div className="rectangle-parent4">
        <div className="frame-child4" />
        <div className="frame-item4" />
        <div className="frame-parent4">
          <div className="username-field-wrapper4">
            <div className="username-field4">
              <h2 className="name4">{userUsername}</h2>
              <div className="username4">{userFirstname} {userLastname}</div>
            </div>
          </div>
          <div className="glagahhgmailcom4">{userEmail}</div>
        </div>
        <button className="rectangle-group4">
          <div className="frame-inner4" />
          <div className="edit-profile4">Edit Profile</div>
        </button>
      </div> */}
      <div  style={{ height: editMode ? '898px' : '884px'}} className="rectangle-parent4" >
      <div className="frame-child4" />
      <div className="frame-item4" />
      <div className="frame-parent4">
        {editMode ? (
          <>
            <div className="username-field-wrapper4">
                <div style={{display:'flex',fontSize:'20px'}}>  <label style={{marginRight:'3px'}}>Username:</label>
              <input style={{fontSize:'20px',width:'250px'}} type="text" value={editedUsername} onChange={(e) => setEditedUsername(e.target.value)} /></div>
              
              
            
            </div>
            <div style={{display:'flex',fontSize:'20px'}}> 
            <label style={{marginRight:'3px'}}>Firstname:</label>
            <input style={{fontSize:'20px',width:'250px'}} type="text" value={editedFirstname} onChange={(e) => setEditedFirstname(e.target.value)} /></div>
            <div style={{display:'flex',fontSize:'20px'}}> 
            <label style={{marginRight:'3px'}}>Lastname:</label>
            <input style={{fontSize:'20px',width:'250px'}} type="text" value={editedLastname} onChange={(e) => setEditedLastname(e.target.value)} /></div>
            <div style={{display:'flex',fontSize:'20px'}}> 
            <label style={{marginRight:'3px'}}>Email:</label>
            <input style={{fontSize:'20px',width:'290px'}} type="text" value={editedEmail} onChange={(e) => setEditedEmail(e.target.value)} /></div>
          </>
        ) : (
          <>
            <div className="username-field-wrapper4">
              <div className="username-field4">
                <h2 className="name4">{userUsername}</h2>
                <div className="username4">{userFirstname} {userLastname}</div>
              </div>
            </div>
            <div className="glagahhgmailcom4">{userEmail}</div>
          </>
        )}
      </div>
      {editMode ? (
        <div style={{display:'flex'}}>
          <button style={{marginRight:'5px'}} className="rectangle-group4" onClick={handleCancel}> 
          <div className="frame-inner4" />
          <div className="edit-profile4">Cancel</div></button>
          <button className="rectangle-group4" onClick={handleSave}>
          <div className="frame-inner4" />
          <div className="edit-profile4">Save</div></button>
        </div>
      ) : (
        <button className="rectangle-group4" onClick={handleEditProfile}>
          <div className="frame-inner4" />
          <div className="edit-profile4">Edit Profile</div>
        </button>
      )}
    </div>

      <section className="frame-group4">
        <header className="rectangle-container4">
          <div className="rectangle-div4" />
          <button style={{border:'none',background:'white'}} onClick={handleBookingsClick} className="hotel-bookings4">Hotel Bookings</button>
          <div className="restaurant-reservation4">
            <button style={{border:'none',background:'white'}} onClick={handleReservationsClick} className="restaurant-reservations4">Restaurant Reservations</button>
          </div>
          <button  style={{border:'none',background:'white'}} onClick={handleRentalsClick} className="car-rentals4">Car Rentals</button>
        </header>
        <div className="frame-wrapper4">
          <div className="frame-div4">
            <div className="frame-child14" />
            {listingResults && (
                                 
            <div className="frame-child24" > {errorMessage && <p style={{fontSize:'16px',textAlign:'center',color:'red'}}>{errorMessage}</p>} {isFromRestaurantListButton && (<>{listingResults.map((list, index) => (<div key={index}>
                            <meta charSet="utf-8" />
                            <meta name="viewport" content="initial-scale=1, width=device-width" />
                            <link rel="stylesheet" href="./global.css" />
                            <link rel="stylesheet" href="./index.css" />
                            <link
                                rel="stylesheet"
                                href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
                            />
                            <div className="component-55">
                                <div className="component-5-child5" />
                                <div className="component-5-item5" />
                                <div className="component-5-inner5" />
                                <div className="rectangle-div5" />
                                <div className="component-5-child15" />
                                <div className="frame-div5">
                                <div className="frame-parent5">
                                    <div className="restaurant-parent5">
                                    <div className="restaurant5">restaurant</div>
                                    <div className="name-wrapper5">
                                        <b className="name5">{list.restaurantName}</b>
                                    </div>
                                    </div>
                                    <div className="clients-parent5">
                                    <div className="clients5">Clients</div>
                                    <div className="wrapper5">
                                        <b className="b5">{list.clients}</b>
                                    </div>
                                    </div>
                                    <div className="reservation-date-parent5">
                                    <div className="reservation-date5">Reservation Date</div>
                                    <div className="container">
                                        <b className="b15">{list.reservationDate}</b>
                                    </div>
                                    </div>
                                    <div className="frame-group5">
                                    <div className="time-wrapper5">
                                        <div className="time5">Time</div>
                                    </div>
                                    <b className="edit-area5">{formatTime(list.time)}</b>
                                    </div>
                                </div>
                                </div>
                                <div className="frame-container5">
                                <button    onClick={() => handleRestaurantEditButton(list.id,list.time,list.reservationDate,list.clients,list.restaurantName,list.restaurantCity,list.restaurantStars,list.restaurantTimeTableId,list.userId,list.restaurantId)}  style={{border:'none',background:'white',  height: '49px',display: 'flex',flexDirection: 'column',alignItems: 'flexStart',justifyContent: 'flexStart',padding: '13px 0 0',boxSizing: 'borderBox'}} /*className="edit-wrapper5"*/>
                                <svg style={{width:'30px',height:'30px'}} className='edit-icon5'   width={20}   height={20}   viewBox="0 0 20 20"   fill="none"   xmlns="http://www.w3.org/2000/svg" >   <path     d="M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36683 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579Z"     fill="#0F172A"   />   <path     d="M11.3787 5.79289L3 14.1716V17H5.82842L14.2071 8.62132L11.3787 5.79289Z"     fill="black"   /> </svg> 

                                </button>
                                <button style={{border:'none',background:'white',width:'30px',height:'52px'}} onClick={()=>handleRestaurantReviewDropDown(index,list.reservationDate,list.time)}>
                                  <svg   style={{width:'30px',height:'30px'}} className='multiply-icon' width={9}height={9}viewBox="0 0 9 9"fill="none"xmlns="http://www.w3.org/2000/svg"><path d="M4.07198 1.76712C4.20669 1.35253 4.79322 1.35253 4.92793 1.76712L5.40924 3.24843C5.46948 3.43384 5.64226 3.55937 5.83721 3.55937H7.39475C7.83068 3.55937 8.01193 4.1172 7.65926 4.37343L6.39918 5.28893C6.24146 5.40352 6.17547 5.60663 6.23571 5.79204L6.71701 7.27335C6.85172 7.68794 6.37721 8.0327 6.02454 7.77647L4.76446 6.86097C4.60674 6.74638 4.39317 6.74638 4.23545 6.86097L2.97538 7.77647C2.62271 8.0327 2.14819 7.68794 2.2829 7.27335L2.7642 5.79204C2.82445 5.60663 2.75845 5.40352 2.60073 5.28893L1.34066 4.37343C0.987985 4.1172 1.16923 3.55937 1.60516 3.55937H3.1627C3.35765 3.55937 3.53043 3.43384 3.59067 3.24843L4.07198 1.76712Z"fill="black"/></svg>                                 
                                </button>
                                <button   onClick={() => handleRestaurantDeleteButton(list.id,list.reservationDate,list.reservationTime)} style={{border:'none',background:'white',marginTop: '13px'}}>          
                            <svg style={{width:'30px',height:'30px'}}  className="multiply-icon5" width={20}height={20}viewBox="0 0 20 20"fill="none"xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd"clipRule="evenodd"d="M4.29289 4.29289C4.68342 3.90237 5.31658 3.90237 5.70711 4.29289L10 8.58579L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L11.4142 10L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L10 11.4142L5.70711 15.7071C5.31658 16.0976 4.68342 16.0976 4.29289 15.7071C3.90237 15.3166 3.90237 14.6834 4.29289 14.2929L8.58579 10L4.29289 5.70711C3.90237 5.31658 3.90237 4.68342 4.29289 4.29289Z"fill="black"/></svg>
                            </button>
                                </div>
                            </div>
                            {clickedIndex === index && (
                        <>
                        <meta charSet="utf-8" />
                        <meta name="viewport" content="initial-scale=1, width=device-width" />
                        <link rel="stylesheet" href="./global.css" />
                        <link rel="stylesheet" href="./index.css" />
                        <link
                          rel="stylesheet"
                          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
                        />
                        <div style={{border:'#000 solid 1px',borderRadius:'6px'}} className="jframe-parent">
                          <div className="jadd-a-review-parent">
                            <b className="jadd-a-review">Add a review</b>
                            <div className="jhotel-el-vef">Restaurant {list.restaurantName}</div>
                            <div className="jadrar-algeria">{list.restaurantCity} Algeria</div>
                          </div>
                          <section className="jhotel-name-component">
                            <div className="jstar-icons-component-parent">
                            <div style={{ marginBottom: '8px' }} className="jstar-icons-component">
                              {[...Array(5)].map((_, index) => (
                                <span
                                  key={index}
                                  onClick={() => handleStarClick(index)}
                                  onMouseEnter={() => handleStarHover(index)}
                                  onMouseLeave={handleStarLeave}
                                >
                                  {index < rating || index < hoverRating ? <SelectedStar /> : <DefaultStar />}
                                </span>
                              ))}
                            </div>
                              <div style={{width:'881px'}}  className="jlocation-component">
                                <textarea  value={commentValue}  onChange={handleCommentChange} style={{resize:'none'}} className="jghhhhhhhhhhhhhhhhhhhhhhhhhhhhh" placeholder='Tell us about your experirnce in this restaurant'/>
                               
                              </div>
                            </div>
                            <button onClick={()=>{handlePostRestaurantReview(list.restaurantId)}} style={{border:'none',background:'white'}} className="jpost-component">
                              <b className="jpost">Post</b>
                            </button>
                          </section>
                        </div>
                      </>
                      )}
                            </div>  ))} </>)}{isFromHotelListButton && (<>{listingResults.map((list, index) => (<div key={index}  >
                        <meta charSet="utf-8" />
                        <meta name="viewport" content="initial-scale=1, width=device-width" />
                        <link rel="stylesheet" href="./global.css" />
                        <link rel="stylesheet" href="./index.css" />
                        <link
                            rel="stylesheet"
                            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
                        />
                        <div  style={{ marginBottom: reviewDropDown ? '42px' : '5px' }} className="login6">
                            <div className="login-child6" />
                            <div className="login-item6" />
                            <div className="login-inner6">
                            <div className="frame-parent6">
                                <div className="hotel-wrapper6">
                                <div className="hotel6">Hotel</div>
                                </div>
                                <b className="name6">{list.hotelName}</b>
                            </div>
                            </div>
                            <div className="rectangle-div6" />
                            <div className="login-child16" />
                            <div className="login-child26" />
                            <div className="deluxe-room-parent6">
                            <div className="deluxe-room6">
                                <div className="adultschildren-parent6">
                                <div className="adultschildren6">Adults/Children</div>
                                <div className="edit-button6">
                                    <b className="multiply-symbol6">{list.adults}-{list.children}</b>
                                </div>
                                </div>
                            </div>
                            <div className="frame-wrapper6">
                                <div className="rooms-types-parent6">
                                <div className="rooms-types6">
                                    <div className="booking-period6">Booking period</div>
                                </div>
                                <b className="double-room6">{formatDate(list.checkIn)} to {formatDate(list.checkOut)}</b>
                                </div>
                            </div>
                            <div className="frame-container6">
                                <div className="frame-group6">
                                <div className="rooms-wrapper6">
                                    <div className="rooms6">Rooms</div>
                                </div>
                                <b className="single-3-double6">Single {list.nbrSingleRooms} Double {list.nbrDoubleRooms} Deluxe {list.nbrDeluxeRooms}</b>
                                </div>
                            </div>
                            <div className="frame-div6">
                                <button   style={{border:'none',background:'white', height: '41px',display: 'flex',flexDirection: 'column',alignItems: 'flexStart',justifyContent: 'flexEnd',boxSizing: 'borderBox'}}  onClick={() => handleHotelEditButton(list.bookingId, list.adults,list.children,list.checkIn, list.checkOut, list.hotelName,list.hotelStars,list.hotelCity,list.hotelId)}  /*className="edit-wrapper6"*/>
                                <svg className='edit-icon6'  style={{width:'30px',height:'30px'}}   width={20}   height={20}   viewBox="0 0 20 20"   fill="none"   xmlns="http://www.w3.org/2000/svg" >   <path     d="M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36683 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579Z"     fill="#0F172A"   />   <path     d="M11.3787 5.79289L3 14.1716V17H5.82842L14.2071 8.62132L11.3787 5.79289Z"     fill="black"   /> </svg> 
                                </button>
                                <button style={{border:'none',background:'white',width:'30px',height:'55px'}} onClick={() => handleReviewDropDown(index,list.checkOut)}>
                                  <svg   style={{width:'30px',height:'30px'}} className='multiply-icon' width={9}height={9}viewBox="0 0 9 9"fill="none"xmlns="http://www.w3.org/2000/svg"><path d="M4.07198 1.76712C4.20669 1.35253 4.79322 1.35253 4.92793 1.76712L5.40924 3.24843C5.46948 3.43384 5.64226 3.55937 5.83721 3.55937H7.39475C7.83068 3.55937 8.01193 4.1172 7.65926 4.37343L6.39918 5.28893C6.24146 5.40352 6.17547 5.60663 6.23571 5.79204L6.71701 7.27335C6.85172 7.68794 6.37721 8.0327 6.02454 7.77647L4.76446 6.86097C4.60674 6.74638 4.39317 6.74638 4.23545 6.86097L2.97538 7.77647C2.62271 8.0327 2.14819 7.68794 2.2829 7.27335L2.7642 5.79204C2.82445 5.60663 2.75845 5.40352 2.60073 5.28893L1.34066 4.37343C0.987985 4.1172 1.16923 3.55937 1.60516 3.55937H3.1627C3.35765 3.55937 3.53043 3.43384 3.59067 3.24843L4.07198 1.76712Z"fill="black"/></svg>                                 
                                   </button>
                                 <button   style={{border:'none',background:'white',width:'30px',height:'52px'}} onClick={() => handleHotelDeleteButton(list.bookingId,list.checkIn)}  >
                                 <svg   style={{width:'30px',height:'30px'}} className="multiply-icon6 " width={20}height={20}viewBox="0 0 20 20"fill="none"xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd"clipRule="evenodd"d="M4.29289 4.29289C4.68342 3.90237 5.31658 3.90237 5.70711 4.29289L10 8.58579L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L11.4142 10L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L10 11.4142L5.70711 15.7071C5.31658 16.0976 4.68342 16.0976 4.29289 15.7071C3.90237 15.3166 3.90237 14.6834 4.29289 14.2929L8.58579 10L4.29289 5.70711C3.90237 5.31658 3.90237 4.68342 4.29289 4.29289Z"fill="black"/></svg>
                                </button>
                               
                            </div>
                            </div>
                        </div>
                       
                        {clickedIndex === index && (
                        <>
                        <meta charSet="utf-8" />
                        <meta name="viewport" content="initial-scale=1, width=device-width" />
                        <link rel="stylesheet" href="./global.css" />
                        <link rel="stylesheet" href="./index.css" />
                        <link
                          rel="stylesheet"
                          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
                        />
                        <div style={{border:'#000 solid 1px',borderRadius:'6px'}} className="jframe-parent">
                          <div className="jadd-a-review-parent">
                            <b className="jadd-a-review">Add a review</b>
                            <div className="jhotel-el-vef">Hotel {list.hotelName}</div>
                            <div className="jadrar-algeria">{list.hotelCity} Algeria</div>
                          </div>
                          <section className="jhotel-name-component">
                            <div className="jstar-icons-component-parent">
                            <div style={{ marginBottom: '8px' }} className="jstar-icons-component">
                              {[...Array(5)].map((_, index) => (
                                <span
                                  key={index}
                                  onClick={() => handleStarClick(index)}
                                  onMouseEnter={() => handleStarHover(index)}
                                  onMouseLeave={handleStarLeave}
                                >
                                  {index < rating || index < hoverRating ? <SelectedStar /> : <DefaultStar />}
                                </span>
                              ))}
                            </div>
                              <div style={{width:'881px'}}  className="jlocation-component">
                                <textarea  value={commentValue}  onChange={handleCommentChange} style={{resize:'none'}} className="jghhhhhhhhhhhhhhhhhhhhhhhhhhhhh" placeholder='Tell us about your experirnce in this hotel'/>
                               
                              </div>
                            </div>
                            <button onClick={()=>{handlePostHotelReview(list.hotelId)}} style={{border:'none',background:'white'}} className="jpost-component">
                              <b className="jpost">Post</b>
                            </button>
                          </section>
                        </div>
                      </>
                      )}
                        </div>))}  </>
                        )}{!isFromHotelListButton && !isFromRestaurantListButton &&(<>{listingResults.map((list, index) => (<div key={index}>
                            <meta charSet="utf-8" />
                            <meta name="viewport" content="initial-scale=1, width=device-width" />
                            <link rel="stylesheet" href="./global.css" />
                            <link rel="stylesheet" href="./index.css" />
                            <link
                              rel="stylesheet"
                              href="https://fonts.googleapis.com/css2?family=DM Sans:wght@400;700&display=swap"
                            />
                            <div className="frame-parent">
                              <div className="frame-group">
                                <div className="car-parent">
                                  <div className="car">Car</div>
                                  <b className="fiat"> {list.carBrand} {list.carModel} {list.carBodyType}</b>
                                </div>
                                <div className="car-group">
                                  <div className="car1">Pick-up</div>
                                  <b className="fiat1">{formatDate(list.pickUp)} at {formatTime(list.pickUpTime)}</b>
                                </div>
                                <div className="car-container">
                                  <div className="car2">Drop-off</div>
                                  <b className="fiat2">{formatDate(list.dropOff)} at {formatTime(list.dropOffTime)}</b>
                                </div>
                                <div className="frame-div">
                                  <div className="car3">Protection</div>
                                  <b className="fiat3">{list.protection}</b>
                                </div>
                                <div className="edit-parent">
                                    <button style={{border:'none',background:'white'}}>
                                    <svg style={{width:'30px',height:'30px'}} className="edit-icon" onClick={()=>handleCarEditButton(list.rentalId, list.pickUp,list.pickUpTime,list.dropOff,list.dropOffTime, list.additionalDriver,list.navigationalSystem,list.babySeat,list.childSeat,list.childBoosterSeat,list.carId,list.locationName,list.protectionId,list.userId)}    width={20}   height={20}   viewBox="0 0 20 20"   fill="none"   xmlns="http://www.w3.org/2000/svg" >   <path     d="M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36683 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579Z"     fill="#0F172A"   />   <path     d="M11.3787 5.79289L3 14.1716V17H5.82842L14.2071 8.62132L11.3787 5.79289Z"     fill="black"   /> </svg> 
                                    </button> 
                                    {/* <button style={{border:'none',background:'white',width:'30px',height:'30px'}} onClick={()=>handleCarDeleteButton(list.rentalId,list.pickUp,list.pickUpTime)}>
                                  <svg  style={{width:'30px',height:'30px'}} className='multiply-icon' width={9}height={9}viewBox="0 0 9 9"fill="none"xmlns="http://www.w3.org/2000/svg"><path d="M4.07198 1.76712C4.20669 1.35253 4.79322 1.35253 4.92793 1.76712L5.40924 3.24843C5.46948 3.43384 5.64226 3.55937 5.83721 3.55937H7.39475C7.83068 3.55937 8.01193 4.1172 7.65926 4.37343L6.39918 5.28893C6.24146 5.40352 6.17547 5.60663 6.23571 5.79204L6.71701 7.27335C6.85172 7.68794 6.37721 8.0327 6.02454 7.77647L4.76446 6.86097C4.60674 6.74638 4.39317 6.74638 4.23545 6.86097L2.97538 7.77647C2.62271 8.0327 2.14819 7.68794 2.2829 7.27335L2.7642 5.79204C2.82445 5.60663 2.75845 5.40352 2.60073 5.28893L1.34066 4.37343C0.987985 4.1172 1.16923 3.55937 1.60516 3.55937H3.1627C3.35765 3.55937 3.53043 3.43384 3.59067 3.24843L4.07198 1.76712Z"fill="black"/></svg>                                 
                                   </button> */}
                                  <button style={{border:'none',background:'white'}} onClick={()=>handleCarDeleteButton(list.rentalId,list.pickUp,list.pickUpTime)}>
                                  <svg  className="multiply-icon " style={{width:'30px',height:'30px'}} width={20}height={20}viewBox="0 0 20 20"fill="none"xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd"clipRule="evenodd"d="M4.29289 4.29289C4.68342 3.90237 5.31658 3.90237 5.70711 4.29289L10 8.58579L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L11.4142 10L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L10 11.4142L5.70711 15.7071C5.31658 16.0976 4.68342 16.0976 4.29289 15.7071C3.90237 15.3166 3.90237 14.6834 4.29289 14.2929L8.58579 10L4.29289 5.70711C3.90237 5.31658 3.90237 4.68342 4.29289 4.29289Z"fill="black"/></svg>
                                  </button>
                                 
                                </div>
                              </div>
                            </div>
                           
                            </div>))}
                          </>
                          )}</div>)}
         
          </div>
        </div>
      </section>
    </div>
  </>
  );}

  export default Profile;

 
 