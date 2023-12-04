import {
	Box,
	Drawer,
	SwipeableDrawer,
	Stack,
	Typography,
	Modal,
	IconButton,
	useTheme,
	useMediaQuery,
} from "@mui/material";
import LeafletMap from "./LeafletMap";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { API } from "aws-amplify";
import PropertyCard from "../CommonComp/Cards/PropertyCard/PropertyCard";
import CloseIcon from "@mui/icons-material/Close";

function MapBrowsing({ mapData }) {
	const [modalOpen, setModalOpen] = useState(false);
	const theme = useTheme();
	const up = useMediaQuery(theme.breakpoints.up("sm"));

	const [quickViewPropertyId, setQuickViewPropertyId] = useState(null);

	const { isLoading, isError, isSuccess, data, error, refetch } = useQuery(
		["map-popup", quickViewPropertyId],
		() => {
			return API.get("HMEBackend", `/api/properties/batch`, {
				headers: {},
				queryStringParameters: {
					ids: [quickViewPropertyId],
				},
				response: true,
			});
		},
		{
			enabled: false,
			select: (data) => data.data[0],
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			onSuccess: (data) => {
				console.log(data);
			},
		}
	);

	const markerClickHandler = (propertyId) => {
		if (!propertyId) return;
		setQuickViewPropertyId(propertyId.toString());
		setModalOpen(true);
	};

	useEffect(() => {
		if (quickViewPropertyId != null) {
			refetch();
		}
	}, [quickViewPropertyId]);

	const closeModal = () => {
		setModalOpen(false);
	};

	return (
		<Box maxWidth={{ xs: "90vw" }}>
			<LeafletMap
				propertyData={mapData?.data}
				markerClickHandler={markerClickHandler}
			/>
			<Modal
				open={modalOpen}
				onClose={() => {
					setModalOpen(false);
				}}
			>
				<>
					<Box
						sx={{
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
							minWidth: {
								xs: "90vw",
								sm: "40vw",
							},
						}}
					>
						<PropertyCard data={data} />
					</Box>
					<Stack
						alignItems={"center"}
						sx={{ position: "absolute", top: "0px", right: "10px" }}
					>
						<IconButton
							sx={{
								color: "primary.main",
							}}
							onClick={closeModal}
						>
							<CloseIcon fontSize="large" />
						</IconButton>
						{up && (
							<Typography variant="button" color={"white"}>
								Close
							</Typography>
						)}
					</Stack>
				</>
			</Modal>
		</Box>
	);
}
export default MapBrowsing;
