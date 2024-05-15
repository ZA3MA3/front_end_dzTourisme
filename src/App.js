import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/Navbar";
import Home from "./Pages/Home";
import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, useLocation,Routes, Route } from "react-router-dom";
//import AddUser from "./Users/AddUser";
//import EditUser from "./Users/EditUser";
//import ViewUser from "./Users/ViewUser";
import Register from "./Auth/register"
import Login from "./Auth/login"
import RoomSelection from "./Pages/RoomSelection"

import BookUserDetails from "./Pages/BookUserDetails"
import SearchResults from "./Pages/searchResults"
import Payment from "./Pages/Payment"
import TableSelection from "./Pages/TableSelection"
import Profile from "./Pages/Profile"
import CarSelection from "./Pages/CarSelection"
import AdminPanel from "./Pages/AdminPanel"
import ReviewsList from "./Pages/ReviewsList";
import Images from "./Pages/Images";


function App() {
         

  return (
    <div className="App">
      <Router>
        <Navbar />

        <Routes>          
          <Route exact path="/tableSelection" element={<TableSelection  />} />
          <Route exact path="/roomSelection" element={<RoomSelection />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/searchResults" element={<SearchResults />} />
          <Route exact path="/bookUserDetails" element={<BookUserDetails />} />
          <Route exact path="/payment" element={<Payment />} />
          <Route exact path="/profile" element={<Profile  />} />
          <Route exact path="/carSelection" element={<CarSelection  />} />
          <Route exact path="/adminPanel" element={<AdminPanel  />} />
          <Route exact path="/reviewsList" element={<ReviewsList  />} />
          <Route exact path="/images" element={<Images  />} />

    




        </Routes>

     
      </Router>
    </div>
  );
}

export default App;
