import { Stack, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

function LoadingSpinner({ message = null }) {
	const text = message ? message : "Loading";
	return (
		<Stack alignItems={"center"} spacing={4}>
			<Typography>{text}</Typography>
			<CircularProgress color="primary" sx={{ color: "grey.500" }} />
		</Stack>
	);
}

export default LoadingSpinner;
