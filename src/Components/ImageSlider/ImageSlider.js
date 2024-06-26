import React, { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import image1 from '../../Assets/Images/slide3.jpg';
import image2 from '../../Assets/Images/slide2.png';
import image3 from '../../Assets/Images/slide1.jpg';
import image4 from '../../Assets/Images/slide4.jpg';
import image5 from '../../Assets/Images/slide5.jpg';

// Arrow icons
const NextArrowIcon = () => <div className="arrow-icon"></div>;
const PrevArrowIcon = () => <div className="arrow-icon"></div>;

// Custom right arrow component
const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="slick-arrow slick-next" onClick={onClick}>
      <NextArrowIcon />
    </div>
  );
}

// Custom left arrow component
const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="slick-arrow slick-prev" onClick={onClick}>
      <PrevArrowIcon />
    </div>
  );
}

const ImageSlider = () => {
  const images = [image1, image2, image3, image4, image5];
  const sliderRef = useRef();

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: () => {
      if (sliderRef.current) {
        sliderRef.current.slickPause();
      }
    },
    afterChange: () => {
      if (sliderRef.current) {
        sliderRef.current.slickPlay();
      }
    },
  };

  return (
    <Slider {...settings} ref={sliderRef}>
      {images.map((image, index) => (
        <div key={index}>
          <img 
            src={image} 
            alt={`Slide ${index + 1}`} 
            style={{ width: '100%', height: '500px' }}
          />
        </div>
      ))}

    </Slider>
  );
};

export default ImageSlider;
