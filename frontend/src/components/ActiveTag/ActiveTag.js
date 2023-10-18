import { Button, Chip } from "@mui/material";
import { SmallCloseIcon } from "../../Icons/HMEIcons";
function ActiveTag({ tagName, tagVal, deactivateFunc = () => {} }) {
	return (
		<Chip
			label={tagName + (tagVal ? ": " + tagVal : "")}
			sx={{
				color: "greyDark.main",
				backgroundColor: "lightTeal.main",
				fontWeight: 600,
				fontFamily: "'Urbanist', sans-serif",
			}}
		/>
	);
}

export default ActiveTag;
