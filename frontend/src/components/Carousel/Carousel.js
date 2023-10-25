import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Stack } from "@mui/material";

// IMPORT THIS STATEMENT INTO PROPERTY DETAILS PAGE AND IT SHOULD WORK
// <Carousel propDat={data.imgSrc}/>

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
