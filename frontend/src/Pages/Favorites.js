import FilterFields from "../components/CommonComp/FilterFields/FilterFields";
import PageTemplate from "./PageTemplate";
import { FilterIcon } from "../Icons/HMEIcons";
import { Button, Typography, Stack } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import ResultsGrid from "../components/ResultsGrid/ResultsGrid";
import ActiveTag from "../components/ActiveTag/ActiveTag";
import { useForm, FormProvider } from "react-hook-form";
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

function Favorites() {
	const theme = useTheme();
	const above = useMediaQuery(theme.breakpoints.up("sm"));
	const [filtersOpen, setFiltersOpen] = useState(false);
	const filterSubmit = (event) => {
		console.log(event);
	};
	const methods = useForm({
		defaultValues: { ...DEFAULT_FIELD_VALUES },
	});

	methods.customSubmitBehavior = filterSubmit;

	return (
		<PageTemplate pageTitle="My Favorites" currPageBreadcrumb={"My Favorites"}>
			<Button
				variant="outlined"
				color="darkTeal"
				sx={{
					height: "55px",
					justifyContent: { xs: "center", sm: "start" },
					maxWidth: { xs: "100%", sm: "100%", md: "30%" },
				}}
				startIcon={<FilterIcon />}
				onClick={(event) => {
					setFiltersOpen((prev) => !prev);
					methods.handleSubmit(
						methods.customSubmitBehavior
							? methods.customSubmitBehavior
							: () => {
									console.log("NO CUSTOM SUBMIT BEHAVIOR DEFINED");
							  }
					)(event);
				}}
			>
				{above && (
					<Typography variant="button" display={"block"}>
						Filter
					</Typography>
				)}
			</Button>
			<FormProvider {...methods}>
				<FilterFields filtersOpen={filtersOpen} />
			</FormProvider>
			<ResultsGrid propertyData={propertyData} displayTitle="RESULTS" />
		</PageTemplate>
	);
}

export default Favorites;
