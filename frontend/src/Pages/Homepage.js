import PropertyCard from "../components/CommonComp/Cards/PropertyCard/PropertyCard";
import {
	Box,
	Container,
	Divider,
	Grid,
	Stack,
	Typography,
	TextField,
} from "@mui/material";
import LandingPageImage from "./../Icons/LandingPageImage.png";

import { propertyData } from "../MockData/PropertyDataSample";
function Homepage() {
	return (
		<>
			<Stack direction={"column"} spacing={1} mt={10} alignItems={"center"}>
				<Box width={"100%"} display={"flex"} alignItems={"center"}>
					<Typography textAlign={"center"} variant="landingPage" width={"100%"}>
						HOUSING MADE EASY
					</Typography>
				</Box>
				<Box width={"100%"} mb={1} display={"flex"} justifyContent={"center"}>
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
					/>
				</Box>
			</Stack>

			<Box width={"100%"} justifyContent={"center"} sx={{ mt: "100px" }}>
				<Container>
					<Grid container spacing={2} width={"100%"} mt={0.5}>
						{propertyData.slice(0, 9).map((data, key) => {
							return (
								<Grid item xs={12} sm={6} md={4}>
									<PropertyCard data={data} key={key} />
								</Grid>
							);
						})}
					</Grid>
				</Container>
			</Box>
		</>
	);
}

export default Homepage;
