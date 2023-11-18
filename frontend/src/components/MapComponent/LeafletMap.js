import {
	MapContainer,
	TileLayer,
	useMapEvent,
	Marker,
	Popup,
	useMap,
	useMapEvents,
} from "react-leaflet";
import Leaflet, { point, LatLng } from "leaflet";

import {
	Box,
	Button,
	CardHeader,
	Container,
	Link,
	Stack,
	Typography,
	Grid,
	Pagination,
} from "@mui/material";
import SkeletonCard from "../CommonComp/Cards/SkeletonCard/SkeletonCard";
import { darkTeal } from "../../Styling/styleConstants";

import { useSearchParams } from "react-router-dom";
import PropertyCard from "../CommonComp/Cards/PropertyCard/PropertyCard";
import { useEffect, useState } from "react";
import ResultGrid from "../ResultsGrid/ResultsGrid";
import { API } from "aws-amplify";
import { useQueries } from "react-query";
import MapResultsGrid from "../MapResultsGrid/MapResultsGrid";
import MapPropertyPopup from "../MapPopup/MapPropertyPopup";

function HMEMap({ marks, points, setPoints, resetPage }) {
	const FilterPoints = (points, map, setPointsState) => {
		setPointsState(
			points
				.sort((a, b) => {
					return (
						map.distance([a.latitude, a.longitude], map.getCenter()) -
						map.distance([b.latitude, b.longitude], map.getCenter())
					);
				})
				?.filter((mark, ind, arr) => {
					if (ind < 1) return true;
					return (
						mark.propertyId !== arr[ind - 1].propertyId &&
						mark.propertyId != null
					);
				})
				?.filter((mark) => {
					return (
						mark.latitude <= map.getBounds()._northEast.lat &&
						mark.longitude <= map.getBounds()._northEast.lng &&
						mark.latitude > map.getBounds()._southWest.lat &&
						mark.longitude > map.getBounds()._southWest.lng
					);
				})
				?.filter((_, index, arr) => {
					if (arr.length < 600) {
						return true;
					}
					return index % 60 < 30;
				})
				.slice(0, 600)
		);
	};

	const map = useMapEvents({
		zoom: () => {
			resetPage();
			FilterPoints(marks, map, setPoints);
		},
		dragend: () => {
			resetPage();
			FilterPoints(marks, map, setPoints);
		},
	});

	useEffect(() => {
		FilterPoints(marks, map, setPoints);
		return () => {};
	}, []);

	return (
		<>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				zIndex={1}
			/>
			{points &&
				points.map((data, key) => {
					const markerIcon = new Leaflet.Icon({
						iconUrl: require("../../Icons/mapmarkericon.png"),
						iconAnchor: [14, 28],
						popupAnchor: [0, -28],
					});
					{
						return (
							<Marker
								position={[data.latitude, data.longitude]}
								icon={markerIcon}
								key={key}
							>
								<MapPropertyPopup
									propertyId={data.propertyId}
									position={[data.latitude, data.longitude]}
								/>
								{/* <PropertyCard data={data} inPopup={true} /> */}
							</Marker>
						);
					}
				})}
		</>
	);
}

function LeafletMap({ propertyData }) {
	const [points, setPoints] = useState([]);
	const [searchParameters, setSearchParameters] = useSearchParams();

	const [pageNum, setPageNum] = useState(
		searchParameters.get("page") ? parseInt(searchParameters.get("page")) : 1
	);

	const listRender = points.filter((v, ind) => {
		return ind < 9 * pageNum && ind >= 9 * (pageNum - 1);
	});

	const handlePageChange = (event, val) => {
		event.preventDefault();
		setPageNum(val);
	};

	// const pointQuickViews = useQueries([
	// 	...listRender?.map((point, ind) => {
	// 		return {
	// 			queryKey: ["Points", point.ind],
	// 			queryFn: () => {
	// 				return API.get(
	// 					"HMEBackend",
	// 					`/api/properties/${point.propertyId}`,
	// 					{}
	// 				);
	// 			},
	// 			enabled: false,
	// 			refetchOnWindowFocus: false,
	// 		};
	// 	}),
	// ]);

	useEffect(() => {
		setPageNum(1);
	}, []);

	useEffect(() => {
		setSearchParameters((params) => {
			params.set("page", pageNum);
			return params;
		});
		// pointQuickViews.forEach((el) => {
		// 	el.refetch();
		// });
		return () => {};
	}, [pageNum]);

	const mapResetPage = () => {
		// setPageNum(1);
	};

	// const mapResultsLoading = pointQuickViews.some((el) => {
	// 	return el.isLoading;
	// });

	return (
		<Stack spacing={3} direction={"column"}>
			<Box
				sx={{
					height: "500px",
					width: "100%",
					flexGrow: 1,
					maxHeight: "70vh",
				}}
			>
				{propertyData && (
					<MapContainer
						center={[39.2904, -76.6122]}
						zoom={12}
						scrollWheelZoom={true}
					>
						{/* <Stack direction={"row"} width={"100%"} justifyContent={"flex-end"}>
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
						</Stack> */}
						<HMEMap
							marks={propertyData || []}
							points={points}
							setPoints={setPoints}
							resetPage={mapResetPage}
						/>
					</MapContainer>
				)}
			</Box>
			{/* {!mapResultsLoading && (
				<MapResultsGrid properties={pointQuickViews.map((el) => el.data)} />
			)} */}
			{/* <Pagination
				count={Math.floor(points?.length / 9 - 1) || 10}
				boundaryCount={1}
				siblingCount={1}
				variant="outlined"
				sx={{ alignSelf: "center" }}
				page={pageNum}
				onChange={handlePageChange}
			/> */}
			{/* {isLoading ? (
				<Grid container spacing={2} width={"100%"} mt={0.5}>
					{[1, 1, 1, 1, 1, 1, 1, 1, 1].map((data, key) => {
						return (
							<Grid item xs={12} sm={6} md={4} lg={4} key={key}>
								<SkeletonCard />
							</Grid>
						);
					})}
				</Grid>
			) : isError ? (
				<p>error:{}</p>
			) : (
				<>
					<ResultGrid id={"results"} propertyData={ListData} />
					{isSuccess && (
						<Pagination
							count={totalPages - 1}
							boundaryCount={1}
							siblingCount={1}
							variant="outlined"
							sx={{ alignSelf: "center" }}
							page={pageNum}
							onChange={handlePageChange}
						/>
					)}
				</>
			)} */}
		</Stack>
	);
}
export default LeafletMap;
