import React from 'react';
import Slider from 'react-slick';

const Test = () => {

const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false
    };
    
  return (
    <div className='home-slider'>
        <Slider {...settings}>
            <div className='slider-item' style={{ backgroundImage: 'url(/assets/bg_2.jpg)' }}>
            <h3>Hello</h3>
            </div>
        </Slider>
    </div>
  )
}

export default Test