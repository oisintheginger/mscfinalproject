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
import { useSearchParams } from "react-router-dom";

function Browse() {
	const methods = useForm({
		defaultValues: { ...DEFAULT_FIELD_VALUES },
	});

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
		console.log(searchParameters);
		if (searchParameters.has(SEARCH_TERM)) {
			methods.setValue(SEARCH_TERM, searchParameters.get(SEARCH_TERM));
		}
	}, []);

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
				<LeafletMap propertyData={propertyData} />
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
