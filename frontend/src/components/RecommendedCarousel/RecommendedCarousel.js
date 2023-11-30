import { Grid, Typography, Box, useMediaQuery, useTheme } from "@mui/material";
import { RecommendationCard } from "../CommonComp/Cards/RecommendationCard/RecommendationCard";
import { FetchRecommendedHook } from "../../Utils/DataFetching/FetchRecommendedHook";
import Carousel from "react-material-ui-carousel";
import { useEffect, useState } from "react";

export function RecommendedCarousel() {
	const { data, error, isLoading, isError, isSuccess } = FetchRecommendedHook();
	const theme = useTheme();
	const down = useMediaQuery(theme.breakpoints.down("md"));
	const perSlide = down ? 1 : 3;
	const [slidesCount, setSlidesCount] = useState(0);

	const [slidesArr, setSlideArr] = useState([]);
	useEffect(() => {
		setSlidesCount(Math.ceil((data?.length || 0) / perSlide));
	}, [data]);

	useEffect(() => {
		let newArr = new Array();
		for (let s = 0; s < slidesCount; s++) {
			newArr.push([...data?.slice(s * perSlide, s * perSlide + perSlide)]);
		}
		setSlideArr(newArr);
	}, [slidesCount]);

	return (
		<>
			{isLoading ? (
				<Typography>Loading</Typography>
			) : isError ? (
				<Typography>Error</Typography>
			) : (
				<Carousel
					sx={{
						width: "100%",
						justifyContent: "center",
						pl: down ? 0 : 10,
						pr: down ? 0 : 10,
					}}
					autoPlay={false}
					swipe={down}
					navButtonsAlwaysVisible={!down}
					navButtonsAlwaysInvisible={down}
				>
					{slidesArr?.map((slide, ind) => {
						return (
							<Box
								width={"100%"}
								pt={3}
								key={ind}
								display={"flex"}
								flexDirection={"row"}
								justifyContent={"center"}
							>
								<Grid container spacing={1} justifyContent={"center"}>
									{slide.map((el, num) => {
										return (
											<Grid item xs={12 / perSlide} key={ind + num}>
												<RecommendationCard data={el} />
											</Grid>
										);
									})}
								</Grid>
							</Box>
						);
					})}
				</Carousel>
			)}
		</>
	);
}
