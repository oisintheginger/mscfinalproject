import { Box, TextField, Typography, Paper } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import { fontDark } from "../../Styling/styleConstants";
import { BookmarkIcon, FilterIcon, SortIcon } from "../../Icons/HMEIcons";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { useState } from "react";
function SearchAndFilters() {
	const theme = useTheme();
	const above = useMediaQuery(theme.breakpoints.up("sm"));

	const [filtersOpen, setFiltersOpen] = useState(false);
	return (
		<Box
			component="div"
			sx={{ width: "100%", flexGrow: 1, height: "max-content" }}
		>
			<Grid container spacing={2}>
				<Grid xs={12} md={6}>
					<TextField
						label="Search Here"
						sx={{ width: "100%", height: "fit-content" }}
						color="darkTeal"
						InputProps={{ height: "40px" }}
					></TextField>
				</Grid>
				<Grid xs={4} md={2} height={"100%"}>
					<Button
						variant="outlined"
						color="darkTeal"
						sx={{
							height: "55px",
							width: "100%",
							justifyContent: { xs: "center", sm: "start" },
						}}
						startIcon={<BookmarkIcon />}
						onClick={() => setFiltersOpen((prev) => !prev)}
					>
						{above && (
							<Typography variant="button" display={"block"}>
								Save Search
							</Typography>
						)}
					</Button>
				</Grid>
				<Grid xs={4} md={2} height={"100%"}>
					<Button
						variant="outlined"
						color="darkTeal"
						sx={{
							width: "100%",
							height: "55px",
							justifyContent: { xs: "center", sm: "start" },
						}}
						startIcon={<FilterIcon />}
					>
						{above && (
							<Typography variant="button" display={"block"}>
								Filter
							</Typography>
						)}
					</Button>
				</Grid>
				<Grid xs={4} md={2} height={"100%"}>
					<Button
						variant="outlined"
						color="darkTeal"
						sx={{
							height: "55px",
							width: "100%",
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
				</Grid>
			</Grid>
			{filtersOpen && (
				<Box width={"100%"} height={"200px"} mt={1}>
					<Paper
						elevation={3}
						sx={{
							backgroundColor: "lightTeal.main",
							height: "100%",
							overflowX: "clip",
							overflowY: "scroll",
						}}
					>
						<Typography variant="h1">
							glfnjdhbfksfnjvhsbhfknjbjhc hvshf
						</Typography>
						<Typography variant="h1">jgsnbghusbfdf</Typography>

						<Typography variant="h1">jgsnbghusbfdf</Typography>

						<Typography variant="h1">jgsnbghusbfdf</Typography>
					</Paper>
				</Box>
			)}
		</Box>
	);
}

export default SearchAndFilters;
