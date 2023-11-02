import { Paper, Typography, Box, Divider } from "@mui/material";
import PageTemplate from "./PageTemplate";

function ContactInformationPage() {
	return (
		<PageTemplate pageTitle="Contact Us" currPageBreadcrumb={"Contact Us"}>
			<Box width={"100%"} minHeight={"60vh"}>
				<Paper elevation={3} sx={{ padding: 2 }}>
					<Typography variant="body1">
						Housing Made Easy is a small scale student project for a final year
						MSc Project for TU059 at TU Dublin. As such, we do not have a
						dedicated Contact/Support Team. If you want to reach out to us to
						get involved or otherwise, please reach out to the below contact
						details.
					</Typography>
					<Divider />
					<Box mt={2}>
						<Typography variant="h2">Email</Typography>
						<Typography component={"a"} href="mailto:hmeprojectemail@gmail.com">
							hmeprojectemail@gmail.com
						</Typography>
					</Box>
				</Paper>
			</Box>
		</PageTemplate>
	);
}

export default ContactInformationPage;
