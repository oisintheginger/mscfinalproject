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

function Favorites() {
	const theme = useTheme();
	const above = useMediaQuery(theme.breakpoints.up("sm"));
	// const [filtersOpen, setFiltersOpen] = useState(false);
	const [searchParameters, setSearchParameters] = useSearchParams();

	const [pageNum, setPageNum] = useState(1);
	const handlePageChange = (event, val) => {
		event.preventDefault();
		setPageNum(val);
	};

	const location = useLocation();
	const [initialBreadcrumbLocation, setInitialBreadcrumbLocation] =
		useState(null);

	const methods = useForm({
		defaultValues: { ...DEFAULT_FAVORITE_FILTER_VALUES },
	});
	const { route, user } = useAuthenticator((context) => [
		context.route,
		context.user,
	]);
	const { getAccessToken } = useContext(UserContext);
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

	const {
		isSuccess,
		isError,
		isLoading,
		error,
		data: favoriteData,
		refetch,
	} = useQuery(
		["userFavourites"],
		async () => {
			const accessToken = await getAccessToken();
			return API.get("HMEBackend", `/api/user/f`, {
				headers: {
					Authorization: "Bearer " + accessToken || null,
				},
			});
		},
		{
			refetchOnMount: true,
			response: true,
			queryStringParameters: {
				userId: user?.username || null,
				...methods.getValues(),
			},
			selector: (data) => {
				const out = [
					...data.data?.map((el) => {
						return el.favourite;
					}),
				];
				return out;
			},
			onSuccess: (data) => {
				// console.log(data);
			},
		}
	);

	const favoriteIds = favoriteData
		?.map((el) => {
			return el.favourite.toString();
		})
		.filter((el) => {
			return el != "1";
		});

	// console.log(favoriteIds);

	const {
		isError: detailsIsError,
		isLoading: detailsIsLoading,
		error: detailsError,
		data: detailsData,
		refetch: detailsRefetch,
	} = useQuery(
		["favoriteQuickViews"],
		() => {
			return API.get("HMEBackend", `/api/properties/batch`, {
				headers: {
					Authorization:
						"Bearer " +
							user?.getSignInUserSession().getAccessToken().getJwtToken() ||
						null,
				},
				queryStringParameters: {
					ids: favoriteIds,
				},
			});
		},
		{
			response: true,
			enabled: false,
			refetchOnWindowFocus: false,
			select: (data) => {
				return data;
			},
			onSuccess: (data) => {
				console.log(data);
			},
			onError: (err) => {
				// console.log(err);
			},
		}
	);

	useEffect(() => {
		if (isSuccess) {
			detailsRefetch();
		}
	}, [favoriteData, isLoading, isSuccess]);

	// methods.customSubmitBehavior = filterSubmit;

	useEffect(() => {
		setInitialBreadcrumbLocation(
			location.state?.previousUrl ? location.state.previousUrl : null
		);
	}, []);

	useEffect(() => {
		setSearchParameters((params) => {
			params.set("page", pageNum);
			return params;
		});
		refetch();
		return () => {};
	}, [pageNum]);

	const paginatedResults = detailsData?.slice(
		0 + 9 * (pageNum - 1),
		9 + 9 * (pageNum - 1)
	);

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
				minHeight={"45vh"}
				width={"100%"}
				display={"flex"}
				justifyContent={"center"}
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
				) : (
					<Grid container spacing={2} width={"100%"}>
						{paginatedResults &&
							paginatedResults.map((data, key) => {
								return (
									<Grid item xs={12} sm={6} md={4} lg={4} key={key}>
										<PropertyCard data={data} />
									</Grid>
								);
							})}
					</Grid>
				)}
			</Box>
			<Pagination
				count={Math.ceil(detailsData?.length / 9) || 10}
				boundaryCount={1}
				siblingCount={1}
				variant="outlined"
				sx={{ alignSelf: "center" }}
				page={pageNum}
				onChange={handlePageChange}
			/>
		</PageTemplate>
	);
}

export default Favorites;
