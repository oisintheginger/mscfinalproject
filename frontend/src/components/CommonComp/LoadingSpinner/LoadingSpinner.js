import { Stack, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

function LoadingSpinner({ message = null }) {
	const text = message ? message : "Loading";
	return (
		<Stack alignItems={"center"} spacing={4} mt={5}>
			<CircularProgress color="primary" sx={{ color: "grey.500" }} />
			<Typography textAlign={"center"} variant="systemState" color={"#414c4d"}>
				{text}
			</Typography>
		</Stack>
	);
}

export default LoadingSpinner;
