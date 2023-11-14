import { styled } from "@mui/material";
import { darkTeal } from "../../../Styling/styleConstants";
import { ToggleButton } from "@mui/material";
const StyledToggle = styled(ToggleButton)({
	"&.Mui-selected, &.Mui-selected:hover": {
		backgroundColor: darkTeal,
	},
});
export default StyledToggle;
