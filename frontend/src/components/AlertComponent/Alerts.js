import { Alert } from "@mui/material";
import { forwardRef } from "react";

export const SnackbarAlert = forwardRef(({ message, severity }, ref) => {
	return (
		<Alert severity={severity || "success"} ref={ref}>
			{message || "Success"}
		</Alert>
	);
});
