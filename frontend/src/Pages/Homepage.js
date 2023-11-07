import PropertyCard from "../components/CommonComp/Cards/PropertyCard/PropertyCard";
import {
	Box,
	Container,
	Grid,
	Stack,
	Typography,
	TextField,
	Button,
} from "@mui/material";
import { useForm } from "react-hook-form";
import ButtonStyled from "../components/CommonComp/Button/ButtonStyle.js";

import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";

import { propertyData } from "../MockData/PropertyDataSample";
import CardCarousel from "../components/Carousel/CardCarousel";
import SiteFooter from "../components/SiteFooter/SiteFooter.js";

import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { API } from "aws-amplify";
import LoadingSpinner from "../components/CommonComp/LoadingSpinner/LoadingSpinner.js";
function Homepage() {
	const { register, handleSubmit } = useForm();
	const navigator = useNavigate();
	const location = useLocation();
	const { route, user } = useAuthenticator((context) => [
		context.route,
		context.user,
	]);
	const navigateToBrowse = (data) => {
		navigator({
			pathname: "/browse",
			search: "searchString=" + data.searchString,
		});
	};

	const { data, isLoading, isError, refetch } = useQuery(
		"recommended",
		() => {
			return API.get("HMEBackend", `/api/user/favorites`, {
				headers: {
					Authorization:
						user.getSignInUserSession().getAccessToken().jwtToken || null,
				},
				response: true,
				queryStringParameters: {
					userId: user.username || null,
				},
			});
		},
		{
			enabled: false,
		}
	);

	useEffect(() => {
		if (route == "authenticated") {
			refetch();
		}
	}, [user]);

	return (
		<>
			<Stack direction={"column"} spacing={1} mt={10} alignItems={"center"}>
				<Box width={"100%"} display={"flex"} alignItems={"center"}>
					<Typography textAlign={"center"} variant="landingPage" width={"100%"}>
						HOUSING MADE EASY
					</Typography>
				</Box>
				<Box
					width={"100%"}
					mb={1}
					display={"flex"}
					justifyContent={"center"}
					component={"form"}
					onSubmit={handleSubmit(navigateToBrowse)}
				>
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
						placeholder="Search here for your new home"
						{...register("searchString", { required: true })}
					/>
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
						isLoading ? (
							<LoadingSpinner message={"Getting your recommendations"} />
						) : isError ? (
							<p>Error</p>
						) : (
							<Container>
								{data?.data > 0 ? (
									<CardCarousel propData={propertyData} />
								) : (
									<Typography>No Recommendations</Typography>
								)}
							</Container>
						)
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
