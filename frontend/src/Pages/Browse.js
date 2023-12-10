import { Box, Divider, Grid, Typography, useMediaQuery } from "@mui/material";
import SearchAndFilters from "../components/SearchAndFilters/SearchAndFilter";
import PageTemplate from "./PageTemplate";
import ResultGrid from "../components/ResultsGrid/ResultsGrid";
import Pagination from "@mui/material/Pagination";
import {
	BATHROOM_COUNT,
	BEDROOM_COUNT,
	DEFAULT_FIELD_VALUES,
	MAX_PRICE,
	MIN_PRICE,
	SEARCH_TERM,
} from "../Utils/filter_constants";

import { useForm, FormProvider } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useQuery } from "react-query";
import { API } from "@aws-amplify/api";
import SkeletonCard from "../components/CommonComp/Cards/SkeletonCard/SkeletonCard";
import ListMapToggle from "../components/ListMapToggle/ListMapToggle";
import MapBrowsing from "../components/MapComponent/MapBrowsing";
import { useTheme } from "@emotion/react";

function Browse() {
	const theme = useTheme();
	const down = useMediaQuery(theme.breakpoints.down("sm"));
	const resultsGridRef = useRef(null);

	const methods = useForm({
		defaultValues: { ...DEFAULT_FIELD_VALUES },
	});

	const [searchParameters, setSearchParameters] = useSearchParams();
	const [pageNum, setPageNum] = useState(
		searchParameters.get("page") ? parseInt(searchParameters.get("page")) : 1
	);

	const [totalPages, setTotalPages] = useState(10);

	const [filtersOpen, setFiltersOpen] = useState(false);

	useEffect(() => {
		if (searchParameters.has(SEARCH_TERM)) {
			methods.setValue(SEARCH_TERM, searchParameters.get(SEARCH_TERM));
		}
		if (searchParameters.has(MIN_PRICE)) {
			methods.setValue(MIN_PRICE, parseInt(searchParameters.get(MIN_PRICE)));
		}
		if (searchParameters.has(MAX_PRICE)) {
			methods.setValue(MAX_PRICE, parseInt(searchParameters.get(MAX_PRICE)));
		}
		if (searchParameters.has(BEDROOM_COUNT)) {
			methods.setValue(
				BEDROOM_COUNT,
				parseInt(searchParameters.get(BEDROOM_COUNT))
			);
		}
		if (searchParameters.has(BATHROOM_COUNT)) {
			methods.setValue(
				BATHROOM_COUNT,
				parseInt(searchParameters.get(BATHROOM_COUNT))
			);
		}
	}, []);

	const { isLoading, isError, isSuccess, data, error, refetch } = useQuery(
		["browsing-results", searchParameters.toString()],
		() => {
			return API.get("HMEBackend", "/api/properties", {
				headers: {},
				response: true,
				queryStringParameters: {
					page: pageNum,
					size: 9,
					...methods.getValues(),
				},
			});
		},
		{
			staleTime: 0,
			refetchOnMount: true,
			onSuccess: (res) => {
				setTotalPages(res.data.totalPages);
			},
		}
	);

	const handlePageChange = (event, val) => {
		event.preventDefault();
		setPageNum(val);
	};

	const BrowsingFilterSubmitHandler = (formdata) => {
		setSearchParameters((params) => {
			Object.keys(formdata).forEach((key) => {
				params.set(key, methods.getValues(key));
			});
			return params;
		});
		setSearchParameters((params) => {
			setPageNum(1);
			return params;
		});
		methods.reset({}, { keepValues: true });
		refetch();
	};

	methods.customSubmitBehavior = BrowsingFilterSubmitHandler;

	const [mapEnabled, setMapEnabled] = useState(false);

	const {
		isLoading: mapIsLoading,
		isError: mapIsError,
		isSuccess: mapIsSuccess,
		data: mapData,
		error: mapError,
		refetch: mapRefetch,
	} = useQuery(
		["mapResults"],
		() => {
			return API.get("HMEBackend", "/api/properties/locations", {
				headers: {},
				response: true,
				queryStringParameters: {
					...methods.getValues(),
				},
			});
		},
		{
			staleTime: 0,
			refetchOnMount: true,
			enabled: mapEnabled,
			onSuccess: (res) => {
				setTotalPages(res.data.totalPages);
			},
		}
	);

	useEffect(() => {
		mapRefetch();
	}, [searchParameters]);

	useEffect(() => {
		if (searchParameters.get("page") != null) return;
		setSearchParameters((params) => {
			params.set("page", pageNum);
			return params;
		});
	}, []);

	useEffect(() => {
		if (searchParameters.get("page") != pageNum) {
			setSearchParameters((params) => {
				params.set("page", pageNum || 1);
				return params;
			});
		}
		refetch();
	}, [pageNum, searchParameters]);

	useEffect(() => {
		setPageNum(parseInt(searchParameters.get("page")));
		refetch();
	}, [searchParameters]);

	return (
		<>
			<PageTemplate pageTitle="Browse" currPageBreadcrumb={"Browse"}>
				<FormProvider {...methods}>
					<SearchAndFilters
						filtersOpen={filtersOpen}
						setFiltersOpen={setFiltersOpen}
					/>
				</FormProvider>
				<Divider ref={resultsGridRef} />
				<ListMapToggle setMapEnabled={setMapEnabled} mapEnabled={mapEnabled} />

				{mapEnabled ? (
					<MapBrowsing
						mapData={mapData}
						refetch={mapRefetch}
						mapIsLoading={mapIsLoading}
						mapIsSuccess={mapIsSuccess}
						mapIsError={mapIsError}
						mapError={mapError}
					/>
				) : isLoading ? (
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
					<Box
						display={"flex"}
						flexDirection={"column"}
						alignItems={"center"}
						minHeight={"50vh"}
						justifyContent={"center"}
					>
						<Typography
							textAlign={"center"}
							variant="systemState"
							color={"#414c4d"}
						>
							Looks like we are having server trouble.
						</Typography>
						<Typography
							textAlign={"center"}
							variant="systemState"
							color={"#414c4d"}
						>
							Try refresh the page, or check back later.
						</Typography>
					</Box>
				) : (
					isSuccess &&
					(data?.data.properties.length > 0 ? (
						<>
							<ResultGrid
								propertyData={
									data?.data.properties ? data?.data.properties : []
								}
								displayTitle="Rentals in this Area"
								id={"results"}
							/>
							<Pagination
								count={totalPages - 1 || 10}
								boundaryCount={1}
								siblingCount={down ? 1 : 3}
								variant="outlined"
								sx={{ alignSelf: "center" }}
								page={pageNum}
								onChange={(event, val) => {
									resultsGridRef.current?.scrollIntoView();
									handlePageChange(event, val);
								}}
								size={down ? "small" : "medium"}
							/>
						</>
					) : (
						<Box
							display={"flex"}
							flexDirection={"column"}
							alignItems={"center"}
							minHeight={"50vh"}
							justifyContent={"center"}
						>
							<Typography
								textAlign={"center"}
								variant="systemState"
								color={"#414c4d"}
							>
								Looks like there are no properties that match your criteria.
							</Typography>
							<Typography
								textAlign={"center"}
								variant="systemState"
								color={"#414c4d"}
							>
								Try broaden your search for more results!
							</Typography>
						</Box>
					))
				)}
			</PageTemplate>
		</>
	);
}

export default Browse;
