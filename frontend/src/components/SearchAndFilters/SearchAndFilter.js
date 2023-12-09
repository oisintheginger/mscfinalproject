import {
	Box,
	TextField,
	Typography,
	ButtonGroup,
	Snackbar,
	Slide,
	Tooltip,
	InputAdornment,
	IconButton,
} from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import { BookmarkIcon, FilterIcon } from "../../Icons/HMEIcons";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useContext, useEffect, useState } from "react";
import FilterFields from "../CommonComp/FilterFields/FilterFields";

import { useFormContext } from "react-hook-form";
import { SEARCH_TERM } from "../../Utils/filter_constants";
import ActiveTagsStack from "../ActiveTag/ActiveTagsStack";
import { useMutation } from "react-query";
import { API } from "@aws-amplify/api";
import { UserContext } from "../../Utils/UserContext/UserContext";
import SnackbarAlertMap from "../../Utils/AlertMap";
import { useSearchParams } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { MIN_PRICE } from "./../../Utils/filter_constants";

function SearchAndFilters({ filtersOpen = false, setFiltersOpen = () => {} }) {
	const theme = useTheme();
	const above = useMediaQuery(theme.breakpoints.up("sm"));
	const down = useMediaQuery(theme.breakpoints.down("md"));

	const { route } = useContext(UserContext);
	const [searchParameters, setSearchParameters] = useSearchParams();

	const [saveSearchEnabled, setSaveSearchEnabled] = useState(false);

	const [snackbarAlertOpen, setSnackbarAlertOpen] = useState(false);
	const [alert, setAlert] = useState(<></>);
	const handleSnackbarClose = () => {
		setSnackbarAlertOpen(false);
	};

	const methods = useFormContext();

	const { getAccessToken } = useContext(UserContext);

	const postSaveSearch = async (queryParams) => {
		const token = await getAccessToken();
		const searchData = queryParams;
		return await API.post("HMEBackend", `/api/user/new/s`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			response: true,
			queryStringParameters: {
				searchString: searchData,
			},
		});
	};

	const successSaveSearch = () => {
		setAlert(SnackbarAlertMap.save_search);
		setSnackbarAlertOpen(true);
	};
	const errorSaveSearch = () => {
		if (route != "authenticated") {
			setAlert(SnackbarAlertMap.error_not_logged_in_search);
			setSnackbarAlertOpen(true);
			return;
		}
		setAlert(SnackbarAlertMap.error_save_search);
		setSnackbarAlertOpen(true);
	};

	const saveSearchMutation = useMutation(postSaveSearch, {
		onSuccess: () => {
			successSaveSearch();
			// alert("Search saved!");
		},
		onError: (error) => {
			console.error("Error saving search:", error);
			errorSaveSearch();
			// alert("UNSUCCESSFUL");
		},
	});

	function getEditedURL() {
		const url = window.location.href;
		const [baseUrl, queryString] = url.split("?");

		if (!queryString) {
			return url;
		}
		const params = queryString
			.split("&")
			.filter((param) => !param.startsWith("page=1"));
		const newQueryString = params.join("&");
		return `${newQueryString}`;
	} // function to remove page=1&

	const handleSaveSearch = () => {
		try {
			const editedUrl = getEditedURL();
			const queryParams = new URLSearchParams(editedUrl).toString(); // Convert to a query string
			saveSearchMutation.mutate(queryParams);
		} catch (error) {
			console.error("Error preparing search data:", error);
		}
	};

	useEffect(() => {
		if (searchParameters.get(MIN_PRICE) == null || route !== "authenticated") {
			setSaveSearchEnabled(false);
		} else {
			setSaveSearchEnabled(true);
		}
	}, [searchParameters, route]);

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
									// console.log("NO CUSTOM SUBMIT BEHAVIOR DEFINED");
							  }
					)}
				>
					<Grid xs={12} md={8}>
						<TextField
							label="Search"
							placeholder="Enter Search Terms Here, e.g. Baltimore"
							sx={{ width: "100%", height: "fit-content" }}
							color="darkTeal"
							InputProps={{
								height: "40px",
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											aria-label="Search Button"
											onClick={(event) => {
												methods.handleSubmit(
													methods.customSubmitBehavior
														? methods.customSubmitBehavior
														: () => {
																// console.log(
																// 	"NO CUSTOM SUBMIT BEHAVIOR DEFINED"
																// );
														  }
												)(event);
											}}
										>
											<SearchIcon fontSize="large" />
										</IconButton>
									</InputAdornment>
								),
							}}
							{...methods.register(SEARCH_TERM, {})}
						/>
					</Grid>
					<Grid xs={12} md={4}>
						<ButtonGroup fullWidth>
							<Tooltip title={"Open and Edit Search Filters"}>
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
															// console.log("NO CUSTOM SUBMIT BEHAVIOR DEFINED");
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
							</Tooltip>
							<Tooltip title={"Save Search for Browsing Later"}>
								<Button
									variant="outlined"
									color="darkTeal"
									sx={{
										height: "55px",
										justifyContent: { xs: "center", sm: "start" },
										fontSize: 2,
										"&:disabled": {
											color: "#bfbfbf",
											backgroundColor: "#e6e6e6",
										},
									}}
									disabled={!saveSearchEnabled}
									startIcon={<BookmarkIcon />}
									onClick={handleSaveSearch}
								>
									{above && (
										<Typography
											variant="button"
											display={"block"}
											sx={
												!saveSearchEnabled && {
													color: "#bfbfbf",
												}
											}
										>
											Save Search
										</Typography>
									)}
								</Button>
							</Tooltip>
						</ButtonGroup>
					</Grid>
				</Grid>
				<FilterFields
					filtersOpen={filtersOpen}
					setFiltersOpen={setFiltersOpen}
				/>
			</Box>
			<ActiveTagsStack filtersOpen={filtersOpen} />
			<Snackbar
				open={snackbarAlertOpen}
				autoHideDuration={3000}
				onClose={handleSnackbarClose}
				TransitionComponent={Slide}
				anchorOrigin={{
					vertical: down ? "top" : "bottom",
					horizontal: "center",
				}}
			>
				{alert}
			</Snackbar>
		</Box>
	);
}

export default SearchAndFilters;
