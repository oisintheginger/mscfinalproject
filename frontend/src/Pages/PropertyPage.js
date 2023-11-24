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

import { useMutation, useQuery } from "react-query";
import { API } from "aws-amplify";
import LoadingSpinner from "../components/CommonComp/LoadingSpinner/LoadingSpinner";
import { UserContext } from "../Utils/UserContext/UserContext";
import { Authenticator, View } from "@aws-amplify/ui-react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import PropertyScoresComponent from "../components/PropertyScoresComponent/PropertyScoresComponent";
import { MockScores } from "../MockData/PropertyScoresMockData";
import {
	AddToFavoritesMutation,
	RemoveFromFavoritesMutation,
} from "../Utils/Mutations/FavoriteMutation/FavoritesMutation";
import {
	AddFavoriteButton,
	RemoveFavoriteButton,
} from "../components/PropertyDetailsPageButtons/FavoritesButtons";
import {
	ApplyButton,
	ViewApplication,
} from "../components/PropertyDetailsPageButtons/ApplyButton";
import { CreateApplicationMutation } from "../Utils/Mutations/ApplicationMutation/ApplicationMutation";
import { ColorGradeFunc } from "../Utils/ColorGradientFunc";

function PropertyPage() {
	const location = useLocation();
	const navigate = useNavigate();

	const propertyId = location.pathname.split("/")[2];

	const { userData, handleRefresh, route } = useContext(UserContext);
	const { user } = useAuthenticator((context) => [context.user]);
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
		["propertydetails", propertyId],
		() => {
			return API.get("HMEBackend", `/api/properties/details/${propertyId}`, {
				response: true,
				refreshOnWindowFocus: false,
				queryStringParameters: {
					userId: user?.username || null,
				},
			});
		},
		{
			staleTime: 500000,
			refetchOnMount: true,
			select: (data) => {
				let addedScores = {
					...data.data,
					serviceScores: [
						{
							id: "transportation_score",
							displayTitle: "Transportation Score",
							description: ``,
							color: "#626d78",
							score: parseFloat(data.data.transportation_score.toFixed(1)),
							counts: {
								bus_stationCount: data.data.bus_stationCount,
								transit_stationCount: data.data.transit_stationCount,
								train_stationCount: data.data.train_stationCount,
							},
						},
						{
							id: "emergency_score",
							displayTitle: "Emergency Score",
							description:
								"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet vestibulum eros. Aenean scelerisque sapien quis turpis suscipit, sit amet congue quam pellentesque. Maecenas auctor tortor a tortor sagittis gravida. In nec sagittis est. Nam bibendum neque augue, ac semper elit posuere rutrum. Fusce cursus in nisl sit amet elementum. Nam ut felis vitae arcu consequat finibus vel ut nulla. Integer ligula metus, tempor a dolor sit amet, fringilla consequat lectus. In imperdiet dui eu neque facilisis maximus at at turpis.",
							color: "#3b5880",
							score: parseFloat(data.data.emergency_score.toFixed(1)),
							counts: {
								police_stationCount: data.data.police_stationCount,
								fire_stationCount: data.data.fire_stationCount,
								hospitalCount: data.data.hospitalCount,
							},
						},
						{
							id: "personal_care_score",
							displayTitle: "Personal Care Score",
							description:
								"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet vestibulum eros. Aenean scelerisque sapien quis turpis suscipit, sit amet congue quam pellentesque. Maecenas auctor tortor a tortor sagittis gravida. In nec sagittis est. Nam bibendum neque augue, ac semper elit posuere rutrum. Fusce cursus in nisl sit amet elementum. Nam ut felis vitae arcu consequat finibus vel ut nulla. Integer ligula metus, tempor a dolor sit amet, fringilla consequat lectus. In imperdiet dui eu neque facilisis maximus at at turpis.",
							color: "#713e73",
							score: parseFloat(data.data.personal_care_score.toFixed(1)),
							counts: {
								pharmacyCount: data.data.pharmacyCount,
								beauty_salonCount: data.data.beauty_salonCount,
							},
						},
						{
							id: "finance_score",
							displayTitle: "Finance Score",
							description:
								"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet vestibulum eros. Aenean scelerisque sapien quis turpis suscipit, sit amet congue quam pellentesque. Maecenas auctor tortor a tortor sagittis gravida. In nec sagittis est. Nam bibendum neque augue, ac semper elit posuere rutrum. Fusce cursus in nisl sit amet elementum. Nam ut felis vitae arcu consequat finibus vel ut nulla. Integer ligula metus, tempor a dolor sit amet, fringilla consequat lectus. In imperdiet dui eu neque facilisis maximus at at turpis.",
							color: "#5e3b7d",
							score: parseFloat(data.data.finance_score.toFixed(1)),
							counts: {
								bankCount: data.data.bankCount,
							},
						},
						{
							id: "retail_score",
							displayTitle: "Retail Scores",
							description:
								"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet vestibulum eros. Aenean scelerisque sapien quis turpis suscipit, sit amet congue quam pellentesque. Maecenas auctor tortor a tortor sagittis gravida. In nec sagittis est. Nam bibendum neque augue, ac semper elit posuere rutrum. Fusce cursus in nisl sit amet elementum. Nam ut felis vitae arcu consequat finibus vel ut nulla. Integer ligula metus, tempor a dolor sit amet, fringilla consequat lectus. In imperdiet dui eu neque facilisis maximus at at turpis.",
							color: "#417a41",
							score: parseFloat(data.data.retail_score.toFixed(1)),
							counts: {
								supermarketCount: data.data.supermarketCount,
							},
						},
						{
							id: "fitness_score",
							displayTitle: "Fitness Score",
							description:
								"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet vestibulum eros. Aenean scelerisque sapien quis turpis suscipit, sit amet congue quam pellentesque. Maecenas auctor tortor a tortor sagittis gravida. In nec sagittis est. Nam bibendum neque augue, ac semper elit posuere rutrum. Fusce cursus in nisl sit amet elementum. Nam ut felis vitae arcu consequat finibus vel ut nulla. Integer ligula metus, tempor a dolor sit amet, fringilla consequat lectus. In imperdiet dui eu neque facilisis maximus at at turpis.",
							color: "#8a593a",
							score: parseFloat(data.data.fitness_score.toFixed(1)),
							counts: {
								gymCount: data.data.gymCount,
							},
						},
						{
							id: "leisure_score",
							displayTitle: "Leisure Score",
							description:
								"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet vestibulum eros. Aenean scelerisque sapien quis turpis suscipit, sit amet congue quam pellentesque. Maecenas auctor tortor a tortor sagittis gravida. In nec sagittis est. Nam bibendum neque augue, ac semper elit posuere rutrum. Fusce cursus in nisl sit amet elementum. Nam ut felis vitae arcu consequat finibus vel ut nulla. Integer ligula metus, tempor a dolor sit amet, fringilla consequat lectus. In imperdiet dui eu neque facilisis maximus at at turpis.",
							color: "#663031",
							score: parseFloat(data.data.leisure_score.toFixed(1)),
							counts: {
								restaurantCount: data.data.restaurantCount,
								night_clubCount: data.data.night_clubCount,
								cafeCount: data.data.cafeCount,
								parkCount: data.data.parkCount,
								barCount: data.data.barCount,
							},
						},
					],
				};
				return addedScores;
			},
			onSuccess: (data) => {
				console.log(data);
			},
		}
	);

	const { mutate: addToFavorites } = AddToFavoritesMutation(propertyId, () => {
		handleRefresh();
	});

	const { mutate: removeFromFavorites } = RemoveFromFavoritesMutation(
		propertyId,
		() => {
			handleRefresh();
		}
	);

	const { mutate: createApplication } =
		CreateApplicationMutation(handleRefresh);

	const isFavorited = userData?.favourites.includes(propertyId) || false;

	const isApplied =
		userData?.applications.some((el) => {
			return el.propertyId.toString() == propertyId;
		}) || false;

	return (
		<>
			{isLoading ? (
				<LoadingSpinner />
			) : isError ? (
				<p>Error:{"Something Went Wrong"}</p>
			) : (
				<PageTemplate
					pageTitle={
						data?.bedrooms + " Bed "
						// capitalize(data?.data.propertyType)
					}
					prevPage={
						location.state?.previousUrl ? location.state.previousUrl : null
					}
					currPageBreadcrumb={"Property Details"}
				>
					<Box //WRAPPER BOX FOR STICKY BUTTON
					>
						<Carousel propData={data?.images} />
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
								{isApplied ? (
									<ViewApplication
										action={() => {
											navigate("/applications");
										}}
										down={down}
									/>
								) : (
									<ApplyButton
										action={() => {
											if (route === "authenticated") {
												openModal();
											} else {
												openLoginModal();
											}
										}}
										down={down}
									/>
								)}
								{isFavorited ? (
									<RemoveFavoriteButton
										action={() => {
											removeFromFavorites();
										}}
									/>
								) : (
									<AddFavoriteButton
										action={() => {
											if (route === "authenticated") {
												addToFavorites();
											} else {
												openLoginModal();
											}
										}}
									/>
								)}
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
										{`$ ${data?.price}/mon`}
									</Typography>
								</Stack>
								<Stack //ADDRESS + VIEW ON MAP BUTTON
									direction={{ xs: "column", md: "row" }}
									alignItems={{ xs: "flex-start", md: "flex-end" }}
									spacing={3}
								>
									<Typography variant="propertyAddress">
										{`${data?.streetAddress}, ${data?.zipcode}`}
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
									<PropertyQuickInfoTag label={"Bedrooms " + data?.bedrooms} />
									<PropertyQuickInfoTag
										label={"Bathrooms " + data?.bathrooms}
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
								<PageSection sectionTitle="Description" background={false}>
									<Typography variant="body1">{data?.description}</Typography>
								</PageSection>
								<PropertyScoresComponent inputData={data.serviceScores} />
								<PageSection
									background={false}
									sectionTitle="Neighborhood Crime Safety Rating"
								>
									<Stack
										width={"100%"}
										justifyContent={"center"}
										alignItems={"center"}
									>
										<Stack
											pl={3}
											pr={3}
											pb={1}
											pt={1}
											alignItems={"center"}
											direction={"column"}
											spacing={1}
										>
											<Typography noWrap variant="crimeScoreValue">
												{data.overallCrimeScore?.toFixed(1) + " / 5"}
											</Typography>
											<Box
												display={"flex"}
												flexDirection={"row"}
												justifyContent={"flex-start"}
												alignItems={"center"}
												sx={{}}
												width={"100%"}
												borderRadius={2}
												overflow={"clip"}
												bgcolor={"#e6e6e6"}
												mt={1}
											>
												<Box
													width={`${100 * (data?.overallCrimeScore / 5)}%`}
													height={"40px"}
													sx={{
														background: ColorGradeFunc(
															data?.overallCrimeScore,
															5
														),
														opacity: "100%",
													}}
													display={"flex"}
													flexDirection={"row"}
													alignItems={"center"}
													pr={3}
												/>
											</Box>
											<Typography
												textAlign={"center"}
												variant="crimeScoreDescription"
											>
												{
													"A higher crime safety score indicates a lower crime rate"
												}
											</Typography>
										</Stack>
									</Stack>
								</PageSection>
								<PageSection background={false} sectionTitle="Map View">
									<PropertyDetailMap
										center={[data?.latitude, data?.longitude]}
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
										spacing={2}
										width={"100%"}
										direction={{ xs: "column", sm: "row" }}
										alignItems={"center"}
									>
										<ApplyButton
											action={() => {
												if (route === "authenticated") {
													openModal();
												} else {
													openLoginModal();
												}
											}}
											down={down}
										/>
										{isFavorited ? (
											<RemoveFavoriteButton
												down={down}
												action={() => {
													removeFromFavorites();
												}}
											/>
										) : (
											<AddFavoriteButton
												down={down}
												action={() => {
													if (route === "authenticated") {
														addToFavorites();
													} else {
														openLoginModal();
													}
												}}
											/>
										)}
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
						bgcolor: "background.paper",
						borderRadius: 1,
						boxShadow: 24,
						p: 4,
					}}
				>
					<ApplyModal
						closeModal={closeModal}
						submitFunction={(event) => {
							closeModal();
							createApplication({
								propertyId: propertyId,
								message: event.message,
							});
						}}
					/>
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
