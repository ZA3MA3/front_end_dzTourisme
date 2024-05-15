import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams,useNavigate, useLocation } from "react-router-dom";
import './adminPanel.css';



const AdminPanel = () => {


  const [listingResults, setListingResults] = useState(null);
  const [cityListingResults, setCityListingResults] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const [size] = useState(5);

  const [addUserButton, setAddUserButton] = useState(false);
  const [addHotelButton, setAddHotelButton] = useState(false);
  const [addRestaurantButton, setAddRestaurantButton] = useState(false);
  const [addCarButton, setAddCarButton] = useState(false);

  const [role, setRole] = useState('');
  const [cityName, setCityName] = useState('');
  const [engineType, setEngineType] = useState('');


  const [isOpenPickUpLocation, setIsOpenPickUpLocation] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [usersClicked, setUsersClicked] = useState(true);
  const [citiesClicked, setcitiesClicked] = useState(false);
  const [restaurantsClicked, setRestaurantsClicked] = useState(false);
  const [carsClicked, setCarsClicked] = useState(false);
  const [hotelsClicked, setHotelsClicked] = useState(false);


const handlePickUpLocationDiv=()=>{
  if(isOpenPickUpLocation){
  setIsOpenPickUpLocation(false);}
  else{
  setIsOpenPickUpLocation(true);}
}


const  handleCheckBoxInputChange = (event) => {
  const target = event.target;
  const value = target.type === 'checkbox' ? !formDataAddCar[target.name] : target.value;
  const name = target.name;

  setFormDataCar({
      ...formDataAddCar,
      [name]: value
  });
};


 
  const [formDataAddHotel, setFormDataHotel] = useState({
    name: '',
    description:'',
    stars: '',
    cityName:''
  });


  const [formDataAddUser, setFormDataSignUp] = useState({
      username: '',
      email:'',
      password: '',
      confirmationPassword:'',
      role:''
  });

  const [ formDataAddCar, setFormDataCar] = useState({
    
    brand:'',
    model:'',
    price:'',
    year:'',
    bodyType:'',
    engineType:'',
    automatic:false,
    hasAC:false,
    seatingCapacity:'',
    luggageCapacity:'',

});


 
  const navigate=useNavigate();

  const handleAddUserButtonClickStatus = ()=>{
    setAddCarButton(false);
    setAddHotelButton(false);
    setAddRestaurantButton(false);
    setAddUserButton(true);
  }

  const handleAddHotelButtonClickStatus = ()=>{
    setAddHotelButton(true);
    setAddCarButton(false);
    setAddUserButton(false);
    setAddRestaurantButton(false);
  }

  const handleAddRestaurantButtonClickStatus = ()=>{
    setAddRestaurantButton(true);
    setAddHotelButton(false);
    setAddCarButton(false);
    setAddUserButton(false);
  }


  const handleAddCarButtonClickStatus = ()=>{
    setAddRestaurantButton(false);
    setAddHotelButton(false);
    setAddCarButton(true);
    setAddUserButton(false);
  }

  const handleUsersClick =async (currentPage)=>{
    try{

      
      const token=localStorage.getItem('jwtToken');
                                        
      const response = await axios.get(`http://localhost:8080/usersList?page=${currentPage}&size=${size}`,
      { headers: {
        Authorization: `Bearer ${token}`
      }});
      
      setUsersClicked(true);
      setCarsClicked(false);
      setHotelsClicked(false);
      setRestaurantsClicked(false);
      setcitiesClicked(false);
      setListingResults(response.data.restaurantAdditions);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
      setTotalElements(response.data.totalUsers);

      console.log('response:',response.data.content);



    }catch (error) {
      // console.error('Error listing users:', error.response.data);
      console.log("",error);
    }
     }


     const handleCitiesClick =async (currentPage)=>{
      try{

        
        const token=localStorage.getItem('jwtToken');
                                          
        const response = await axios.get(`http://localhost:8080/citiesList?page=${currentPage}&size=${size}`,
        { headers: {
          Authorization: `Bearer ${token}`
        }});
        
        setUsersClicked(false);
        setCarsClicked(false);
        setHotelsClicked(false);
        setRestaurantsClicked(false);
        setcitiesClicked(true);
        setListingResults(response.data.restaurantAdditions);
        setTotalPages(response.data.totalPages);
        setCurrentPage(response.data.currentPage);
        setTotalElements(response.data.totalCities);

        console.log('response:',response.data.content);
  
  
  
      }catch (error) {
        // console.error('Error listing users:', error.response.data);
        console.log("",error);
      }
       }



       const handleHotelsClick =async (currentPage)=>{
        try{

          
          const token=localStorage.getItem('jwtToken');
                                            
          const response = await axios.get(`http://localhost:8080/hotelsList?page=${currentPage}&size=${size}`,
          { headers: {
            Authorization: `Bearer ${token}`
          }});
          
          setUsersClicked(false);
          setCarsClicked(false);
          setHotelsClicked(true);
          setRestaurantsClicked(false);
          setcitiesClicked(false);
          setListingResults(response.data.restaurantAdditions);
          setTotalPages(response.data.totalPages);
          setCurrentPage(response.data.currentPage);
          setTotalElements(response.data.totalHotels);

          console.log('response:',response.data.content);
    
    
    
        }catch (error) {
          // console.error('Error listing users:', error.response.data);
          console.log("",error);
        }
         }


         const handleRestaurantsClick =async (currentPage)=>{
          try{
            const token=localStorage.getItem('jwtToken');
      
            const response = await axios.get(`http://localhost:8080/restaurantsList?page=${currentPage}&size=${size}`,
            { headers: {
              Authorization: `Bearer ${token}`
            }});
            
            setUsersClicked(false);
            setCarsClicked(false);
            setHotelsClicked(false);
            setRestaurantsClicked(true);
            setcitiesClicked(false);
            setListingResults(response.data.restaurantAdditions);
            setTotalPages(response.data.totalPages);
            setCurrentPage(response.data.currentPage);
            setTotalElements(response.data.totalRestaurants);
            
            console.log('response:',response.data.content);

          }catch (error) {
            // console.error('Error listing users:', error.response.data);
            console.log("",error);
          }
           }


           const handleCarsClick =async (currentPage)=>{
            try{
    
              
              const token=localStorage.getItem('jwtToken');
                                                
              const response = await axios.get(`http://localhost:8080/carsList?page=${currentPage}&size=${size}`,
              { headers: {
                Authorization: `Bearer ${token}`
              }});
              
              setUsersClicked(false);
              setCarsClicked(true);
              setHotelsClicked(false);
              setRestaurantsClicked(false);
              setcitiesClicked(false);
              setListingResults(response.data.restaurantAdditions);
              setTotalPages(response.data.totalPages);
              setCurrentPage(response.data.currentPage);
              setTotalElements(response.data.totalCars);

              console.log('response:',response.data.content);
        
        
        
            }catch (error) {
              // console.error('Error listing users:', error.response.data);
              console.log("",error);
            }
             }
    
    

    const handleUserDeleteButton = async (userId) => {
      const token = localStorage.getItem('jwtToken');
  
      try {
          const response = await axios.delete(`http://localhost:8080/deleteUser/${userId}`, {
              headers: {
                  Authorization: `Bearer ${token}`
              }
          });

                if (response.status === 200) {
                  // Remove the deleted reservation from the listingResults
                  setListingResults(listingResults.filter(list => list.id !== userId));
              } else {
                  // Handle deletion failure
                  console.error('Error deleting user:', response.data);
              }      
            
            } catch (error) {
          console.error('Error deleting user:', error);
      }
  }


 
  const handleInputChangeSignUp = (e) => {
    setFormDataSignUp({ ...formDataAddUser, [e.target.name]: e.target.value });
  };

  const handleInputChangeHotelAddition = (e) => {
    setFormDataHotel({ ...formDataAddHotel, [e.target.name]: e.target.value });
  };

  const handleInputChangeCarAddition = (e) => {
    setFormDataCar({ ...formDataAddCar, [e.target.name]: e.target.value });
  };

  
  const handleHotelAddition = async () => {
    try {
      const token = localStorage.getItem('jwtToken');

      const response = await axios.post('http://localhost:8080/addHotel', formDataAddHotel,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const listResponse = await axios.get(`http://localhost:8080/hotelsList?page=${0}&size=${10}`,
      { headers: {
        Authorization: `Bearer ${token}`
      }});

      setListingResults(listResponse.data.content);

    setAddHotelButton(false);
      console.log('Hotel addition:', response.data);
      // Handle success, redirect, or show a success message
     
       console.log("formdata",formDataAddHotel);
        } catch (error) {   

      console.error('Error adding hotel:', error.response.data);
      // Handle error, show an error message, etc.
    }
  }

  const handleRestaurantAddition = async () => {
    try {
      const token = localStorage.getItem('jwtToken');

      const response = await axios.post('http://localhost:8080/addRestaurant', formDataAddHotel,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const listResponse = await axios.get(`http://localhost:8080/restaurantsList?page=${0}&size=${10}`,
      { headers: {
        Authorization: `Bearer ${token}`
      }});

      setListingResults(listResponse.data.content);

    setAddRestaurantButton(false);
      console.log('Restaurant addition:', response.data);
      // Handle success, redirect, or show a success message
      console.log("formdata",formDataAddHotel);
      
        } catch (error) {   

      console.error('Error adding restaurant:', error.response.data);
      // Handle error, show an error message, etc.
    }
  }

  const handleCarAddition = async () => {
    try {
      const token = localStorage.getItem('jwtToken');

      const response = await axios.post('http://localhost:8080/addCar', formDataAddCar,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const listResponse = await axios.get(`http://localhost:8080/carsList?page=${0}&size=${10}`,
      { headers: {
        Authorization: `Bearer ${token}`
      }});

      setListingResults(listResponse.data.content);

    setAddCarButton(false);
      console.log('car addition:', response.data);
      // Handle success, redirect, or show a success message
     
      console.log("formdata",formDataAddCar);
        } catch (error) {    

      console.error('Error adding car:', error.response.data);
      // Handle error, show an error message, etc.
    }
  }

  



  const handleUserAddition = async () => {
    try {
      const token = localStorage.getItem('jwtToken');

      const response = await axios.post('http://localhost:8080/addUser', formDataAddUser,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const listResponse = await axios.get(`http://localhost:8080/usersList?page=${0}&size=${10}`,
      { headers: {
        Authorization: `Bearer ${token}`
      }});

      setListingResults(listResponse.data.content);

    setAddUserButton(false);
      console.log('User signed up:', response.data);
      // Handle success, redirect, or show a success message
     
      console.log("formdata",formDataAddUser);
        } catch (error) {    

      console.error('Error signing up:', error.response.data);
      // Handle error, show an error message, etc.
    }
  }

  React.useEffect(() => {
    setFormDataSignUp({ ...formDataAddUser, role: role });
    setFormDataHotel({ ...formDataAddHotel, cityName: cityName });
    setFormDataCar({ ...formDataAddCar, engineType: engineType });

    if (hotelsClicked) {
      handleHotelsClick(currentPage);
    } else if (restaurantsClicked) {
      handleRestaurantsClick(currentPage);
    }else if(carsClicked){
      handleCarsClick(currentPage);

    }else if(citiesClicked){
      handleCitiesClick(currentPage);

    }else if(usersClicked){
      handleUsersClick(currentPage);

    }


  }, [role,cityName,engineType,currentPage,hotelsClicked,restaurantsClicked,carsClicked,citiesClicked,usersClicked]);





    const handleRoleSelection = (selectedRole) => {
        setRole(selectedRole);
        setIsOpen(false);
      };

      const handleCityNameSelection=(cityName)=>{
        setCityName(cityName);
        setCityListingResults(null);
        setIsOpen(false);
        
      }
      
      


      const handleEngineTypeSelection=(engineType)=>{
        setEngineType(engineType);
        setIsOpen(false);
      }

      const handleRoleClick = () => {
        setIsOpen(true);
      }; 

      const handleEngineTypeClick = () => {
        setIsOpen(true);
      }; 

      const handleCityClick = async () => {
        try{
          const token=localStorage.getItem('jwtToken');
    
          const response = await axios.get(`http://localhost:8080/citiesList?page=${0}&size=${100}`,
          { headers: {
            Authorization: `Bearer ${token}`
          }});
        setCityListingResults(response.data.content);
        console.log('response:',response.data.content);
        setIsOpen(true);

  
  
      }catch (error) {
        // console.error('Error listing users:', error.response.data);
        console.log("",error);
      }
      }; 


      const renderPageLinks = () => {
        const pageLinks = [];
        const maxPageLinks = 6;
        const startPage = Math.max(0, currentPage - Math.floor(maxPageLinks / 2));
        const endPage = Math.min(totalPages - 1, startPage + maxPageLinks - 1);
    
        for (let i = startPage; i <= endPage; i++) {
          pageLinks.push(
            <button style={{border:'none'}} key={i} className={`alist-item-link${i - startPage + 12}`}>
              <div  className={`adiv${i + 35}`} onClick={() => handlePageChange(i)}>
                {i + 1}
              </div>
            </button>
          );
        }
    
        return pageLinks;
      };

      const handlePageChange = (page) => {
        setCurrentPage(page);
      };
    
 
    return (
        <>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="stylesheet" href="./global.css" />
        <link rel="stylesheet" href="./index.css" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Segoe UI:wght@400;700&display=swap"
        />
        <div className="ademodashboardpackcom-by-html">
          <main style={{height:'651px'}} className="adivapp-container">
            <div style={{height:'100%'}}  className="adivapp-sidebar">
              <div className="alist-item-link" />
              <div  className="alist-item-menu-parent">
                <b className="alist-item">Dashboard</b>
                
              </div>
              <div className="adivapp-sidebar-inner">
                <div className="aframe-group">
                <div  className="aframe-container">
                    <button style={{width:'173px'}} onClick={()=>handleUsersClick(currentPage)} className="aframe-div">
                      <div className="alist-item-link-wrapper">
                        <img
                          className="alist-item-link3"
                          alt=""
                          src="./public/list--item--link-2.svg"
                        />
                      </div>
                      <div className="alist-item2">Users</div>
                    </button>
                    <div  className="alist-item-link-container">
                      <img
                        className="alist-item-link4"
                        alt=""
                        src="./public/list--item--link-3.svg"
                      />
                    </div>
                  </div>
                 

                  <div  className="aframe-container">
                    <button style={{width:'173px'}} onClick={()=>handleCitiesClick(currentPage)} className="aframe-div">
                      <div className="alist-item-link-wrapper">
                        <img
                          className="alist-item-link3"
                          alt=""
                          src="./public/list--item--link-2.svg"
                        />
                      </div>
                      <div className="alist-item2">Cities</div>
                    </button>
                    <button style={{border:'none',background:'white'}} onClick={handlePickUpLocationDiv} className="alist-item-link-container">
                      <img
                        className="alist-item-link4"
                        alt=""
                        src="./public/list--item--link-3.svg"
                      />
                    </button>
                  </div>
                  {/* {isOpenPickUpLocation &&( 
                  <div  className="aframe-container">
                    <button style={{width:'173px'}} onClick={handleUsersClick} className="aframe-div">
                      <div className="alist-item-link-wrapper">
                        <img
                          className="alist-item-link3"
                          alt=""
                          src="./public/list--item--link-2.svg"
                        />
                      </div>
                      <div className="alist-item2">City Location</div>
                    </button>
                  </div>)} */}
                  <div  className="aframe-container">
                    <button style={{width:'173px'}} onClick={()=>handleHotelsClick(currentPage)} className="aframe-div">
                      <div className="alist-item-link-wrapper">
                        <img
                          className="alist-item-link3"
                          alt=""
                          src="./public/list--item--link-2.svg"
                        />
                      </div>
                      <div className="alist-item2">Hotels</div>
                    </button>
                    <div className="alist-item-link-container">
                      <img
                        className="alist-item-link4"
                        alt=""
                        src="./public/list--item--link-3.svg"
                      />
                    </div>
                  </div>
                  <div  className="aframe-container">
                    <button style={{width:'173px'}} onClick={()=>handleRestaurantsClick(currentPage)} className="aframe-div">
                      <div className="alist-item-link-wrapper">
                        <img
                          className="alist-item-link3"
                          alt=""
                          src="./public/list--item--link-2.svg"
                        />
                      </div>
                      <div className="alist-item2">Restaurants</div>
                    </button>
                    <div className="alist-item-link-container">
                      <img
                        className="alist-item-link4"
                        alt=""
                        src="./public/list--item--link-3.svg"
                      />
                    </div>
                  </div>{" "}
                  <div  className="aframe-container">
                    <button style={{width:'173px'}} onClick={()=>handleCarsClick(currentPage)} className="aframe-div">
                      <div className="alist-item-link-wrapper">
                        <img
                          className="alist-item-link3"
                          alt=""
                          src="./public/list--item--link-2.svg"
                        />
                      </div>
                      <div className="alist-item2">Cars</div>
                    </button>
                    <div className="alist-item-link-container">
                      <img
                        className="alist-item-link4"
                        alt=""
                        src="./public/list--item--link-3.svg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <section className="adata-processor">
              <div className="adivcard-parent">
                <div className="adivcard">
                  <div className="ashape-creator">
                    <div className="aframe-parent8">
                      <div className="asmall-wrapper">
                        <div className="asmall">$</div>
                      </div>
                      <div className="adiv">874</div>
                    </div>
                    <div className="aheading-6">
                      <div className="asales-last-month">sales last month</div>
                    </div>
                  </div>
                  <img
                    className="adivno-gutters-icon"
                    loading="lazy"
                    alt=""
                    src="./public/divnogutters@2x.png"
                  />
                </div>
                <div className="adivcard1">
                  <div className="aframe-parent9">
                    <div className="aframe-parent10">
                      <div className="asmall-container">
                        <div className="asmall1">$</div>
                      </div>
                      <div className="adiv1">1283</div>
                    </div>
                    <div className="aheading-61">
                      <div className="asales-income">sales Income</div>
                    </div>
                  </div>
                  <img
                    className="adivno-gutters-icon1"
                    alt=""
                    src="./public/divnogutters-1@2x.png"
                  />
                </div>
                <div className="adivcard2">
                  <div className="aframe-parent11">
                    <div className="aframe-parent12">
                      <div className="asmall-frame">
                        <div className="asmall2">$</div>
                      </div>
                      <div className="adiv2">1286</div>
                    </div>
                    <div className="aheading-62">
                      <div className="alast-month-sales">last month sales</div>
                    </div>
                  </div>
                  <img
                    className="adivno-gutters-icon2"
                    alt=""
                    src="./public/divnogutters-2@2x.png"
                  />
                </div>
                <div className="adivcard3">
                  <div className="aframe-parent13">
                    <div className="aframe-parent14">
                      <div className="asmall-wrapper1">
                        <div className="asmall3">$</div>
                      </div>
                      <div className="adiv3">564</div>
                    </div>
                    <div className="aheading-63">
                      <div className="atotal-revenue">total revenue</div>
                    </div>
                  </div>
                  <img
                    className="adivno-gutters-icon3"
                    alt=""
                    src="./public/divnogutters-3@2x.png"
                  />
                </div>
              </div>
              
              <div className="adivcard4">
                <div className="adivcard-header-tab">
                  <div className="ashape-container">
                    <div className="aiheader-icon-parent">
                      <img
                        className="aiheader-icon"
                        alt=""
                        src="./public/iheadericon.svg"
                      />
                      <input
                        className="aeasy-dynamic-tables"
                        placeholder="Easy Dynamic Tables"
                        type="text"
                      />
                    </div>
                  </div>

                {usersClicked &&(
                  <button onClick={handleAddUserButtonClickStatus} style={{background:'white',border:'none'}}>
                  <img
                    className="abutton-menu-icon"
                    alt=""
                    src="./public/button-menu.svg"
                  />
                  </button>)}
                 
                  {hotelsClicked &&(
                  <button onClick={handleAddHotelButtonClickStatus} style={{background:'white',border:'none'}}>
                  <img
                    className="abutton-menu-icon"
                    alt=""
                    src="./public/button-menu.svg"
                  />
                  </button>)}
                  {restaurantsClicked &&(
                  <button onClick={handleAddRestaurantButtonClickStatus} style={{background:'white',border:'none'}}>
                  <img
                    className="abutton-menu-icon"
                    alt=""
                    src="./public/button-menu.svg"
                  />
                  </button>)}
                  {carsClicked &&(
                  <button onClick={handleAddCarButtonClickStatus} style={{background:'white',border:'none'}}>
                  <img
                    className="abutton-menu-icon"
                    alt=""
                    src="./public/button-menu.svg"
                  />
                  </button>)}
                </div>
                <div className="atriangle-container">
                  <div className="aframe-parent15">
                    <div className="aframe-parent16">
                      <div className="aframe-parent17">
                        <div className="alabel-show-wrapper">
                          <div className="alabel-show">Show</div>
                        </div>
                        <div className="alabel-options">
                          <div className="adiv4">
                            <div className="adiv5">10</div>
                          </div>
                          <div className="atriangle-stack">
                            <img
                              className="aimage-icon"
                              loading="lazy"
                              alt=""
                              src="./public/image.svg"
                            />
                          </div>
                        </div>
                        <div className="alabel-entries-wrapper">
                          <div className="alabel">entries</div>
                        </div>
                      </div>
                      <div className="aimage-stack-wrapper">
                        <div className="aimage-stack">
                          <input
                            className="ashape-stack"
                            placeholder="Search:"
                            type="text"
                          />
                          <div className="alabel-input" />
                        </div>
                      </div>
                    </div>
                    <div className="agrid">
                     {usersClicked &&(   <div className="ashape-pool">
                        <div className="aheader-row-cell-name-ac">
                          <b className="aname">Username</b>
                          <div className="ashape-set">
                            <b className="ab">↑</b>
                            <b className="ab1">↓</b>
                          </div>
                        </div>
                        <div className="aheader-row-cell-position">
                          <b className="aposition">First Name</b>
                          <div className="aparent">
                            <b className="ab2">↑</b>
                            <b className="ab3">↓</b>
                          </div>
                        </div>
                        <div className="aheader-row-cell-position">
                          <b className="aposition">Last Name</b>
                          <div className="aparent">
                            <b className="ab2">↑</b>
                            <b className="ab3">↓</b>
                          </div>
                        </div> <div className="aheader-row-cell-position">
                          <b className="aposition">Email</b>
                          <div className="aparent">
                            <b className="ab2">↑</b>
                            <b className="ab3">↓</b>
                          </div>
                        </div>
                       
                        <div className="aheader-row-cell-start-da">
                          <b className="astart-date">Phone Number</b>
                          <div className="acontainer">
                            <b className="ab8">↑</b>
                            <b className="ab9">↓</b>
                          </div>
                        </div>
                        <div className="aheader-row-cell-salary">
                          <b className="asalary">Role</b>
                          <div className="aparent1">
                            <b className="ab10">↑</b>
                            <b className="ab11">↓</b>
                          </div>
                        </div>
                      </div>)}
                      {citiesClicked &&(   <div className="ashape-pool">
                        <div className="aheader-row-cell-name-ac">
                          <b className="aname">City Number</b>
                          <div className="ashape-set">
                            <b className="ab">↑</b>
                            <b className="ab1">↓</b>
                          </div>
                        </div>
                        <div className="aheader-row-cell-position">
                          <b className="aposition">City Name</b>
                          <div className="aparent">
                            <b className="ab2">↑</b>
                            <b className="ab3">↓</b>
                          </div>
                        </div>
                      </div>)}

                      {restaurantsClicked &&(   <div className="ashape-pool">
                        <div className="aheader-row-cell-name-ac">
                          <b className="aname">Restaurant Name</b>
                          <div className="ashape-set">
                            <b className="ab">↑</b>
                            <b className="ab1">↓</b>
                          </div>
                        </div>
                        <div className="aheader-row-cell-position">
                          <b className="aposition">Description</b>
                          <div className="aparent">
                            <b className="ab2">↑</b>
                            <b className="ab3">↓</b>
                          </div>
                        </div>
                        <div className="aheader-row-cell-position">
                          <b className="aposition">Stars</b>
                          <div className="aparent">
                            <b className="ab2">↑</b>
                            <b className="ab3">↓</b>
                          </div>
                        </div> <div className="aheader-row-cell-position">
                          <b className="aposition">City</b>
                          <div className="aparent">
                            <b className="ab2">↑</b>
                            <b className="ab3">↓</b>
                          </div>
                        </div>
                       
                      </div>)}   {hotelsClicked &&(   <div className="ashape-pool">
                        <div className="aheader-row-cell-name-ac">
                          <b className="aname">Hotel Name</b>
                          <div className="ashape-set">
                            <b className="ab">↑</b>
                            <b className="ab1">↓</b>
                          </div>
                        </div>
                        <div className="aheader-row-cell-position">
                          <b className="aposition">Description</b>
                          <div className="aparent">
                            <b className="ab2">↑</b>
                            <b className="ab3">↓</b>
                          </div>
                        </div>
                        <div className="aheader-row-cell-position">
                          <b className="aposition">Stars</b>
                          <div className="aparent">
                            <b className="ab2">↑</b>
                            <b className="ab3">↓</b>
                          </div>
                        </div> <div className="aheader-row-cell-position">
                          <b className="aposition">City</b>
                          <div className="aparent">
                            <b className="ab2">↑</b>
                            <b className="ab3">↓</b>
                          </div>
                        </div>
                      </div>)}
                      {carsClicked &&(   <div className="ashape-pool">
                        <div className="aheader-row-cell-name-ac">
                          <b className="aname">brand/Model</b>
                          <div className="ashape-set">
                            <b className="ab">↑</b>
                            <b className="ab1">↓</b>
                          </div>  
                        </div>
                        <div className="aheader-row-cell-start-da">
                          <b className="astart-date">Body & engine Type</b>
                          <div className="acontainer">
                            <b className="ab8">↑</b>
                            <b className="ab9">↓</b>
                          </div>
                        </div>
                        <div className="aheader-row-cell-position">
                          <b className="aposition">Year</b>
                          <div className="aparent">
                            <b className="ab2">↑</b>
                            <b className="ab3">↓</b>
                          </div>
                        </div>
                        <div className="aheader-row-cell-position">
                          <b className="aposition">Luggage Capacity</b>
                          <div className="aparent">
                            <b className="ab2">↑</b>
                            <b className="ab3">↓</b>
                          </div>
                        </div> <div className="aheader-row-cell-position">
                          <b className="aposition">Seating Capacity</b>
                          <div className="aparent">
                            <b className="ab2">↑</b>
                            <b className="ab3">↓</b>
                          </div>
                        </div>
                       
                      
                        <div className="aheader-row-cell-salary">
                          <b className="asalary">price</b>
                          <div className="aparent1">
                            <b className="ab10">↑</b>
                            <b className="ab11">↓</b>
                          </div>
                        </div>
                      </div>)}
                     

 {listingResults && (
  <div className="abody-row">
    {listingResults.map((list) => (
      <>
      <>
        {usersClicked &&( 
      <div key={list.id} className="grid-row">
        <div onClick={() => handleUserDeleteButton(list.id)} className="grid-item button-item">
       
          <button
            style={{
              width: '30px',
              height: '30px',
              background: 'white',
              border: '#E9ECEF solid 1px',
              borderRadius: '3px',
            }}
          ></button>
        </div>
        <div  className="grid-item">
          <div className="aaccountant">{list.username}</div>
        </div>
        <div className="grid-item">
          <div className="aaccountant">{list.firstname}</div>
        </div>
        <div className="grid-item">
          <div className="aaccountant">{list.lastname}</div>
        </div>
        <div className="grid-item">
          <div className="aaccountant">{list.email}</div>
        </div>
        <div className="grid-item">
          <div className="aaccountant">{list.phoneNumber}</div>
        </div>
        <div className="grid-item" style={{ width: '120px' }}>
          <div className="aaccountant">{list.role}</div>
        </div>
      
        
      </div>
      )}
      </>
      <>
        {citiesClicked &&( 
      <div key={list.id} className="grid-row">
        <div style={{background:'#E9ECEF',height:'40px'}}  className="grid-item button-item"></div>

        <div  className="grid-item">
          <div className="aaccountant">{list.id}</div>
        </div>
        <div className="grid-item">
          <div className="aaccountant">{list.cityName}</div>
        </div>
        <div  className="grid-item">
          <div className="aaccountant"></div>
        </div>
        <div className="grid-item">
          <div className="aaccountant"></div>
        </div>  <div  className="grid-item">
          <div className="aaccountant"></div>
        </div>
        <div className="grid-item">
          <div className="aaccountant"></div>
        </div>
       
      </div>
      )}
      </>
      <>
        {(hotelsClicked || restaurantsClicked) &&( 
      <div key={list.id} className="grid-row">
        <div style={{height:'40px'}} className="grid-item button-item"></div>

        <div  className="grid-item">
          <div className="aaccountant">{list.name}</div>
        </div>
        <div className="grid-item">
          <div className="aaccountant">{list.description}</div>
        </div>
        <div className="grid-item">
          <div className="aaccountant">{list.stars}</div>
        </div>
        <div className="grid-item">
          <div className="aaccountant">{list.cityName}</div>
        </div>
        <div className="grid-item">
          <div className="aaccountant"></div>
        </div>
        <div className="grid-item">
          <div className="aaccountant"></div>
        </div>
      
      </div>
      )}
      </>
      <>
      {carsClicked &&( 
      <div key={list.id} className="grid-row">
        <div style={{height:'40px'}} className="grid-item button-item"></div>
        <div  className="grid-item">
          <div className="aaccountant">{list.brand} {list.model}</div>
        </div>
        <div className="grid-item">
          <div className="aaccountant">{list.bodyType} {list.engineType.type}</div>
        </div>
        <div className="grid-item">
          <div className="aaccountant">{list.year}</div>
        </div>
        <div className="grid-item">
          <div className="aaccountant">{list.luggageCapacity}</div>
        </div>
        <div className="grid-item">
          <div className="aaccountant">{list.seatingCapacity}</div>
        </div>
        <div className="grid-item">
          <div className="aaccountant">{list.price}</div>
        </div>
      
      </div>
      )}
      </>
      
      </>
    ))}
  </div>
)} 


                    </div>
                    <div className="aimage-interchange-parent">
                      <div className="aimage-interchange">
                        <div className="astatus-showing">
                        Showing 1 to {totalElements < size ? totalElements : size} of {totalElements} entries                        </div>
                      </div>
                      <div className="astar-selector">
        <button
          className="alist-item-link11"
          disabled={currentPage === 0}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <div className="aprevious">Previous</div>
        </button>
        {renderPageLinks()}
        <button
          className="alist-item-link18"
          disabled={currentPage === totalPages - 1}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <div className="anext">Next</div>
        </button>
      </div>
                      {/* <div className="astar-selector">
                        <button className="alist-item-link11">
                          <div className="aprevious">Previous</div>
                        </button>
                        <div className="alist-item-link12">
                          <div className="adiv35">1</div>
                        </div>
                        <div className="alist-item-link13">
                          <div className="adiv36">2</div>
                        </div>
                        <div className="alist-item-link14">
                          <div className="adiv37">3</div>
                        </div>
                        <div className="alist-item-link15">
                          <div className="adiv38">4</div>
                        </div>
                        <div className="alist-item-link16">
                          <div className="adiv39">5</div>
                        </div>
                        <div className="alist-item-link17">
                          <div className="adiv40">6</div>
                        </div>
                        <button className="alist-item-link18">
                          <div className="anext">Next</div>
                        </button>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>             
              
              {addUserButton  &&(<div className="adivcard4">
                <div> 
         

            <div className="ccomponent-16-b7C">  <p  className="cframe-34-LPY">Add User</p>
            {/* <button style={{position:'relative',left:'200px',top:'-30px'}} /*onClick={handleModalClose1}>
                  X
                </button>  */}
            <div className="cframe-JGW">
                  <div className="cframe-e5U">
                  <div className="cframe-31-oDG">

                    <input
                    type="text"
                    id="username"
                    name="username"
                    className="center-your-eamil-8FY" placeholder='Enter a username'
                    style={{ outline:'none', width: '528px', height: '5.5rem',marginLeft:'5px'

                  }} // Adjust dimensions as needed
                  onChange={handleInputChangeSignUp}/>
                    <img className="cenvelope-pu4" src="./assets/envelope.png" />
                  </div>
                </div>

                <div className="cframe-Kqp">
                          <div className="cframe-33-fug">
                          <input
                      type="email"
                      id="email"
                      name="email"
                      className="center-your-eamil-8FY" placeholder='Enter an email'
                      style={{ outline:'none', width: '528px', height: '5.5rem',marginLeft:'5px'

                    }} 
                    onChange={handleInputChangeSignUp}/>
                    <img className="cenvelope-pu4" src="./assets/envelope.png" />
                      </div>
                  </div>
                  <div className="cframe-Kqp">
                        <div className="cframe-33-fug">
                        <input
                    type="password"
                    id="password"
                    name="password"
                    className="center-your-eamil-8FY" placeholder='Enter a password'
                    style={{ outline:'none', width: '528px', height: '5.5rem',marginLeft:'5px'

                  }} 
                  onChange={handleInputChangeSignUp}/>
                        <img className="clock-g46" src="./assets/lock.png" />
                    </div>
                </div>

                <div className="cframe-Kqp">
                        <div className="cframe-33-fug">
                        <input
                    type="password"
                    id="confirmationPassword"
                    name="confirmationPassword"
                    className="center-your-eamil-8FY" placeholder='Confirm your password'
                    style={{ outline:'none', width: '528px', height: '5.5rem',marginLeft:'5px'

                  }} 
                   onChange={handleInputChangeSignUp} />
                        <img className="clock-g46" src="./assets/lock.png" />
                    </div>
                </div>
                
                  <div className="qdropdown">
          <button onClick={handleRoleClick} className="qdropbtn">Select Role-{role} </button>
          {isOpen &&(
          <div className="qdropdown-content">
            <a onClick={() => handleRoleSelection("ADMIN")}>ADMIN</a>
            <a onClick={() => handleRoleSelection("USER")}>USER</a>
          </div>)}
        </div>
                <div className="cframe-BFk">
          <button  onClick={handleUserAddition} className="cframe-34-LPY">Add +</button>
        </div>
              </div>
              </div>
              </div>
              </div>)}

              {addHotelButton  &&(<div className="adivcard4">
                <div> 
         

            <div className="ccomponent-16-b7C">  <p  className="cframe-34-LPY">Add Hotel</p>
            {/* <button style={{position:'relative',left:'200px',top:'-30px'}} /*onClick={handleModalClose1}>
                  X
                </button>  */}
            <div className="cframe-JGW">
                  <div className="cframe-e5U">
                  <div className="cframe-31-oDG">

                    <input
                    type="text"
                    id="name"
                    name="name"
                    className="center-your-eamil-8FY" placeholder='Enter the hotel name'
                    style={{ outline:'none', width: '528px', height: '5.5rem',marginLeft:'5px'

                  }} // Adjust dimensions as needed
                  onChange={handleInputChangeHotelAddition}/>
                    <img className="cenvelope-pu4" src="./assets/envelope.png" />
                  </div>
                </div>

                <div className="cframe-Kqp">
                          <div className="cframe-33-fug">
                          <input
                      type="text"
                      id="description"
                      name="description"
                      className="center-your-eamil-8FY" placeholder='Enter the hotel description'
                      style={{ outline:'none', width: '528px', height: '5.5rem',marginLeft:'5px'

                    }} 
                    onChange={handleInputChangeHotelAddition}/>
                    <img className="cenvelope-pu4" src="./assets/envelope.png" />
                      </div>
                  </div>
                  <div className="cframe-Kqp">
                        <div className="cframe-33-fug">
                        <input
                    type="text"
                    id="stars"
                    name="stars"
                    className="center-your-eamil-8FY" placeholder='Enter the hotel stars'
                    style={{ outline:'none', width: '528px', height: '5.5rem',marginLeft:'5px'

                  }} 
                  onChange={handleInputChangeHotelAddition}/>
                        <img className="clock-g46" src="./assets/lock.png" />
                    </div>
                </div>

              
                
                <div className="qdropdown">
      <button onClick={handleCityClick} className="qdropbtn">Select City - {cityName}</button>
      {isOpen && (
        <div className="qdropdown-content">
          <div className="qscrollbar">
            {cityListingResults && cityListingResults.map((city) => (
              <a key={city.id} onClick={() => handleCityNameSelection(city.cityName)}>{city.cityName}</a>
            ))}
          </div>
        </div>
      )}
    </div>
                <div className="cframe-BFk">
          <button  onClick={handleHotelAddition} className="cframe-34-LPY">Add +</button>
        </div>
              </div>
              </div>
              </div>
              </div>)}
              {addRestaurantButton  &&(<div className="adivcard4">
                <div> 
         

            <div className="ccomponent-16-b7C">  <p  className="cframe-34-LPY">Add Restaurant</p>
            {/* <button style={{position:'relative',left:'200px',top:'-30px'}} /*onClick={handleModalClose1}>
                  X
                </button>  */}
            <div className="cframe-JGW">
                  <div className="cframe-e5U">
                  <div className="cframe-31-oDG">

                    <input
                    type="text"
                    id="name"
                    name="name"
                    className="center-your-eamil-8FY" placeholder='Enter the restaurant name'
                    style={{ outline:'none', width: '528px', height: '5.5rem',marginLeft:'5px'

                  }} // Adjust dimensions as needed
                  onChange={handleInputChangeHotelAddition}/>
                    <img className="cenvelope-pu4" src="./assets/envelope.png" />
                  </div>
                </div>

                <div className="cframe-Kqp">
                          <div className="cframe-33-fug">
                          <input
                      type="text"
                      id="description"
                      name="description"
                      className="center-your-eamil-8FY" placeholder='Enter the restaurant description'
                      style={{ outline:'none', width: '528px', height: '5.5rem',marginLeft:'5px'

                    }} 
                    onChange={handleInputChangeHotelAddition}/>
                    <img className="cenvelope-pu4" src="./assets/envelope.png" />
                      </div>
                  </div>
                  <div className="cframe-Kqp">
                        <div className="cframe-33-fug">
                        <input
                    type="text"
                    id="stars"
                    name="stars"
                    className="center-your-eamil-8FY" placeholder='Enter the restaurant stars'
                    style={{ outline:'none', width: '528px', height: '5.5rem',marginLeft:'5px'

                  }} 
                  onChange={handleInputChangeHotelAddition}/>
                        <img className="clock-g46" src="./assets/lock.png" />
                    </div>
                </div>

              
                
                <div className="qdropdown">
      <button onClick={handleCityClick} className="qdropbtn">Select City - {cityName}</button>
      {isOpen && (
        <div className="qdropdown-content">
          <div className="qscrollbar">
            {cityListingResults && cityListingResults.map((city) => (
              <a key={city.id} onClick={() => handleCityNameSelection(city.cityName)}>{city.cityName}</a>
            ))}
          </div>
        </div>
      )}
    </div>
                <div className="cframe-BFk">
          <button  onClick={handleRestaurantAddition} className="cframe-34-LPY">Add +</button>
        </div>
              </div>
              </div>
              </div>
              </div>)}
              {addCarButton  &&(<div className="adivcard4">
                <div> 
         

            <div style={{height:'100rem'}} className="ccomponent-16-b7C">  <p  className="cframe-34-LPY">Add Car</p>
            {/* <button style={{position:'relative',left:'200px',top:'-30px'}} /*onClick={handleModalClose1}>
                  X
                </button>  */}
            <div style={{height:'95%'}} className="cframe-JGW">
                  <div className="cframe-e5U">
                  <div className="cframe-31-oDG">

                    <input
                    type="text"
                    id="brand"
                    name="brand"
                    className="center-your-eamil-8FY" placeholder='Enter the car brand'
                    style={{ outline:'none', width: '528px', height: '5.5rem',marginLeft:'5px'

                  }} // Adjust dimensions as needed
                  onChange={handleInputChangeCarAddition}/>
                    <img className="cenvelope-pu4" src="./assets/envelope.png" />
                  </div>
                </div>

                <div className="cframe-Kqp">
                          <div className="cframe-33-fug">
                          <input
                      type="text"
                      id="model"
                      name="model"
                      className="center-your-eamil-8FY" placeholder='Enter the car model'
                      style={{ outline:'none', width: '528px', height: '5.5rem',marginLeft:'5px'

                    }} 
                    onChange={handleInputChangeCarAddition}/>
                    <img className="cenvelope-pu4" src="./assets/envelope.png" />
                      </div>
                  </div>
                  <div className="cframe-Kqp">
                        <div className="cframe-33-fug">
                        <input
                    type="text"
                    id="bodyType"
                    name="bodyType"
                    className="center-your-eamil-8FY" placeholder='Enter the car body type'
                    style={{ outline:'none', width: '528px', height: '5.5rem',marginLeft:'5px'

                  }} 
                  onChange={handleInputChangeCarAddition}/>
                        <img className="clock-g46" src="./assets/lock.png" />
                    </div>
                </div>

                <div className="cframe-Kqp">
                        <div className="cframe-33-fug">
                        <input
                    type="text"
                    id="year"
                    name="year"
                    className="center-your-eamil-8FY" placeholder='Enter the car production year'
                    style={{ outline:'none', width: '528px', height: '5.5rem',marginLeft:'5px'

                  }} 
                  onChange={handleInputChangeCarAddition}/>
                        <img className="clock-g46" src="./assets/lock.png" />
                    </div>
                </div>

          

                <div className="qdropdown">
          <button onClick={handleEngineTypeClick} className="qdropbtn">Select Engine Type-{engineType} </button>
          {isOpen &&(
          <div className="qdropdown-content">
            <a onClick={() => handleEngineTypeSelection("G")}>G</a>
            <a onClick={() => handleEngineTypeSelection("ESS")}>ESS</a>
            <a onClick={() => handleEngineTypeSelection("DCI")}>DCI</a>
            <a onClick={() => handleEngineTypeSelection("EV")}>EV</a>

          </div>)}
        </div>

        <div className="cframe-Kqp">
                        <div  className="cframe-33-fug">
                        <input
                    type="checkbox"
                    id="automatic"
                    name="automatic"
                    className="center-your-eamil-8FY" placeholder='Is the car automatic'
                    style={{ outline:'none', width: '528px', height: '5.5rem',marginLeft:'5px'

                  }} 
                  checked={formDataAddCar.automatic}
                  onChange={handleCheckBoxInputChange}/>
                        <img className="clock-g46" src="./assets/lock.png" />
                    </div>
                </div>

                <div className="cframe-Kqp">
                        <div className="cframe-33-fug">
                        <input
                    type="checkbox"
                    id="hasAC"
                    name="hasAC"
                    className="center-your-eamil-8FY" placeholder='Does the car have cooling'
                    style={{ outline:'none', width: '528px', height: '5.5rem',marginLeft:'5px'

                  }} 
                  checked={formDataAddCar.hasAC}
                  onChange={handleCheckBoxInputChange}/>
                        <img className="clock-g46" src="./assets/lock.png" />
                    </div>
                </div>

                <div className="cframe-Kqp">
                        <div className="cframe-33-fug">
                        <input
                    type="text"
                    id="seatingCapacity"
                    name="seatingCapacity"
                    className="center-your-eamil-8FY" placeholder='Enter the car seating capacity'
                    style={{ outline:'none', width: '528px', height: '5.5rem',marginLeft:'5px'

                  }} 
                  onChange={handleInputChangeCarAddition}/>
                        <img className="clock-g46" src="./assets/lock.png" />
                    </div>
                </div>

                <div className="cframe-Kqp">
                        <div className="cframe-33-fug">
                        <input
                    type="text"
                    id="luggageCapacity"
                    name="luggageCapacity"
                    className="center-your-eamil-8FY" placeholder='Enter the car luggage capacity'
                    style={{ outline:'none', width: '528px', height: '5.5rem',marginLeft:'5px'

                  }} 
                  onChange={handleInputChangeCarAddition}/>
                        <img className="clock-g46" src="./assets/lock.png" />
                    </div>
                </div>

                <div className="cframe-Kqp">
                        <div className="cframe-33-fug">
                        <input
                    type="text"
                    id="price"
                    name="price"
                    className="center-your-eamil-8FY" placeholder='Enter the car price'
                    style={{ outline:'none', width: '528px', height: '5.5rem',marginLeft:'5px'

                  }} 
                  onChange={handleInputChangeCarAddition}/>
                        <img className="clock-g46" src="./assets/lock.png" />
                    </div>
                </div>


                <div className="cframe-BFk">
          <button  onClick={handleCarAddition} className="cframe-34-LPY">Add +</button>
        </div>
              </div>
              </div>
              </div>
              </div>)}
            </section>
          </main>
        </div>
      </>

        );
    
    
    }
 export default AdminPanel;

















{/* {listingResults &&(
                        <div>
                          {listingResults.map((list) => (
                      <div key={list.id} className="abody-row">
                      <div style={{width:'52px',background:'#F7F7F7',borderleft:0}} className="adata1">
                          <button style={{width:'30px',height:'30px',background:'white',border:'#E9ECEF solid 1px',borderRadius:'3px'}}></button>
                        </div>
                        <div className="adata1">
                          <div className="aaccountant">{list.username}</div>
                        </div>
                        <div className="adata1">
                          <div className="aaccountant">{list.firstname}</div>
                        </div>
                          <div className="adata1">
                            <div className="aaccountant">{list.lastname}</div>
                          </div>
                          <div className="adata1">
                            <div className="aaccountant">{list.email}</div>
                          </div>
                        
                        <div className="adata1">
                          <div className="aaccountant">{list.phoneNumber}</div>
                        </div>
                        <div style={{width: '120px'}} className="adata1">
                          <div className="aaccountant">{list.role}</div>
                        </div>
                      </div>))}
                      </div>)} */}
             {/* {listingResults && (
  <div>
    {listingResults.map((list) => (
      <div key={list.id} className="abody-row">
        <div style={{ width: '52px', background: '#F7F7F7', borderLeft: 0 }} className="adata1">
          <button
            style={{
              width: '30px',
              height: '30px',
              background: 'white',
              border: '#E9ECEF solid 1px',
              borderRadius: '3px',
            }}
          ></button>
        </div>
        <div className="adata1" style={{ width: '187.6px', flexShrink: 0 }}>
          <div className="aaccountant">{list.username}</div>
        </div>
        <div className="adata1" style={{ width: '187.6px', flexShrink: 0 }}>
          <div className="aaccountant">{list.firstname}</div>
        </div>
        <div className="adata1" style={{ width: '187.6px', flexShrink: 0 }}>
          <div className="aaccountant">{list.lastname}</div>
        </div>
        <div className="adata1" style={{ width: '187.6px', flexShrink: 0 }}>
          <div className="aaccountant">{list.email}</div>
        </div>
        <div className="adata1" style={{ width: '187.6px', flexShrink: 0 }}>
          <div className="aaccountant">{list.phoneNumber}</div>
        </div>
        <div className="adata1" style={{ width: '120px', flexShrink: 0 }}>
          <div className="aaccountant">{list.role}</div>
        </div>
      </div>
    ))}
  </div>
          )} */}