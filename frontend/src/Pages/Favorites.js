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
import LoadingSpinner from "../components/CommonComp/LoadingSpinner/LoadingSpinner";
import { useSearchParams, useLocation } from "react-router-dom";
import { useEffect } from "react";

function Favorites() {
	const theme = useTheme();
	const above = useMediaQuery(theme.breakpoints.up("sm"));
	const [filtersOpen, setFiltersOpen] = useState(false);
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

	const filterSubmit = (formdata) => {
		setSearchParameters((params) => {
			Object.keys(formdata).forEach((key) => {
				params.set(key, methods.getValues(key));
			});
			return params;
		});
		methods.reset({}, { keepValues: true });
		refetch();
	};

	const { isError, isLoading, error, data, refetch } = useQuery(
		["userFavourites"],
		() => {
			return API.get("HMEBackend", `/api/user/favourites`, {
				headers: {
					Authorization:
						user?.getSignInUserSession().getAccessToken().jwtToken || null,
				},
				response: true,
				queryStringParameters: {
					userId: user?.username || null,
					...methods.getValues(),
				},
				selector: (data) => {
					return data.data;
				},
			});
		}
	);

	methods.customSubmitBehavior = filterSubmit;

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

	return (
		<PageTemplate
			pageTitle="My Favorites"
			currPageBreadcrumb={"My Favorites"}
			prevPage={initialBreadcrumbLocation}
		>
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
				<FilterFields
					filtersOpen={filtersOpen}
					setFiltersOpen={setFiltersOpen}
				/>
			</FormProvider>
			<Divider />
			<Box
				minHeight={"45vh"}
				width={"100%"}
				display={"flex"}
				justifyContent={"center"}
			>
				{isLoading ? (
					<LoadingSpinner />
				) : isError ? (
					<p>Error</p>
				) : (
					<ResultsGrid propertyData={data} displayTitle="RESULTS" />
				)}
			</Box>
			<Pagination
				count={10}
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
