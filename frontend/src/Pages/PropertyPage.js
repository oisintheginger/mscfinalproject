import { useLocation } from "react-router-dom";
import PageTemplate from "./PageTemplate";
import {
	Box,
	Stack,
	Typography,
	IconButton,
	Button,
	capitalize,
	Paper,
} from "@mui/material";
import { ApplicationIcon, FavoriteIcon, MapIcon } from "../Icons/HMEIcons";
import { propertyData } from "../MockData/PropertyDataSample";
import ButtonStyled from "../components/CommonComp/Button/ButtonStyle";
import PropertyQuickInfoTag from "../components/PropertyQuickInfoTag/PropertyQuickInfoTag";
import PageSection from "../components/CommonComp/PageSection/PageSection";
import PropertyDetailMap from "../components/MapComponent/PropertyDetailMap";

import { useTheme, useMediaQuery } from "@mui/material";

function PropertyPage() {
	const location = useLocation();
	const individualProperty = propertyData[0];

	const theme = useTheme();
	const down = useMediaQuery(theme.breakpoints.down("md"));

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
					<Box //CAROUSEL
						justifyContent={"center"}
						alignItems={"center"}
						display={"flex"}
						sx={{
							backgroundColor: "greyDark.main",
							width: "100%",
							borderRadius: 1,
						}}
					>
						<Box
							component={"img"}
							src={individualProperty.imgSrc}
							maxWidth={"100%"}
							alt={capitalize(individualProperty.propertyType)}
						/>
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
									href="#map"
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
						</Stack>
						<Box></Box>
					</Stack>
					<Box //PAGE SECTIONS
					>
						<Stack mt={5} spacing={6}>
							<PageSection></PageSection>
							<PageSection background={false} sectionTitle="Map View" id="map">
								<PropertyDetailMap center={[39.2904, -76.6122]} />
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
							{down && (
								<PageSection background={false} sectionTitle="Ready to Apply?">
									<Stack
										spacing={1}
										width={"100%"}
										direction={{ xs: "column", sm: "row" }}
									>
										<Button
											variant="outlined"
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
								</PageSection>
							)}
						</Stack>
					</Box>
				</Box>
			</PageTemplate>
		</>
	);
}

export default PropertyPage;
