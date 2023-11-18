import {
	Divider,
	Stack,
	Typography,
	ToggleButtonGroup,
	Box,
	Grid,
} from "@mui/material";
import SearchAndFilters from "../components/SearchAndFilters/SearchAndFilter";
import PageTemplate from "./PageTemplate";
import LeafletMap from "../components/MapComponent/LeafletMap";
import ResultGrid from "../components/ResultsGrid/ResultsGrid";
import Pagination from "@mui/material/Pagination";
import { DEFAULT_FIELD_VALUES, SEARCH_TERM } from "../Utils/filter_constants";

import { useForm, FormProvider } from "react-hook-form";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useQuery } from "react-query";
import { API } from "aws-amplify";
import SkeletonCard from "../components/CommonComp/Cards/SkeletonCard/SkeletonCard";
import ListMapToggle from "../components/ListMapToggle/ListMapToggle";
import MapBrowsing from "../components/MapComponent/MapBrowsing";

function Browse() {
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
		setSearchParameters((params) => {
			params.set("page", pageNum);
			return params;
		});
		refetch();
		return () => [];
	}, [pageNum]);

	useEffect(() => {
		if (searchParameters.has(SEARCH_TERM)) {
			methods.setValue(SEARCH_TERM, searchParameters.get(SEARCH_TERM));
		}
	}, []);

	const { isLoading, isError, isSuccess, data, error, refetch } = useQuery(
		["browsing-results", pageNum],
		() => {
			return API.get("HMEBackend", "/api/properties", {
				headers: {},
				response: true,
				queryStringParameters: {
					page: pageNum,
					size: 10,
					...methods.getValues(),
				},
			});
		},
		{
			staleTime: 30000,
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
			staleTime: 30000,
			refetchOnMount: true,
			enabled: mapEnabled,
			onSuccess: (res) => {
				setTotalPages(res.data.totalPages);
			},
		}
	);

	useEffect(() => {
		mapRefetch();
	}, searchParameters);

	return (
		<PageTemplate pageTitle="Browse" currPageBreadcrumb={"Browse"}>
			<FormProvider {...methods}>
				<SearchAndFilters
					filtersOpen={filtersOpen}
					setFiltersOpen={setFiltersOpen}
				/>
			</FormProvider>
			<Divider />
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
				<p>error:{error.request.status}</p>
			) : (
				<>
					<ResultGrid
						propertyData={data?.data.properties ? data?.data.properties : []}
						id={"results"}
					/>
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
			)}
		</PageTemplate>
	);
}

export default Browse;
