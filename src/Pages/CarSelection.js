import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams,useNavigate, useLocation } from "react-router-dom";
import './carSelection.css';




const CarSelection = () => {
    const navigate=useNavigate();

    const selectedCarId=localStorage.getItem('selectedCarId');
    const selectedCarPrimaryImage=localStorage.getItem('selectedCarPrimaryImage');
    const selectedCarBrand =localStorage.getItem('selectedCarBrand');
    const selectedCarModel =localStorage.getItem('selectedCarModel');
    const selectedCarBodyType= localStorage.getItem('selectedCarBodyType');
    const selectedCarSeatingCapacity= localStorage.getItem('selectedCarSeatingCapacity');
    const selectedCarLuggageCapacity=  localStorage.getItem('selectedCarLuggageCapacity');
    const selectedCarHasAC =localStorage.getItem('selectedCarHasAC');
    const selectedCarAutomatic= localStorage.getItem('selectedCarAutomatic');
    const selectedCarEngineType =localStorage.getItem('selectedCarEngineType');
    const selectedCarPrice= localStorage.getItem('selectedCarPrice');


    const [selectedButton, setSelectedButton] = useState("button1");
    const [additionalDriver, setAdditionalDriver] = useState(0);
    const [navigationalSystem, setNavigationalSystem] = useState(0);
    const [babySafetySeat, setBabySafetySeat] = useState(0);
    const [childBoosterSeat, setChildBoosterSeat] = useState(0);
    const [childSafetySeat, setChildSafetySeat] = useState(0);

    const [protectionPrice, setProtectionPrice] = useState(2171.73);
    const [additionalDriverPrice, setAdditionalDriverPrice] = useState(0);
    const [navigationalSystemPrice, setNavigationalSystemPrice] = useState(0);
    const [babySafetySeatPrice, setBabySafetySeatPrice] = useState(0);
    const [childBoosterSeatPrice, setChildBoosterSeatPrice] = useState(0);
    const [childSafetySeatPrice, setChildSafetySeatPrice] = useState(0);

    const [pickUpDate, setPickUpDate] = useState(localStorage.getItem('pickUpDate') || '');
    const [dropOffDate, setDropOffDate] = useState( localStorage.getItem('dropOffDate') || '');
    const [selectedPickUpTime, setSelectedPickUpTime] = useState( localStorage.getItem('selectedPickUpTime') || '');
    const [selectedDropOffTime, setSelectedDropOffTime] = useState( localStorage.getItem('selectedDropOffTime') || '');
    const [protection, setProtection] = useState( localStorage.getItem('protection') || 1);
    const [mapIframe, setMapIframe] = useState( "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14469017.676004378!2d-8.987459755321106!3d27.702616244642265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd7e8a6a28037bd1%3A0x7140bee3abd7f8a2!2zQWxnw6lyaWU!5e0!3m2!1sfr!2sdz!4v1714932207668!5m2!1sfr!2sdz");


    


    const [showModal, setShowModal] = useState(false);
    const [showModal1, setShowModal1] = useState(false);

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



    const handleCheckOut=()=>{
        const isAuthenticated = !!localStorage.getItem('jwtToken');

        if(isAuthenticated){
            navigate("/bookUserDetails");
        }else{setShowModal(true);}

    }

    useEffect(() => {

        
        localStorage.setItem('additionalDriver', additionalDriver);
        localStorage.setItem('navigationalSystem', navigationalSystem);
        localStorage.setItem('babySafetySeat', babySafetySeat);
        localStorage.setItem('childBoosterSeat', childBoosterSeat);
        localStorage.setItem('childSafetySeat', childSafetySeat);
        const iframe=localStorage.getItem('selectedCarPickUpLocationMap');
        const pickUpDate = localStorage.getItem('pickUpDate') || '';
        const dropOffDate = localStorage.getItem('dropOffDate') || '';
        const selectedPickUpTime = localStorage.getItem('selectedPickUpTime') || '';
        const selectedDropOffTime = localStorage.getItem('selectedDropOffTime') || '';
      if(iframe!==null){
        setMapIframe(iframe);
      }else{
        setMapIframe("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14469017.676004378!2d-8.987459755321106!3d27.702616244642265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd7e8a6a28037bd1%3A0x7140bee3abd7f8a2!2zQWxnw6lyaWU!5e0!3m2!1sfr!2sdz!4v1714932207668!5m2!1sfr!2sdz")
      }
        
        setPickUpDate(pickUpDate);
        setDropOffDate(dropOffDate);
        setSelectedPickUpTime(selectedPickUpTime);
        setSelectedDropOffTime(selectedDropOffTime);

    }, [additionalDriver,navigationalSystem,babySafetySeat,childBoosterSeat,childSafetySeat]);

  
    const handleButtonClick = (buttonName) => {
      setSelectedButton(buttonName);

      if(buttonName==="button2"){
        setProtectionPrice(3489.81);
        localStorage.setItem('protection', 2);
        setProtection(2);
     
      }else if(buttonName==="button3"){
        setProtectionPrice(4187.79);
        localStorage.setItem('protection', 3);
        setProtection(3);

      }else{
        setProtectionPrice(2171.73);
        localStorage.setItem('protection', 1);
        setProtection(1);

      }
    };


    
  const handleAdditionalDriverChange = (value) => {
    const newAdditionalDriver=Math.max(0, Math.min(6, additionalDriver + value));
    setAdditionalDriver(newAdditionalDriver);
    setAdditionalDriverPrice(newAdditionalDriver*3201.44);
  
    };

  const  handleNavigationalSystemChange= (value) => {
    const newNavigationalSystem=Math.max(0, Math.min(6, navigationalSystem + value));
    setNavigationalSystem(newNavigationalSystem); 
     setNavigationalSystemPrice(newNavigationalSystem*3112.41);
    };

    const handleBabySafetySeatChange= (value) => {
        const newBabySafetySeat=Math.max(0, Math.min(6, babySafetySeat + value));
        setBabySafetySeat(newBabySafetySeat);
        setBabySafetySeatPrice(newBabySafetySeat*2761.55);
    }

    const handleChildBoosterSeatChange= (value) => {
        const newChildBoosterSeat=Math.max(0, Math.min(6, childBoosterSeat + value));
        setChildBoosterSeat(newChildBoosterSeat);
        setChildBoosterSeatPrice(newChildBoosterSeat*2761.55);
    }

    const handleChildSafetySeatChange = (value) => {
        const newChildSafetySeat=Math.max(0, Math.min(6, childSafetySeat + value));
        setChildSafetySeat(newChildSafetySeat);
        setChildSafetySeatPrice(newChildSafetySeat*2761.55 );
    }











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
    
    
    














    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = {weekday: 'long', month: 'short', day: 'numeric',year:'numeric'};
        return date.toLocaleDateString('en-US', options);
    };

    const formatTime = (timeString) => {
        const [hours, minutes] = timeString.split(':');
        const time = new Date();
        time.setHours(hours);
        time.setMinutes(minutes);
        return time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      };

      const pickUpDateObj = new Date(pickUpDate);
      const dropOffDateObj = new Date(dropOffDate);

      const diffInMs = dropOffDateObj.getTime() - pickUpDateObj.getTime();

      let diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
    
      if (selectedDropOffTime > selectedPickUpTime) {
          diffInDays++;
      }
      const totalPrice = selectedCarPrice * diffInDays;  
    
return(<>
    <meta charSet="utf-8" />
    <meta name="viewport" content="initial-scale=1, width=device-width" />
    <link rel="stylesheet" href="./global.css" />
    <link rel="stylesheet" href="./index.css" />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap"
    />
    <div className="desktop-59">
      <div className="desktop-5-child9" />
      <div style={{border:selectedButton === 'button2' ? '#000 solid 1px' : '#E5E5E5 solid 1px'}} className="desktop-5-item9" />
      <div style={{border:selectedButton === 'button3' ? '#000 solid 1px' : '#E5E5E5 solid 1px'}} className="desktop-5-inner9" />
      <div className="rectangle-div9" />
      <b className="b9">د.ج</b>
      <div style={{border:selectedButton === 'button1' ? '#000 solid 1px' : '#E5E5E5 solid 1px'}} className="desktop-5-child19" />
      <b className="protection9">Protection</b>
      <b className="available-extras9">Available Extras</b>
      <div className="desktop-5-child29" />
      <b className="included9">Included</b>
      <div className="day9">
        <b>3,489.81 </b>
        <span>/</span>
        <b> </b>
        <span>day</span>
      </div>
      <b className="basic9">Basic</b>
      <b className="medium9">Medium</b>
      <img
        className="vector-icon9"
        loading="lazy"
        alt=""
        src="./public/vector.svg"
      />
      <img
        className="vector-icon19"
        loading="lazy"
        alt=""
        src="./public/vector.svg"
      />
      <img
        className="vector-icon29"
        loading="lazy"
        alt=""
        src="./public/vector.svg"
      />
      <div className="desktop-5-child39">
        {" "}
        <img
          className="administrator-male-icon19"
          alt=""
          src="./public/administrator-male@2x.png"
        />
      </div>
      <div className="desktop-5-child49">
        {" "}
        <img
          className="administrator-male-icon19"
          alt=""
          src="./public/administrator-male@2x.png"
        />
      </div>
      <div className="desktop-5-child59">
        {" "}
        <img
          className="administrator-male-icon19"
          alt=""
          src="./public/administrator-male@2x.png"
        />
      </div>
      <div className="collision-damage-protection9">
        Collision Damage Protection
      </div>
      <div className="collision-damage-protection19">
        Collision Damage Protection
      </div>
      <div className="collision-damage-protection29">
        Collision Damage Protection
      </div>
      <div className="desktop-5-child69">
        {" "}
        <img
          className="administrator-male-icon19"
          alt=""
          src="./public/administrator-male@2x.png"
        />
      </div>
      <div className="desktop-5-child79">
        {" "}
        <img
          className="administrator-male-icon19"
          alt=""
          src="./public/administrator-male@2x.png"
        />
      </div>
      <div className="desktop-5-child89">
        {" "}
        <img
          className="administrator-male-icon19"
          alt=""
          src="./public/administrator-male@2x.png"
        />
      </div>
      <div className="theft-protection9">Theft Protection</div>
      <div className="theft-protection19">Theft Protection</div>
      <div className="theft-protection29">Theft Protection</div>
      <div className="desktop-5-child99">
        {" "}
        <img
          className="administrator-male-icon19"
          alt=""
          src="./public/administrator-male@2x.png"
        />
        <p style={{ fontSize: 16, marginLeft: 30, color: "#c4c4c4" }}>
          Windscreen, Glass, Lights &amp; Tyres protection{" "}
        </p>
      </div>
      <div className="desktop-5-child109">
        {" "}
        <img
          className="administrator-male-icon19"
          alt=""
          src="./public/administrator-male@2x.png"
        />
        <p style={{ fontSize: 16, marginLeft: 30 }}>
          {" "}
          Windscreen, Glass, Lights &amp; Tyres protection
        </p>
      </div>
      <div className="desktop-5-child119">
        {" "}
        <img
          className="administrator-male-icon19"
          alt=""
          src="./public/administrator-male@2x.png"
        />
        <p style={{ fontSize: 16, marginLeft: 30 }}>
          Windscreen, Glass, Lights &amp; Tyres protection{" "}
        </p>
      </div>
      <div className="desktop-5-child129" />
      <div className="desktop-5-child139" />
      <div className="desktop-5-child149" />
      <button
        style={{
            color: selectedButton === 'button1' ?'#BFBFBF':'#000',
          border: selectedButton === 'button1' ?'#bfbfbf solid 1px':'#000 solid 1px',
          backgroundColor: selectedButton === 'button1' ? '#e5e5e5' : 'white',
          pointerEvents: selectedButton === 'button1' ? 'none' : 'auto',
        }}
        className="desktop-5-child159"
        onClick={() => handleButtonClick('button1')}
      >
        <b>{selectedButton === 'button1' ? 'Selected' : 'Select'}</b>
      </button>
      <button
        style={{
            color: selectedButton === 'button2' ?'#BFBFBF':'#000',
            border: selectedButton === 'button2' ?'#bfbfbf solid 1px':'#000 solid 1px',
            backgroundColor: selectedButton === 'button2' ? '#e5e5e5' : 'white',
          pointerEvents: selectedButton === 'button2' ? 'none' : 'auto',
        }}
        className="desktop-5-child169"
        onClick={() => handleButtonClick('button2')}
      >
       <b>{selectedButton === 'button2' ? 'Selected' : 'Select'}</b>
      </button>
      <button
        style={{
            color: selectedButton === 'button3' ?'#BFBFBF':'#000',
            border: selectedButton === 'button3' ?'#bfbfbf solid 1px':'#000 solid 1px',
            backgroundColor: selectedButton === 'button3' ? '#e5e5e5' : 'white',
          pointerEvents: selectedButton === 'button3' ? 'none' : 'auto',
        }}
        className="desktop-5-child179"
        onClick={() => handleButtonClick('button3')}
      >
       <b>{selectedButton === 'button3' ? 'Selected' : 'Select'}</b>
      </button>
      <div className="line-div9" />
      <div className="desktop-5-child189" />
      <div className="desktop-5-child199" />
      <div  className="desktop-5-child209" />
      <div style={{marginTop: '1px'}}className="desktop-5-child219" />
      <div className="desktop-5-child229" />
      <b className="b19">د.ج</b>
      <div className="day19">
        <b>4,187.79 </b>
        <span>/ day</span>
      </div>
      <b className="premium9">Premium</b>
      <img className="vector-icon39" alt="" src="./public/vector.svg" />
      <img className="vector-icon49" alt="" src="./public/vector.svg" />
      <div className="desktop-5-child239" />
      <div className="div9">د.ج</div>
      <b className="b29">-15%</b>
      <div className="div19">4 815,95</div>
      <div className="desktop-5-child249" />
      <div className="desktop-5-child259" />
      <div className="desktop-5-child269" />
      <div className="share-the-driving9">
        Share the driving with another person.
      </div>
      <div className="desktop-5-child279" />
      <div className="stay-on-the9">
        Stay on the right track and book a Sat Nav, useful for unfamiliar roads.
      </div>
      <div className="desktop-5-child289" />
      <div className="recommended-for-a9">
        Recommended for a child 0-12 months or 0-13kg.
      </div>
      <div className="desktop-5-child299" />
      <b className="additional-driver9">Additional driver</b>
      <div className="desktop-5-child309" />
      <b className="navigational-system9">Navigational system</b>
      <div className="desktop-5-child319" />
      <div className="desktop-5-child329" />
      <div className="desktop-5-child339" />
      <div className="desktop-5-child349" />
      <b className="baby-safety-seat9">Baby safety seat</b>
     
      
    
      <div style={{textAlign:'center',paddingTop:'8px'}} className="desktop-5-child359" ><b>{additionalDriver}</b></div>
      <button style={{border:'none',borderRadius:'5px'}}  onClick={() => handleAdditionalDriverChange(-1)} className="desktop-5-child389" >-</button>
      <button style={{border:'none',borderRadius:'5px'}} onClick={() => handleAdditionalDriverChange(1)} className="desktop-5-child419" >+</button>
      
      <div  style={{textAlign:'center',paddingTop:'8px'}} className="desktop-5-child369" ><b>{navigationalSystem}</b></div>
      <button style={{border:'none',borderRadius:'5px'}}  onClick={() => handleNavigationalSystemChange(-1)} className="desktop-5-child399" >-</button>
      <button style={{border:'none',borderRadius:'5px'}}  onClick={() => handleNavigationalSystemChange(1)} className="desktop-5-child429" >+</button>
      
      <div  style={{textAlign:'center',paddingTop:'8px'}} className="desktop-5-child379" ><b>{babySafetySeat}</b></div> 
      <button style={{border:'none',borderRadius:'5px'}}  onClick={() => handleBabySafetySeatChange(-1)} className="desktop-5-child409" >-</button>
      <button style={{border:'none',borderRadius:'5px'}}  onClick={() => handleBabySafetySeatChange(1)} className="desktop-5-child439" >+</button>
      
      
      
      <div className="desktop-5-child449" />
      <div className="desktop-5-child459" />
      <div className="desktop-5-child469" />
      <b className="b39">د.ج</b>
      <div className="total9">
        <b>3,201.44 </b>
        <span>/ total</span>
      </div>
      <b className="b49">د.ج</b>
      <b className="b59">د.ج</b>
      <div className="total19">
        <b>3,112.41 </b>
        <span>/ total</span>
      </div>
      <div className="total29">
        <b>2,761.55 </b>
        <span>/ total</span>
      </div>
      <div className="desktop-5-child479" />
      <div className="desktop-5-child489" />
      <b className="b69">د.ج</b>
      <div className="total39">
        <b>2,761.55 </b>
        <span>/ total</span>
      </div>
      <div className="child-booster-seat9">Child booster seat (8-12 years)</div>
      <div className="desktop-5-child499" />
      <div className="desktop-5-child509" />
      
      
      <div className="desktop-5-child549" />
      <div className="recommended-for-a19">
        Recommended for a child 4-7 years or 15-30kg.
      </div>
      <div className="desktop-5-child559" />
      <div className="desktop-5-child569" />
      <b className="child-safety-seat9">Child safety seat</b>
      <div style={{textAlign:'center',paddingTop:'8px'}} className="desktop-5-child519" ><b>{childBoosterSeat}</b></div>
      <button style={{border:'none',borderRadius:'5px'}}  onClick={() => handleChildBoosterSeatChange(-1)} className="desktop-5-child529" >-</button>
      <button style={{border:'none',borderRadius:'5px'}}  onClick={() => handleChildBoosterSeatChange(1)} className="desktop-5-child539" >+</button>
      <div  style={{textAlign:'center',paddingTop:'8px'}} className="desktop-5-child579" ><b >{childSafetySeat}</b></div>
       <button style={{border:'none',borderRadius:'5px'}}  onClick={() => handleChildSafetySeatChange(-1)} className="desktop-5-child589" >-</button>
       <button style={{border:'none',borderRadius:'5px'}}  onClick={() => handleChildSafetySeatChange(1)}  className="desktop-5-child599" >+</button>
      <b className="child-booster-seat19">Child booster seat</b>
      <div className="desktop-5-child609" />
      <b className="b79">د.ج</b>
      <div className="total49">
        <b>2,761.55 </b>
        <span>/ total</span>
      </div>
      <div className="desktop-5-child619" />
      <b className="your-selection9">Your selection</b>
      <div className="desktop-5-child629" />
      <img className="desktop-5-child639" src={selectedCarPrimaryImage}/>
      <div className="desktop-5-child649" />
      <b className="dacia-stepway-169">{selectedCarBrand} {selectedCarModel} {selectedCarBodyType}</b>
      <div className="desktop-5-child659" />
      <img
        className="customer-icon9"
        loading="lazy"
        alt=""
        src="./public/customer@2x.png"
      />
      <img
        className="suitcase-icon9"
        loading="lazy"
        alt=""
        src="./public/suitcase@2x.png"
      />
       {selectedCarHasAC &&( 
      <img
        className="fan-speed-icon9"
        loading="lazy"
        alt=""
        src="./public/fan-speed@2x.png"
      />)}
      <img
        className="gearbox-icon9"
        loading="lazy"
        alt=""
        src="./public/gearbox@2x.png"
      />
      <img
        className="gas-station-icon9"
        loading="lazy"
        alt=""
        src="./public/gas-station@2x.png"
      />
      <div className="x59">x{selectedCarSeatingCapacity}</div>
      <div className="m9">{selectedCarAutomatic ? 'A' : 'M'}</div>
      <div className="ess9">{selectedCarEngineType}</div>
      <div className="x49">x{selectedCarLuggageCapacity}</div>
      {selectedCarHasAC &&( 
      <div className="ac9">AC</div>)}
      <div className="desktop-5-child669" />
      <b className="pick-up9">Pick-up</b>
      <div className="desktop-5-child679" />
      <div className="saturday-30-mar9">  {formatDate(pickUpDate)} at {formatTime(selectedPickUpTime)}</div>
      <div className="desktop-5-child689" />
      <b className="drop-off9">Drop-off</b>
      <div className="desktop-5-child699" />
      <div className="tuesday-02-apr9"> {formatDate(dropOffDate)} at {formatTime(selectedDropOffTime)}</div>
      <div className="desktop-5-child709" />
      <div className="desktop-5-child719" />
      <b className="total59">Total</b>
      <div className="desktop-5-child729" />
      <div className="to-pay-on9">To pay on {formatDate(pickUpDate)}</div>
      <div style={{paddingLeft: '160px'}} className="desktop-5-child739" >  <button onClick={handleCheckOut}
        style={{
            color: '#000',
            border: '#000 solid 1px',
            backgroundColor: 'white',
            top:'0px',
            left:'0px'
        
        }}
        className="desktop-5-child169"><b>Rent</b>
        </button>
        </div>
      <div className="for-3-days9">For {diffInDays} days</div>
      <b className="b89">د.ج</b>
       <b className="b99">{(totalPrice+protectionPrice+additionalDriverPrice+navigationalSystemPrice+babySafetySeatPrice+childSafetySeatPrice+childBoosterSeatPrice).toFixed(2)} {/* 2,761.55*/}</b> 
    </div>
    <div style={{margin:'auto',width:'1200px',height:'450px',display:'flex'}}>
   <div style={{width:'600px',height:'450px'}}>   <div className="roomtypes-6FG" style={{position:'relative',top:'166px',left:'137px',fontSize:'100px'}}>Here</div></div>
    <div>
    <iframe
     src={mapIframe}
      width={600}
      height={450}
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  </div></div>

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
  </>
  );


}

export default CarSelection;
