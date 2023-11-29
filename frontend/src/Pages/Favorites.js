import FilterFields from "../components/CommonComp/FilterFields/FilterFields";
import PageTemplate from "./PageTemplate";
import { FilterIcon } from "../Icons/HMEIcons";
import {
	Button,
	Typography,
	Stack,
	Box,
	Divider,
	Pagination,
	Grid,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import ResultsGrid from "../components/ResultsGrid/ResultsGrid";
import { useForm, FormProvider } from "react-hook-form";
import { DEFAULT_FAVORITE_FILTER_VALUES } from "../Utils/filter_constants";
import { API } from "aws-amplify";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useQuery } from "react-query";
import { useSearchParams, useLocation } from "react-router-dom";
import { useEffect, useContext } from "react";
import { UserContext } from "../Utils/UserContext/UserContext";
import SkeletonCard from "../components/CommonComp/Cards/SkeletonCard/SkeletonCard";
import PropertyCard from "../components/CommonComp/Cards/PropertyCard/PropertyCard";
import { FetchFavoritesHook } from "../Utils/DataFetching/FetchFavoritesHook";

function Favorites() {
	const theme = useTheme();
	const down = useMediaQuery(theme.breakpoints.down("sm"));
	// const [filtersOpen, setFiltersOpen] = useState(false);
	const [searchParameters, setSearchParameters] = useSearchParams();

	const [pageNum, setPageNum] = useState(
		searchParameters.get("page") ? parseInt(searchParameters.get("page")) : 1
	);
	const handlePageChange = (event, val) => {
		event.preventDefault();
		setPageNum(val);
	};

	const location = useLocation();
	const [initialBreadcrumbLocation, setInitialBreadcrumbLocation] =
		useState(null);

	// const methods = useForm({
	// 	defaultValues: { ...DEFAULT_FAVORITE_FILTER_VALUES },
	// });
	// const filterSubmit = (formdata) => {
	// 	setSearchParameters((params) => {
	// 		Object.keys(formdata).forEach((key) => {
	// 			params.set(key, methods.getValues(key));
	// 		});
	// 		return params;
	// 	});
	// 	methods.reset({}, { keepValues: true });
	// 	refetch();
	// };

	const { detailsData, isError, isLoading, refetch } = FetchFavoritesHook();

	useEffect(() => {
		setInitialBreadcrumbLocation(
			location.state?.previousUrl ? location.state.previousUrl : null
		);
	}, []);

	useEffect(() => {
		if (searchParameters.get("page") != null) {
			return;
		}
		setSearchParameters((params) => {
			params.set("page", pageNum);
			return params;
		});
		refetch();
		return () => {};
	}, []);
	useEffect(() => {
		setSearchParameters((params) => {
			params.set("page", pageNum);
			return params;
		});
		refetch();
		return () => {};
	}, [pageNum]);

	useEffect(() => {
		setPageNum(parseInt(searchParameters.get("page")));
		refetch();
	}, [searchParameters]);

	const paginatedResults = detailsData?.slice(9 * (pageNum - 1), 9 * pageNum);

	return (
		<PageTemplate
			pageTitle="My Favorites"
			currPageBreadcrumb={"My Favorites"}
			prevPage={initialBreadcrumbLocation}
		>
			{/* <Button
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
			</Button> */}
			{/* <FormProvider {...methods}>
				<FilterFields
					filtersOpen={filtersOpen}
					setFiltersOpen={setFiltersOpen}
				/>
			</FormProvider> */}
			<Divider />
			<Box
				minHeight={"55vh"}
				width={"100%"}
				display={"flex"}
				justifyContent={"flex-start"}
				flexDirection={"column"}
			>
				{isLoading ? (
					<Grid container spacing={2} width={"100%"} mt={0.5}>
						{[1, 1, 1, 1, 1, 1, 1, 1, 1].map((data, key) => {
							return (
								<Grid item xs={12} sm={6} md={4} lg={4} key={key}>
									<SkeletonCard />
								</Grid>
							);
						})}
					</Grid>
				) : isError ? (
					<p>Error</p>
				) : paginatedResults?.length ? (
					<>
						<Grid container spacing={2} width={"100%"} mb={1}>
							{paginatedResults &&
								paginatedResults.map((data, key) => {
									return (
										<Grid item xs={12} sm={6} md={4} lg={4} key={key}>
											<PropertyCard data={data} />
										</Grid>
									);
								})}
						</Grid>
						<Pagination
							count={Math.ceil(detailsData?.length / 9) || 10}
							boundaryCount={1}
							siblingCount={down ? 1 : 3}
							variant="outlined"
							sx={{ alignSelf: "center" }}
							page={pageNum}
							onChange={handlePageChange}
							size={down ? "small" : "medium"}
						/>
					</>
				) : (
					<Typography textAlign={"center"}>
						Go Browse and Add New Listings to your Favorites!
					</Typography>
				)}
			</Box>
		</PageTemplate>
	);
}

export default Favorites;
