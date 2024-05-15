import React, { useState,useEffect  } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './nav.css';
import './navbar.css';

import '../Auth/register.css';


const Navbar = () => {
  const navigate = useNavigate();
  const location=useLocation();
  const [showAdditionalContent, setShowAdditionalContent] = useState(false);
  const isAuthenticated = !!localStorage.getItem('jwtToken');
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('jwtToken'));
  const [firstname,setFirstname]=useState('');
  const [lastname,setLastname]=useState('');
  const [username,setUsername]=useState('');
  const [email,setEmail]=useState('');
  const [role,setRole]=useState('');
  const [id,setID]=useState('');
  const firstLetter = username ? username.charAt(0).toUpperCase() : '';






  console.log('isAuthenticated:', isAuthenticated);



  React.useEffect(() => {

      setToken(localStorage.getItem('jwtToken'));

    if (isAuthenticated) {
      const token = localStorage.getItem('jwtToken');

      axios.post(`http://localhost:8080/getUserByToken/`, { token }, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      })
      .then(response => {
          console.log(response.data); 
          const { id, username, email, firstname, lastname, phoneNumber, role } = response.data;
 
          localStorage.setItem('userId', id);
          localStorage.setItem('userUsername', username);
          localStorage.setItem('userEmail', email);
          localStorage.setItem('userFirstname', firstname);
          localStorage.setItem('userLastname', lastname);
          localStorage.setItem('userPhoneNumber', phoneNumber);
          localStorage.setItem('userRole', role);

          setEmail(email);
          setUsername(username);
          setLastname(lastname);
          setFirstname(firstname);
          setID(id);
          setRole(role);
         
      })
      .catch(error => {
          
          console.error('Error fetching user by token:', error);
      });
  }


  }, []);

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
    

  // const handleSignUp = () => {
  //   // Redirect to /register
  //   navigate('/register');
  // };

  // const handleLogIn = () => {
  //   // Redirect to /login
  //   navigate('/login');
  // };

  
    
  const handleInputChangeLogIn = (e) => {
    setFormDataLogin({ ...formDataLogin, [e.target.name]: e.target.value });
  };  

  const handleInputChangeSignUp = (e) => {
    setFormDataSignUp({ ...formDataSignUp, [e.target.name]: e.target.value });
  };

  const handleSignUpClick = () => {
    setShowModal1(true);
    setShowModal(false);

  };

  const handleLogInClick = () => {
    setShowModal(true);
    setShowModal1(false);

  };


  const handleLogIn = async () => {
    try {
      const response = await axios.post('http://localhost:8080/auth/login', formDataLogin);
      
      // Extract the new token from the response
      const token = response.data.token;
  
      // Store the new token in local storage
      localStorage.setItem('jwtToken', token);

      const email = await axios.post('http://localhost:8080/auth/getEmail', {token});

      const userEmail=email.data

      localStorage.setItem('userEmail', userEmail);

      const isAdminData = await axios.get(`http://localhost:8080/isAdmin?token=${token}`);
      const isAdmin=isAdminData.data;

      localStorage.setItem('isAdmin',JSON.stringify(isAdmin));


      setShowModal(false);

      console.log('User logged in:', response.data);

      const redirectPath = location.state?.from || '/';
      navigate(redirectPath, { replace: true });
      
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

      console.log('User signed up:', response.data);
      // Handle success, redirect, or show a success message
      const redirectPath = location.state?.from || '/';
      navigate(redirectPath, { replace: true });
      
        } catch (error) {
      console.error('Error signing up:', error.response.data);
      // Handle error, show an error message, etc.
    }
  }




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

 

  const handleDisconnect = async () => {
    try {
      // Retrieve the token from local storage
      const token = localStorage.getItem('jwtToken');

      // Include the token in the Authorization header
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      // Make the request to the /logout endpoint with the Authorization header
      const response = await axios.get('http://localhost:8080/logout', { headers });

      // Handle success, update state, or perform other actions
      console.log('Logout success:', response.data);

      // Remove the token from local storage
      localStorage.clear();



      navigate("/");

    } catch (error) {
      console.error('Error during logout:', error.response.data);
      // Handle error, show an error message, etc.
    }
  };


  const handleButtonClick = () => {
    // Toggle the visibility of the additional content
    setShowAdditionalContent(!showAdditionalContent);
  };

  const handleLogoClick= () =>{
    
    localStorage.removeItem('pickUpDate');
    localStorage.removeItem('selectedPickUpTime');
    localStorage.removeItem('dropOffDate');
    localStorage.removeItem('selectedDropOffTime');
    localStorage.removeItem('isFromRestaurantEditButton');
    localStorage.removeItem('isFromHotelEditButton');
    localStorage.removeItem('isFromCarEditButton');
    localStorage.removeItem('query');
    localStorage.removeItem('checkInDate');
    localStorage.removeItem('checkOutDate');
    localStorage.removeItem('selectedTime');

   
    navigate("/");

  }

  const handleAdminButton = () =>{
    navigate("/adminPanel");

  }

  return (
    <div style={{width:'1366px'}}>
      {/* <div className="frame-zni">
        <button onClick={handleLogoClick} style={{border:'none',background:'white'}}><p className="dz-trav-jVQ">DZ-TRAV</p></button>
        <div className="frame-7-qoL">
         
          <button className="frame-4-nia">Home</button>
          <button className="frame-6-U5c">Discover</button>
          <div className="auto-group-fxs8-YbG">
            <button className="frame-5-5r6">Review</button> 
            {(JSON.parse(localStorage.getItem('isAdmin'))) &&(
            <button onClick={handleAdminButton} className="frame-7-miv" >
              Admin
            </button>)}
          </div>
        </div>
      </div>

      <div className="frame-Tbk">
      
      {!isAuthenticated && (
          <>
      <button className="frame-8-DL2" onClick={handleLogInClick}>
        Sign in
      </button>
      <button className="frame-9-gzJ" onClick={handleSignUpClick}>
        Sign up
      </button>
      </>
      )}  
      </div>

      {(isAuthenticated && (localStorage.getItem('jwtToken'))!=="") && (
      <button className="new-element" onClick={handleButtonClick} style={{ zIndex: showAdditionalContent ? 999 : 1 }}>
        {showAdditionalContent && (
          <div style={{cursor:'default',  width: 199.50, height: 226.50, left: 1000, top: 41, position: 'absolute'}}>
          <div style={{width: 199.50, height: 226.50, left: 0, top: 0, position: 'absolute', background: 'white', borderRadius: 28}}></div>
          <div style={{width: 47, height: 47, left: 110, top: 7, position: 'absolute', background: '#D9D9D9', borderRadius: 9999}} />
          <div style={{width: 19, height: 10.20, left: 185, top: 35.20, position: 'absolute', transform: 'rotate(-180deg)', transformOrigin: '0 0', background: 'black'}}></div>
          <div style={{left: 34, top: 91, position: 'absolute', color: 'black', fontSize: 18, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>Name Surname</div>
          <div style={{width: 94, height: 23, left: 53, top: 122, position: 'absolute', background: '#D9D9D9', borderRadius: 12}} />
          <button style={{border:'none', background:'#D9D9D9', left: 64, top: 125, position: 'absolute', color: 'black', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>Edit profile</button>
          <div style={{width: 12.99, height: 12.99, left: 65, top: 157, position: 'absolute'}}>
            <div style={{width: 6.49, height: 11.37, left: 1.62, top: 0.81, position: 'absolute', background: 'black'}}></div>
            <div style={{width: 7.31, height: 4.87, left: 4.06, top: 4.06, position: 'absolute', background: 'black'}}></div>
            <div style={{width: 12.99, height: 12.99, left: 0, top: 0, position: 'absolute'}}></div>
          </div>
          <button
              style={{
                border: 'none',
                background: '#ffffff',
                left: 77.99,
                top: 157,
                position: 'absolute',
                color: '#5F6368',
                fontSize: 11,
                fontFamily: 'Inter',
                fontWeight: '400',
                wordWrap: 'break-word',
              }}
              onClick={handleDisconnect}
            > Disconnect
            </button>
        </div>
        )}
        <div className="inner-box"></div>
        <div className="circle"></div>
        <div className="bar"></div>
      </button>
      )} */}

    
            <>
  <meta charSet="utf-8" />
  <meta name="viewport" content="initial-scale=1, width=device-width" />
  <link rel="stylesheet" href="./global.css" />
  <link rel="stylesheet" href="./index.css" />
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
  />
  <div className="xframe-parent">
    <div className="xdz-trav-wrapper">
     <button onClick={handleLogoClick} style={{border:'none',background:'white'}}> <h3 className="xdz-trav">DZ-TRAV</h3></button>
    </div>
    {(isAuthenticated && (localStorage.getItem('jwtToken'))!=="") && (
    <button  className="xframe-group" onClick={handleButtonClick} style={{border:'none',zIndex: showAdditionalContent ? 999 : 1 }}>
      <div className="xg-wrapper">
        <div className="xg">{firstLetter}</div>
      </div>
      <div className="xusername-wrapper">
        <div className="xusername">{username}</div>
      </div>
    </button>)}

    
    {showAdditionalContent && (
          <div style={{textAlign:'center',zIndex:999,cursor:'default',  width: 199.50, height: 226.50, left: '1157px', top: 37, position: 'absolute'}}>
          <div style={{border:'2px black solid',zIndex:999,width: 199.50, height: 226.50, left: 0, top: 0, position: 'absolute', background: 'white', borderRadius: 28}}></div>
          <div style={{zIndex:999,width: 47, height: 47, left: 110, top: 7, position: 'absolute', background: '#D9D9D9', borderRadius: 9999}} />

          <div style={{width:'200px',zIndex:999,left: 0, top: 91, position: 'absolute', color: 'black', fontSize: 18, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>{firstname} {lastname}</div>
          <div style={{zIndex:999,width: 94, height: 23, left: 53, top: 122, position: 'absolute', background: '#D9D9D9', borderRadius: 12}} />
          <button style={{zIndex:999,border:'none', background:'#D9D9D9', left: 64, top: 125, position: 'absolute', color: 'black', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>Edit profile</button>
          <div style={{zIndex:999,width: 15 ,height: 15, left: 60, top: 156, position: 'absolute'}}>
            {/* <div style={{zIndex:999,width: 6.49, height: 11.37, left: 1.62, top: 0.81, position: 'absolute', background: 'black'}}></div> */}
            {/* <div style={{zIndex:999,width: 7.31, height: 4.87, left: 4.06, top: 4.06, position: 'absolute', background: 'black'}}></div> */}
            <svg style={{zIndex:999, left: 0, top: 0, position: 'absolute'}}   width={15}   height={15}   viewBox="0 0 24 24"   fill="none"   xmlns="http://www.w3.org/2000/svg" >   <path     d="M17 16L21 12M21 12L17 8M21 12L7 12M13 16V17C13 18.6569 11.6569 20 10 20H6C4.34315 20 3 18.6569 3 17V7C3 5.34315 4.34315 4 6 4H10C11.6569 4 13 5.34315 13 7V8"     stroke="#0F172A"     strokeWidth={2}     strokeLinecap="round"     strokeLinejoin="round"   /> </svg> 
          </div>
          <button
              style={{
                zIndex:999,
                border: 'none',
                background: '#ffffff',
                left: 77.99,
                top: 157,
                position: 'absolute',
                color: '#5F6368',
                fontSize: 11,
                fontFamily: 'Inter',
                fontWeight: '400',
                wordWrap: 'break-word',
              }}
              onClick={handleDisconnect}
            > Disconnect
            </button>
        </div>
        )}


    {!isAuthenticated && (
    <div class="xxframe-parent">
      <button onClick={handleSignUpClick} class="xxsign-up-wrapper">
        <b class="xxsign-up">Sign up</b>
      </button>
      <button onClick={handleLogInClick} class="xxsign-in-wrapper">
        <b class="xxsign-in">Sign in</b>
      </button>
    </div>)}
  </div>
</>

{showModal && (
            < >
              
              <div className="modal-backdrop"></div> 

                 <div className="component-16-b7C" style={{position:'absolute',top:'0px',right:'914px',height:'490px',marginTop:'259px'}} >
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



    </div>
  );
};

export default Navbar;

