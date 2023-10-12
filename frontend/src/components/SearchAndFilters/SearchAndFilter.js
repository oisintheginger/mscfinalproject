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
	FormLabel,
	FormGroup,
	Slider,
	Checkbox,
	Divider,
} from "@mui/material";
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
				<Grid Grid xs={12} md={4}>
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
			<Collapse in={filtersOpen}>
				<Box
					width={"100%"}
					height={"400px"}
					maxHeight={"50vh"}
					border={1}
					borderRadius={1}
					borderColor="lightTeal.main"
					mb={8}
					component={"form"}
					onSubmit={filterSubmit}
				>
					<Paper
						elevation={4}
						sx={{
							height: "100%",
							overflowX: "clip",
							overflowY: "scroll",
							padding: 2,
							justifyContent: "center",
						}}
					>
						<FormControl
							component={"fieldset"}
							variant="standard"
							sx={{ width: "95%", justifyContent: "center", paddingBottom: 4 }}
							margin="dense"
						>
							<Typography variant="overline">Price</Typography>
							<Divider sx={{ mb: 2 }} />
							<FormGroup
								row={true}
								sx={{ justifyContent: "space-between", padding: 2 }}
							>
								<FormControlLabel
									sx={{ maxWidth: "25vw" }}
									control={
										<TextField
											color="darkTeal"
											type="number"
											label="Min Price"
											InputProps={{ height: "40px" }}
										/>
									}
								/>
								<FormControlLabel
									sx={{ maxWidth: "25vw" }}
									control={
										<TextField
											color="darkTeal"
											type="number"
											label="Max Price"
											InputProps={{ height: "40px" }}
										/>
									}
								/>
							</FormGroup>
							<Typography variant="overline" mt={3}>
								Bedroom Count
							</Typography>
							<Divider sx={{ mb: 2 }} />
							<Slider
								aria-label="Temperature"
								defaultValue={30}
								getAriaValueText={""}
								valueLabelDisplay="on"
								step={1}
								marks
								min={1}
								max={10}
								sx={{ color: "darkTeal.main" }}
							/>
							<Typography variant="overline" mt={3}>
								Bathroom Count
							</Typography>
							<Divider sx={{ mb: 2 }} />
							<Slider
								aria-label="Temperature"
								defaultValue={30}
								getAriaValueText={""}
								valueLabelDisplay="on"
								step={1}
								marks
								min={1}
								max={10}
								sx={{ color: "darkTeal.main" }}
							/>
							<Typography variant="overline" mt={4}>
								Home Type
							</Typography>
							<Divider sx={{ mb: 2 }} />
							<FormGroup row={true} sx={{ justifyContent: "space-between" }}>
								<FormControlLabel
									control={
										<Checkbox
											sx={{
												color: "darkTeal.main",
												"&.Mui-checked": {
													color: darkTeal,
												},
											}}
										/>
									}
									label="House"
									labelPlacement="right"
								/>
								<FormControlLabel
									control={
										<Checkbox
											sx={{
												color: "darkTeal.main",
												"&.Mui-checked": {
													color: darkTeal,
												},
											}}
										/>
									}
									label="Flat/Apartment/Condo"
									labelPlacement="right"
								/>
								<FormControlLabel
									control={
										<Checkbox
											sx={{
												color: "darkTeal.main",
												"&.Mui-checked": {
													color: darkTeal,
												},
											}}
										/>
									}
									label="Townhouse"
									labelPlacement="right"
								/>
							</FormGroup>
						</FormControl>
					</Paper>
				</Box>
			</Collapse>
			{/* <Typography variant="h3" sx={{ mb: 1 }}>
				Active Tags
			</Typography> */}
			{/* <Divider /> */}
			<Stack
				direction={"row"}
				flexWrap={"wrap"}
				justifyContent={"flex-start"}
				useFlexGap
				spacing={2}
			>
				<Paper sx={{ backgroundColor: "lightTeal.main" }}>
					<Typography>TAG1</Typography>
				</Paper>
				<Paper sx={{ backgroundColor: "lightTeal.main" }}>
					<Typography>TAG1</Typography>
				</Paper>
				<Paper sx={{ backgroundColor: "lightTeal.main" }}>
					<Typography>TAG1</Typography>
				</Paper>
				<Paper sx={{ backgroundColor: "lightTeal.main" }}>
					<Typography>TAG1</Typography>
				</Paper>
				<Paper sx={{ backgroundColor: "lightTeal.main" }}>
					<Typography>TAG1</Typography>
				</Paper>
				<Paper sx={{ backgroundColor: "lightTeal.main" }}>
					<Typography>TAG1</Typography>
				</Paper>
				<Paper sx={{ backgroundColor: "lightTeal.main" }}>
					<Typography>TAG1</Typography>
				</Paper>
				<Paper sx={{ backgroundColor: "lightTeal.main" }}>
					<Typography>TAG1</Typography>
				</Paper>
				<Paper sx={{ backgroundColor: "lightTeal.main" }}>
					<Typography>TAG1</Typography>
				</Paper>
				<Paper sx={{ backgroundColor: "lightTeal.main" }}>
					<Typography>TAG1</Typography>
				</Paper>
				<Paper sx={{ backgroundColor: "lightTeal.main" }}>
					<Typography>TAG1</Typography>
				</Paper>
				<Paper sx={{ backgroundColor: "lightTeal.main" }}>
					<Typography>TAG1</Typography>
				</Paper>
				<Paper sx={{ backgroundColor: "lightTeal.main" }}>
					<Typography>TAG1</Typography>
				</Paper>
				<Paper sx={{ backgroundColor: "lightTeal.main" }}>
					<Typography>TAG1</Typography>
				</Paper>
			</Stack>
		</Box>
	);
}

export default SearchAndFilters;
