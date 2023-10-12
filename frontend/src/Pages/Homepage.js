import PropertyCard from "../components/PropertyCard/PropertyCard";
import { Container, Grid } from "@mui/material";

import { propertyData } from "../MockData/PropertyDataSample";
function Homepage() {
	return (
		<Container>
			<h3>Home Page</h3>

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
	);
}

export default Homepage;
