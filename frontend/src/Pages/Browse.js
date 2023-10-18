import {
	Container,
	Divider,
	Stack,
	Typography,
	Button,
	styled,
} from "@mui/material";
import SearchAndFilters from "../components/SearchAndFilters/SearchAndFilter";
import PageTemplate from "./PageTemplate";
import ListMap from "../components/ListMapToggle/ListMap";
import LeafletMap from "../components/MapComponent/LeafletMap";
import ResultGrid from "../components/ResultsGrid/ResultsGrid";
import Pagination from "@mui/material/Pagination";
import { DEFAULT_FIELD_VALUES, SEARCH_TERM } from "../Utils/filter_constants";

import { propertyData } from "../MockData/PropertyDataSample";

import { useForm, FormProvider } from "react-hook-form";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Browse() {
	const methods = useForm({
		defaultValues: { ...DEFAULT_FIELD_VALUES },
	});

	const [filtersOpen, setFiltersOpen] = useState(false);
	const BrowsingFilterSubmitHandler = (data) => {
		methods.reset({}, { keepValues: true });
	};

	const location = useLocation();

	useEffect(() => {
		const searchParams = new URLSearchParams(location.search);
		if (searchParams.has("searchString")) {
			methods.setValue("Search Term", searchParams.get("searchString"));
		}
	}, []);

	useEffect(() => {
		console.log(methods.formState.isDirty);
	}, [methods.formState.isDirty]);
	methods.customSubmitBehavior = BrowsingFilterSubmitHandler;

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
				<LeafletMap />
			</ListMap>
			<ResultGrid propertyData={propertyData} id={"results"} />
			<Pagination
				count={10}
				boundaryCount={0}
				siblingCount={1}
				variant="outlined"
				sx={{ alignSelf: "center" }}
			/>
			<Typography width={"100%"} textAlign={"center"}>
				PAGE X of Y
			</Typography>
		</PageTemplate>
	);
}

export default Browse;
