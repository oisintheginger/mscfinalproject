import { MapContainer, TileLayer, useMap, useMapEvent } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Box, Button, Container, Link, Stack, Typography } from "@mui/material";
import { darkTeal } from "../../Styling/styleConstants";
import GoogleLogo from "./../../Icons/google_on_white.png";
import ButtonStyled from "../CommonComp/Button/ButtonStyle";

function HMEMap({}) {
	const map2 = useMapEvent("zoom", () => {
		console.log(map2.getBounds());
	});
	map2.setView([53.345, -6.29], map2.getZoom());
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

function LeafletMap() {
	return (
		<Box>
			<Box
				sx={{
					height: "500px",
					width: "100%",
					flexGrow: 1,
					maxHeight: "70vh",
				}}
			>
				<MapContainer center={[51.505, -0.09]} zoom={12} scrollWheelZoom={true}>
					<Stack direction={"row"} width={"100%"} justifyContent={"flex-end"}>
						{/* <ButtonStyled
							sx={{
								transform: "translate(-10px, 10px)",
								zIndex: 900,
							}}
							href="#results"
						>
							JUMP TO RESULTS
						</ButtonStyled> */}
						<Button
							sx={{
								transform: "translate(-10px, 10px)",
								zIndex: 900,
								color: "white",
								backgroundColor: darkTeal,
								borderColor: darkTeal,
								"&:hover": {
									color: "white",
									backgroundColor: "darkTeal.main",
								},
							}}
							href="#results"
						>
							<Typography variant="button" sx={{ color: "white" }}>
								JUMP TO RESULTS
							</Typography>
						</Button>
					</Stack>
					<HMEMap />
				</MapContainer>
			</Box>
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
	);
}
export default LeafletMap;
