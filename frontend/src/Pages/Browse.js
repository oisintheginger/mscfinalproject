import {
	Container,
	Divider,
	Stack,
	Typography,
	Button,
	styled,
	Box,
} from "@mui/material";
import SearchAndFilters from "../components/SearchAndFilters/SearchAndFilter";
import PageTemplate from "./PageTemplate";
import ListMap from "../components/ListMapToggle/ListMap";
import LeafletMap from "../components/MapComponent/LeafletMap";
import ResultGrid from "../components/ResultsGrid/ResultsGrid";
import Pagination from "@mui/material/Pagination";
import { DEFAULT_FIELD_VALUES, SEARCH_TERM } from "../Utils/filter_constants";

import CircularProgress from "@mui/material/CircularProgress";

import { useForm, FormProvider } from "react-hook-form";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useQuery } from "react-query";
import { API } from "aws-amplify";
import LoadingSpinner from "../components/CommonComp/LoadingSpinner/LoadingSpinner";

function Browse() {
	const methods = useForm({
		defaultValues: { ...DEFAULT_FIELD_VALUES },
	});

	const [pageNum, setPageNum] = useState(1);

	useEffect(() => {
		setSearchParameters((params) => {
			params.set("page", pageNum);
			return params;
		});
		return () => {};
	}, [pageNum]);

	const [filtersOpen, setFiltersOpen] = useState(false);
	const BrowsingFilterSubmitHandler = (data) => {
		Object.keys(data).forEach((key) => {
			setSearchParameters((params) => {
				params.set(key, methods.getValues(key));
				return params;
			});
		});
		methods.reset({}, { keepValues: true });
	};

	const [searchParameters, setSearchParameters] = useSearchParams();

	useEffect(() => {
		if (searchParameters.has(SEARCH_TERM)) {
			methods.setValue(SEARCH_TERM, searchParameters.get(SEARCH_TERM));
		}
	}, []);

	methods.customSubmitBehavior = BrowsingFilterSubmitHandler;

	const [propertyResults, setPropertyResults] = useState([]);

	const { isLoading, isError, data, error } = useQuery(
		["browsing-results", pageNum],
		() => {
			return API.get("HMEBackend", "/api/properties", {
				headers: {},
				response: true,
				queryStringParameters: {
					page: pageNum,
					size: 10,
				},
			});
		},
		{ staleTime: 30000, refetchOnMount: true }
	);

	const handlePageChange = (event, val) => {
		event.preventDefault();
		setPageNum(val);
	};

	return (
		<PageTemplate pageTitle="Browse" currPageBreadcrumb={"Browse"}>
			<FormProvider {...methods}>
				<SearchAndFilters
					filtersOpen={filtersOpen}
					setFiltersOpen={setFiltersOpen}
				/>
			</FormProvider>
			<Divider />
			<ListMap>
				<LeafletMap propertyData={data?.data} />
			</ListMap>
			{isLoading ? (
				<LoadingSpinner />
			) : isError ? (
				<p>error:{error.request.status}</p>
			) : (
				<ResultGrid propertyData={data?.data} id={"results"} />
			)}
			<Pagination
				count={10}
				boundaryCount={1}
				siblingCount={1}
				variant="outlined"
				sx={{ alignSelf: "center" }}
				page={pageNum}
				onChange={handlePageChange}
			/>
		</PageTemplate>
	);
}

export default Browse;
