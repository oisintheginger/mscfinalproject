import PageTemplate from "./PageTemplate";
import {
	Typography,
	Box,
	TextField,
	Divider,
	Stack,
	Slider,
	Container,
} from "@mui/material";
import { useAuthenticator } from "@aws-amplify/ui-react";
import CardCarousel from "../components/Carousel/CardCarousel";
import PageSection from "../components/CommonComp/PageSection/PageSection";
import { propertyData } from "../MockData/PropertyDataSample";
import { NextCarouselIcon } from "../Icons/HMEIcons";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import UserWeights from "../components/UserWeightsComponent/UserWeights";
import { useContext } from "react";
import { UserContext } from "../Utils/UserContext/UserContext";

function Profile() {
	const navigator = useNavigate();
	const location = useLocation();
	return (
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
						<CardCarousel propData={propertyData} />
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
						<CardCarousel propData={propertyData} />
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
						<CardCarousel propData={propertyData} />
					</Container>
				</PageSection>
			</Stack>
		</PageTemplate>
	);
}

export default Profile;
