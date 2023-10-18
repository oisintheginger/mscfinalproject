import { Box, TextField, Typography, ButtonGroup, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import { BookmarkIcon, FilterIcon } from "../../Icons/HMEIcons";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";
import ActiveTag from "../ActiveTag/ActiveTag";
import FilterFields from "../CommonComp/FilterFields/FilterFields";

import { useFormContext } from "react-hook-form";
import {
	BATHROOM_COUNT,
	BEDROOM_COUNT,
	MAX_PRICE,
	MIN_PRICE,
	SEARCH_TERM,
	SHOW_FLAT,
	SHOW_HOUSES,
	SHOW_TOWNHOUSE,
} from "../../Utils/filter_constants";

function SearchAndFilters({ secondarySubmitFunc = () => {} }) {
	const theme = useTheme();
	const above = useMediaQuery(theme.breakpoints.up("sm"));
	const methods = useFormContext();
	const [filtersOpen, setFiltersOpen] = useState(false);
	return (
		<Box sx={{ width: "100%", flexGrow: 1, height: "max-content" }}>
			<Box>
				<Grid
					container
					spacing={2}
					component={"form"}
					onSubmit={methods.handleSubmit(
						methods.customSubmitBehavior
							? methods.customSubmitBehavior
							: () => {
									console.log("NO CUSTOM SUBMIT BEHAVIOR DEFINED");
							  }
					)}
				>
					<Grid xs={12} md={8}>
						<TextField
							label="Search"
							placeholder="Enter Search Terms Here, e.g. Baltimore"
							sx={{ width: "100%", height: "fit-content" }}
							color="darkTeal"
							InputProps={{ height: "40px" }}
							{...methods.register(SEARCH_TERM, {})}
						/>
					</Grid>
					<Grid xs={12} md={4}>
						<ButtonGroup fullWidth>
							<Button
								variant="outlined"
								color="darkTeal"
								sx={{
									height: "55px",
									justifyContent: { xs: "center", sm: "start" },
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
							<Button
								variant="outlined"
								color="darkTeal"
								sx={{
									height: "55px",
									justifyContent: { xs: "center", sm: "start" },
									fontSize: 2,
								}}
								startIcon={<BookmarkIcon />}
							>
								{above && (
									<Typography variant="button" display={"block"}>
										Save Search
									</Typography>
								)}
							</Button>
						</ButtonGroup>
					</Grid>
					<Grid xs={4} md={2} height={"100%"}></Grid>
					<Grid xs={4} md={2} height={"100%"}></Grid>
				</Grid>
				<FilterFields filtersOpen={filtersOpen} />
			</Box>
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
		</Box>
	);
}

export default SearchAndFilters;
