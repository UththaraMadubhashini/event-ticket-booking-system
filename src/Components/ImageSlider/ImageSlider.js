import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import image1 from '../../Assets/Images/SENEHASAKATA ARUTHAK MAIN BANNER.jpg';
import image2 from '../../Assets/Images/Thamath-Mathakai-943x540.jpg';
import image3 from '../../Assets/Images/ahuthi main banner- dance.jpg';

const ImageSlider = () => {
  const images = [image1, image2, image3];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <Slider {...settings}>
      {images.map((image, index) => (
        <div key={index}>
          <img 
            src={image} 
            alt={`Image ${index + 1}`} 
            style={{ width: '1520px', height: '550px' }}
          />
        </div>
      ))}
    </Slider>
  );
};

export default ImageSlider;
