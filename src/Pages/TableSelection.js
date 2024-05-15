import {React, useEffect,useState }from 'react';
import { useLocation,useNavigate} from 'react-router-dom';
import axios from 'axios'
import SearchBar from './SearchBar';
import  './tableSelection.css';
import ReviewsList from "./ReviewsList";
import './roomSelection.css';


const TableSelection = () => {
  const navigate=useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState(localStorage.getItem('selectedTime') || '');
  const [clients, setClients] = useState(localStorage.getItem('clients') || '');
  const [id, setId] = useState(localStorage.getItem('selectedHotelId') || '');
  const [reservationDate, setReservationDate] = useState(localStorage.getItem('reservationDate') || '');
  const [restaurantImages, setRestaurantImages] = useState('');

  const [selectedHotel, setSelectedHotel] = useState({});
  const [availableTimes, setAvailableTimes] = useState([]);
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);

  console.log('message',message);

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




  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleTimeClick = async (selectedTime) => {
    const isAuthenticated = !!localStorage.getItem('jwtToken');

    if(isAuthenticated){
    const timeTableId = await axios.post('http://localhost:8080/auth/getTimeTableId', { time: selectedTime });
    
    const selectedTimeTableId = timeTableId.data;

    localStorage.setItem('selectedTime',selectedTime);
    
    localStorage.setItem('timeTableId', selectedTimeTableId); 
    
    console.log("timeTableId", selectedTimeTableId);

    navigate("/bookUserDetails")
    }else{
      setShowModal(true);
    }
    
   
};

  
  const handleTimeSelection = (selectedTime) => {
    setTime(selectedTime);
    setIsOpen(false);
    localStorage.setItem('selectedTime', selectedTime);
  };

  const handleClientsChange = (value) => {
    const newClients=Math.max(1, Math.min(6, clients + value));
    setClients(newClients);
    localStorage.setItem('clients', newClients);
    };

    
  const handleReservationDateChange = (event) => {
   
    const newReservationDate = event.target.value;
    setSelectedHotel({
      ...selectedHotel,
      date: newReservationDate,
    });
    localStorage.setItem('reservationDate', newReservationDate);
  };

  useEffect(() => {

    const selectedHotelCity = localStorage.getItem('selectedHotelCity');
    const selectedHotelStars = localStorage.getItem('selectedHotelStars');
    const selectedHotelName = localStorage.getItem('selectedHotelName');
    const selectedHotelId = localStorage.getItem('selectedHotelId');
    const message = localStorage.getItem('messageEmptyAvailableHours');

      setMessage(message);

    const restaurantImagesString = localStorage.getItem('restaurantImages');
    const restaurantImages = restaurantImagesString ? JSON.parse(restaurantImagesString): null ;
    const selectedHotelReservationDate = localStorage.getItem('reservationDate') || '';
    const selectedTime = localStorage.getItem('selectedTime') || '';
    let selectedHotelMapIframe=localStorage.getItem('selectedHotelMapIframe');

    const availableTimesString = localStorage.getItem('availableTimes');
    const availableTimes = availableTimesString ? JSON.parse(availableTimesString) : [];

    setAvailableTimes(availableTimes);
    setRestaurantImages(restaurantImages);
    console.log('insideEffectTime',availableTimes);

    if(selectedHotelMapIframe===null){
      selectedHotelMapIframe="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14469017.676004378!2d-8.987459755321106!3d27.702616244642265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd7e8a6a28037bd1%3A0x7140bee3abd7f8a2!2zQWxnw6lyaWU!5e0!3m2!1sfr!2sdz!4v1714932207668!5m2!1sfr!2sdz";
    }

    setSelectedHotel({
      city: selectedHotelCity,
      stars: selectedHotelStars,
      name: selectedHotelName,
      date: selectedHotelReservationDate,
      selectedHotelMapIframe:selectedHotelMapIframe
    });

    setTime(selectedTime);
    setId(selectedHotelId);

  }, []);

  const handleAvailibility = async () =>{
      
      try{ 

        
              
        // Send a request to the API with check-in and check-out dates
        const response = await axios.post('http://localhost:8080/availableHours', {
          restaurantId: id,
          hour: time,
          reservationDate:reservationDate
        
        });

        setAvailableTimes(response.data);
        console.log("available hours",response.data);
        if (response.data.length === 0) {
          setMessage('Sorry, there’s no online availability for '+ reservationDate+' within 1 hour of ' +time);
        } else {
          setMessage('');
        }

      } catch (error) {
        // Handle error if needed
        console.error('Error checking availability:', error);
      }
  }

  

  const timeOptions = [];
  for (let i = 0; i < 24; i++) {
    for (let j = 0; j < 60; j += 30) {
      const hour = `${i < 10 ? '0' + i : i}`;
      const minute = `${j === 0 ? '00' : '30'}`;
      const timeValue = `${hour}:${minute}`;
      timeOptions.push(
        <div className="dropdown-item13" key={timeValue} onClick={() => handleTimeSelection(timeValue)}>
          {timeValue}
        </div>
      );
    }
  }

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const time = new Date();
    time.setHours(hours);
    time.setMinutes(minutes);
    return time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
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



  console.log('restaurantid',localStorage.getItem('selectedHotelId'));







  const today = new Date();
  // Format the current date to 'YYYY-MM-DD' for the input field
  const formattedDate = today.toISOString().split('T')[0];


console.log('image1',restaurantImages);


  return (
    <>
  <meta charSet="utf-8" />
  <meta name="viewport" content="initial-scale=1, width=device-width" />
  <link rel="stylesheet" href="./global.css" />
  <link rel="stylesheet" href="./index.css" />
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
  />
  <div className="desktop-23">
    <div className="restaurant-name-parent3">
      <div className="restaurant-name3">Restaurant {selectedHotel.name}</div>
      <div className="restaurant-name-group3">
        <div className="restaurant-name13">
          <div className="vector-wrapper3">
            <img
              className="vector-icon3"
              loading="lazy"
              alt=""
              src="./public/vector.svg"
            />
          </div>
          <b className="b3">{selectedHotel.stars}</b>
        </div>
        <div className="adrar-algeria3">{selectedHotel.city}, Algeria</div>
      </div>
    </div>
    <div className="main-component3">
      <button   onClick={togglePopup} className="main-component-child3" type="text" /> <button/>
      <input min={formattedDate} onChange={handleReservationDateChange} value={selectedHotel.date} type='date' style={{outline:'none'}}  className="main-component-item3" />
      <div className="main-component-inner3" type="text" />
      {showPopup && (
          <div className='who3' style={{paddingTop:'40px',width:'200px',height:'200px', position: 'absolute', top: 80, left: 78, background: 'white', padding: '15px', borderRadius: '20px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', zIndex: 999 }}>
             <div style={{ fontSize: 18, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word',marginBottom: 10 }}>
              Clients<button style={{border:'none',background:'white',marginLeft:'50px'}} onClick={() => handleClientsChange(-1)}>-</button>
               {clients} 
              <button style={{border:'none',background:'white'}} onClick={() => handleClientsChange(1)}>+</button>
            </div>
            </div>
        )}
      <button  className="rectangle-div3" onClick={handleAvailibility}/>
      <div className="who-wrapper3">
        <div  className="who3">Clients {clients}</div>
      </div>
      <div className="reservation-date3"></div>
      <div  className="time-wrapper3">
         <div className="time-wrapper3">
      {/*  <div className="time">Time</div>*/ }  
          <div  class="dropdown13">
      <div  class="dropdown-toggle13" id="dropdownMenuButton3" onClick={toggleDropdown}>
        Time {time && `- ${time}`}
      </div>
      {isOpen && (
      <div class="dropdown-menu13">
        <div class="dropdown-content13">
        {timeOptions}
        </div>
      </div>
      )}
    </div>

        </div>
      </div>
      <b className="verify-availibilty3">Verify Availibilty</b>
    </div>
    <section className="desktop-2-inner3">
      <div className="frame-parent3">
        <div className="rectangle-parent3">
        {!restaurantImages || !restaurantImages.image1 ? (<div className="frame-child3"/>) : ( <img className="frame-child3" src={restaurantImages.image1} />)}
          <div className="dates-parent3">
            <div className="dates3">
            {!restaurantImages || !restaurantImages.image2 ? (<div className="selectors3"/>):(<img className="selectors3" src={restaurantImages.image2}  />)}
            {!restaurantImages || !restaurantImages.image3 ? (<div className="left-selector3"/>):(<img className="left-selector3" src={restaurantImages.image3}  />)}
            </div>
            <div className="dates13">
            {!restaurantImages || !restaurantImages.image4 ? (<div className="dates-child3" />):(<img className="dates-child3" src={restaurantImages.image4} />)}
            {!restaurantImages || !restaurantImages.image5 ? (<div className="dates-item3"/>):(<img className="dates-item3" src={restaurantImages.image5}/>)}
            </div>
          </div>
        </div>
        <div className="right-selector3">
          <div className="right-selector-child3" />
          <b className="select-time3">Select Time</b>
          <div className="time-picker3">
            <div className="frame-group3">
              <div className="hour-markers-parent3">
            {availableTimes.map((time, index) => (
                <button className="frame-button3" key={index} onClick={() => handleTimeClick(time)}>
                <div className="frame-child13" />
                <b className="b33" >{formatTime(time)}</b>
              </button>
            ))}
            {message && <p style={{color:'black',zIndex:3}}>{message}</p>}
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </section>
    <div style={{width:'1200px',height:'450px',display:'flex'}}>
     <div style={{width:'600px',height:'450px'}}><div className="roomtypes-6FG" style={{width:'233px',height:'101px',fontSize:'100px',position:'relative',top:'35%',left:'31%',right:'0px'}}>Here</div></div> 
  <div>
    <iframe
     src={selectedHotel.selectedHotelMapIframe }
      width={600}
      height={450}
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  </div>
</div>
  </div> {showModal && (
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
            <p style={{top: '1191px',width: '81px',zIndex:'999'}} className="roomtypes-6FG">Reviews</p>
             <ReviewsList/>
</>

  
  )
}

export default TableSelection;