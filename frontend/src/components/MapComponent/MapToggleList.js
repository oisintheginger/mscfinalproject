import {
	List,
	ListItem,
	Typography,
	Divider,
	Collapse,
	IconButton,
	Stack,
} from "@mui/material";
import MapFeatureToggle from "./MapFeatureToggle";
import { useState } from "react";
import { motion } from "framer-motion";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

function MapToggleList({ features, displayTitle }) {
	const [collapse, setCollapse] = useState(true);
	return (
		<>
			<Stack
				direction={"row"}
				alignItems={"center"}
				pt={0}
				pb={0}
				onClick={() => {
					setCollapse(!collapse);
				}}
				sx={{ cursor: "pointer" }}
				aria-label={
					(collapse ? "Collapse " : "Expand ") + displayTitle + " Map Toggles"
				}
			>
				<Typography component="div" id={displayTitle} variant="menuSubCategory">
					{displayTitle}
				</Typography>
				<motion.div
					animate={{ x: 0, y: 0, rotate: collapse ? 180 : 90 }}
					transition={{ type: "spring" }}
				>
					<IconButton
						aria-label={
							(collapse ? "Collapse " : "Expand ") +
							displayTitle +
							" Map Toggles"
						}
					>
						<ExpandLessIcon fontSize="medium" />
					</IconButton>
				</motion.div>
			</Stack>
			<List>
				<Divider />
				<Collapse in={collapse}>
					{features?.map((el) => {
						return (
							<ListItem key={el.label + "Toggle"}>
								<MapFeatureToggle
									label={el.label}
									icon={el.menuIcon}
									checkedState={el.state[0]}
									changeStateFunc={el.state[1]}
								/>
							</ListItem>
						);
					})}
				</Collapse>
			</List>
		</>
	);
}

export default MapToggleList;
