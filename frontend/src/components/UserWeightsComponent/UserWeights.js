import {
	Box,
	Paper,
	Typography,
	Stack,
	Collapse,
	Button,
	IconButton,
	Grid,
} from "@mui/material";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CommuteIcon from "@mui/icons-material/Commute";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import NightlifeIcon from "@mui/icons-material/Nightlife";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

import CloseIcon from "@mui/icons-material/Close";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
const Options = [
	{
		id: "Financial",
		icon: <AccountBalanceIcon fontSize="large" />,
		facilities: "Banks",
	},
	{
		id: "Transportation",
		icon: <CommuteIcon fontSize="large" />,
		facilities: "Buses, Trains, and Transit Stations",
	},
	{
		id: "Pharmacies",
		icon: <LocalPharmacyIcon fontSize="large" />,
		facilities: "Pharmacies",
	},
	{
		id: "Retail",
		icon: <PointOfSaleIcon fontSize="large" />,
		facilities: "Supermarkets",
	},
	{
		id: "Fitness",
		icon: <FitnessCenterIcon fontSize="large" />,
		facilities: "Gyms",
	},
	{
		id: "Entertainment",
		icon: <NightlifeIcon fontSize="large" />,
		facilities: "Cafés, Restaurants, and Nightclubs",
	},
	{
		id: "Emergency",
		icon: <LocalPoliceIcon fontSize="large" />,
		facilities: "Police & Fire Stations, and Hospitals",
	},
];

function Option({ object, provided }) {
	const [descriptionToggle, setDescriptionToggle] = useState(false);

	return (
		<Paper
			component={"div"}
			elevation={8}
			ref={provided.innerRef}
			{...provided.draggableProps}
			{...provided.dragHandleProps}
		>
			<Box width={"250px"} p={1}>
				<Grid container justifyContent={"center"} alignItems={"center"}>
					<Grid item xs={2}>
						<DragIndicatorIcon fontSize="medium" />
					</Grid>
					<Grid item xs={8}>
						<Box>
							<Collapse in={!descriptionToggle} orientation="vertical">
								<Stack
									direction={"row"}
									justifyContent={"flex-start"}
									spacing={1}
									alignItems={"center"}
								>
									<Typography variant="weightsOption">{object.id}</Typography>
									{object.icon}
								</Stack>
							</Collapse>
							<Collapse in={descriptionToggle} orientation="vertical">
								<Box flexGrow={true}>
									<Typography>{object.facilities}</Typography>
								</Box>
							</Collapse>
						</Box>
					</Grid>
					<Grid item xs={2}>
						<IconButton
							onClick={() => {
								setDescriptionToggle(!descriptionToggle);
							}}
						>
							{descriptionToggle ? <CloseIcon /> : <QuestionMarkIcon />}
						</IconButton>
					</Grid>
				</Grid>
			</Box>
		</Paper>
	);
}

function OptionList(options) {
	return (
		<>
			{options.options.map((object, index) => (
				<Draggable draggableId={object.id} index={index} key={object.id}>
					{(provided) => <Option provided={provided} object={object} />}
				</Draggable>
			))}
		</>
	);
}

function UserWeights() {
	const [state, setState] = useState({ options: Options });

	const reorder = (list, startIndex, endIndex) => {
		const result = Array.from(list);
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);
		return result;
	};

	function onDragEnd(result) {
		if (!result.destination) {
			return;
		}

		if (result.destination.index === result.source.index) {
			return;
		}

		const options = reorder(
			state.options,
			result.source.index,
			result.destination.index
		);
		setState({ options });
	}

	return (
		<Box mt={2} width={300}>
			<Paper elevation={4}>
				<Stack p={1} justifyContent={"center"} spacing={1}>
					<Typography textAlign={"center"} variant="weightsIndicator">
						{"Most Important".toUpperCase()}
					</Typography>
					<DragDropContext onDragEnd={onDragEnd}>
						<Droppable droppableId="droppable">
							{(provided) => (
								<Stack
									component={"div"}
									spacing={1}
									justifyContent={"center"}
									alignItems={"center"}
									ref={provided.innerRef}
									{...provided.droppableProps}
								>
									<OptionList options={state.options} />
									{provided.placeholder}
								</Stack>
							)}
						</Droppable>
					</DragDropContext>
					<Typography textAlign={"center"} variant="weightsIndicator">
						{"Least Important".toUpperCase()}
					</Typography>
				</Stack>
			</Paper>
		</Box>
	);
}
export default UserWeights;
