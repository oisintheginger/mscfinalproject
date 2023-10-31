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
function Homepage() {
	const { register, handleSubmit } = useForm();
	const navigator = useNavigate();
	const location = useLocation();
	const auth = useAuthenticator((context) => [context.route]);
	const navigateToBrowse = (data) => {
		navigator({
			pathname: "/browse",
			search: "searchString=" + data.searchString,
		});
	};
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
				sx={{ mt: "100px" }}
			>
				<Typography variant={"h2"} textAlign="center">
					Your Recommendations
				</Typography>
				{auth.route === "authenticated" ? (
					<Container>
						{/* <Grid container spacing={2} width={"100%"} mt={0.5}>
							{propertyData.slice(0, 9).map((data, key) => {
								return (
									<Grid item xs={12} sm={6} md={4}>
										<PropertyCard data={data} key={key} />
									</Grid>
								);
							})}
						</Grid> */}
						<CardCarousel propData={propertyData} />
					</Container>
				) : (
					<ButtonStyled
						sx={{ width: "30%" }}
						onClick={() => {
							navigator("/login", { state: { previousUrl: location } });
						}}
					>
						Sign in to View Recommendations
					</ButtonStyled>
				)}
			</Box>
		</>
	);
}

export default Homepage;
