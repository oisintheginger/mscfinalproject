import { Stack, FormControlLabel, Checkbox } from "@mui/material";
function MapFeatureToggle({
	checkedState = false,
	changeStateFunc = () => {},
	label = "toggle label",
	icon = null,
}) {
	return (
		<Stack direction={"row"} alignItems={"center"}>
			<FormControlLabel
				control={
					<Checkbox
						sx={{
							color: "darkTeal.main",
							"&.Mui-checked": {
								color: "darkTeal.main",
							},
						}}
						checked={checkedState}
						onChange={(event) => {
							changeStateFunc(event.target.checked);
						}}
					/>
				}
				label={label}
				labelPlacement="end"
			/>
			{icon}
		</Stack>
	);
}

export default MapFeatureToggle;
