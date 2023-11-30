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

function MapPropertyPopup({ propertyId, position, openDrawerHandler }) {
	return (
		<Popup
			position={position}
			eventHandlers={{
				mousedown: () => {
					// console.log("clicked popup");
				},
			}}
		/>
	);
}

export default MapPropertyPopup;
