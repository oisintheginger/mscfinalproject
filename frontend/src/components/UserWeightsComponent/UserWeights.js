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
import { useContext, useState } from "react";
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
import { useQuery } from "react-query";
import { API } from "aws-amplify";
import { useAuthenticator } from "@aws-amplify/ui-react-core";
import { UpdateWeightsMutation } from "../../Utils/Mutations/ProfileMutation/ProfileMutation";
import ButtonStyled from "../CommonComp/Button/ButtonStyled";
import { UserContext } from "../../Utils/UserContext/UserContext";

const OptionDict = {
	finance: {
		key: "finance",
		id: "Financial",
		icon: <AccountBalanceIcon fontSize="large" />,
		facilities: "Banks",
	},
	transportation: {
		key: "transportation",
		id: "Transportation",
		icon: <CommuteIcon fontSize="large" />,
		facilities: "Buses, Trains, and Transit Stations",
	},
	personal_care: {
		key: "personal_care",
		id: "Personal Care",
		icon: <LocalPharmacyIcon fontSize="large" />,
		facilities: "Pharmacies and Beauty Salons",
	},
	retail: {
		key: "retail",
		id: "Retail",
		icon: <PointOfSaleIcon fontSize="large" />,
		facilities: "Supermarkets",
	},
	fitness: {
		key: "fitness",
		id: "Fitness",
		icon: <FitnessCenterIcon fontSize="large" />,
		facilities: "Gyms",
	},
	leisure: {
		key: "leisure",
		id: "Leisure",
		icon: <NightlifeIcon fontSize="large" />,
		facilities: "Cafés, Restaurants, Nightclubs, Bars, Parks",
	},
	emergency: {
		key: "emergency",
		id: "Emergency",
		icon: <LocalPoliceIcon fontSize="large" />,
		facilities: "Police & Fire Stations, and Hospitals",
	},
};

const DefaultOptions = [
	{
		key: "finance",
		id: "Financial",
		icon: <AccountBalanceIcon fontSize="large" />,
		facilities: "Banks",
	},
	{
		key: "transportation",
		id: "Transportation",
		icon: <CommuteIcon fontSize="large" />,
		facilities: "Buses, Trains, and Transit Stations",
	},
	{
		key: "personal_care",
		id: "Personal Care",
		icon: <LocalPharmacyIcon fontSize="large" />,
		facilities: "Pharmacies and Beauty Salons",
	},
	{
		key: "retail",
		id: "Retail",
		icon: <PointOfSaleIcon fontSize="large" />,
		facilities: "Supermarkets",
	},
	{
		key: "fitness",
		id: "Fitness",
		icon: <FitnessCenterIcon fontSize="large" />,
		facilities: "Gyms",
	},
	{
		key: "leisure",
		id: "Leisure",
		icon: <NightlifeIcon fontSize="large" />,
		facilities: "Cafés, Restaurants, Nightclubs, Bars, Parks",
	},
	{
		key: "emergency",
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

function UserWeights({
	successWeightsUpdateAlert = () => {},
	errorWeightsUpdateAlert = () => {},
}) {
	const [state, setState] = useState({ options: DefaultOptions });
	const [submitEnabled, setSubmitEnabled] = useState(false);

	const { route, user } = useAuthenticator((context) => [
		context.route,
		context.user,
	]);

	const { getAccessToken } = useContext(UserContext);

	const { refetch: weightsRefetch, data: weightsData } = useQuery(
		["UserWeights"],
		async () => {
			const accessToken = await getAccessToken();
			return API.get("HMEBackend", "/api/user/w", {
				headers: {
					Authorization: "Bearer " + accessToken || null,
				},
				queryStringParameters: {
					userId: user?.username || null,
				},
			});
		},
		{
			refetchOnWindowFocus: false,
			onSuccess: (data) => {
				const nullsPresent = Object.keys(data).some((el) => {
					return data[el] == null;
				});
				if (nullsPresent) {
					setState({ options: DefaultOptions });
					return;
				}
				let newOptionsList = new Array(7);
				Object.keys(data).map((el) => {
					newOptionsList[7 - data[el]] = OptionDict[el];
				});

				setState({ options: newOptionsList });
			},
		}
	);

	const { mutate: updateWeights } = UpdateWeightsMutation(
		(data) => {
			successWeightsUpdateAlert();
			weightsRefetch();
			setSubmitEnabled(false);
		},
		() => {
			errorWeightsUpdateAlert();
		}
	);

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
		setSubmitEnabled(true);
		console.log(state.options);
	}

	return (
		<Stack alignItems={"center"} spacing={2}>
			<ButtonStyled
				onClick={() => {
					updateWeights({
						leisure:
							7 -
							state.options.findIndex((el) => {
								return el.key == "leisure";
							}),
						personal_care:
							7 -
							state.options.findIndex((el) => {
								return el.key == "personal_care";
							}),
						retail:
							7 -
							state.options.findIndex((el) => {
								return el.key == "retail";
							}),
						finance:
							7 -
							state.options.findIndex((el) => {
								return el.key == "finance";
							}),
						transportation:
							7 -
							state.options.findIndex((el) => {
								return el.key == "transportation";
							}),
						fitness:
							7 -
							state.options.findIndex((el) => {
								return el.key == "fitness";
							}),
						emergency:
							7 -
							state.options.findIndex((el) => {
								return el.key == "emergency";
							}),
					});
				}}
				disabled={!submitEnabled}
			>
				SUBMIT Changes
			</ButtonStyled>
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
		</Stack>
	);
}
export default UserWeights;
