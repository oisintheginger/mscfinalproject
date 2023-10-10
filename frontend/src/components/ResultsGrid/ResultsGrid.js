import Grid from "@mui/material/Grid";
import PropertyCard from "../../components/PropertyCard";
import { Box, Stack, Typography, Divider } from "@mui/material";

function ResultGrid() {
	return (
		<Box m={0}>
			<Typography variant="h2">Results in this area</Typography>

			<Divider />
			<Grid container spacing={0} width={"100%"} padding={0} m={0}>
				<Grid item xs={12} sm={6} md={4}>
					<PropertyCard />
				</Grid>
				<Grid item xs={12} sm={6} md={4}>
					<PropertyCard />
				</Grid>
				<Grid item xs={12} sm={6} md={4}>
					<PropertyCard />
				</Grid>
				<Grid item xs={12} sm={6} md={4}>
					<PropertyCard />
				</Grid>
				<Grid item xs={12} sm={6} md={4}>
					<PropertyCard />
				</Grid>
				<Grid item xs={12} sm={6} md={4}>
					<PropertyCard />
				</Grid>
				<Grid item xs={12} sm={6} md={4}>
					<PropertyCard />
				</Grid>
				<Grid item xs={12} sm={6} md={4}>
					<PropertyCard />
				</Grid>
				<Grid item xs={12} sm={6} md={4}>
					<PropertyCard />
				</Grid>
			</Grid>
		</Box>
	);
}
export default ResultGrid;
