import { Button, Tooltip } from "@mui/material";
import { ApplicationIcon } from "../../Icons/HMEIcons";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
export function ApplyButton({ action = () => {}, down = false }) {
	return (
		<Tooltip title="Apply to rent Property">
			<Button
				onClick={() => {
					action();
				}}
				variant="outlined"
				sx={{
					width: down ? "100%" : "20vw",
					transform: down ? "" : "translate(0px, 8px)",
					backgroundColor: "darkTeal.main",

					"&:hover": {
						backgroundColor: "buttonHover.main",
						color: "darkWhite.main",
					},
					marginRight: 2,
					height: 45,
				}}
				fullWidth={down}
				endIcon={<ApplicationIcon fontSize="large" />}
			>
				Apply Now
			</Button>
		</Tooltip>
	);
}

export function ViewApplication({ action = () => {}, down = false }) {
	return (
		<Tooltip title="View Application on My Applications">
			<Button
				onClick={() => {
					action();
				}}
				variant="outlined"
				sx={{
					width: down ? "100%" : "20vw",
					transform: down ? "" : "translate(0px, 8px)",
					backgroundColor: "darkWhite.main",
					borderColor: "darkTeal.main",
					color: "darkTeal.main",
					"&:hover": {
						backgroundColor: "lightGrey.main",
						borderColor: "darkTeal.main",

						color: "darkTeal.main",
					},
					marginRight: 2,
					height: 45,
				}}
				endIcon={<ChevronRightIcon fontSize="large" />}
			>
				View Application
			</Button>
		</Tooltip>
	);
}
