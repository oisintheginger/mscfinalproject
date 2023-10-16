import {
	Box,
	TextField,
	Typography,
	Paper,
	ButtonGroup,
	Collapse,
	Stack,
	FormControl,
	FormControlLabel,
	FormGroup,
	Slider,
	Checkbox,
	Divider,
} from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import { BookmarkIcon, FilterIcon } from "../../Icons/HMEIcons";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";
import ActiveTag from "../ActiveTag/ActiveTag";
import FilterFields from "../CommonComp/FilterFields/FilterFields";

function SearchAndFilters() {
	const theme = useTheme();
	const above = useMediaQuery(theme.breakpoints.up("sm"));

	const filterSubmit = (event) => {};

	const [filtersOpen, setFiltersOpen] = useState(false);
	return (
		<Box
			component="div"
			sx={{ width: "100%", flexGrow: 1, height: "max-content" }}
		>
			<Grid container spacing={2}>
				<Grid xs={12} md={8}>
					<TextField
						label="Search Here"
						sx={{ width: "100%", height: "fit-content" }}
						color="darkTeal"
						InputProps={{ height: "40px" }}
					></TextField>
				</Grid>
				<Grid xs={12} md={4}>
					<ButtonGroup fullWidth>
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
					</ButtonGroup>
				</Grid>
				<Grid xs={4} md={2} height={"100%"}></Grid>
				<Grid xs={4} md={2} height={"100%"}></Grid>
			</Grid>
			<FilterFields filtersOpen={filtersOpen} filtersSubmit={filterSubmit} />
			<Stack
				direction={"row"}
				flexWrap={"wrap"}
				justifyContent={"flex-start"}
				useFlexGap
				spacing={1}
			>
				<ActiveTag tagName={"Beds"} tagCount={"1"} />
				<ActiveTag tagName={"Beds"} tagCount={"1"} />
				<ActiveTag tagName={"Beds"} tagCount={"1"} />
				<ActiveTag tagName={"Beds"} tagCount={"1"} />
				<ActiveTag tagName={"Beds"} tagCount={"1"} />
				<ActiveTag tagName={"Beds"} tagCount={"1"} />
				<ActiveTag tagName={"Beds"} tagCount={"1"} />
				<ActiveTag tagName={"Beds"} tagCount={"1"} />
				<ActiveTag tagName={"Beds"} tagCount={"1"} />
				<ActiveTag tagName={"Beds"} tagCount={"1"} />
			</Stack>
		</Box>
	);
}

export default SearchAndFilters;
