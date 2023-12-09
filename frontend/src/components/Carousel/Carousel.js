import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Stack } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import React, { useState, useEffect } from "react";
import { useMediaQuery, useTheme } from "@mui/material";

// IMPORT THIS STATEMENT INTO PROPERTY DETAILS PAGE AND IT SHOULD WORK
// <Carousel propDat={data.imgSrc}/>

function SampleNextArrow({ style, onClick }) {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));

	return false ? (
		<></>
	) : (
		<div
			style={{
				...style,
				display: "block",
				position: "absolute",
				top: "50%",
				right: isMobile ? "0px" : "25px",
				transform: "translate(0, -50%)",
				fontSize: isMobile ? "20px" : "30px",
				borderRadius: "3px",
				color: "white",
				zIndex: 2,
				backgroundColor: "rgba(0, 0, 0, 0.2)", // Slight background
				padding: isMobile ? "5px" : "10px",
			}}
			onClick={onClick}
		>
			<ArrowForwardIosIcon style={{ fontSize: "inherit" }} />
		</div>
	);
}

function SamplePrevArrow({ style, onClick }) {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));

	return false ? (
		<></>
	) : (
		<div
			style={{
				...style,
				display: "block",
				position: "absolute",
				top: "50%",
				left: isMobile ? "0px" : "25px",
				transform: "translate(0, -50%)",
				fontSize: isMobile ? "20px" : "30px",
				borderRadius: "3px",
				color: "white",
				zIndex: 2,
				backgroundColor: "rgba(0, 0, 0, 0.2)", // Slight background
				padding: isMobile ? "5px" : "10px",
			}}
			onClick={onClick}
		>
			<ArrowBackIosNewIcon style={{ fontSize: "inherit" }} />
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
		prevArrow: <SamplePrevArrow />,
		nextArrow: <SampleNextArrow />,
		afterChange: (current) => setCurrentSlide(current), // Update currentSlide state on slide change
		adaptiveHeight: true,
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
		centerPadding: "30%",
	};

	// Use effect to synchronize sliders on mount
	useEffect(() => {
		setNav1(nav1);
		setNav2(nav2);
	}, [nav1, nav2]);

	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));

	return (
		<Box>
			<Box
				mb={2}
				sx={{ backgroundColor: "fullDark.main" }}
				borderRadius={1}
				overflow={"clip"}
			>
				<Slider
					{...settingsMain}
					ref={(slider) => setNav1(slider)}
					style={{
						margin: 0,
						padding: 0,
					}}
				>
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
									maxHeight={{ xs: "300px", md: "500px" }}
								/>
							</Stack>
						</Box>
					))}
				</Slider>
			</Box>
			{!isMobile && (
				<Box>
					<Slider {...settingsThumbs} ref={(slider) => setNav2(slider)}>
						{propData?.map((img, index) => (
							<Box
								key={index}
								component={"img"}
								src={img}
								alt={`Thumbnail ${index + 1}`}
								sx={{
									height: "60px",
									width: "auto",
									backgroundColor: "fullDark.main",
									opacity:
										nav1 &&
										nav1.innerSlider &&
										nav1.innerSlider.state.currentSlide === index
											? 1
											: 0.5,
									transition: "opacity .5s",
								}}
							/>
						))}
					</Slider>
				</Box>
			)}
		</Box>
	);
};

export default Carousel;
