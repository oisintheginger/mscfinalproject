import { Button } from "@mui/material";
import { SmallCloseIcon } from "../../Icons/HMEIcons";
function ActiveTag({ tagName, tagCount, deactivateFunc }) {
	return (
		<Button
			endIcon={<SmallCloseIcon sx={{ maxHeight: "24px" }} />}
			sx={{
				color: "fontDark",
				backgroundColor: "lightTeal.main",
			}}
			variant="contained"
		>
			{tagName + (tagCount ? ": " + tagCount : "")}
		</Button>
	);
}

export default ActiveTag;
