import {
	Stack,
	Box,
	Typography,
	Drawer,
	Paper,
	Divider,
	Collapse,
	IconButton,
	Button,
	useTheme,
	useMediaQuery,
	Checkbox,
	FormControlLabel,
	List,
	ListItem,
	ListSubheader,
} from "@mui/material";
import "leaflet/dist/leaflet.css";
import { forwardRef } from "react";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { motion } from "framer-motion";

import {
	MapContainer,
	TileLayer,
	useMapEvent,
	Marker,
	Popup,
	useMap,
} from "react-leaflet";
import { useState } from "react";
import {
	ExpandLeftIcon,
	ExpandRightIcon,
	HospitalIcon,
	LeafletHospital,
	PoliceIcon,
	LeafletPolice,
	BankIcon,
	LeafletBank,
	BusStationIcon,
	LeafletBus,
	CafeIcon,
	LeafletCafe,
	PharmacyIcon,
	LeafletPharmacy,
	SupermarketIcon,
	LeafletSupermarket,
	GymIcon,
	LeafletGym,
	RestaurantIcon,
	LeafletRestaurant,
	NightclubIcon,
	LeafletNightclub,
	FireStationIcon,
	LeafletFireStation,
	TrainIcon,
	LeafletTrain,
} from "../../Icons/HMEIcons";
import MapFeatureToggle from "./MapFeatureToggle";
import GoogleLogo from "./../../Icons/google_on_white.png";
import Leaflet from "leaflet";
import { useQueries, useQuery } from "react-query";
import { API } from "aws-amplify";
import { useEffect } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const placeTypes = [
	"hospital",
	"bank",
	"pharmacy",
	"supermarket",
	"gym",
	"cafe",
	"restaurant",
	"nightclub",
	"police",
	"fire_station",
	"bus_station",
	"train_station",
];

const markerIcon = new Leaflet.Icon({
	iconUrl: require("../../Icons/mapmarkericon.png"),
	iconAnchor: [14, 28],
	popupAnchor: [0, -28],
});

const ProcessQueries = (queries) => {
	return queries.map((el, ind) => {
		if (el?.isSuccess) {
			return el.data;
		}
	});
};

function MapTile({ location, services }) {
	return (
		<>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				zIndex={1}
			/>
			{services.map((serviceType) => {
				if (serviceType?.locations && serviceType?.enabled) {
					return serviceType.locations.map((location) => {
						const newPosition = [
							location.geometry.location.lat,
							location.geometry.location.lng,
						];
						return (
							<Marker position={newPosition} icon={serviceType.icon}>
								<Popup>
									{location.name}
									<a
										href={`https://www.google.com/maps/place/?q=place_id:${location.place_id}`}
										target="_blank"
									>
										VIEW
									</a>
								</Popup>
							</Marker>
						);
					});
				}
			})}
			<Marker position={location} icon={markerIcon} />
		</>
	);
}

function RecenterButton({ center }) {
	const map = useMap();
	return (
		<IconButton
			sx={{
				zIndex: 900,
				backgroundColor: "darkTeal.main",
				color: "white",
				mt: 1,
				mr: 1,
				"&:hover": { backgroundColor: "buttonHover.main" },
				width: "max-content",
			}}
			onClick={(e) => {
				e.preventDefault();
				map.flyTo(center);
			}}
		>
			<MyLocationIcon fontSize="large" />
		</IconButton>
	);
}

function PropertyDetailMap({ center = [39.2904, -76.6122] }, ref) {
	const [togglesOpen, setTogglesOpen] = useState(false);

	const [hospitalsSelected, setHospitalsSelected] = useState(true);
	const [policeStationsSelected, setPoliceStationsSelected] = useState(true);
	const [banksSelected, setBanksSelected] = useState(true);
	const [busSelected, setBusSelected] = useState(true);
	const [cafeSelected, setCafeSelected] = useState(true);
	const [pharmacySelected, setPharmacySelected] = useState(true);
	const [supermarketSelected, setSupermarketSelected] = useState(true);
	const [gymSelected, setGymSelected] = useState(true);
	const [restaurantSelected, setRestaurantSelected] = useState(true);
	const [nightclubSelected, setNightclubSelected] = useState(true);
	const [fireStationSelected, setFireStationSelected] = useState(true);
	const [trainSelected, setTrainSelected] = useState(true);

	const FeatureToggles = {
		hospital: hospitalsSelected,
		police: policeStationsSelected,
		bank: banksSelected,
		bus_station: busSelected,
		cafe: cafeSelected,
		pharmacy: pharmacySelected,
		supermarket: supermarketSelected,
		gym: gymSelected,
		restaurant: restaurantSelected,
		nightclub: nightclubSelected,
		fire_station: fireStationSelected,
		train_station: trainSelected,
	};

	const IconMap = {
		hospital: LeafletHospital,
		police: LeafletPolice,
		bank: LeafletBank,
		bus_station: LeafletBus,
		cafe: LeafletCafe,
		pharmacy: LeafletPharmacy,
		supermarket: LeafletSupermarket,
		gym: LeafletGym,
		restaurant: LeafletRestaurant,
		nightclub: LeafletNightclub,
		fire_station: LeafletFireStation,
		train_station: LeafletTrain,
	};

	const theme = useTheme();
	const below = useMediaQuery(theme.breakpoints.down("md"));

	const nearbyPlaces = useQueries([
		...placeTypes.map((type) => {
			return {
				queryKey: ["place", type],
				queryFn: () => {
					return API.post("GoogleMapApi", "/", {
						queryStringParameters: {
							latitude: center[0],
							longitude: center[1],
							type: type,
						},
					});
				},
				enabled: process.env.REACT_APP_GOOGLE_MAP_ENABLED === "enabled",
				refetchOnWindowFocus: false,
				select: (data) => {
					return {
						locations: JSON.parse(data),
						icon: IconMap[type],
						type,
						enabled: FeatureToggles[type],
					};
				},
			};
		}),
	]);

	console.log(ProcessQueries(nearbyPlaces));

	return (
		<>
			<Stack
				direction={"row"}
				sx={{
					height: "500px",
					flexGrow: 1,
					maxHeight: "70vh",
					width: "100%",
				}}
			>
				<Box
					sx={{
						height: "500px",
						flexGrow: 1,
						maxHeight: "70vh",
					}}
					ref={ref}
				>
					<MapContainer center={center} zoom={16} scrollWheelZoom={true}>
						<Box
							display={"flex"}
							flexDirection={"column"}
							width={"100%"}
							height={"90%"}
							justifyContent={"space-between"}
							alignItems={"flex-end"}
							direction={"column"}
						>
							{!below && (
								<Button
									sx={{
										zIndex: 900,
										backgroundColor: "darkTeal.main",
										color: "white",
										mt: 1,
										mr: 1,
										"&:hover": { backgroundColor: "buttonHover.main" },
										width: "max-content",
									}}
									startIcon={
										<motion.div
											animate={{ x: 0, y: 0, rotate: togglesOpen ? 0 : 180 }}
											transition={{ type: "spring" }}
											style={{ display: "flex" }}
										>
											<ExpandRightIcon fontSize="medium" />
										</motion.div>
									}
									onClick={(event) => {
										event.preventDefault();
										setTogglesOpen(!togglesOpen);
									}}
								>
									{togglesOpen ? "Collapse Filters" : "Expand Filters"}
								</Button>
							)}
							<RecenterButton center={center} />
						</Box>
						<MapTile
							location={center}
							services={ProcessQueries(nearbyPlaces)}
							featureToggles={FeatureToggles}
						/>
					</MapContainer>
					<Stack direction={"row"} alignItems={"flex-end"} mt={1} spacing={1}>
						<Typography
							fontStyle={"normal"}
							fontWeight={500}
							fontSize={"16px"}
							lineHeight={"16px"}
							letterSpacing={"0.0575em"}
							color={"#5F6368"}
						>
							{"Powered by"}
						</Typography>
						<Box
							component={"img"}
							alt="Powered by Google"
							src={GoogleLogo}
							height={"100%"}
						/>
					</Stack>
				</Box>
				{!below && (
					<Collapse orientation="horizontal" in={togglesOpen} collapsedSize={0}>
						<Box
							sx={{
								paddingLeft: 1,
								width: {
									xs: "50vw",
									md: "20vw",
								},
								borderLeft: 2,
								height: "100%",
								borderColor: "rgba(46, 54, 55, 0.3)",
								display: "flex",
								flexDirection: "column",
								alignItems: "flex-start",
								overflow: "scroll",
							}}
						>
							{below && (
								<Button
									sx={{
										zIndex: 900,
										color: "black",
										marginBottom: 2,
									}}
									onClick={() => {
										setTogglesOpen(!togglesOpen);
									}}
									startIcon={<ExpandRightIcon />}
									variant="outlined"
								>
									COLLAPSE
								</Button>
							)}

							<Stack paddingLeft={1} width={"100%"}>
								<Typography variant="toggleMenu">Map Features</Typography>
								<Divider />
								<List
									subheader={
										<Typography
											component="div"
											id="Emergency Services"
											variant="menuSubCategory"
										>
											Emergency Services
										</Typography>
									}
								>
									<ListItem>
										<MapFeatureToggle
											label="Hospital"
											icon={<HospitalIcon fontSize="medium" />}
											checkedState={hospitalsSelected}
											changeStateFunc={setHospitalsSelected}
										/>
									</ListItem>
									<ListItem>
										<MapFeatureToggle
											label="Police"
											icon={<PoliceIcon fontSize="medium" />}
											checkedState={policeStationsSelected}
											changeStateFunc={setPoliceStationsSelected}
										/>
									</ListItem>
									<ListItem>
										<MapFeatureToggle
											label="Fire Station"
											icon={<FireStationIcon fontSize="medium" />}
											checkedState={fireStationSelected}
											changeStateFunc={setFireStationSelected}
										/>
									</ListItem>
								</List>
								<List
									subheader={
										<Typography
											component="div"
											id="Emergency Services"
											variant="menuSubCategory"
										>
											Transport Services
										</Typography>
									}
								>
									<ListItem>
										<MapFeatureToggle
											label="Trains"
											icon={<TrainIcon fontSize="medium" />}
											checkedState={trainSelected}
											changeStateFunc={setTrainSelected}
										/>
									</ListItem>
									<ListItem>
										<MapFeatureToggle
											label="Bus Stop"
											icon={<BusStationIcon fontSize="medium" />}
											checkedState={busSelected}
											changeStateFunc={setBusSelected}
										/>
									</ListItem>
								</List>
								<List
									subheader={
										<Typography
											component="div"
											id="Emergency Services"
											variant="menuSubCategory"
										>
											Retail Services
										</Typography>
									}
								>
									<ListItem>
										<MapFeatureToggle
											label="Bank"
											icon={<BankIcon fontSize="medium" />}
											checkedState={banksSelected}
											changeStateFunc={setBanksSelected}
										/>
									</ListItem>
									<ListItem>
										<MapFeatureToggle
											label="Pharmacy"
											icon={<PharmacyIcon fontSize="medium" />}
											checkedState={pharmacySelected}
											changeStateFunc={setPharmacySelected}
										/>
									</ListItem>
									<ListItem>
										<MapFeatureToggle
											label="Supermarket"
											icon={<SupermarketIcon fontSize="medium" />}
											checkedState={supermarketSelected}
											changeStateFunc={setSupermarketSelected}
										/>
									</ListItem>
								</List>
								<List
									subheader={
										<Typography
											component="div"
											id="Emergency Services"
											variant="menuSubCategory"
										>
											Food and Entertainment
										</Typography>
									}
								>
									<ListItem>
										<MapFeatureToggle
											label="Café"
											icon={<CafeIcon fontSize="medium" />}
											checkedState={cafeSelected}
											changeStateFunc={setCafeSelected}
										/>
									</ListItem>
									<ListItem>
										<MapFeatureToggle
											label="Restaurant"
											icon={<RestaurantIcon fontSize="medium" />}
											checkedState={restaurantSelected}
											changeStateFunc={setRestaurantSelected}
										/>
									</ListItem>
									<ListItem>
										<MapFeatureToggle
											label="Nightclub"
											icon={<NightclubIcon fontSize="medium" />}
											checkedState={nightclubSelected}
											changeStateFunc={setNightclubSelected}
										/>
									</ListItem>
									<ListItem>
										<MapFeatureToggle
											label="Gym"
											icon={<GymIcon fontSize="medium" />}
											checkedState={gymSelected}
											changeStateFunc={setGymSelected}
										/>
									</ListItem>
								</List>
							</Stack>
						</Box>
					</Collapse>
				)}
			</Stack>
			{below && (
				<Box pt={3}>
					<Stack direction={"row"} alignItems={"center"}>
						<Typography variant="toggleMenu">Map Filters</Typography>
						<motion.div
							animate={{ x: 0, y: 0, rotate: togglesOpen ? 180 : 90 }}
							transition={{ type: "spring" }}
						>
							<IconButton
								onClick={() => {
									setTogglesOpen(!togglesOpen);
								}}
							>
								<ExpandLessIcon fontSize="large" />
							</IconButton>
						</motion.div>
					</Stack>
					<Divider />
					<Collapse orientation="vertical" in={togglesOpen} collapsedSize={0}>
						<Paper elevation={7}>
							<Box
								sx={{
									width: "100%",
									height: "45vh",
									display: "flex",
									flexDirection: "column",
									alignItems: "flex-start",
									overflow: "scroll",
									paddingLeft: 2,
								}}
							>
								<Stack paddingLeft={1} width={"100%"}>
									<List
										subheader={
											<Typography
												component="div"
												id="Emergency Services"
												variant="menuSubCategory"
											>
												Emergency Services
											</Typography>
										}
									>
										<Divider />
										<ListItem>
											<MapFeatureToggle
												label="Hospital"
												icon={<HospitalIcon fontSize="medium" />}
												checkedState={hospitalsSelected}
												changeStateFunc={setHospitalsSelected}
											/>
										</ListItem>
										<ListItem>
											<MapFeatureToggle
												label="Police"
												icon={<PoliceIcon fontSize="medium" />}
												checkedState={policeStationsSelected}
												changeStateFunc={setPoliceStationsSelected}
											/>
										</ListItem>
										<ListItem>
											<MapFeatureToggle
												label="Fire Station"
												icon={<FireStationIcon fontSize="medium" />}
												checkedState={fireStationSelected}
												changeStateFunc={setFireStationSelected}
											/>
										</ListItem>
									</List>
									<List
										subheader={
											<Typography
												component="div"
												id="Emergency Services"
												variant="menuSubCategory"
											>
												Transport Services
											</Typography>
										}
									>
										<Divider />
										<ListItem>
											<MapFeatureToggle
												label="Trains"
												icon={<TrainIcon fontSize="medium" />}
												checkedState={trainSelected}
												changeStateFunc={setTrainSelected}
											/>
										</ListItem>
										<ListItem>
											<MapFeatureToggle
												label="Bus Stop"
												icon={<BusStationIcon fontSize="medium" />}
												checkedState={busSelected}
												changeStateFunc={setBusSelected}
											/>
										</ListItem>
									</List>
									<List
										subheader={
											<Typography
												component="div"
												id="Emergency Services"
												variant="menuSubCategory"
											>
												Retail Services
											</Typography>
										}
									>
										<Divider />
										<ListItem>
											<MapFeatureToggle
												label="Bank"
												icon={<BankIcon fontSize="medium" />}
												checkedState={banksSelected}
												changeStateFunc={setBanksSelected}
											/>
										</ListItem>
										<ListItem>
											<MapFeatureToggle
												label="Pharmacy"
												icon={<PharmacyIcon fontSize="medium" />}
												checkedState={pharmacySelected}
												changeStateFunc={setPharmacySelected}
											/>
										</ListItem>
										<ListItem>
											<MapFeatureToggle
												label="Supermarket"
												icon={<SupermarketIcon fontSize="medium" />}
												checkedState={supermarketSelected}
												changeStateFunc={setSupermarketSelected}
											/>
										</ListItem>
									</List>
									<List
										subheader={
											<Typography
												component="div"
												id="Emergency Services"
												variant="menuSubCategory"
											>
												Food and Entertainment
											</Typography>
										}
									>
										<Divider />
										<ListItem>
											<MapFeatureToggle
												label="Café"
												icon={<CafeIcon fontSize="medium" />}
												checkedState={cafeSelected}
												changeStateFunc={setCafeSelected}
											/>
										</ListItem>
										<ListItem>
											<MapFeatureToggle
												label="Restaurant"
												icon={<RestaurantIcon fontSize="medium" />}
												checkedState={restaurantSelected}
												changeStateFunc={setRestaurantSelected}
											/>
										</ListItem>
										<ListItem>
											<MapFeatureToggle
												label="Nightclub"
												icon={<NightclubIcon fontSize="medium" />}
												checkedState={nightclubSelected}
												changeStateFunc={setNightclubSelected}
											/>
										</ListItem>
										<ListItem>
											<MapFeatureToggle
												label="Gym"
												icon={<GymIcon fontSize="medium" />}
												checkedState={gymSelected}
												changeStateFunc={setGymSelected}
											/>
										</ListItem>
									</List>
								</Stack>
							</Box>
						</Paper>
					</Collapse>
				</Box>
			)}
		</>
	);
}

export default forwardRef(PropertyDetailMap);
