import PageTemplate from "./PageTemplate";
import {
	Typography,
	Box,
	TextField,
	Divider,
	Stack,
	Slider,
	Container,
	Modal,
	Grid,
} from "@mui/material";
import { useAuthenticator } from "@aws-amplify/ui-react";
import CardCarousel from "../components/Carousel/CardCarousel";
import PageSection from "../components/CommonComp/PageSection/PageSection";
import { propertyData } from "../MockData/PropertyDataSample";
import { NextCarouselIcon } from "../Icons/HMEIcons";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import UserWeights from "../components/UserWeightsComponent/UserWeights";
import { FetchApplicationsHook } from "../Utils/DataFetching/FetchApplicationsHook";
import { FetchFavoritesHook } from "../Utils/DataFetching/FetchFavoritesHook";
import ApplicationCard from "../components/CommonComp/Cards/ApplicationCard/ApplicationCard";
import { useState } from "react";
import PropertyCard from "../components/CommonComp/Cards/PropertyCard/PropertyCard";
import ButtonStyled from "../components/CommonComp/Button/ButtonStyled";
import SkeletonCard from "../components/CommonComp/Cards/SkeletonCard/SkeletonCard";
import {
	FetchSavedSearchesHook,
	useFetchSavedSearchesHook,
} from "../Utils/DataFetching/FetchSavedSearchesHook";
import { SearchCard } from "../components/SearchCard/SearchCard";
import { parseSearchString } from "../Utils/ParseSearchString";

function Profile() {
	const navigator = useNavigate();
	const location = useLocation();

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

	console.log(savedSearchesIsLoading);
	console.log(savedSearchesData);

	return (
		<>
			<PageTemplate pageTitle="My Profile" currPageBreadcrumb={"Profile"}>
				<Stack width={"100%"} spacing={8}>
					<PageSection sectionTitle="My Weights" background={false}>
						<Typography>
							{
								"With HME, you can specify and tune what services are the most important for you. We use this information to recommend more relevant properties."
							}
						</Typography>
						<Box display={"flex"} justifyContent={"center"}>
							<UserWeights />
						</Box>
					</PageSection>
					<PageSection background={false} sectionTitle="Recommended for Me">
						<Container>
							<CardCarousel propData={propertyData} />
						</Container>
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
							</>
						)}
					</PageSection>
					<PageSection
						background={false}
						sectionTitle="My Saved Searches"
						action={() => {
							navigator("/savedsearches", {
								state: { previousUrl: location.pathname },
							});
						}}
					>
						{/* <Stack>
							{savedSearchesData?.map((el, ind) => {
								const { search, minPrice, maxPrice } = parseSearchString(
									el.search
								);

								return (
									<SearchCard
										search={search}
										minPrice={minPrice}
										maxPrice={maxPrice}
										key={ind}
									/>
								);
							})}
						</Stack>
						<Container>
							<CardCarousel>
								{applicationsData?.slice(0, 9)?.map((data, index) => (
									<Box p={1} key={index}>
										<PropertyCard data={data} />
									</Box>
								))}
							</CardCarousel>
						</Container> */}
					</PageSection>
				</Stack>
			</PageTemplate>
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
		</>
	);
}

export default Profile;
