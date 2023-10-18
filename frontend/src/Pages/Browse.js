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
} from "../Utils/filter_constants";

import { propertyData } from "../MockData/PropertyDataSample";

import { useForm, FormProvider } from "react-hook-form";
import { useState } from "react";

function Browse() {
	const methods = useForm({
		defaultValues: {
			[`${MIN_PRICE}`]: 1,
			[`${MAX_PRICE}`]: 10000,
			[`${BEDROOM_COUNT}`]: null,
			[`${BATHROOM_COUNT}`]: null,
			[`${SHOW_FLAT}`]: null,
			[`${SHOW_HOUSES}`]: null,
			[`${SHOW_TOWNHOUSE}`]: null,
		},
	});

	const BrowsingFilterSubmitHandler = (data) => {
		console.log(data);
	};

	methods.customSubmitBehavior = BrowsingFilterSubmitHandler;

	return (
		<PageTemplate pageTitle="Browse" currPageBreadcrumb={"Browse"}>
			<FormProvider {...methods}>
				<SearchAndFilters secondarySubmitFunc={BrowsingFilterSubmitHandler} />
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
