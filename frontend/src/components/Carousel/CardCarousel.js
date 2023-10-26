import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";
import PropertyCard from "../CommonComp/Cards/PropertyCard/PropertyCard";
import { NextCarouselIcon, PrevCarouselIcon } from "../../Icons/HMEIcons";
function SampleNextArrow(props) {
	const { className, style, onClick } = props;

	return (
		<div
			className={className}
			style={{
				...style,
				display: "flex",
				background: "black",
				borderRadius: "100%",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				padding: 0,
				margin: 0,
			}}
			onClick={onClick}
		/>
		// <NextCarouselIcon
		// 	onClick={onClick}
		// 	className={className}
		// 	sx={{
		// 		color: "black",
		// 		"&:hover": {
		// 			color: "black",
		// 		},
		// 	}}
		// />
	);
}
function SamplePrevArrow(props) {
	const { className, style, onClick } = props;
	return (
		<div
			className={className}
			style={{
				...style,
				display: "block",
				background: "black",
				borderRadius: "100%",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				padding: 0,
				margin: 0,
			}}
			onClick={onClick}
		/>
		// <PrevCarouselIcon
		// 	onClick={onClick}
		// 	className={className}
		// 	sx={{
		// 		color: "black",
		// 		"&:hover": {
		// 			color: "black",
		// 		},
		// 	}}
		// />
	);
}

const CardCarousel = ({ propData }) => {
	const theme = useTheme();
	const below = useMediaQuery(theme.breakpoints.down("sm"));
	const settings = {
		className: "center",
		infinite: true,
		speed: 500,
		slidesToShow: below ? 1 : 4,
		slidesToScroll: below ? 1 : 4,
		swipeToSlide: below,
		draggable: below,
		autoplay: false,
		autoplaySpeed: 2000,
		centerPadding: 0,
		nextArrow: below ? null : <SampleNextArrow />,
		prevArrow: below ? null : <SamplePrevArrow />,
	};

	return (
		<Slider {...settings}>
			{propData?.map((data, index) => (
				<Box p={1} key={index}>
					<PropertyCard data={data} />
				</Box>
			))}
		</Slider>
	);
};

export default CardCarousel;
