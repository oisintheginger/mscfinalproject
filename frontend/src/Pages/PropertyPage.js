import { useLocation, useNavigate } from "react-router-dom";
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
import ButtonStyled from "../components/CommonComp/Button/ButtonStyled";
import PropertyQuickInfoTag from "../components/PropertyQuickInfoTag/PropertyQuickInfoTag";
import PageSection from "../components/CommonComp/PageSection/PageSection";
import PropertyDetailMap from "../components/MapComponent/PropertyDetailMap";

import { useTheme, useMediaQuery } from "@mui/material";
import Carousel from "../components/Carousel/Carousel";
import { useContext, useEffect, useRef, useState } from "react";
import ApplyModal from "../components/CreateApplicationModal/ApplyModal";

import { useQuery } from "react-query";
import { API } from "aws-amplify";
import LoadingSpinner from "../components/CommonComp/LoadingSpinner/LoadingSpinner";
import { UserContext } from "../Utils/UserContext/UserContext";
import { Authenticator, View } from "@aws-amplify/ui-react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import PropertyScoresComponent from "../components/PropertyScoresComponent/PropertyScoresComponent";
import { MockScores } from "../MockData/PropertyScoresMockData";

function PropertyPage() {
	const location = useLocation();
	const navigate = useNavigate();

	const { userData, handleRefresh, route } = useContext(UserContext);
	const { user } = useAuthenticator((context) => [context.route, context.user]);

	const mapRef = useRef(null);

	const theme = useTheme();
	const down = useMediaQuery(theme.breakpoints.down("md"));

	const [modalOpen, setModalOpen] = useState(false);
	const [loginModalOpen, setLoginModalOpen] = useState(false);

	const openModal = () => {
		setModalOpen(true);
	};
	const closeModal = () => {
		setModalOpen(false);
	};

	const openLoginModal = () => {
		setLoginModalOpen(true);
	};

	const closeLoginModal = () => {
		setLoginModalOpen(false);
	};

	useEffect(() => {
		if (route === "authenticated") {
			setLoginModalOpen(false);
		}
	}, [route]);

	const { isError, isLoading, error, data } = useQuery(
		["propertydetails", location.pathname.split("/")[2]],
		() => {
			return API.get(
				"HMEBackend",
				`/api/properties/${location.pathname.split("/")[2]}`,
				{
					headers: {
						Authorization:
							user?.getSignInUserSession().getAccessToken().jwtToken || null,
					},
					response: true,
					queryStringParameters: {
						userId: user?.username || null,
					},
				}
			);
		},
		{ staleTime: 500000, refetchOnMount: true }
	);

	return (
		<>
			{isLoading ? (
				<LoadingSpinner />
			) : isError ? (
				<p>Error:{error.request.status}</p>
			) : (
				<PageTemplate
					pageTitle={
						data?.data.bedrooms + " Bed "
						// capitalize(data?.data.propertyType)
					}
					prevPage={
						location.state?.previousUrl ? location.state.previousUrl : null
					}
					currPageBreadcrumb={"Property Details"}
				>
					<Box //WRAPPER BOX FOR STICKY BUTTON
					>
						<Carousel propData={data?.data.images} />
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
										if (route === "authenticated") {
											openModal();
										} else {
											openLoginModal();
										}
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
									onClick={() => {
										if (route === "authenticated") {
											console.log("Added to Favorites");
										} else {
											openLoginModal();
										}
									}}
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
									spacing={1}
									alignItems={"flex-end"}
								>
									<Typography variant="propertyPrice">
										{`$ ${data?.data.price}/mon`}
									</Typography>
								</Stack>
								<Stack //ADDRESS + VIEW ON MAP BUTTON
									direction={{ xs: "column", md: "row" }}
									alignItems={{ xs: "flex-start", md: "flex-end" }}
									spacing={3}
								>
									<Typography variant="propertyAddress">
										{`${data?.data.streetAddress}, ${data?.data.zipcode}`}
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
									{/* <PropertyQuickInfoTag
									// label={capitalize(data?.data.propertyType)}
									/> */}
									<PropertyQuickInfoTag
										label={"Bedrooms " + data?.data.bedrooms}
									/>
									<PropertyQuickInfoTag
										label={"Bathrooms " + data?.data.bathrooms}
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
						</Stack>
						<Box //PAGE SECTIONS
						>
							<Stack mt={5} spacing={6}>
								<PageSection sectionTitle="Description">
									<Typography variant="body1">{data?.data.overview}</Typography>
								</PageSection>
								<PropertyScoresComponent inputData={MockScores} />
								<PageSection
									background={false}
									sectionTitle="Map View"
									id="map"
								>
									<PropertyDetailMap
										center={[data?.data.latitude, data?.data.longitude]}
										ref={mapRef}
									/>
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
											src="https://global-uploads.webflow.com/63cda40ae1eb3d792c09917b/64774c50e2dcd05af867f9b8_n_yPPwDrPTVoOzu4WjbGBA6IIgYq2lTLBB8Qcm-WbFg.jpeg"
											width={"150px"}
											borderRadius={"5px"}
											alt="Picture of Owner"
										/>
										<Stack spacing={{ xs: 2, md: 5 }} height={"100%"}>
											<Typography variant="body1">
												{"Owner Name Here"}
											</Typography>
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
												if (route === "authenticated") {
													openModal();
												} else {
													openLoginModal();
												}
											}}
											sx={{
												backgroundColor: "darkTeal.main",
												"&:hover": {
													backgroundColor: "buttonHover.main",
													color: "darkWhite.main",
												},
												marginRight: 2,
												height: 40,
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
												height: 40,
											}}
											endIcon={<FavoriteIcon />}
											fullWidth
											onClick={() => {
												if (route === "authenticated") {
													console.log("Added to Favorites");
												} else {
													openLoginModal();
												}
											}}
										>
											Favorite
										</Button>
									</Stack>
								</Box>
							)}
						</Box>
					</Box>
				</PageTemplate>
			)}
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
					{/* <Typography textAlign={"center"}>FILL IN DETAILS TO APPLY</Typography> */}
					<ApplyModal closeModal={closeModal} />
				</Box>
			</Modal>
			<Modal open={loginModalOpen} onClose={closeLoginModal}>
				<Box
					sx={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
					}}
				>
					<View className="auth-wrapper">
						<Authenticator />
					</View>
				</Box>
			</Modal>
		</>
	);
}

export default PropertyPage;
