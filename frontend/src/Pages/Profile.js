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
		detailsIsLoading,
		detailsData: applicationsData,
		isLoading: applicationsLoading,
		refetch: applicationsRefetch,
	} = FetchApplicationsHook();
	const {
		detailsData: favoritesDetailData,
		isError: favoritesError,
		isLoading: favoritesLoading,
		isSuccess: favoritesSuccess,
		detailsRefetch: favoritesDetailRefetch,
		favoriteData: favoritesData,
		refetch: favoritesRefetch,
	} = FetchFavoritesHook();

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
					<PageSection
						background={false}
						sectionTitle="My Favorites"
						action={() => {
							navigator("/favorites", {
								state: { previousUrl: location.pathname },
							});
						}}
					>
						<Container>
							<CardCarousel propData={favoritesDetailData?.slice(0, 9)}>
								{favoritesDetailData?.map((data, index) => (
									<Box p={1} key={index}>
										<PropertyCard data={data} />
									</Box>
								))}
							</CardCarousel>
						</Container>
					</PageSection>
					<PageSection
						background={false}
						sectionTitle="My Applications"
						action={() => {
							navigator("/applications", {
								state: { previousUrl: location.pathname },
							});
						}}
					>
						<Container>
							<CardCarousel>
								{applicationsData?.map((data, index) => (
									<Box p={1} key={index}>
										<ApplicationCard
											data={data}
											openApplicationDetails={OpenApplicationDetailsModal}
										/>
									</Box>
								))}
							</CardCarousel>
						</Container>
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
						<Container>
							<CardCarousel>
								{applicationsData?.slice(0, 9)?.map((data, index) => (
									<Box p={1} key={index}>
										<PropertyCard data={data} />
									</Box>
								))}
							</CardCarousel>
						</Container>
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
