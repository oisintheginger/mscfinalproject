import {
	Collapse,
	Box,
	Typography,
	Paper,
	TextField,
	FormControl,
	FormGroup,
	Divider,
	FormControlLabel,
	Checkbox,
	Slider,
	Stack,
	Button,
} from "@mui/material";
import { useFormContext } from "react-hook-form";
import ButtonStyled from "../Button/ButtonStyled";
import {
	MIN_PRICE,
	MAX_PRICE,
	BEDROOM_COUNT,
	BATHROOM_COUNT,
	SHOW_FLAT,
	SHOW_HOUSES,
	SHOW_TOWNHOUSE,
} from "../../../Utils/filter_constants";
function FilterFields({ filtersOpen, setFiltersOpen = (_) => {} }) {
	const methods = useFormContext();
	return (
		<Collapse in={filtersOpen}>
			<Box
				width={"100%"}
				height={"400px"}
				maxHeight={"50vh"}
				border={1}
				borderRadius={1}
				borderColor="lightTeal.main"
				mt={1}
				mb={8}
			>
				<Paper
					elevation={4}
					sx={{
						height: "100%",
						overflowX: "clip",
						overflowY: "scroll",
					}}
				>
					<Stack justifyContent={"center"} pl={4} pr={4}>
						<FormControl
							component={"div"}
							variant="standard"
							sx={{
								width: "95%",
								justifyContent: "center",
							}}
							margin="dense"
						>
							<Typography variant="overline">Price</Typography>
							<Divider sx={{ mb: 2 }} />
							<Stack
								direction={"row"}
								width={"100%"}
								pl={1}
								justifyContent={"space-between"}
							>
								<FormControlLabel
									sx={{
										width: "100%",
										"&.MuiFormControlLabel-label": {
											color: "black",
											fontWeight: 700,
										},
									}}
									control={
										<TextField
											color="darkTeal"
											type="number"
											label="Min Price"
											fullWidth
											InputProps={{ height: "40px" }}
											{...methods.register(MIN_PRICE, {
												min: 1,
												// onChange: () => {
												// 	methods.trigger();
												// 	// if (methods.getValues(MIN_PRICE) < 1) {
												// 	// 	methods.setValue(MIN_PRICE, 1);
												// 	// }
												// 	// if (
												// 	// 	methods.getValues(MIN_PRICE) >
												// 	// 	methods.getValues(MAX_PRICE)
												// 	// ) {
												// 	// 	methods.setValue(
												// 	// 		MIN_PRICE,
												// 	// 		methods.getValues(MAX_PRICE)
												// 	// 	);
												// 	// }
												// },
											})}
										/>
									}
								/>
								<FormControlLabel
									sx={{ width: "100%" }}
									control={
										<TextField
											fullWidth
											color="darkTeal"
											type="number"
											label="Max Price"
											InputProps={{ height: "40px" }}
											{...methods.register(MAX_PRICE, {
												min: 1,
												// onChange: () => {
												// 	methods.trigger();
												// 	if (methods.getValues(MAX_PRICE) < 0) {
												// 		methods.setValue(MAX_PRICE, 0);
												// 		return;
												// 	}
												// },
											})}
										/>
									}
								/>
							</Stack>
							<Typography variant="overline" mt={2}>
								Min. Bedroom Count
							</Typography>
							<Divider sx={{ mb: 5 }} />
							<Slider
								aria-label="Bedroom Count"
								valueLabelDisplay="on"
								step={1}
								marks
								sx={{ color: "darkTeal.main" }}
								min={1}
								max={10}
								defaultValue={1}
								{...methods.register(BEDROOM_COUNT, { min: 1, max: 10 })}
							/>
							<Typography variant="overline" mt={3}>
								Min. Bathroom Count
							</Typography>
							<Divider sx={{ mb: 5 }} />
							<Slider
								aria-label="Bathroom Count"
								valueLabelDisplay="on"
								step={1}
								min={1}
								max={10}
								defaultValue={1}
								marks
								sx={{ color: "darkTeal.main" }}
								{...methods.register(BATHROOM_COUNT, { min: 1, max: 10 })}
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
													color: "darkTeal.main",
												},
											}}
											defaultChecked
										/>
									}
									label="House"
									labelPlacement="start"
									{...methods.register(SHOW_HOUSES)}
								/>
								<FormControlLabel
									control={
										<Checkbox
											sx={{
												color: "darkTeal.main",
												"&.Mui-checked": {
													color: "darkTeal.main",
												},
											}}
											defaultChecked
										/>
									}
									label="Flat/Apartment/Condo"
									labelPlacement="start"
									{...methods.register(SHOW_FLAT)}
								/>
								<FormControlLabel
									control={
										<Checkbox
											sx={{
												color: "darkTeal.main",
												"&.Mui-checked": {
													color: "darkTeal.main",
												},
											}}
											defaultChecked
										/>
									}
									label="Townhouse"
									labelPlacement="start"
									{...methods.register(SHOW_TOWNHOUSE)}
								/>
							</FormGroup>
						</FormControl>
					</Stack>
					<Box
						width={"100%"}
						alignItems={"center"}
						display={"flex"}
						flexDirection={"column"}
						sx={{
							position: "sticky",
							bottom: "0px",
							right: "0px",
							background:
								"linear-gradient(rgba(255, 255, 255, 0.0),rgba(255, 255, 255, 1))",
							pt: 1,
							pb: 1,
						}}
					>
						<Stack direction={"row"} spacing={2}>
							<ButtonStyled
								type="submit"
								sx={{
									backgroundColor: "darkTeal.main",
								}}
								onClick={(event) => {
									setFiltersOpen(false);
									methods.handleSubmit(
										methods.customSubmitBehavior
											? methods.customSubmitBehavior
											: () => {
													console.log("NO CUSTOM SUBMIT BEHAVIOR DEFINED");
											  }
									)(event);
								}}
							>
								APPLY FILTERS
							</ButtonStyled>
						</Stack>
					</Box>
				</Paper>
			</Box>
		</Collapse>
	);
}

export default FilterFields;
