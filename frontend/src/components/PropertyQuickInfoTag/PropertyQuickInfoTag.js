import { Chip } from "@mui/material";
import { darkTeal } from "../../Styling/styleConstants";
function PropertyQuickInfoTag({ label = "LABEL TEXT HERE" }) {
	return (
		<Chip
			label={label}
			variant="outlined"
			sx={{
				color: darkTeal,
				borderWidth: 1,
				borderColor: darkTeal,
				borderRadius: 2,
				"& .MuiChip-label": {
					fontSize: 16,
					fontFamily: '"Urbanist", sans-serif',
					fontWeight: 600,
				},
			}}
		/>
	);
}

export default PropertyQuickInfoTag;
