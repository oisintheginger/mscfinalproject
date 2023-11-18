import {
	Box,
	Card,
	CardContent,
	CardHeader,
	CardMedia,
	CardActionArea,
	Stack,
	Typography,
	Chip,
} from "@mui/material";

import PropertyCard from "../CommonComp/Cards/PropertyCard/PropertyCard";
import { useQuery } from "react-query";
import { API } from "aws-amplify";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SkeletonCard from "../CommonComp/Cards/SkeletonCard/SkeletonCard";
import { Popup } from "react-leaflet";

function MapPropertyPopup({ propertyId, position }) {
	const { isLoading, isError, isSuccess, data, error, refetch } = useQuery(
		["map-popup", propertyId],
		() => {
			return API.get("HMEBackend", `/api/properties/${propertyId}`, {
				headers: {},
				response: true,
			});
		},
		{ select: (data) => data.data }
	);

	return (
		<Popup position={position}>
			{isLoading || isError ? (
				<SkeletonCard />
			) : (
				<PropertyCard data={data} inPopup={true} />
			)}
		</Popup>
	);
}

export default MapPropertyPopup;
