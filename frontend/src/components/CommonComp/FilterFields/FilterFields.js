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
} from "@mui/material";
function FilterFields({ filtersOpen, filtersSubmit }) {
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
				component={"form"}
				onSubmit={filtersSubmit}
			>
				<Paper
					elevation={4}
					sx={{
						height: "100%",
						overflowX: "clip",
						overflowY: "scroll",
						padding: 3,
						justifyContent: "center",
					}}
				>
					<FormControl
						component={"form"}
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
						<Typography variant="overline" mt={2}>
							Bedroom Count
						</Typography>
						<Divider sx={{ mb: 5 }} />
						<Slider
							aria-label="Bedroom Count"
							defaultValue={1}
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
						<Divider sx={{ mb: 5 }} />
						<Slider
							aria-label="Bathroom Count"
							defaultValue={1}
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
												color: "darkTeal.main",
											},
										}}
									/>
								}
								label="House"
								labelPlacement="start"
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
									/>
								}
								label="Flat/Apartment/Condo"
								labelPlacement="start"
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
									/>
								}
								label="Townhouse"
								labelPlacement="start"
							/>
						</FormGroup>
					</FormControl>
				</Paper>
			</Box>
		</Collapse>
	);
}

export default FilterFields;
