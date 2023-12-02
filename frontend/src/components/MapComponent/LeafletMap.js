import {
	MapContainer,
	TileLayer,
	useMapEvent,
	Marker,
	Popup,
	useMap,
	useMapEvents,
	Tooltip,
} from "react-leaflet";
import Leaflet, { point, LatLng, latLngBounds, LatLngBounds } from "leaflet";

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
	IconButton,
	useTheme,
	useMediaQuery,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import SkeletonCard from "../CommonComp/Cards/SkeletonCard/SkeletonCard";
import { darkTeal } from "../../Styling/styleConstants";

import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ResultGrid from "../ResultsGrid/ResultsGrid";
import { API } from "aws-amplify";
import { useQuery } from "react-query";
import RefreshIcon from "@mui/icons-material/Refresh";
import { renderToString } from "react-dom/server";

const markerIcon = new Leaflet.Icon({
	iconUrl: require("../../Icons/mapmarkericon.png"),
	iconAnchor: [14, 28],
	popupAnchor: [0, -28],
});
const gridPointIcon = new Leaflet.Icon({
	iconUrl: require("../../Icons/GridPointIcon.png"),
	iconAnchor: [0, 0],
	popupAnchor: [0, 0],
});

function RenderPoints({
	pointsArray,
	markerClickHandler = () => {
		console.log("no click handler supplied");
	},
}) {
	return (
		<>
			{pointsArray.map((point) => {
				return (
					<Marker
						position={[point.latitude, point.longitude]}
						icon={markerIcon}
						eventHandlers={{
							click: () => {
								markerClickHandler(point.propertyId);
							},
						}}
					/>
				);
			})}
		</>
	);
}

function MultiPointMarker({
	count,
	pointsArray,
	markerClickHandler,
	zoomToBounds = () => {
		console.log("No multi marker click handler given");
	},
}) {
	const [explode, setExplode] = useState(false);

	const centX =
		pointsArray
			.map((point) => point.longitude)
			.reduce((acc, val) => acc + val, 0) / pointsArray.length;

	const centY =
		pointsArray
			.map((point) => point.latitude)
			.reduce((acc, val) => acc + val, 0) / pointsArray.length;

	const center = new LatLng(centY, centX);

	const MultiIcon = new Leaflet.DivIcon({
		className: "mapBrowsingMultiMarker",
		html: renderToString(
			<div className="mapBrowsingMultiMarker">
				<Typography
					textAlign={"center"}
					width={"100%"}
					className="mapBrowsingMultiPointTypography"
				>
					{count}
				</Typography>
			</div>
		),
	});

	return !explode ? (
		<Marker
			position={center}
			icon={MultiIcon}
			eventHandlers={{
				click: () => {
					zoomToBounds();
					setExplode(true);
				},
			}}
		/>
	) : (
		<RenderPoints
			pointsArray={pointsArray}
			markerClickHandler={markerClickHandler}
		/>
	);
}

function HMEMap({
	marks,
	points,
	setPoints,
	resetPage,
	markerClickHandler = () => {},
}) {
	const theme = useTheme();
	const down = useMediaQuery(theme.breakpoints.down("sm"));

	const FilterPoints = (points, map, setPointsState) => {
		setPointsState(
			points
				// .sort((a, b) => {
				// 	return (
				// 		map.distance([a.latitude, a.longitude], map.getCenter()) -
				// 		map.distance([b.latitude, b.longitude], map.getCenter())
				// 	);
				// })
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
			// ?.filter((_, index, arr) => {
			// 	if (arr.length < 600) {
			// 		return true;
			// 	}
			// 	return index % 60 < 30;
			// })
			// .slice(0, 600)
		);
	};

	const [renderPoints, setRenderPoints] = useState([]);

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

	const generateGrid = () => {
		const bounds = map.getBounds();
		const width = bounds._northEast.lng - bounds._southWest.lng;
		const height = bounds._northEast.lat - bounds._southWest.lat;
		const gridDivision = down ? 4 : 10;
		const gridCellWidth = width / gridDivision;
		const gridCellHeight = height / gridDivision;
		const gridStartPoint = new LatLng(
			bounds._southWest.lat,
			bounds._southWest.lng
		);

		const grid = [];
		for (let y = 0; y < gridDivision; y++) {
			const row = [];
			for (let x = 0; x < gridDivision; x++) {
				const bottomLeftLng = gridStartPoint.lng + gridCellWidth * x;
				const bottomLeftLat = gridStartPoint.lat + gridCellHeight * y;
				const topRightLng = gridStartPoint.lng + gridCellWidth * (x + 1);
				const topRightLat = gridStartPoint.lat + gridCellHeight * (y + 1);

				const bottomLeft = new LatLng(bottomLeftLat, bottomLeftLng);
				const topRight = new LatLng(topRightLat, topRightLng);
				const cellBounds = new LatLngBounds(bottomLeft, topRight);
				row.push(cellBounds);
			}
			grid.push(row);
		}
		return grid;
	};
	const grid = generateGrid();

	const CalcRenderPoints = () => {
		const grid = generateGrid();
		const renderPoints = [];
		grid.map((row) => {
			row.map((cell) => {
				const cellNorthEast = cell.getNorthEast();
				const cellSouthWest = cell.getSouthWest();

				const pointsInside = points.filter((mark) => {
					return (
						mark.latitude <= cellNorthEast.lat &&
						mark.longitude <= cellNorthEast.lng &&
						mark.latitude > cellSouthWest.lat &&
						mark.longitude > cellSouthWest.lng
					);
				});

				if (pointsInside.length > map.getZoom()) {
					renderPoints.push(
						<MultiPointMarker
							center={cell.getCenter()}
							count={pointsInside.length.toString()}
							pointsArray={pointsInside}
							markerClickHandler={markerClickHandler}
							zoomToBounds={() => {
								const lats = pointsInside.map((point) => {
									return point.latitude;
								});
								const longs = pointsInside.map((point) => {
									return point.longitude;
								});
								const minLat = Math.min(...lats);
								const minLng = Math.min(...longs);
								const maxLat = Math.max(...lats);
								const maxLng = Math.max(...longs);
								const newSouth = new Leaflet.LatLng(minLat, minLng);
								const newNorth = new Leaflet.LatLng(maxLat, maxLng);
								const newBounds = new Leaflet.LatLngBounds(newSouth, newNorth);

								map.flyToBounds(newBounds);
								resetPage();
							}}
						/>
					);
					return;
				} else {
					pointsInside.map((point) => {
						renderPoints.push(
							<Marker
								position={[point.latitude, point.longitude]}
								icon={markerIcon}
								eventHandlers={{
									click: () => {
										markerClickHandler(point.propertyId);
									},
								}}
							/>
						);
					});
					return;
				}
			});
		});
		setRenderPoints(renderPoints);
	};

	useEffect(() => {
		FilterPoints(marks, map, setPoints);
		return () => {};
	}, []);

	useEffect(() => {
		CalcRenderPoints();
	}, [points]);

	return (
		<>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				zIndex={1}
			/>
			{/* {points &&
				points.map((data, key) => {
					{
						return (
							<Marker
								position={[data.latitude, data.longitude]}
								icon={markerIcon}
								key={key}
								eventHandlers={{
									click: () => {
										console.log("marker clicked");
										markerClickHandler(data.propertyId);
									},
								}}
							/>
						);
					}
				})} */}
			{renderPoints && renderPoints.map((point) => point)}
			{/* {grid.map((row, rInd) => {
				return row.map((col, cInd) => {
					return (
						<>
							<Marker
								position={col._southWest}
								icon={gridPointIcon}
								key={rInd * cInd + "southWest"}
							/>
							<Marker
								position={col._northEast}
								icon={gridPointIcon}
								key={rInd * cInd + "northEast"}
							/>
						</>
					);
				});
			})} */}
		</>
	);
}

function LeafletMap({ propertyData, markerClickHandler = () => {} }) {
	const [points, setPoints] = useState(propertyData ? propertyData : []);
	const [searchParameters, setSearchParameters] = useSearchParams();

	const [pageNum, setPageNum] = useState(
		searchParameters.get("page") ? parseInt(searchParameters.get("page")) : 1
	);

	const listRender = points
		.map((el) => el.propertyId)
		.filter((v, ind) => {
			return ind < 9 * pageNum && ind >= 9 * (pageNum - 1);
		});

	const handlePageChange = (event, val) => {
		event.preventDefault();
		setPageNum(val);
	};

	const { isLoading, isError, isSuccess, data, error, refetch } = useQuery(
		["MapResults"],
		() => {
			return API.get("HMEBackend", `/api/properties/batch`, {
				headers: {},
				queryStringParameters: {
					ids: listRender,
				},
				response: true,
			});
		},
		{
			enabled: false,
			select: (data) => data.data,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			onSuccess: (data) => {
				console.log(data);
			},
		}
	);

	useEffect(() => {
		setPageNum(1);
	}, []);

	useEffect(() => {
		setSearchParameters((params) => {
			params.set("page", pageNum);
			return params;
		});
		refetch();
		return () => {};
	}, [pageNum]);

	const mapResetPage = () => {
		setPageNum(1);
	};

	useEffect(() => {
		refetch();
	}, [points]);

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
						<Stack direction={"row"} width={"100%"} justifyContent={"flex-end"}>
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
						<HMEMap
							marks={propertyData || []}
							points={points}
							setPoints={setPoints}
							resetPage={mapResetPage}
							markerClickHandler={markerClickHandler}
						/>
					</MapContainer>
				)}
			</Box>

			{isLoading ? (
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
				<IconButton
					onClick={() => {
						refetch();
					}}
				>
					<RefreshIcon fontSize="large" />
				</IconButton>
			) : (
				<>
					<ResultGrid id={"results"} propertyData={data} />
					{isSuccess && (
						<Pagination
							count={Math.ceil(points?.length / 9) || 10}
							boundaryCount={1}
							siblingCount={1}
							variant="outlined"
							sx={{ alignSelf: "center" }}
							page={pageNum}
							onChange={handlePageChange}
						/>
					)}
				</>
			)}
		</Stack>
	);
}
export default LeafletMap;
