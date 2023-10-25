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

function Profile() {
	const { route } = useAuthenticator((context) => [context.route]);
	const navigator = useNavigate();
	const location = useLocation();
	return (
		<PageTemplate pageTitle="My Profile" currPageBreadcrumb={"Profile"}>
			<Stack width={"100%"} spacing={8}>
				{/* <Typography width={"100%"} variant="body1">
					{route === "authenticated" ? "LOGGED IN" : "NOT LOGGED IN"}
				</Typography> */}
				<PageSection sectionTitle="" background={false}>
					<Box>
						<TextField
							variant="outlined"
							type="search"
							sx={{
								width: { xs: "100%", md: "55%" },
								"& .MuiInputBase-root": {
									height: 50,
									color: "black",
									"& fieldset": {
										borderWidth: 1,
										borderColor: "darkTeal.main",
									},
									"&.Mui-focused fieldset": {
										borderWidth: 2,
										borderColor: "darkTeal.main",
									},
									"&:hover fieldset": {
										borderWidth: 2,
										borderColor: "darkTeal.main",
									},
								},
							}}
							color="darkTeal"
							placeholder="Name Goes Here"
						/>
					</Box>
				</PageSection>
				<PageSection
					background={false}
					sectionTitle="My Favorites"
					action={() => {
						navigator("/favorites", { state: { previousUrl: location } });
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
						navigator("/applications", { state: { previousUrl: location } });
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
						navigator("/savedsearches", { state: { previousUrl: location } });
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
