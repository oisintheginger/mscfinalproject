import { useLocation } from "react-router-dom";
import PageTemplate from "./PageTemplate";
import {
	Box,
	Stack,
	Typography,
	IconButton,
	Button,
	capitalize,
	Chip,
	Paper,
	Modal,
} from "@mui/material";
import { ApplicationIcon, FavoriteIcon, MapIcon } from "../Icons/HMEIcons";
import { propertyData } from "../MockData/PropertyDataSample";
import ButtonStyled from "../components/CommonComp/Button/ButtonStyle";
import PropertyQuickInfoTag from "../components/PropertyQuickInfoTag/PropertyQuickInfoTag";
import PageSection from "../components/CommonComp/PageSection/PageSection";
import PropertyDetailMap from "../components/MapComponent/PropertyDetailMap";

import { useTheme, useMediaQuery } from "@mui/material";
import Carousel from "../components/Carousel/Carousel";
import { useEffect, useRef, useState } from "react";

function PropertyPage() {
	const location = useLocation();
	const individualProperty = propertyData[0];

	const mapRef = useRef(null);

	const theme = useTheme();
	const down = useMediaQuery(theme.breakpoints.down("md"));
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, []);

	const [modalOpen, setModalOpen] = useState(false);

	const openModal = () => {
		setModalOpen(true);
	};
	const closeModal = () => {
		setModalOpen(false);
	};
	return (
		<>
			<PageTemplate
				pageTitle={
					individualProperty.bedrooms +
					" Bed " +
					capitalize(individualProperty.propertyType)
				}
				prevPage={
					location.state?.previousUrl ? location.state.previousUrl : null
				}
				currPageBreadcrumb={"Property Details"}
			>
				<Box //WRAPPER BOX FOR STICKY BUTTON
				>
					<Box mb={2} sx={{ backgroundColor: "greyDark.main" }} padding={0}>
						<Carousel propData={propertyData[0].imgSrc} />
					</Box>
					{!down && (
						<Stack //APPLY NOW BUTTON
							width={"100%"}
							direction={"row"}
							sx={{
								zIndex: 1000,

								height: 0,
								color: "black",
								position: "sticky",
								top: "50px",
								right: "0px",
								justifyContent: "flex-end",
							}}
						>
							<Button
								onClick={() => {
									openModal();
								}}
								variant="outlined"
								sx={{
									maxWidth: "30vw",
									transform: "translate(0px, 8px)",
									backgroundColor: "darkTeal.main",

									"&:hover": {
										backgroundColor: "buttonHover.main",
										color: "darkWhite.main",
									},
									marginRight: 2,
									height: 45,
								}}
								endIcon={<ApplicationIcon />}
							>
								Apply Now
							</Button>
							<Button
								variant="outlined"
								sx={{
									maxWidth: "30vw",
									transform: "translate(0px, 8px)",
									backgroundColor: "white",
									color: "darkTeal.main",
									borderColor: "darkTeal.main",
									borderWidth: 1,

									"&:hover": {
										backgroundColor: "darkWhite.main",
										color: "darkTeal.main",
										borderColor: "darkTeal.main",
										borderWidth: 1,
									},
									marginRight: 2,
									height: 45,
								}}
								endIcon={<FavoriteIcon />}
							>
								Favorite
							</Button>
						</Stack>
					)}
					<Stack //TOP DETAILS
						direction={"row"}
						width={"100%"}
					>
						<Stack spacing={2}>
							<Stack // PRICE + FAVORITE BUTTON
								direction={"row"}
								spacing={2}
								alignItems={"flex-end"}
							>
								<Typography variant="propertyPrice">
									{individualProperty.price}/{"month"}
								</Typography>

								<IconButton
									sx={{ color: "darkTeal.main" }}
									aria-label="Favorite Button"
								>
									<FavoriteIcon />
								</IconButton>
							</Stack>
							<Stack //ADDRESS + VIEW ON MAP BUTTON
								direction={{ xs: "column", md: "row" }}
								alignItems={{ xs: "flex-start", md: "flex-end" }}
								spacing={3}
							>
								<Typography variant="propertyAddress">
									{individualProperty.address}
								</Typography>
								<ButtonStyled
									endIcon={<MapIcon />}
									sx={{ boxShadow: 3 }}
									onClick={() => {
										mapRef.current?.scrollIntoView();
									}}
								>
									View On Map
								</ButtonStyled>
							</Stack>
							<Stack //QUICK INFO TAGS
								direction={"row"}
								flexWrap={"wrap"}
								justifyContent={"flex-start"}
								useFlexGap
								spacing={1}
							>
								<PropertyQuickInfoTag
									label={capitalize(individualProperty.propertyType)}
								/>
								<PropertyQuickInfoTag
									label={"Bedrooms " + individualProperty.bedrooms}
								/>
								<PropertyQuickInfoTag
									label={"Bathrooms " + individualProperty.bathrooms}
								/>
							</Stack>
							<Stack
								direction={"row"}
								flexWrap={"wrap"}
								justifyContent={"flex-start"}
								useFlexGap
								spacing={1}
							>
								<Chip
									label="SECURE"
									sx={{
										backgroundColor: "secureChip.main",
										color: "white",
										fontWeight: 600,
									}}
								/>
								<Chip
									label="NIGHTLIFE"
									sx={{
										backgroundColor: "nightlifeChip.main",
										color: "white",
										fontWeight: 600,
									}}
								/>
								<Chip
									label="GYMS"
									sx={{
										backgroundColor: "gymsChip.main",
										color: "white",
										fontWeight: 600,
									}}
								/>
							</Stack>
						</Stack>
						<Box></Box>
					</Stack>
					<Box //PAGE SECTIONS
					>
						<Stack mt={5} spacing={6}>
							<PageSection sectionTitle="Description">
								<Typography variant="body1">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit.
									Vivamus at libero quis nisi tempor suscipit non vel augue.
									Praesent dolor justo, maximus eu egestas at, volutpat nec
									turpis. Nam a pretium purus. Phasellus tempor sem in fringilla
									fermentum. Quisque gravida facilisis tincidunt. Aliquam at
									arcu congue, consectetur turpis non, mattis elit. Maecenas
									interdum gravida diam. Pellentesque ut ligula accumsan,
									porttitor enim vel, porttitor dui. Curabitur volutpat, sapien
									euismod aliquet suscipit, risus nulla malesuada lectus, quis
									finibus ex dolor id erat. Donec quis urna magna. Nunc faucibus
									risus ut vestibulum convallis. Etiam molestie efficitur
									malesuada. Nullam lobortis dictum risus, et viverra lectus
									tincidunt a. Proin eleifend urna vitae tempor rhoncus. Cras
									venenatis metus vitae lorem maximus, vitae gravida sapien
									sodales. Cras in justo id enim ornare vehicula. Quisque nec
									ornare nulla. Fusce purus sem, congue sit amet dui ac,
									interdum ultricies mauris. Duis velit leo, mattis in libero
									sagittis, consequat ornare neque. Praesent sed risus justo.
									Aenean in mollis ligula. Class aptent taciti sociosqu ad
									litora torquent per conubia nostra, per inceptos himenaeos.
									Morbi ante ex, blandit id iaculis quis, porta non orci. Nullam
									convallis posuere lorem, at pretium dolor blandit feugiat.
									Proin at fermentum neque, eu ullamcorper neque. Sed aliquam
									tincidunt arcu nec ullamcorper. Sed est nunc, pulvinar vel
									enim at, pellentesque tempor mauris. Nam a odio ac velit
									posuere euismod. Phasellus tempus feugiat efficitur. Nunc
									mattis posuere molestie. Vivamus varius laoreet sem ut
									pretium. Donec gravida dolor in eros congue, at facilisis diam
									cursus. Aenean tempor pretium dui, nec pulvinar tortor
									ullamcorper quis. Vivamus quis rhoncus mi, nec ultricies dui.
									Morbi lobortis viverra tincidunt. Suspendisse potenti. Nunc in
									neque quam. Vivamus eget magna ut lorem vulputate posuere ut
									non nulla. Pellentesque ornare id lorem in commodo. Vivamus
									ultrices dolor eget magna auctor viverra. Nam ac nulla sit
									amet leo maximus dictum. Integer elementum orci ornare feugiat
									convallis. In iaculis ex vitae mollis tincidunt.
								</Typography>
							</PageSection>
							<PageSection
								background={false}
								sectionTitle="Property Scores"
							></PageSection>
							<PageSection background={false} sectionTitle="Map View" id="map">
								<PropertyDetailMap center={[39.2904, -76.6122]} ref={mapRef} />
							</PageSection>

							<PageSection background={false} sectionTitle="Contact">
								<Stack
									paddingLeft={1}
									paddingRight={1}
									paddingTop={4}
									spacing={2}
									direction={{ xs: "column", md: "row" }}
									alignItems={{ xs: "center", md: "flex-start" }}
								>
									<Box
										component={"img"}
										src="https://media.licdn.com/dms/image/C4E03AQETC_6MIU7IPQ/profile-displayphoto-shrink_200_200/0/1648397391375?e=1703116800&v=beta&t=gZZ13Q30B2eG9gWTDcKUIFXKwNLmB9YHY2sCbGPE5tY"
										width={"150px"}
										borderRadius={"5px"}
										alt="Picture of Owner"
									/>
									<Stack spacing={{ xs: 2, md: 5 }} height={"100%"}>
										<Typography variant="body1">{"Owner Name Here"}</Typography>
										<Typography variant="body1">
											{"Owner Email Here"}
										</Typography>
										<Typography variant="body1">
											{"Owner Phone Here"}
										</Typography>
									</Stack>
								</Stack>
							</PageSection>
						</Stack>

						{down && (
							<Box
								sx={{
									zIndex: 1000,
									position: "sticky",
									bottom: "0px",
									right: "0px",
									mt: 4,
									backgroundColor: "primary.main",
									pt: 1,
									pb: 1,
								}}
							>
								<Stack
									spacing={1}
									width={"100%"}
									direction={{ xs: "column", sm: "row" }}
								>
									<Button
										variant="outlined"
										onClick={() => {
											openModal();
										}}
										sx={{
											backgroundColor: "darkTeal.main",
											"&:hover": {
												backgroundColor: "buttonHover.main",
												color: "darkWhite.main",
											},
											marginRight: 2,
											height: 50,
										}}
										endIcon={<ApplicationIcon />}
										fullWidth
									>
										Apply Now
									</Button>
									<Button
										variant="outlined"
										sx={{
											backgroundColor: "white",
											color: "darkTeal.main",
											borderColor: "darkTeal.main",
											borderWidth: 1,

											"&:hover": {
												backgroundColor: "darkWhite.main",
												color: "darkTeal.main",
												borderColor: "darkTeal.main",
												borderWidth: 1,
											},
											marginRight: 2,
											height: 50,
										}}
										endIcon={<FavoriteIcon />}
										fullWidth
									>
										Favorite
									</Button>
								</Stack>
							</Box>
						)}
					</Box>
				</Box>
			</PageTemplate>
			<Modal open={modalOpen} onClose={closeModal} sx={{ width: "98%" }}>
				<Box
					sx={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						width: {
							xs: "90vw",
							md: "30vw",
						},
						height: {
							xs: "80vh",
							md: "70vh",
						},
						bgcolor: "background.paper",
						borderRadius: 1,
						boxShadow: 24,
						p: 4,
					}}
				>
					<Typography textAlign={"center"}>FILL IN DETAILS TO APPLY</Typography>
				</Box>
			</Modal>
		</>
	);
}

export default PropertyPage;
