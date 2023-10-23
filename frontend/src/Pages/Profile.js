import PageTemplate from "./PageTemplate";
import { Typography, Box } from "@mui/material";
import { useAuthenticator } from "@aws-amplify/ui-react";

function Profile() {
	const { route } = useAuthenticator((context) => [context.route]);
	return (
		<PageTemplate pageTitle="My Profile" currPageBreadcrumb={"Profile"}>
			<Box width={"100%"}>
				<Typography width={"100%"} variant="body1">
					{route === "authenticated" ? "LOGGED IN" : "NOT LOGGED IN"}
				</Typography>
			</Box>
		</PageTemplate>
	);
}

export default Profile;
