import { Box, TextField, Typography, Paper, ButtonGroup } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import { BookmarkIcon, FilterIcon, SortIcon } from "../../Icons/HMEIcons";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { useState } from "react";
import { darkTeal } from "../../Styling/styleConstants";
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
				<Grid Grid xs={12} md={6}>
					<ButtonGroup fullWidth>
						<Button
							variant="outlined"
							color="darkTeal"
							sx={{
								height: "55px",
								justifyContent: { xs: "center", sm: "start" },
								fontSize: 2,
							}}
							startIcon={<BookmarkIcon />}
						>
							{above && (
								<Typography variant="button" display={"block"}>
									Save Search
								</Typography>
							)}
						</Button>
						<Button
							variant="outlined"
							color="darkTeal"
							sx={{
								height: "55px",
								justifyContent: { xs: "center", sm: "start" },
							}}
							startIcon={<FilterIcon />}
							onClick={() => setFiltersOpen((prev) => !prev)}
						>
							{above && (
								<Typography variant="button" display={"block"}>
									Filter
								</Typography>
							)}
						</Button>
						<Button
							variant="outlined"
							color="darkTeal"
							sx={{
								height: "55px",
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
					</ButtonGroup>
				</Grid>
				<Grid xs={4} md={2} height={"100%"}></Grid>
				<Grid xs={4} md={2} height={"100%"}></Grid>
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
							paddingLeft: 2,
							paddingRight: 2,
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
