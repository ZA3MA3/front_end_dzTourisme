import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import './stylesIm.css';


import crownSymbol from './assets/crown-symbol.png';

const HomeSlider = () => {
  return (
    <div className="home" id="home">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 7500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        loop={true}
        className="home-slider"
      >
        <SwiperSlide className="slide slide1">
          <div className="content">
            <img src={crownSymbol} alt="Crown Symbol" />
            <h3>vegetaballs & salades</h3>
            <h1>healthy soup</h1>
            <p>healthy and delecious choices</p>
            <a href="#" className="btn">
              order now
            </a>
          </div>
        </SwiperSlide>
        <SwiperSlide className="slide slide2">
          <div className="content">
            <img src={crownSymbol} alt="Crown Symbol" />
            <h3>red meats</h3>
            <h1>premium steak</h1>
            <p>many delecious meat cuts available</p>
            <a href="#" className="btn">
              order now
            </a>
          </div>
        </SwiperSlide>
        <SwiperSlide className="slide slide3">
          <div className="content">
            <img src={crownSymbol} alt="Crown Symbol" />
            <h3>healthy sea food</h3>
            <h1>grilled fish</h1>
            <p>fresh sea food</p>
            <a href="#" className="btn">
              order now
            </a>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HomeSlider;