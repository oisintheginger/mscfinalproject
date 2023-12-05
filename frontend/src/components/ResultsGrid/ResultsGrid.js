import Grid from "@mui/material/Grid";
import PropertyCard from "../CommonComp/Cards/PropertyCard/PropertyCard";
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
import { forwardRef } from "react";

function ResultGrid(
	{ propertyData, displayTitle = "RESULTS IN THIS AREA", id = null },
	ref
) {
	const theme = useTheme();

	const above = useMediaQuery(theme.breakpoints.up("sm"));
	if (!propertyData) return <></>;
	return (
		<Box
			id={id}
			sx={{ minHeight: "55vh" }}
			display={"flex"}
			flexDirection={"column"}
			alignItems={"center"}
			ref={ref}
		>
			<Box
				direction={"column"}
				alignItems={"flex-start"}
				display={"flex"}
				flexDirection={"column"}
				width={"100%"}
			>
				<Typography variant="h2" textAlign={"left"}>
					{above ? displayTitle : "RESULTS"}
				</Typography>
				<Divider sx={{ width: "100%" }} />
			</Box>
			<Grid container spacing={2} width={"100%"} mt={0.5}>
				{propertyData?.map((data, key) => {
					return (
						<Grid item xs={12} sm={6} md={4} lg={4} key={key}>
							<PropertyCard data={data} />
						</Grid>
					);
				})}
			</Grid>
		</Box>
	);
}
export default forwardRef(ResultGrid);
