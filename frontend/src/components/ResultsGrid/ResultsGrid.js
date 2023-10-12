import Grid from "@mui/material/Grid";
import PropertyCard from "../PropertyCard/PropertyCard";
import {
	Box,
	Stack,
	Typography,
	Divider,
	Button,
	useTheme,
} from "@mui/material";
import { SortIcon } from "../../Icons/HMEIcons";
import useMediaQuery from "@mui/material/useMediaQuery";

function ResultGrid({ propertyData }) {
	const theme = useTheme();

	const above = useMediaQuery(theme.breakpoints.up("sm"));

	return (
		<Box m={0}>
			<Stack
				direction={"row"}
				alignItems={"flex-end"}
				justifyContent={"space-between"}
				mb={1}
				pl={0}
				pr={1}
			>
				<Typography variant="h3">
					{above ? "RESULTS IN THIS AREA" : "RESULTS"}
				</Typography>
				<Button
					variant="outlined"
					color="darkTeal"
					sx={{
						justifyContent: { xs: "center", sm: "start" },
					}}
					startIcon={<SortIcon />}
				>
					{above && (
						<Typography variant="button" display={"block"}>
							Sort
						</Typography>
					)}
				</Button>
			</Stack>

			<Divider />
			<Grid container spacing={0} width={"100%"} padding={0} m={0}>
				{propertyData.map((data, key) => {
					return (
						<Grid item xs={12} sm={6} md={4}>
							<PropertyCard data={data} key={key} />
						</Grid>
					);
				})}
			</Grid>
		</Box>
	);
}
export default ResultGrid;
