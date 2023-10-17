import FilterFields from "../components/CommonComp/FilterFields/FilterFields";
import PageTemplate from "./PageTemplate";
import { FilterIcon } from "../Icons/HMEIcons";
import { Button, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import ResultsGrid from "../components/ResultsGrid/ResultsGrid";
import { useForm, FormProvider } from "react-hook-form";

import { propertyData } from "../MockData/PropertyDataSample";

function Favorites() {
	const theme = useTheme();
	const above = useMediaQuery(theme.breakpoints.up("sm"));
	const [filtersOpen, setFiltersOpen] = useState(false);
	const filterSubmit = (event) => {};
	const methods = useForm({
		defaultValues: {
			minPrice: 0,
			maxPrice: 5000,
			bedroomCount: null,
			bathroomCount: null,
			includeHouse: true,
			includeFlatApartmentCondo: true,
			includeTownhouse: true,
		},
	});

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
				onClick={() => setFiltersOpen((prev) => !prev)}
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
