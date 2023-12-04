// import { Bar } from "react-chartjs-2";
// import { MockScores } from "../../MockData/PropertyScoresMockData";

import { useState } from "react";
// import "chart.js/auto";
import {
	Box,
	Collapse,
	Container,
	Divider,
	IconButton,
	Paper,
	Stack,
	Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import ExpandLess from "@mui/icons-material/ExpandLess";
import { useMediaQuery, useTheme } from "@mui/material";

function IndividualCount({ count, displayTitle }) {
	return (
		<Stack flexDirection={"column"} spacing={1}>
			<Typography variant="individualScoreLabel" textAlign={"center"} noWrap>
				{displayTitle}
			</Typography>
			<Typography variant="individualScoreValue" textAlign={"center"}>
				{count}
			</Typography>
		</Stack>
	);
}

const countScoreDisplayMap = {
	transit_stationCount: (count) => {
		return <IndividualCount count={count} displayTitle={"Transit Stations"} />;
	},
	bus_stationCount: (count) => {
		return <IndividualCount count={count} displayTitle={"Bus Stations"} />;
	},
	train_stationCount: (count) => {
		return <IndividualCount count={count} displayTitle={"Train Stations"} />;
	},
	police_stationCount: (count) => {
		return <IndividualCount count={count} displayTitle={"Police Stations"} />;
	},
	fire_stationCount: (count) => {
		return <IndividualCount count={count} displayTitle={"Fire Stations"} />;
	},
	hospitalCount: (count) => {
		return <IndividualCount count={count} displayTitle={"Hospitals"} />;
	},
	pharmacyCount: (count) => {
		return <IndividualCount count={count} displayTitle={"Pharmacies"} />;
	},
	beauty_salonCount: (count) => {
		return <IndividualCount count={count} displayTitle={"Beauty Salons"} />;
	},
	bankCount: (count) => {
		return <IndividualCount count={count} displayTitle={"Banks"} />;
	},
	supermarketCount: (count) => {
		return <IndividualCount count={count} displayTitle={"Supermarkets"} />;
	},
	gymCount: (count) => {
		return <IndividualCount count={count} displayTitle={"Gyms"} />;
	},
	restaurantCount: (count) => {
		return <IndividualCount count={count} displayTitle={"Restaurants"} />;
	},
	night_clubCount: (count) => {
		return <IndividualCount count={count} displayTitle={"Night Clubs"} />;
	},
	cafeCount: (count) => {
		return <IndividualCount count={count} displayTitle={"Cafés"} />;
	},
	parkCount: (count) => {
		return <IndividualCount count={count} displayTitle={"Parks"} />;
	},
	barCount: (count) => {
		return <IndividualCount count={count} displayTitle={"Bars"} />;
	},
};

function Rating({ scoreData }) {
	const [descriptionOpen, setDescriptionOpen] = useState(false);
	const theme = useTheme();
	const above = useMediaQuery(theme.breakpoints.up("md"));
	return (
		<Box pl={2} pr={2}>
			<Stack
				direction={"row"}
				alignItems={"center"}
				justifyContent={"space-between"}
			>
				<Typography variant="h3">{scoreData?.displayTitle}</Typography>
				<Stack
					direction={"row"}
					alignItems={"center"}
					justifyContent={"space-between"}
				>
					{above && <Typography variant="button">Details</Typography>}
					<motion.div
						animate={{ x: 0, y: 0, rotate: descriptionOpen ? 180 : 90 }}
						transition={{ type: "spring" }}
					>
						<IconButton
							onClick={() => {
								setDescriptionOpen(!descriptionOpen);
							}}
						>
							<ExpandLess fontSize="large" />
						</IconButton>
					</motion.div>
				</Stack>
			</Stack>
			<Divider />
			<Box
				display={"flex"}
				flexDirection={"row"}
				justifyContent={"flex-start"}
				alignItems={"center"}
				sx={{}}
				width={"100%"}
				borderRadius={2}
				overflow={"clip"}
				bgcolor={"#e6e6e6"}
				mt={1}
			>
				{scoreData?.score > 0 ? (
					<Box
						bgcolor={scoreData?.color || "green"}
						width={`${100 * (scoreData?.score / 5)}%`}
						height={"100%"}
						sx={{ opacity: "100%" }}
						display={"flex"}
						flexDirection={"row"}
						alignItems={"center"}
						pr={3}
					>
						<Typography
							variant="scoreValue"
							textAlign={"right"}
							width={"100%"}
							color={"white"}
						>
							{scoreData?.score}
						</Typography>
					</Box>
				) : (
					<Typography
						variant="scoreValue"
						textAlign={"center"}
						width={"100%"}
						color={"black"}
					>
						{scoreData?.score}
					</Typography>
				)}
			</Box>
			<Collapse in={descriptionOpen}>
				<Box mt={2} mb={1} pl={2} pr={2} overflow={"auto"}>
					<Stack
						direction={"row"}
						spacing={2}
						justifyContent={{ xs: "flex-start", md: "space-evenly" }}
					>
						{Object.keys(scoreData?.counts)?.map((el, ind) => {
							return countScoreDisplayMap[el](scoreData?.counts[el]);
						})}
					</Stack>
				</Box>
				<Divider />
			</Collapse>
		</Box>
	);
}
function PropertyScoresComponent({ inputData }) {
	const [displayScores, setDisplayScores] = useState(true);
	return (
		<Box>
			<Stack direction={"row"} spacing={2} alignItems={"center"}>
				<Typography variant="h2">Neighborhood Service Scores</Typography>
				<motion.div
					animate={{ x: 0, y: 0, rotate: displayScores ? 180 : 90 }}
					transition={{ type: "spring" }}
				>
					<IconButton
						onClick={() => {
							setDisplayScores(!displayScores);
						}}
					>
						<ExpandLess fontSize="large" />
					</IconButton>
				</motion.div>
			</Stack>
			<Divider />
			<Collapse in={displayScores}>
				<Paper elevation={4}>
					<Box
						pb={2}
						pt={2}
						maxHeight={{ xs: "45vh", md: "60vh" }}
						sx={{
							overflowX: "hidden",
							overflowY: "scroll",
						}}
					>
						<Stack spacing={4}>
							{inputData.map((data, ind) => {
								return <Rating scoreData={data} key={data.id + " score"} />;
							})}
						</Stack>
					</Box>
				</Paper>
			</Collapse>
		</Box>
	);
}

export default PropertyScoresComponent;
