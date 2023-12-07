import PageTemplate from "./PageTemplate";
import {
	Typography,
	Box,
	Stack,
	Modal,
	Grid,
	Snackbar,
	Slide,
	useTheme,
	useMediaQuery,
} from "@mui/material";
import { useAuthenticator } from "@aws-amplify/ui-react";
import PageSection from "../components/CommonComp/PageSection/PageSection";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import UserWeights from "../components/UserWeightsComponent/UserWeights";
import { FetchApplicationsHook } from "../Utils/DataFetching/FetchApplicationsHook";
import { FetchFavoritesHook } from "../Utils/DataFetching/FetchFavoritesHook";
import ApplicationCard from "../components/CommonComp/Cards/ApplicationCard/ApplicationCard";
import { useContext, useState } from "react";
import PropertyCard from "../components/CommonComp/Cards/PropertyCard/PropertyCard";
import ButtonStyled from "../components/CommonComp/Button/ButtonStyled";
import SkeletonCard from "../components/CommonComp/Cards/SkeletonCard/SkeletonCard";
import { useFetchSavedSearchesHook } from "../Utils/DataFetching/FetchSavedSearchesHook";
import { SearchCard } from "../components/SearchCard/SearchCard";
import { parseSearchString } from "../Utils/ParseSearchString";
import DeleteButton from "../components/CommonComp/Button/DeleteButton";
import ButtonOutlined from "../components/CommonComp/Button/ButtonOutlined";
import { DeleteAccountMutation } from "../Utils/Mutations/DeleteAccountMutation/DeleteAccountMutation";
import SnackbarAlertMap from "../Utils/AlertMap";
import LoadingSpinner from "../components/CommonComp/LoadingSpinner/LoadingSpinner";
import { UserContext } from "../Utils/UserContext/UserContext";
import { Auth } from "@aws-amplify/auth";
import { DeleteHandlerConstructor } from "../Utils/Mutations/SearchMutation/SearchMutation";
import { RecommendedCarousel } from "../components/RecommendedCarousel/RecommendedCarousel";

function Profile() {
	const navigator = useNavigate();
	const location = useLocation();
	const theme = useTheme();
	const down = useMediaQuery(theme.breakpoints.down("md"));

	const { getAccessToken } = useContext(UserContext);

	const [snackbarAlertOpen, setSnackbarAlertOpen] = useState(false);
	const [alert, setAlert] = useState(<></>);
	const handleSnackbarClose = () => {
		setSnackbarAlertOpen(false);
	};
	const successUpdateWeights = () => {
		setAlert(SnackbarAlertMap.adjusted_weights);
		setSnackbarAlertOpen(true);
	};
	const errorUpdateWeights = () => {
		setAlert(SnackbarAlertMap.error_adjusted_weights);
		setSnackbarAlertOpen(true);
	};

	const [applicationDetailsModalOpen, setApplicationDetailsModalOpen] =
		useState(false);
	const [applicationToView, setApplicationToView] = useState(null);
	const OpenApplicationDetailsModal = (message) => {
		setApplicationDetailsModalOpen(true);
		setApplicationToView(message);
	};
	const CloseApplicationDetailsModal = () => {
		setApplicationDetailsModalOpen(false);
		setApplicationToView(null);
	};

	const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
	const OpenConfirmDeleteModal = () => {
		setConfirmDeleteModalOpen(true);
	};
	const CloseConfirmDeleteModal = () => {
		setConfirmDeleteModalOpen(false);
	};

	const {
		detailsIsLoading: applicationDetailsLoading,
		detailsError: applicationDetailsIsError,
		detailsData: applicationsData,
	} = FetchApplicationsHook();
	const {
		detailsData: favoritesDetailData,
		detailsIsError: favoritesDetailsIsError,
		detailsIsLoading: favoritesDetailsIsLoading,
	} = FetchFavoritesHook();
	const {
		savedSearchesData,
		savedSearchesIsLoading,
		savedSearchesIsError,
		savedSearchesError,
		savedSearchesRefetch,
	} = useFetchSavedSearchesHook();

	const { mutate: deleteAccount } = DeleteAccountMutation();

	const { signOut } = useAuthenticator((context) => [context.signOut]);

	// const handleDelete = async (searchString) => {
	// 	const token = await getAccessToken();
	// 	if (!token) {
	// 		console.error("Authentication token not available.");
	// 		return;
	// 	}
	const successDeleteSearch = () => {
		setAlert(SnackbarAlertMap.delete_search);
		setSnackbarAlertOpen(true);
	};
	const errorDeleteSearch = () => {
		setAlert(SnackbarAlertMap.error_delete_search);
		setSnackbarAlertOpen(true);
	};

	const handleDeleteSearch = DeleteHandlerConstructor({
		successCallback: () => {
			successDeleteSearch();
			savedSearchesRefetch();
		},
		errorCallback: () => {
			errorDeleteSearch();
		},
	});

	return (
		<>
			<PageTemplate pageTitle="My Profile" currPageBreadcrumb={"Profile"}>
				<Stack width={"100%"} spacing={8}>
					<PageSection sectionTitle="My Preferences" background={false}>
						<Typography variant="body1">
							{
								"With HME, you can specify and tune what property services and features are the most important for you. We use this information to present personalized scores while you browse properties."
							}
						</Typography>
						<Box display={"flex"} justifyContent={"center"}>
							<UserWeights
								successWeightsUpdateAlert={successUpdateWeights}
								errorWeightsUpdateAlert={errorUpdateWeights}
							/>
						</Box>
					</PageSection>
					<PageSection background={false} sectionTitle="Recommended for Me">
						<RecommendedCarousel />
					</PageSection>
					<PageSection background={false} sectionTitle="My Favorites">
						{favoritesDetailsIsLoading ? (
							<Grid container>
								<Grid item p={1} xs={12} sm={6} md={3}>
									<SkeletonCard />
								</Grid>
								<Grid item p={1} xs={12} sm={6} md={3}>
									<SkeletonCard />
								</Grid>
								<Grid item p={1} xs={12} sm={6} md={3}>
									<SkeletonCard />
								</Grid>
								<Grid item p={1} xs={12} sm={6} md={3}>
									<SkeletonCard />
								</Grid>
							</Grid>
						) : favoritesDetailsIsError ? (
							<>Error</>
						) : (
							<>
								<Grid container>
									{favoritesDetailData?.slice(0, 4).map((data, index) => (
										<Grid item p={1} key={index} xs={12} sm={6} md={3}>
											<PropertyCard data={data} />
										</Grid>
									))}
								</Grid>
								{favoritesDetailData?.length > 0 ? (
									<Box
										width={"100%"}
										display={"flex"}
										flexDirection={"column"}
										alignItems={"center"}
									>
										<ButtonStyled
											onClick={() => {
												navigator("/favorites?page=1", {
													state: { previousUrl: location.pathname },
												});
											}}
										>
											View More On My Favorites
										</ButtonStyled>
									</Box>
								) : (
									<Typography textAlign={"center"}>
										No Favorites. Start Browsing!
									</Typography>
								)}
							</>
						)}
					</PageSection>
					<PageSection background={false} sectionTitle="My Applications">
						{applicationDetailsLoading ? (
							<Grid container>
								<Grid item p={1} xs={12} sm={6} md={3}>
									<SkeletonCard />
								</Grid>
								<Grid item p={1} xs={12} sm={6} md={3}>
									<SkeletonCard />
								</Grid>
								<Grid item p={1} xs={12} sm={6} md={3}>
									<SkeletonCard />
								</Grid>
								<Grid item p={1} xs={12} sm={6} md={3}>
									<SkeletonCard />
								</Grid>
							</Grid>
						) : applicationDetailsIsError ? (
							<>Error</>
						) : (
							<>
								<Grid container>
									{applicationsData?.slice(0, 4).map((data, index) => (
										<Grid item p={1} key={index} xs={12} sm={6} md={3}>
											<ApplicationCard
												data={data}
												openApplicationDetails={OpenApplicationDetailsModal}
											/>
										</Grid>
									))}
								</Grid>
								{applicationsData?.length > 0 ? (
									<Box
										width={"100%"}
										display={"flex"}
										flexDirection={"column"}
										alignItems={"center"}
									>
										<ButtonStyled
											onClick={() => {
												navigator("/applications?page=1", {
													state: { previousUrl: location.pathname },
												});
											}}
										>
											View More On My Applications
										</ButtonStyled>
									</Box>
								) : (
									<Typography textAlign={"center"}>
										No Applications. Start Browsing!
									</Typography>
								)}
							</>
						)}
					</PageSection>
					<PageSection background={false} sectionTitle="My Saved Searches">
						{savedSearchesIsLoading ? (
							<LoadingSpinner />
						) : savedSearchesIsError ? (
							<>Error</>
						) : (
							<>
								<Stack>
									{savedSearchesData?.slice(0, 3).map((el, ind) => {
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
												savedSearchRefresh={savedSearchesRefetch}
												handleDelete={handleDeleteSearch}
											/>
										);
									})}
								</Stack>
								{savedSearchesData?.length > 0 ? (
									<Box
										width={"100%"}
										display={"flex"}
										flexDirection={"column"}
										alignItems={"center"}
									>
										<ButtonStyled
											onClick={() => {
												navigator("/savedsearches?page=1", {
													state: { previousUrl: location.pathname },
												});
											}}
										>
											View More On My Saved Searches
										</ButtonStyled>
									</Box>
								) : (
									<Typography textAlign={"center"}>
										No Saved Searches. Start Browsing!
									</Typography>
								)}
							</>
						)}
					</PageSection>
					<PageSection sectionTitle="My Account" background={false}>
						<DeleteButton onClick={OpenConfirmDeleteModal}>
							DELETE ACCOUNT
						</DeleteButton>
					</PageSection>
				</Stack>
			</PageTemplate>
			<Snackbar></Snackbar>
			<Modal
				open={applicationDetailsModalOpen}
				onClose={CloseApplicationDetailsModal}
			>
				<Box
					sx={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						width: {
							xs: "90vw",
							md: "45vw",
						},
						bgcolor: "background.paper",
						borderRadius: 1,
						boxShadow: 24,
						p: 4,
					}}
				>
					<Stack spacing={2}>
						<Typography textAlign={"center"} variant="h2">
							Your Application
						</Typography>
						<Typography textAlign={"center"} variant="body1">
							{applicationToView}
						</Typography>
						<Grid container spacing={1}>
							<Grid item xs={6} sm={6} md={6} lg={6}></Grid>
							<Grid item xs={6} sm={6} md={6} lg={6}></Grid>
						</Grid>
					</Stack>
				</Box>
			</Modal>
			<Modal open={confirmDeleteModalOpen} onClose={CloseConfirmDeleteModal}>
				<Box
					sx={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						width: {
							xs: "90vw",
							md: "45vw",
						},
						bgcolor: "background.paper",
						borderRadius: 1,
						boxShadow: 24,
						p: 4,
					}}
				>
					<Stack spacing={2}>
						<Typography textAlign={"center"} variant="h2">
							CONFIRM DELETE ACCOUNT
						</Typography>
						<Typography textAlign={"center"} variant="body1">
							Are you sure you want to delete your account? You will lose all
							your data.
						</Typography>
						<Grid container spacing={1}>
							<Grid item xs={6} sm={6} md={6} lg={6}>
								<ButtonOutlined
									variant="outlined"
									fullWidth
									onClick={() => {
										CloseConfirmDeleteModal();
										// console.log("taken back");
									}}
								>
									No, take me back.
								</ButtonOutlined>
							</Grid>
							<Grid item xs={6} sm={6} md={6} lg={6}>
								<DeleteButton
									variant="outlined"
									fullWidth
									onClick={async () => {
										await deleteAccount();
										await Auth.deleteUser();
									}}
								>
									CONFIRM ACCOUNT DELETION
								</DeleteButton>
							</Grid>
						</Grid>
					</Stack>
				</Box>
			</Modal>
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

export default Profile;
