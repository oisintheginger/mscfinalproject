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
} from "@mui/material";
import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer, useMapEvent } from "react-leaflet";
import { useState } from "react";
import {
	ExpandLeftIcon,
	ExpandRightIcon,
	HospitalIcon,
	PoliceIcon,
} from "../../Icons/HMEIcons";
import MapFeatureToggle from "./MapFeatureToggle";
import GoogleLogo from "./../../Icons/google_on_white.png";

function MapTile() {
	const map2 = useMapEvent("zoom", () => {
		console.log(map2.getBounds());
	});
	return (
		<>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				zIndex={1}
			/>
		</>
	);
}

function PropertyDetailMap({ center = [53.345, -6.29] }) {
	const [togglesOpen, setTogglesOpen] = useState(false);

	const [hospitalsSelected, setHospitalsSelected] = useState(false);
	const [policeStationsSelected, setPoliceStationsSelected] = useState(false);

	const theme = useTheme();
	const below = useMediaQuery(theme.breakpoints.down("md"));
	return (
		<Stack
			direction={"row"}
			sx={{
				height: "500px",
				flexGrow: 1,
				maxHeight: "70vh",
			}}
		>
			<Box
				sx={{
					height: "500px",
					flexGrow: 1,
					maxHeight: "70vh",
				}}
			>
				<MapContainer center={center} zoom={12} scrollWheelZoom={true}>
					<Stack width={"100%"} justifyContent={"flex-end"} direction={"row"}>
						{below ? (
							!togglesOpen && (
								<IconButton
									sx={{
										zIndex: 900,
										backgroundColor: "darkTeal.main",
										color: "white",

										mt: 1,
										mr: 1,
										"&:hover": { backgroundColor: "darkTeal.main" },
									}}
									onClick={(event) => {
										event.preventDefault();
										setTogglesOpen(!togglesOpen);
									}}
								>
									<ExpandLeftIcon />
								</IconButton>
							)
						) : (
							<Button
								sx={{
									zIndex: 900,
									backgroundColor: "darkTeal.main",
									color: "white",

									mt: 1,
									mr: 1,
									"&:hover": { backgroundColor: "buttonHover.main" },
								}}
								startIcon={
									togglesOpen ? <ExpandRightIcon /> : <ExpandLeftIcon />
								}
								onClick={(event) => {
									event.preventDefault();
									setTogglesOpen(!togglesOpen);
								}}
							>
								{togglesOpen ? "Collapse Filters" : "Expand Filters"}
							</Button>
						)}
					</Stack>
					<MapTile />
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
			<Collapse orientation="horizontal" in={togglesOpen} collapsedSize={7}>
				<Box
					sx={{
						paddingLeft: 1,
						paddingRight: 1,

						width: {
							xs: "75vw",
							md: "15vw",
						},
						borderLeft: 2,
						height: "100%",
						borderColor: "rgba(46, 54, 55, 0.3)",
						display: "flex",
						flexDirection: "column",
						alignItems: "flex-start",
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
						<MapFeatureToggle
							label="Hospital"
							icon={<HospitalIcon />}
							checkedState={hospitalsSelected}
							changeStateFunc={setHospitalsSelected}
						/>
						<MapFeatureToggle
							label="Police"
							icon={<PoliceIcon />}
							checkedState={policeStationsSelected}
							changeStateFunc={setPoliceStationsSelected}
						/>
					</Stack>
				</Box>
			</Collapse>
		</Stack>
	);
}

export default PropertyDetailMap;
