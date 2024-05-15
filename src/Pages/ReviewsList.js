import React, { useRef,useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams,useNavigate, useLocation } from "react-router-dom";
import './reviewsList.css';





const ReviewsList = () => {

  const location=useLocation();
  const [reviews, setReviews] = useState([]);
  const [size] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);



  useEffect(() => {
    const token=localStorage.getItem('jwtToken');
    const id=parseInt(localStorage.getItem('selectedHotelId'));
    
    const fetchHotelReviews = async (currentPage) => {
      try {
        let endpoint;
        if (location.pathname === '/tableSelection') {
            endpoint = `http://localhost:8080/restaurantReviewsList?id=${id}&page=${currentPage}&size=${size}`;
          } else if (location.pathname === '/roomSelection') {
            endpoint = `http://localhost:8080/hotelReviewsList?id=${id}&page=${currentPage}&size=${size}`;
          }
          const response = await axios.get(endpoint, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        
       
        const { reviews } = response.data;

        setReviews(reviews);
        setTotalPages(response.data.totalPages);
        setCurrentPage(response.data.currentPage);
        setTotalElements(response.data.totalUsers);
      } catch (error) {
        console.error('Error fetching hotel reviews:', error);
      }
    };

    fetchHotelReviews(currentPage);
  }, []); 

  // console.log('zaza',reviews.date);
  // console.log('com',reviews.comment);
  // console.log('rat',reviews.rating);




  const formatDate = (dateString) => {
    const date = new Date(dateString);
    console.log('date',date);
    const options = { month: 'long', year: 'numeric'};
    return date.toLocaleDateString('en-US', options);
};
const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <svg key={i} width={9} height={9} viewBox="0 0 9 9" fill={i < rating ? 'black' : 'none'} xmlns="http://www.w3.org/2000/svg"
        ><path  d="M4.07198 1.76712C4.20669 1.35253 4.79322 1.35253 4.92793 1.76712L5.40924 3.24843C5.46948 3.43384 5.64226 3.55937 5.83721 3.55937H7.39475C7.83068 3.55937 8.01193 4.1172 7.65926 4.37343L6.39918 5.28893C6.24146 5.40352 6.17547 5.60663 6.23571 5.79204L6.71701 7.27335C6.85172 7.68794 6.37721 8.0327 6.02454 7.77647L4.76446 6.86097C4.60674 6.74638 4.39317 6.74638 4.23545 6.86097L2.97538 7.77647C2.62271 8.0327 2.14819 7.68794 2.2829 7.27335L2.7642 5.79204C2.82445 5.60663 2.75845 5.40352 2.60073 5.28893L1.34066 4.37343C0.987985 4.1172 1.16923 3.55937 1.60516 3.55937H3.1627C3.35765 3.55937 3.53043 3.43384 3.59067 3.24843L4.07198 1.76712Z"/>
        </svg>
      );
    }
    return stars;
  };

    return(
    <div style={{ margin:'auto',display: 'flex', flexDirection: 'row', width: '1220px', flexWrap: 'wrap',marginRight:'100px',marginTop:'70px' }}>{reviews.map((list, index) => (<div style={{ display: 'flex', flexDirection: 'row', width: '464px', flexWrap: 'wrap',marginRight:'100px' ,marginBottom:'9px'}} key={index}>
   
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="stylesheet" href="./global.css" />
        <link rel="stylesheet" href="./index.css" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400&display=swap"
        />
        <div style={{border: '#000 solid 1px'} } className="mframe-parent">
          <div className="mframe-group">
            <div className="mframe-container">
              <div className="mellipse-wrapper">
                <div className="mframe-child" />
              </div>
              <div className="miconsolidstar-parent">
              {renderStars(list.rating)}
              </div>
            </div>
            <div className="mframe-div">
              <div className="musernamehhhhhhhhhhhhhhhhhhhhhh-parent">
                <div className="musernamehhhhhhhhhhhhhhhhhhhhhh">
                  {list.user.username}
                </div>
                <div className="mfirstname-lastnamegggggggggggg">
                  {list.user.firstname} {list.user.lastname}
                </div>
              </div>
              <div className="mpersonal-g">
                <div className="mmarch-2024hhhhhhhhhhhhhhhhhhhh">
                  {formatDate(list.date)}
                </div>
              </div>
            </div>
          </div>
          <textarea  value={list.comment} readOnly style={{resize:'none',outline:'none',border:'none'}} className="mghhhhhhhhhhhhhhhhhhhhhhhhhhhhh">
          </textarea>
        </div>
</div>))}
      </div>
      );
}

export default ReviewsList;
