import PropertyCard from "../components/CommonComp/Cards/PropertyCard/PropertyCard";
import {
	Box,
	Container,
	Divider,
	Grid,
	Stack,
	Typography,
} from "@mui/material";

import { propertyData } from "../MockData/PropertyDataSample";
function Homepage() {
	return (
		<Stack direction={"column"} spacing={4}>
			<Box width={"100%"}>
				<Typography variant="h1" textAlign={"center"}>
					HOUSING MADE EASY
				</Typography>
			</Box>
			<Divider />
			<Box width={"100%"} justifyContent={"center"}>
				<Container>
					<Grid container spacing={0} width={"100%"} padding={0} m={0}>
						{propertyData.map((data, key) => {
							return (
								<Grid item xs={12} sm={6} md={4}>
									<PropertyCard data={data} key={key} />
								</Grid>
							);
						})}
					</Grid>
				</Container>
			</Box>
		</Stack>
	);
}

export default Homepage;
