import { Typography, Alert } from "@mui/material";

import StarOutline from "@mui/icons-material/StarOutline";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";

const SnackbarAlertMap = {
	added_favorite: (
		<Alert
			severity={"success"}
			variant="filled"
			icon={<StarOutline fontSize="medium" />}
			sx={{ alignItems: "center" }}
		>
			<Typography variant="alertToast" sx={{ color: "white" }}>
				Added To Favorites
			</Typography>
		</Alert>
	),
	removed_favorite: (
		<Alert
			severity={"success"}
			variant="filled"
			icon={<DeleteOutlineOutlinedIcon fontSize="medium" />}
			sx={{ alignItems: "center" }}
		>
			<Typography variant="alertToast" sx={{ color: "white" }}>
				Removed From Favorites
			</Typography>
		</Alert>
	),
	created_application: (
		<Alert
			severity={"success"}
			variant="filled"
			icon={<DescriptionOutlinedIcon fontSize="medium" />}
			sx={{ alignItems: "center" }}
		>
			<Typography variant="alertToast" sx={{ color: "white" }}>
				Created Application
			</Typography>
		</Alert>
	),
	adjusted_weights: (
		<Alert
			severity={"success"}
			variant="filled"
			icon={<FormatListNumberedIcon fontSize="medium" />}
			sx={{ alignItems: "center" }}
		>
			<Typography variant="alertToast" sx={{ color: "white" }}>
				Successfully Adjusted Weights
			</Typography>
		</Alert>
	),
	error_added_favorite: (
		<Alert severity={"error"} variant="filled" sx={{ alignItems: "center" }}>
			<Typography variant="alertToast" sx={{ color: "white" }}>
				Error Adding to Favorites
			</Typography>
		</Alert>
	),
	error_removing_favorite: (
		<Alert severity={"error"} variant="filled" sx={{ alignItems: "center" }}>
			<Typography variant="alertToast" sx={{ color: "white" }}>
				Error Removing Favorites
			</Typography>
		</Alert>
	),
	error_application: (
		<Alert severity={"error"} variant="filled" sx={{ alignItems: "center" }}>
			<Typography variant="alertToast" sx={{ color: "white" }}>
				Error Creating Application
			</Typography>
		</Alert>
	),
	error_adjusted_weights: (
		<Alert severity={"error"} variant="filled" sx={{ alignItems: "center" }}>
			<Typography variant="alertToast" sx={{ color: "white" }}>
				Error Updating Weights
			</Typography>
		</Alert>
	),
};

export default SnackbarAlertMap;
