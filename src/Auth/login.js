import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,useLocation  } from 'react-router-dom';

import './register.css';




const LogInForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  const handleLogIn = async () => {
    try {
      const response = await axios.post('http://localhost:8080/auth/login', formData);
      
      // Extract the new token from the response
      const token = response.data.token;
  
      // Store the new token in local storage
      localStorage.setItem('jwtToken', token);

      const email = await axios.post('http://localhost:8080/auth/getEmail', {token});

      const userEmail=email.data

      localStorage.setItem('userEmail', userEmail);


      
      console.log('User logged in:', response.data);

      const redirectPath = location.state?.from || '/';
      navigate(redirectPath, { replace: true });
    } catch (error) {
      console.error('Error logging in:', error.response.data);
      // Handle error, show an error message, etc.
    }
  };
  
  const navigateToRegister = () => {
  navigate('/register', { state: { from: '/roomSelection' } });
  };

  return (
    <div className="desktop-3-V8J">
    <p className="where-to-VXc">where to?</p>
    <div className="frame-9-k7Q">
      <img className="bedroom-U3Q" src="./assets/bedroom-86S.png" />
      <div className="hotels-CEJ">Hotels</div>
    </div>
    <div className="frame-20-X1g">
      <div className="component-3-SPY">
        <div className="component-3-Ppa">
          <div className="auto-group-kais-x6z">
            <div className="rectangle-10-uH8"></div>
          </div>
          <div className="auto-group-rhyg-38S">
            <div className="frame-14-mKL">
              <p className="place-1-K5x">place 1</p>
              <div className="frame-19-qpz">
                <img
                  className="material-symbols-light-star-Na2"
                  src="./assets/material-symbols-light-star-mSn.png"
                />
                <p className="item-45-Usx">4.5</p>
              </div>
            </div>
            <p className="night-oQS">
              <span className="night-oQS-sub-0">$1,040 </span>
              <span className="night-oQS-sub-1">night</span>
            </p>
          </div>
        </div>
      </div>
      <div className="auto-group-3b5g-RKL">
        <div className="component-3-Min">
          <div className="component-3-tTp">
            <div className="auto-group-xfg2-qP4">
              <div className="rectangle-10-np6"></div>
            </div>
            <div className="auto-group-2anz-jDY">
              <div className="frame-14-TvE">
                <p className="place-1-cYE">place 1</p>
                <div className="frame-19-8Wa">
                  <img
                    className="material-symbols-light-star-gHC"
                    src="./assets/material-symbols-light-star-mSn.png"
                  />
                  <p className="item-45-b9G">4.5</p>
                </div>
              </div>
              <p className="night-WGE">
                <span className="night-WGE-sub-0">$1,040 </span>
                <span className="night-WGE-sub-1">night</span>
              </p>
            </div>
          </div>
        </div>
        <div className="component-3-skz">
          <div className="component-3-R1p">
            <div className="auto-group-ak3c-Zti">
              <div className="rectangle-10-L8n"></div>
            </div>
            <div className="auto-group-gewg-56N">
              <div className="frame-14-cMC">
                <p className="place-1-ZGS">place 1</p>
                <div className="frame-19-h7k">
                  <img
                    className="material-symbols-light-star-eYn"
                    src="./assets/material-symbols-light-star-mSn.png"
                  />
                  <p className="item-45-An2">4.5</p>
                </div>
              </div>
              <p className="night-hX4">
                <span className="night-hX4-sub-0">$1,040 </span>
                <span className="night-hX4-sub-1">night</span>
              </p>
            </div>
          </div>
        </div>
        <div className="frame-HVG">
          <div className="frame-Nmc">
            <img className="close-uWe" src="./assets/close.png" />
          </div>
          <p className="welcome-to-dz-trav-qv6">Welcome to DZ-TRAV</p>
        </div>
      </div>
      <div className="component-3-knA">
        <div className="component-3-Jog">
          <div className="auto-group-hnby-rqC">
            <div className="rectangle-10-pX8"></div>
          </div>
          <div className="auto-group-rvga-kfg">
            <div className="frame-14-HvW">
              <p className="place-1-DpA">place 1</p>
              <div className="frame-19-9hp">
                <img
                  className="material-symbols-light-star-hUS"
                  src="./assets/material-symbols-light-star-mSn.png"
                />
                <p className="item-45-bZp">4.5</p>
              </div>
            </div>
            <p className="night-XTU">
              <span className="night-XTU-sub-0">$1,040 </span>
              <span className="night-XTU-sub-1">night</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <p className="continue-exploring-X66">Continue exploring</p>
    <div className="frame-8-RBU">Show more</div>
    <div className="component-7-6YW">
      <div className="frame-PXc">
        <div className="frame-Lhk">
          <div className="frame-6gv">
            <p className="dz-trav-rRC">DZ-TRAV</p>
            <div className="frame-4-arz">Home</div>
          </div>
          <div className="frame-sr6">
            <div className="frame-4-dKU">Discover</div>
            <div className="frame-21-8GE">Review</div>
            <div className="frame-22-cSJ">More</div>
          </div>
        </div>
      </div>
      <div className="frame-78A">
        <div className="frame-Thp">
          <img className="vector-Qsx" src="./assets/vector-M2N.png" />
          <img className="vector-kwp" src="./assets/vector-pNA.png" />
          <img className="vector-WAJ" src="./assets/vector-ta2.png" />
        </div>
        <div className="frame-Fdg">Copyright 2023-2024 @ DZ-TRAV LLC</div>
      </div>
    </div>
    <div className="frame-29-8hU">
      <img className="slider-3Je" src="./assets/slider-QVL.png" />
      <p className="filters-Au4">Filters</p>
    </div>
    <div className="frame-3-tq4">
      <img className="search-Q2i" src="./assets/search-DG2.png" />
      <div className="search-jan"></div>
    </div>
    <div className="rectangle-23-ehk"></div>
    <div style={{height:'490px'}}  className="component-16-b7D">
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
          onChange={handleInputChange}/>
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
          onChange={handleInputChange}/>
                <img className="lock-g46" src="./assets/lock.png" />
            </div>
        </div>
        <div className="frame-BFk">
  <button onClick={handleLogIn} className="frame-34-LPY">Sign in</button>
</div>
<div style={{fontSize:'16px',marginTop:'-16px'}}>No Account? <span style={{ color: 'blue', cursor: 'pointer' }} onClick={navigateToRegister}>Create one</span></div>
      </div>
    </div>
  </div>
  );
};

export default LogInForm;