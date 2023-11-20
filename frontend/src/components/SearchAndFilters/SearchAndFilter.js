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
import { SEARCH_TERM } from "../../Utils/filter_constants";
import ActiveTagsStack from "../ActiveTag/ActiveTagsStack";
import { useMutation } from "react-query";
import { API } from "aws-amplify";

function SearchAndFilters({ filtersOpen = false, setFiltersOpen = () => {} }) {
	const theme = useTheme();
	const above = useMediaQuery(theme.breakpoints.up("sm"));
	const methods = useFormContext();
	

	// Adding Save Search Functionality

	function getEditedURL() {
		const url = window.location.href;
		const [baseUrl, queryString] = url.split('?');
	
		if (!queryString) {
			return url;
		}
		const params = queryString.split('&').filter(param => !param.startsWith('page=1'));
		const newQueryString = params.join('&');
		return `${baseUrl}?${newQueryString}`;
	}; // function to remove page=1&
	
	const handleSaveSearch = async () => {
		try {
			const editedUrl = getEditedURL();
			console.log("Edited URL:", editedUrl);
			alert("Search saved!");
	
		} catch (error) {
			console.error("Error saving search:", error);
			alert("Search save unsuccessful.");
		}
	};
	
	

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
								onClick={(event) => {
									if (filtersOpen) {
										methods.handleSubmit(
											methods.customSubmitBehavior
												? methods.customSubmitBehavior
												: () => {
														console.log("NO CUSTOM SUBMIT BEHAVIOR DEFINED");
												  }
										)(event);
									}
									setFiltersOpen((prev) => !prev);
								}}
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
								onClick={handleSaveSearch}
							>
								{above && (
									<Typography variant="button" display={"block"}>
										Save Search
									</Typography>
								)}
							</Button>
						</ButtonGroup>
					</Grid>
				</Grid>
				<FilterFields
					filtersOpen={filtersOpen}
					setFiltersOpen={setFiltersOpen}
				/>
			</Box>
			<ActiveTagsStack filtersOpen={filtersOpen} />
		</Box>
	);
}

export default SearchAndFilters;
