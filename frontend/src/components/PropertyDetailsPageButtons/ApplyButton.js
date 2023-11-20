import { Button } from "@mui/material";
import { ApplicationIcon } from "../../Icons/HMEIcons";
export function ApplyButton({ action = () => {}, down = false }) {
	return (
		<Button
			onClick={() => {
				action();
			}}
			variant="outlined"
			sx={{
				maxWidth: down ? "100vw" : "30vw",
				transform: "translate(0px, 8px)",
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
	);
}

export function ViewApplication({ action = () => {}, down = false }) {
	return (
		<Button
			onClick={() => {
				action();
			}}
			variant="outlined"
			sx={{
				maxWidth: "30vw",
				transform: "translate(0px, 8px)",
				backgroundColor: "darkTeal.main",

				"&:hover": {
					backgroundColor: "buttonHover.main",
					color: "darkWhite.main",
				},
				marginRight: 2,
				height: 45,
			}}
			endIcon={<ApplicationIcon fontSize="large" />}
		>
			Apply Now
		</Button>
	);
}
