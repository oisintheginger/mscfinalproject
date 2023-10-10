import { MapContainer, TileLayer, useMap, useMapEvent } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

function HMEMap({}) {
	// const map = useMap();
	// map.setView([51.505, -0.09], map.getZoom());
	// console.log(map.getBounds());

	// // Can Change the center using the hooks
	// map.setView([53.345, -6.29], map.getZoom());
	// console.log(map.getBounds());
	// map.addEventListener();

	const map2 = useMapEvent("zoom", () => {
		console.log(map2.getBounds());
	});
	map2.setView([53.345, -6.29], map2.getZoom());
	return (
		<>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
		</>
	);
}

function LeafletMap() {
	return (
		<Box sx={{ height: "500px", width: "100%" }}>
			<MapContainer center={[51.505, -0.09]} zoom={12} scrollWheelZoom={true}>
				<HMEMap />
			</MapContainer>
		</Box>
	);
}
export default LeafletMap;
