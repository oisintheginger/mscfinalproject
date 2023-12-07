import PropertyCard from "../components/CommonComp/Cards/PropertyCard/PropertyCard";
import {
	Box,
	Container,
	Grid,
	Stack,
	Typography,
	TextField,
	Button,
	InputAdornment,
	IconButton,
} from "@mui/material";
import { useForm } from "react-hook-form";
import ButtonStyled from "../components/CommonComp/Button/ButtonStyled.js";

import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";

import SiteFooter from "../components/SiteFooter/SiteFooter.js";

import { useEffect, useContext } from "react";
import { UserContext } from "../Utils/UserContext/UserContext.js";
import { RecommendedCarousel } from "../components/RecommendedCarousel/RecommendedCarousel.js";
import SearchIcon from "@mui/icons-material/Search";
const mockRec = {
	propertyId: 36428890,
	longitude: -76.585495,
	latitude: 39.28752,
	price: 2350,
	bathrooms: 2,
	bedrooms: 2,
	streetAddress: "2214 Canary Ct",
	zipcode: "21231",
	overview:
		'BRAND NEW REHAB of a private "carriage house" style!\n\nThis newly renovated 2BR/2Bath in the Upper Fells Point neighborhood is tucked away in a quiet enclave, just steps from beautiful Patterson Park and just a few blocks from historic Fells Point and Canton.\n\nIncluded are beautiful dark oak plank floors throughout, exposed brick, living room fireplace, a "modern farmhouse" styled kitchen with stainless steel appliances and white cabinets, granite countertops and modern glass tile backsplash.\n\nThe primary bedroom has extra large windows, 10\' vaulted ceiling, large walk-in closet and an en-suite bathroom while both bathrooms have large walk-in showers with modern glass, mosaic tile.\n\nUpgrades also include central gas heating and A/C, built-in microwave, gas range, dishwasher, stackable washer & dryer, ceiling fans, exposed brick and mirrored closets doors in both bedrooms. \n\nAnd if all of this wasn\'t enough, THERE IS A COVERED PARKING SPACE AVAILABLE!\n\nRent is from $2450/month with the early pay discount.\n\nSmall pets are considered on a case by case basis with additional pet fee. \n\nCovered parking space is available for additional monthly fee.\n\nMinimum income required of 2 times monthly rent plus a security deposit of one month and a minimum credit score of 700 is required.\n\nCOVERED PARKING AVAILABLE!',
	images: [
		"https://photos.zillowstatic.com/fp/3a028675fe91447a2ed867cbf21fd616-cc_ft_960.jpg",
		"https://photos.zillowstatic.com/fp/ef71e0fe9045b15c083ac4778df01d53-cc_ft_960.jpg",
		"https://photos.zillowstatic.com/fp/c0cfa7eb1e7b09958003a17feb149750-cc_ft_960.jpg",
		"https://photos.zillowstatic.com/fp/76c11527c263d9c314dd22a99f397a45-cc_ft_960.jpg",
		"https://photos.zillowstatic.com/fp/8192275eb4369f41c7c1bb5a1cc42316-cc_ft_960.jpg",
		"https://photos.zillowstatic.com/fp/dbd7de4b2d44125ed8c901207a31fedb-cc_ft_960.jpg",
		"https://photos.zillowstatic.com/fp/29cf58a1e67d459231996dae40761b08-cc_ft_960.jpg",
		"https://photos.zillowstatic.com/fp/b9c226c3ffec8b70f5280f0021c72a60-cc_ft_960.jpg",
		"https://photos.zillowstatic.com/fp/3057f74f0d8897355bd2f7406615558d-cc_ft_960.jpg",
		"https://photos.zillowstatic.com/fp/683b5606be052804b0d66ccf54c330d5-cc_ft_960.jpg",
		"https://photos.zillowstatic.com/fp/c87c9667e51634debbfb1c869c05ff60-cc_ft_960.jpg",
		"https://photos.zillowstatic.com/fp/dde0dcbff4edf23c00926e2ec63ce791-cc_ft_960.jpg",
	],
};

function Homepage() {
	const { register, handleSubmit } = useForm();
	const { getAccessToken } = useContext(UserContext);
	const navigator = useNavigate();
	const location = useLocation();
	const { route, user } = useAuthenticator((context) => [
		context.route,
		context.user,
	]);
	const navigateToBrowse = (data) => {
		navigator({
			pathname: "/browse",
			search: "searchString=" + data.searchString + "&page=1",
		});
	};

	useEffect(() => {
		if (route == "authenticated") {
			// refetch();
		}
	}, [user]);

	return (
		<>
			<Stack direction={"column"} spacing={1} mt={10} alignItems={"center"}>
				<Box width={"100%"} display={"flex"} alignItems={"center"}>
					<Typography textAlign={"center"} variant="landingPage" width={"100%"}>
						RENTING MADE EASY
					</Typography>
				</Box>
				<Box
					component={"label"}
					width={"100%"}
					mb={1}
					form="Search Box"
					display={"flex"}
					justifyContent={"center"}
				>
					<Box
						width={"100%"}
						mb={1}
						display={"flex"}
						justifyContent={"center"}
						component={"form"}
						onSubmit={handleSubmit(navigateToBrowse)}
						aria-label="Search Form"
						aria-labelledby="Searchbox"
						id="Search Box"
					>
						<TextField
							id="Searchbox"
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
							aria-label="Searchbox"
							color="darkTeal"
							placeholder="Search here for your new home"
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											onClick={handleSubmit(navigateToBrowse)}
											aria-label="Search Button"
										>
											<SearchIcon fontSize="large" />
										</IconButton>
									</InputAdornment>
								),
							}}
							{...register("searchString", { required: true })}
						/>
					</Box>
				</Box>
			</Stack>

			<Box
				width={"100%"}
				display={"flex"}
				flexDirection={"column"}
				justifyContent={"center"}
				alignItems={"center"}
				sx={{ mt: { xs: 7, md: "100px" } }}
			>
				<Typography variant={"h2"} textAlign="center">
					Your Recommendations
				</Typography>
				<Stack
					minHeight={"35vh"}
					width={"100%"}
					display={"flex"}
					alignItems={"center"}
				>
					{route === "authenticated" ? (
						<RecommendedCarousel />
					) : (
						<ButtonStyled
							onClick={() => {
								navigator("/login", { state: { from: location } });
							}}
						>
							Sign in to View Recommendations
						</ButtonStyled>
					)}
				</Stack>
			</Box>
			<SiteFooter />
		</>
	);
}

export default Homepage;
