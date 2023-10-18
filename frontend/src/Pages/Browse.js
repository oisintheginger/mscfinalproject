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
import {
	MIN_PRICE,
	MAX_PRICE,
	BEDROOM_COUNT,
	BATHROOM_COUNT,
	SHOW_FLAT,
	SHOW_HOUSES,
	SHOW_TOWNHOUSE,
	DEFAULT_FIELD_VALUES,
} from "../Utils/filter_constants";

import { propertyData } from "../MockData/PropertyDataSample";

import { useForm, FormProvider } from "react-hook-form";
import { useEffect, useState } from "react";

function Browse() {
	const methods = useForm({
		defaultValues: { ...DEFAULT_FIELD_VALUES },
	});

	const [filtersOpen, setFiltersOpen] = useState(false);
	const BrowsingFilterSubmitHandler = (data) => {
		methods.reset({}, { keepValues: true });
	};
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
