import React from 'react';
import "./HeaderSlider.scss";
import { sliderImgs } from "../../utils/images";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HeaderSlider = () => {
  let settings = {
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className='slider'>
      <div className='container'>
        <div className='slider-content overflow-x-hidden'>
          <Slider {...settings}>
            {sliderImgs.map((img, idx) => (
              <div className='slider-item' key={idx}>
                <img src={img} alt={`Banner ${idx + 1}`} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  )
}

export default HeaderSlider