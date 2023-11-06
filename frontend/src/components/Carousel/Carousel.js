import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Stack } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// IMPORT THIS STATEMENT INTO PROPERTY DETAILS PAGE AND IT SHOULD WORK
// <Carousel propDat={data.imgSrc}/>

// Custom arrow components
function SampleNextArrow({ style, onClick }) {
	return (
	  <div
		style={{
		  ...style,
		  display: 'block',
		  position: 'absolute',
		  top: '50%',
		  right: '25px', 
		  transform: 'translate(0, -50%)',
		  fontSize: '30px', 
		  color: 'white', 
		  zIndex: 2, 
		  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Slight background
		  padding: '10px', 
		  
		}}
		onClick={onClick}
	  >
		<ArrowForwardIosIcon style={{ fontSize: 'inherit' }} />
	  </div>
	);
  }
  
  function SamplePrevArrow({ style, onClick }) {
	return (
	  <div
		style={{
		  ...style,
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
		  
		}}
		onClick={onClick}
	  >
		<ArrowBackIosNewIcon style={{ fontSize: 'inherit' }} />
	  </div>
	);
  }
  
  
  

const Carousel = ({ propData }) => {
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: false,
		autoplaySpeed: 2000,
		centerPadding: 0,
		prevArrow:<SamplePrevArrow/>,
		nextArrow:<SampleNextArrow/>,
		
	};

	return (
		<Slider {...settings}>
			{propData?.map((img, index) => (
				<Box key={index} width={"100%"} m={0}>
					<Stack sx={{}}>
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
	);
};

export default Carousel;

