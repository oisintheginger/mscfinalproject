import * as React from "react";
import Paper from "@mui/material/Paper";
import { Pagination, Box, ButtonBase, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Grid, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useQuery, useQueryClient } from "react-query";
import { API } from "aws-amplify";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { SearchCard } from "../SearchCard/SearchCard";
import { useSearchParams } from "react-router-dom";
import LoadingSpinner from "../CommonComp/LoadingSpinner/LoadingSpinner";

export default function RenderSaveSearch({
	savedSearchesData = null,
	savedSearchesRefetch = () => {},
	savedSearchesIsLoading = false,
	savedSearchesIsError = false,
	savedSearchesError = false,
}) {
	const { user } = useAuthenticator((context) => [context.user]);
	const [searchParameters, setSearchParameters] = useSearchParams();

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

	// const fetchSearchData = async () => {
	// 	const token =
	// 		user?.getSignInUserSession().getAccessToken().jwtToken || null;
	// 	if (!token) throw new Error("Authentication token not available");

	// 	const response = await API.get("HMEBackend", "/api/user/s", {
	// 		headers: { Authorization: `Bearer ${token}` },
	// 	});
	// 	return response;
	// };

	// const {
	// 	data: searchData,
	// 	isLoading,
	// 	isError,
	// 	error,
	// } = useQuery("userSearch", fetchSearchData);

	// if (isLoading) return <div>Loading...</div>;
	// if (isError) return <div>An error has occurred: {error.message}</div>;
	// if (searchData?.length === 0) {
	// 	return <div>You have no saved searches</div>; //If search data empty
	// }

	//Deletion
	const handleDelete = async (searchString) => {
		const token =
			user?.getSignInUserSession().getAccessToken().jwtToken || null;
		if (!token) {
			console.error("Authentication token not available.");
			return;
		}

		try {
			await API.del("HMEBackend", "/api/user/remove/s", {
				headers: { Authorization: `Bearer ${token}` },
				response: true,
				queryStringParameters: {
					searchString,
				},
			});
			// After deletion, refetch the search data

			queryClient.invalidateQueries("userSearch");
			alert("Successfully deleted");
		} catch (error) {
			console.error("Failed to delete:", error);
			alert("UNSUCCESSFUL DELETION");
		}
	};

	//Pagination
	const itemsPerPage = 5;
	const handleChangePage = (event, newPage) => {
		setPageNum(newPage);
	};

	const paginatedSearches = savedSearchesData?.slice(
		(pageNum - 1) * itemsPerPage,
		pageNum * itemsPerPage
	);

	useEffect(() => {
		if (searchParameters.get("page") != null) return;
		setSearchParameters((params) => {
			params.set("page", pageNum);
			return params;
		});
		savedSearchesRefetch();
		return () => {};
	}, []);

	useEffect(() => {
		setSearchParameters((params) => {
			params.set("page", pageNum);
			return params;
		});
		savedSearchesRefetch();
		return () => {};
	}, [pageNum]);

	useEffect(() => {
		setPageNum(parseInt(searchParameters.get("page")));
		savedSearchesRefetch();
	}, [searchParameters]);

	return (
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
											console.log(data);
											savedSearchesRefetch();
											queryClient.invalidateQueries("userSearches");
										}}
									/>
								);
							})}
						</Stack>
					</Box>
					<Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
						<Pagination
							count={Math.ceil(savedSearchesData?.length / itemsPerPage)}
							page={pageNum}
							onChange={handleChangePage}
							variant="outlined"
						/>
					</Box>
				</>
			) : (
				<Typography textAlign={"center"}>
					No Saved Searches. Start Browsing!
				</Typography>
			)}
			{/* <div>
				{currentData?.map((item, index) => {
					const { search, minPrice, maxPrice } = parseSearchString(item.search);
					// clickable card
					const navigateToSearch = () => {
						// Construct the search query using item properties
						const searchParams = new URLSearchParams({
							searchString: search,
							"Min Price": minPrice,
							"Max Price": maxPrice,
						});
						const searchString = searchParams.toString();

						navigator(`/browse?${searchString}`);
					};
					return (
						<ButtonBase
							component="div"
							sx={{ width: "100%" }}
							onClick={navigateToSearch}
							key={index}
						>
							<Paper
								elevation={2}
								sx={{
									width: "100%",
									border: 1,
									borderColor: "divider",
									p: 2,
									my: 1,
								}}
								key={index}
							>
								<Grid container spacing={2} alignItems="center">
									<Grid item xs={3}>
										<Typography
											variant="h6"
											sx={{ cursor: "pointer" }}
											onClick={() => navigator("/browse")}
										>
											{search}
										</Typography>
									</Grid>
									<Grid item xs={3}>
										<Typography>Min Price: {minPrice}</Typography>
									</Grid>
									<Grid item xs={3}>
										<Typography>Max Price: {maxPrice}</Typography>
									</Grid>
									<Grid item xs={3} justifyContent={"flex-end"}>
										<IconButton
											onClick={(event) => {
												event.stopPropagation(); // Prevents the ButtonBase onClick from being triggered
												handleDelete(item.search);
											}}
										>
											<DeleteIcon />
										</IconButton>
									</Grid>
								</Grid>
							</Paper>
						</ButtonBase>
					);
				})}
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						width: "100%",
						mt: 2,
					}}
				>
					<Pagination
						count={Math.ceil(searchData?.length / itemsPerPage)}
						page={currentPage}
						onChange={handleChangePage}
						color="primary"
					/>
				</Box>
			</div> */}
		</Box>
	);
}
