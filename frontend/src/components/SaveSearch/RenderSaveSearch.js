import {
	Pagination,
	Box,
	Stack,
	Slide,
	Snackbar,
	useTheme,
	useMediaQuery,
	Divider,
} from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { Typography } from "@mui/material";
import { useQueryClient } from "react-query";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { SearchCard } from "../SearchCard/SearchCard";
import { useSearchParams } from "react-router-dom";
import LoadingSpinner from "../CommonComp/LoadingSpinner/LoadingSpinner";
import { DeleteHandlerConstructor } from "../../Utils/Mutations/SearchMutation/SearchMutation";
import SnackbarAlertMap from "../../Utils/AlertMap";

export default function RenderSaveSearch({
	savedSearchesData = null,
	savedSearchesRefetch,
	savedSearchesIsLoading = false,
	savedSearchesIsError = false,
	savedSearchesError = false,
}) {
	const { user } = useAuthenticator((context) => [context.user]);
	const resultsRef = useRef(null);
	const [searchParameters, setSearchParameters] = useSearchParams();
	const theme = useTheme();
	const down = useMediaQuery(theme.breakpoints.down("md"));
	const downPagination = useMediaQuery(theme.breakpoints.down("sm"));

	const [snackbarAlertOpen, setSnackbarAlertOpen] = useState(false);
	const [alert, setAlert] = useState(<></>);
	const handleSnackbarClose = () => {
		setSnackbarAlertOpen(false);
	};

	const navigator = useNavigate();
	const [pageNum, setPageNum] = useState(
		searchParameters.get("page") ? parseInt(searchParameters.get("page")) : 1
	);
	const queryClient = useQueryClient();

	const parseSearchString = (searchString) => {
		// Replacing %2B or space encoded as %20 back to the actual plus sign or space for URLSearchParams
		const correctedString = searchString
			.replace(/%2B/g, "+")
			.replace(/%20/g, " ");
		const params = new URLSearchParams(correctedString);
		const search = params.get("searchString") || "";
		const minPrice = params.get("Min Price") || "";
		const maxPrice = params.get("Max Price") || "";
		return { search, minPrice, maxPrice };
	};

	const successDeleteSearch = () => {
		setAlert(SnackbarAlertMap.delete_search);
		setSnackbarAlertOpen(true);
	};
	const errorDeleteSearch = () => {
		setAlert(SnackbarAlertMap.error_delete_search);
		setSnackbarAlertOpen(true);
	};

	const handleDelete = DeleteHandlerConstructor({
		successCallback: () => {
			successDeleteSearch();
			savedSearchesRefetch();
		},
		errorCallback: () => {
			errorDeleteSearch();
		},
	});

	//Pagination
	const itemsPerPage = 6;
	const handleChangePage = (event, newPage) => {
		setPageNum(newPage);
	};

	const paginatedSearches = savedSearchesData?.slice(
		((pageNum || 1) - 1) * itemsPerPage,
		(pageNum || 1) * itemsPerPage
	);

	useEffect(() => {
		if (searchParameters.get("page") != null) return;
		setSearchParameters((params) => {
			params.set("page", pageNum || 1);
			return params;
		});
		savedSearchesRefetch();
		return () => {};
	}, []);

	useEffect(() => {
		if (searchParameters.get("page") != pageNum && pageNum) {
			setSearchParameters((params) => {
				params.set("page", pageNum);
				return params;
			});
			savedSearchesRefetch();
		}
		return () => {};
	}, [pageNum]);

	useEffect(() => {
		setPageNum(parseInt(searchParameters.get("page")));
		savedSearchesRefetch();
	}, [searchParameters]);

	useEffect(() => {
		if (Math.ceil(savedSearchesData?.length / itemsPerPage) < pageNum) {
			setPageNum(Math.ceil(savedSearchesData?.length / itemsPerPage));
		}
	}, [savedSearchesData]);

	return (
		<>
			<Divider ref={resultsRef} />
			<Box minHeight={"55vh"}>
				{savedSearchesIsLoading ? (
					<LoadingSpinner />
				) : savedSearchesIsError ? (
					<>error</>
				) : savedSearchesData?.length > 0 ? (
					<>
						<Box minHeight={"60vh"}>
							<Stack>
								{paginatedSearches?.map((el, ind) => {
									const { search, minPrice, maxPrice } = parseSearchString(
										el.search
									);

									return (
										<SearchCard
											search={search}
											minPrice={minPrice}
											maxPrice={maxPrice}
											key={ind}
											totalSearch={el.search}
											handleDelete={handleDelete}
											savedSearchRefresh={(data) => {
												// console.log(data);
												savedSearchesRefetch();
												queryClient.invalidateQueries("userSearches");
											}}
										/>
									);
								})}
							</Stack>
						</Box>
						<Box
							display={"flex"}
							justifyContent={"center"}
							alignItems={"center"}
						>
							<Pagination
								count={Math.ceil(savedSearchesData?.length / itemsPerPage)}
								boundaryCount={1}
								siblingCount={downPagination ? 1 : 3}
								page={pageNum}
								onChange={(event, val) => {
									resultsRef.current?.scrollIntoView();
									handleChangePage(event, val);
								}}
								variant="outlined"
								size={downPagination ? "small" : "medium"}
							/>
						</Box>
					</>
				) : (
					<Typography textAlign={"center"}>
						No Saved Searches. Start Browsing!
					</Typography>
				)}
			</Box>
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
		</>
	);
}
