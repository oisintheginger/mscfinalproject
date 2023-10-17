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
} from "@mui/material";
import { useFormContext } from "react-hook-form";
import ButtonStyled from "../Button/ButtonStyle";
function FilterFields({ filtersOpen, secondarySubmitFunc = (data) => {} }) {
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
				mb={8}
			>
				<Paper
					elevation={4}
					sx={{
						height: "100%",
						overflowX: "clip",
						overflowY: "scroll",
						pt: 3,

						justifyContent: "center",
					}}
				>
					<FormControl
						component={"div"}
						variant="standard"
						sx={{
							width: "95%",
							justifyContent: "center",
							pl: 4,
							pr: 4,
						}}
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
										{...methods.register("minPrice")}
										onChange={(event) => {
											if (event.target.value > methods.getValues("maxPrice")) {
												event.target.value = methods.getValues("maxPrice");
											}
										}}
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
										{...methods.register("maxPrice")}
										onChange={(event) => {
											if (event.target.value < methods.getValues("minPrice")) {
												event.target.value = methods.getValues("minPrice");
											}
										}}
									/>
								}
							/>
						</FormGroup>
						<Typography variant="overline" mt={2}>
							Bedroom Count
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
							{...methods.register("bedroomCount", { min: 1, max: 10 })}
						/>
						<Typography variant="overline" mt={3}>
							Bathroom Count
						</Typography>
						<Divider sx={{ mb: 5 }} />
						<Slider
							aria-label="Bathroom Count"
							valueLabelDisplay="on"
							step={1}
							min={1}
							max={10}
							marks
							sx={{ color: "darkTeal.main" }}
							{...methods.register("bathroomCount", { min: 1, max: 10 })}
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
								{...methods.register("includeHouse")}
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
								{...methods.register("includeFlatApartmentCondo")}
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
								{...methods.register("includeTownhouse")}
							/>
						</FormGroup>
					</FormControl>
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
						<ButtonStyled
							type="submit"
							sx={{
								backgroundColor: "darkTeal.main",
							}}
							onClick={methods.handleSubmit(
								methods.customSubmitBehavior
									? methods.customSubmitBehavior
									: () => {
											console.log("NO CUSTOM SUBMIT BEHAVIOR DEFINED");
									  }
							)}
						>
							APPLY FILTERS
						</ButtonStyled>
					</Box>
				</Paper>
			</Box>
		</Collapse>
	);
}

export default FilterFields;
