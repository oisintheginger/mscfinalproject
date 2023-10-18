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
} from "../Utils/filter_constants";

import { propertyData } from "../MockData/PropertyDataSample";

function Favorites() {
	const theme = useTheme();
	const above = useMediaQuery(theme.breakpoints.up("sm"));
	const [filtersOpen, setFiltersOpen] = useState(false);
	const filterSubmit = (event) => {};
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
				{methods.formState.isSubmitted && (
					<Stack
						direction={"row"}
						flexWrap={"wrap"}
						justifyContent={"flex-start"}
						useFlexGap
						spacing={1}
					>
						{methods.formState.dirtyFields[MIN_PRICE] && (
							<ActiveTag
								tagName={MIN_PRICE}
								tagVal={methods.getValues(MIN_PRICE)}
							/>
						)}
						{methods.formState.dirtyFields[MAX_PRICE] && (
							<ActiveTag
								tagName={MAX_PRICE}
								tagVal={methods.getValues(MAX_PRICE)}
							/>
						)}
						{methods.formState.dirtyFields[BEDROOM_COUNT] && (
							<ActiveTag
								tagName={BEDROOM_COUNT}
								tagVal={methods.getValues(BEDROOM_COUNT)}
							/>
						)}
						{methods.formState.dirtyFields[BATHROOM_COUNT] && (
							<ActiveTag
								tagName={BATHROOM_COUNT}
								tagVal={methods.getValues(BATHROOM_COUNT)}
							/>
						)}
						{methods.formState.dirtyFields[SHOW_HOUSES] &&
							methods.getValues(SHOW_HOUSES) == true && (
								<ActiveTag tagName={"Houses"} />
							)}
						{methods.formState.dirtyFields[SHOW_FLAT] &&
							methods.getValues(SHOW_FLAT) == true && (
								<ActiveTag tagName={"Flats/Condos/Apartments"} />
							)}
						{methods.formState.dirtyFields[SHOW_TOWNHOUSE] &&
							methods.getValues(SHOW_TOWNHOUSE) == true && (
								<ActiveTag tagName={"Townhouse"} />
							)}
					</Stack>
				)}
			</FormProvider>
			<ResultsGrid propertyData={propertyData} displayTitle="RESULTS" />
		</PageTemplate>
	);
}

export default Favorites;
