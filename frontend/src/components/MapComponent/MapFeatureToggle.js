import { Stack, FormControlLabel, Checkbox, Typography } from "@mui/material";
function MapFeatureToggle({
	checkedState = false,
	changeStateFunc = () => {},
	label = "toggle label",
	icon = null,
}) {
	return (
		<Stack direction={"row"} alignItems={"center"}>
			<FormControlLabel
				aria-label={`${label} Map Toggle`}
				control={
					<Checkbox
						sx={{
							color: "darkTeal.main",
							"&.Mui-checked": {
								color: "darkTeal.main",
							},
						}}
						size="medium"
						checked={checkedState}
						onChange={(event) => {
							changeStateFunc(event.target.checked);
						}}
						aria-label={`${label} Map Toggle`}
					/>
				}
			/>
			{icon}
			<Typography variant="mapToggleFont" pl={1}>
				{label}
			</Typography>
		</Stack>
	);
}

export default MapFeatureToggle;
