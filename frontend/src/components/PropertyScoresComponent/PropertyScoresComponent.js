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
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";
import { useMediaQuery, useTheme } from "@mui/material";
import { ExpandRightIcon } from "../../Icons/HMEIcons";

const ScoreRenderMap = {
	retail: {
		displayTitle: "Retail Scores",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet vestibulum eros. Aenean scelerisque sapien quis turpis suscipit, sit amet congue quam pellentesque. Maecenas auctor tortor a tortor sagittis gravida. In nec sagittis est. Nam bibendum neque augue, ac semper elit posuere rutrum. Fusce cursus in nisl sit amet elementum. Nam ut felis vitae arcu consequat finibus vel ut nulla. Integer ligula metus, tempor a dolor sit amet, fringilla consequat lectus. In imperdiet dui eu neque facilisis maximus at at turpis.",
		color: "#417a41",
	},
	transportation: {
		displayTitle: "Transportation Score",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet vestibulum eros. Aenean scelerisque sapien quis turpis suscipit, sit amet congue quam pellentesque. Maecenas auctor tortor a tortor sagittis gravida. In nec sagittis est. Nam bibendum neque augue, ac semper elit posuere rutrum. Fusce cursus in nisl sit amet elementum. Nam ut felis vitae arcu consequat finibus vel ut nulla. Integer ligula metus, tempor a dolor sit amet, fringilla consequat lectus. In imperdiet dui eu neque facilisis maximus at at turpis.",
		color: "#626d78",
	},
	emergency: {
		displayTitle: "Emergency Score",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet vestibulum eros. Aenean scelerisque sapien quis turpis suscipit, sit amet congue quam pellentesque. Maecenas auctor tortor a tortor sagittis gravida. In nec sagittis est. Nam bibendum neque augue, ac semper elit posuere rutrum. Fusce cursus in nisl sit amet elementum. Nam ut felis vitae arcu consequat finibus vel ut nulla. Integer ligula metus, tempor a dolor sit amet, fringilla consequat lectus. In imperdiet dui eu neque facilisis maximus at at turpis.",
		color: "#3b5880",
	},
	pharmacies: {
		displayTitle: "Pharmacies Score",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet vestibulum eros. Aenean scelerisque sapien quis turpis suscipit, sit amet congue quam pellentesque. Maecenas auctor tortor a tortor sagittis gravida. In nec sagittis est. Nam bibendum neque augue, ac semper elit posuere rutrum. Fusce cursus in nisl sit amet elementum. Nam ut felis vitae arcu consequat finibus vel ut nulla. Integer ligula metus, tempor a dolor sit amet, fringilla consequat lectus. In imperdiet dui eu neque facilisis maximus at at turpis.",
		color: "#713e73",
	},
	financial: {
		displayTitle: "Financial Score",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet vestibulum eros. Aenean scelerisque sapien quis turpis suscipit, sit amet congue quam pellentesque. Maecenas auctor tortor a tortor sagittis gravida. In nec sagittis est. Nam bibendum neque augue, ac semper elit posuere rutrum. Fusce cursus in nisl sit amet elementum. Nam ut felis vitae arcu consequat finibus vel ut nulla. Integer ligula metus, tempor a dolor sit amet, fringilla consequat lectus. In imperdiet dui eu neque facilisis maximus at at turpis.",
		color: "#5e3b7d",
	},
	fitness: {
		displayTitle: "Fitness Score",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet vestibulum eros. Aenean scelerisque sapien quis turpis suscipit, sit amet congue quam pellentesque. Maecenas auctor tortor a tortor sagittis gravida. In nec sagittis est. Nam bibendum neque augue, ac semper elit posuere rutrum. Fusce cursus in nisl sit amet elementum. Nam ut felis vitae arcu consequat finibus vel ut nulla. Integer ligula metus, tempor a dolor sit amet, fringilla consequat lectus. In imperdiet dui eu neque facilisis maximus at at turpis.",
		color: "#8a593a",
	},
	entertainment: {
		displayTitle: "Entertainment Score",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet vestibulum eros. Aenean scelerisque sapien quis turpis suscipit, sit amet congue quam pellentesque. Maecenas auctor tortor a tortor sagittis gravida. In nec sagittis est. Nam bibendum neque augue, ac semper elit posuere rutrum. Fusce cursus in nisl sit amet elementum. Nam ut felis vitae arcu consequat finibus vel ut nulla. Integer ligula metus, tempor a dolor sit amet, fringilla consequat lectus. In imperdiet dui eu neque facilisis maximus at at turpis.",
		color: "#663031",
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
				<Typography variant="h3">
					{ScoreRenderMap[scoreData?.id]?.displayTitle}
				</Typography>
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
						bgcolor={ScoreRenderMap[scoreData?.id]?.color || "green"}
						width={`${100 * (scoreData.score / 5)}%`}
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
				<Box mt={2} pl={2} pr={2}>
					<Typography variant="body1">
						{ScoreRenderMap[scoreData?.id]?.description ||
							"MISSING DESCRIPTION"}
					</Typography>
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
				<Typography variant="h2">Services Scores</Typography>
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
						maxHeight={"45vh"}
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
