import { Button, Chip } from "@mui/material";
import { SmallCloseIcon } from "../../Icons/HMEIcons";
function ActiveTag({ tagName, tagCount, deactivateFunc = () => {} }) {
	return (
		<Chip
			label={tagName + (tagCount ? ": " + tagCount : "")}
			onDelete={deactivateFunc}
			sx={{
				color: "fontDark",
				backgroundColor: "lightTeal.main",
			}}
		/>
	);
}

export default ActiveTag;
