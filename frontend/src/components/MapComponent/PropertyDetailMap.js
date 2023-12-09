import {
	Stack,
	Box,
	Typography,
	Paper,
	Divider,
	Collapse,
	IconButton,
	Button,
	useTheme,
	useMediaQuery,
	Link,
	Tooltip,
} from "@mui/material";
import "leaflet/dist/leaflet.css";
import { forwardRef } from "react";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useState } from "react";
import {
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
	ArtGalleryIcon,
	LeafletArtGallery,
	AmusementParkIcon,
	LeafletAmusementPark,
	BowlingIcon,
	LeafletBowling,
	AquariumIcon,
	LeafletAquarium,
	MuseumIcon,
	LeafletMuseum,
	MovieTheatreIcon,
	LeafletMovieTheatre,
	LeafletPlaceholder,
} from "../../Icons/MapIcons";
import { ExpandRightIcon } from "../../Icons/HMEIcons";
import GoogleLogo from "./../../Icons/google_on_white.png";
import Leaflet from "leaflet";
import { useQueries } from "react-query";
import { API } from "@aws-amplify/api";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import MapToggles from "./MapToggles";

const markerIcon = new Leaflet.Icon({
	iconUrl: require("../../Icons/mapmarkericon.png"),
	iconAnchor: [14, 28],
	popupAnchor: [0, -28],
});

const ProcessQueries = (queries) => {
	return queries.map((el, ind) => {
		if (el?.isSuccess) {
			// return el.data;
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
					return serviceType.locations.map((location, ind) => {
						const newPosition = [
							location.geometry.location.lat,
							location.geometry.location.lng,
						];
						return (
							<Marker
								position={newPosition}
								icon={serviceType.icon}
								key={location.name + " " + ind}
							>
								<Popup>
									<Box maxWidth={"50vw"}>
										<Stack alignItems={"center"} spacing={2}>
											<Typography textAlign={"center"} variant="mapPopupName">
												{location.name}
											</Typography>
											{location.rating && (
												<Stack
													mt={2}
													mb={2}
													direction={"row"}
													alignItems={"center"}
													spacing={1}
												>
													<Typography
														textAlign={"center"}
														variant="mapPopupRating"
													>
														{location.rating}
													</Typography>
													<StarOutlineIcon fontSize="medium" />
												</Stack>
											)}
											<Link
												href={`https://www.google.com/maps/place/?q=place_id:${location.place_id}`}
												target="_blank"
												textAlign={"center"}
											>
												VIEW ON GOOGLE MAPS
											</Link>
										</Stack>
									</Box>
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
		<Tooltip title="Recenter Map on Property Location">
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
					map?.flyTo(center);
				}}
			>
				<MyLocationIcon fontSize="large" />
			</IconButton>
		</Tooltip>
	);
}

function PropertyDetailMap({ center = [39.2904, -76.6122] }, ref) {
	const [togglesOpen, setTogglesOpen] = useState(false);

	const mapFeatures = {
		hospital: {
			type: "hospital",
			state: useState(true),
			icon: LeafletHospital,
			menuIcon: <HospitalIcon fontSize="medium" />,
			label: "Hospital",
		},
		police: {
			type: "police",
			state: useState(true),
			icon: LeafletPolice,
			menuIcon: <PoliceIcon fontSize="medium" />,
			label: "Police",
		},
		bank: {
			type: "bank",
			state: useState(true),
			icon: LeafletBank,
			menuIcon: <BankIcon fontSize="medium" />,
			label: "Bank",
		},
		bus_station: {
			type: "bus_station",
			state: useState(true),
			icon: LeafletBus,
			menuIcon: <BusStationIcon fontSize="medium" />,
			label: "Bus Stop",
		},
		cafe: {
			type: "cafe",
			state: useState(true),
			icon: LeafletCafe,
			menuIcon: <CafeIcon fontSize="medium" />,
			label: "Cafe",
		},
		pharmacy: {
			type: "pharmacy",

			state: useState(true),
			icon: LeafletPharmacy,
			menuIcon: <PharmacyIcon fontSize="medium" />,
			label: "Pharmacy",
		},
		supermarket: {
			type: "supermarket",
			state: useState(true),
			icon: LeafletSupermarket,
			menuIcon: <SupermarketIcon fontSize="medium" />,
			label: "Supermarket",
		},
		gym: {
			type: "gym",
			state: useState(true),
			icon: LeafletGym,
			menuIcon: <GymIcon fontSize="medium" />,
			label: "Gym",
		},
		restaurant: {
			type: "restaurant",
			state: useState(true),
			icon: LeafletRestaurant,
			menuIcon: <RestaurantIcon fontSize="medium" />,
			label: "Restaurant",
		},
		night_club: {
			type: "night_club",
			state: useState(true),
			icon: LeafletNightclub,
			menuIcon: <NightclubIcon fontSize="medium" />,
			label: "Nightclub",
		},
		fire_station: {
			type: "fire_station",
			state: useState(true),
			icon: LeafletFireStation,
			menuIcon: <FireStationIcon fontSize="medium" />,
			label: "Fire Station",
		},
		train_station: {
			type: "train_station",
			state: useState(true),
			icon: LeafletTrain,
			menuIcon: <TrainIcon fontSize="medium" />,
			label: "Train",
		},
		art_gallery: {
			type: "art_gallery",
			state: useState(true),
			icon: LeafletArtGallery,
			menuIcon: <ArtGalleryIcon fontSize="medium" />,
			label: "Art Gallery",
		},
		amusement_park: {
			type: "amusement_park",
			state: useState(true),
			icon: LeafletAmusementPark,
			menuIcon: <AmusementParkIcon fontSize="medium" />,
			label: "Amusement Park",
		},
		bowling_alley: {
			type: "bowling_alley",
			state: useState(true),
			icon: LeafletBowling,
			menuIcon: <BowlingIcon fontSize="medium" />,
			label: "Bowling Alley",
		},
		aquarium: {
			type: "aquarium",
			state: useState(true),
			icon: LeafletAquarium,
			menuIcon: <AquariumIcon fontSize="medium" />,

			label: "Aquarium",
		},
		museum: {
			type: "museum",
			state: useState(true),
			icon: LeafletMuseum,
			menuIcon: <MuseumIcon fontSize="medium" />,
			label: "Museum",
		},
		movie_theater: {
			type: "movie_theater",
			state: useState(true),
			icon: LeafletMovieTheatre,
			menuIcon: <MovieTheatreIcon fontSize="medium" />,
			label: "Movie Theatre",
		},
	};

	const theme = useTheme();
	const below = useMediaQuery(theme.breakpoints.down("md"));

	const nearbyPlaces = useQueries([
		...Object.values(mapFeatures).map((mapFeature) => {
			return {
				queryKey: ["place", mapFeature.type],
				queryFn: () => {
					return API.post("GoogleMapApi", "/", {
						queryStringParameters: {
							latitude: center[0],
							longitude: center[1],
							type: mapFeature.type,
						},
					});
				},
				enabled: false,
				refetchOnWindowFocus: false,
				select: (data) => {
					return {
						locations: JSON.parse(data),
						icon: mapFeature.icon || LeafletPlaceholder,
						type: mapFeature.type,
						enabled: mapFeature?.state !== null ? mapFeature.state[0] : true,
					};
				},
			};
		}),
	]);

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
							mapFeatures={mapFeatures}
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

							<MapToggles mapFeatures={mapFeatures} />
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
								aria-label={
									togglesOpen ? "Close Map Toggles" : "Open Map Toggles"
								}
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
								<MapToggles mapFeatures={mapFeatures} />
							</Box>
						</Paper>
					</Collapse>
				</Box>
			)}
		</>
	);
}

export default forwardRef(PropertyDetailMap);
