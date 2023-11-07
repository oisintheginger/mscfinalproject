import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Stack } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import React, { useState, useEffect } from 'react';


// IMPORT THIS STATEMENT INTO PROPERTY DETAILS PAGE AND IT SHOULD WORK
// <Carousel propDat={data.imgSrc}/>



function SampleNextArrow({ style, onClick }) {
	
	return (
	  <div
		style={
			{...style,
		  display: 'block',
		  position: 'absolute',
		  top: '50%',
		  right: '25px', 
		  transform: 'translate(0, -50%)',
		  fontSize: '30px', 
		  color: 'white', 
		  zIndex: 2, 
		  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Slight background
		  padding: '10px', }
		
	}
		onClick={onClick}
	  >
		<ArrowForwardIosIcon style={{ fontSize: 'inherit' }} />
	  </div>
	);
  }
  
  function SamplePrevArrow({ style, onClick }) {
	
	return (
	  <div
		style={
			{...style,
		  display: 'block',
		  position: 'absolute',
		  top: '50%',
		  left: '25px',
		  transform: 'translate(0, -50%)',
		  fontSize: '30px', 
		  color: 'white', 
		  zIndex: 2,
		  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Slight background
		  padding: '10px', 
}
	}
		onClick={onClick}
	  >
		<ArrowBackIosNewIcon style={{ fontSize: 'inherit' }} />
	  </div>
	);
  }


const Carousel = ({ propData }) => {
  // State for the nav sliders to synchronize them
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0); // New state for the current slide index


  // Main slider settings
  const settingsMain = {
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: nav2,
    prevArrow:<SamplePrevArrow/>,
    nextArrow:<SampleNextArrow/>,
	afterChange: current => setCurrentSlide(current), // Update currentSlide state on slide change
   
  };


// Determine the number of thumbnail slides based on the num of images available
const numThumbnails = propData?.length < 3 ? propData?.length : 3;

const settingsThumbs = {
    slidesToShow: numThumbnails, 
    slidesToScroll: 1,
    asNavFor: nav1,
    dots: false,
    centerMode: true,
    focusOnSelect: true,
    centerPadding: '30%', 
    
  };

  // Use effect to synchronize sliders on mount
  useEffect(() => {
    setNav1(nav1);
    setNav2(nav2);
  }, [nav1, nav2]);

  return (
    <>
      <Slider {...settingsMain} ref={slider => setNav1(slider)}>
        {propData?.map((img, index) => (
          <Box key={index} width={"100%"} m={0}>
            <Stack>
              <Box
                alignSelf={"center"}
                component={"img"}
                src={img}
                alt={`Slide ${index + 1}`}
                maxWidth={"100%"}
                height={"auto"}
              />
            </Stack>
          </Box>
        ))}
      </Slider>

      <Slider {...settingsThumbs} ref={slider => setNav2(slider)}>
        {propData?.map((img, index) => (
          <div key={index}>
            <img
              src={img}
              alt={`Thumbnail ${index + 1}`}
              style={{
                width: '100%',
                opacity: nav1 && nav1.innerSlider && nav1.innerSlider.state.currentSlide === index ? 1 : 0.5,
                transition: 'opacity .5s'
              }}
            />
          </div>
        ))}
      </Slider>
    </>
  );
};

export default Carousel;


