import PageTemplate from "./PageTemplate";
import { Paper, Box, Typography, Divider } from "@mui/material";
import YouTubeVideo from "./Youtube links/YouTubeVideo";

function FAQPage() {
	return (
		<PageTemplate
			pageTitle="Frequently Asked Questions"
			currPageBreadcrumb={"FAQ"}
		>
			<Box width={"100%"} minHeight={"60vh"}>
				<Paper elevation={3} sx={{ padding: 2 }}>
					<Box mt={5}>
						<Typography variant="h2">Using the website</Typography>
						<Divider />
						<Typography variant="body2">
							<YouTubeVideo videoId="ghaVrwo1_ok" />
						</Typography>
					</Box>
					<Box mt={5}>
						<Typography variant="h2">
							Information about Scoring System{" "}
						</Typography>
						<Divider />
						<Typography variant="body2">
							SEAN GIMME THE DETAILS BUT STOOPIDIFIED PLEEEEEAAAAASE!!!!!!
						</Typography>
					</Box>
					<Box mt={5}>
						<Typography variant="h2">
							Information about the Tagging System
						</Typography>
						<Divider />
						<Typography variant="body2">
							The tags serve as quick indicators for users, providing valuable
							insights into the properties and their surroundings. The "Secure"
							tag informs users of low crime records in the area, the
							"Sufficient Amenities" tag highlights properties with
							above-average facilities, and the "Services" tag showcases the
							dominant local service, helping users in making informed decisions
							aligned with their preferences and priorities. Multiple services
							tag is on properties that have multiple different local services
							dominating around them. You can click on the properties to view
							more details.
						</Typography>
					</Box>
					<Box mt={5}>
						<Typography variant="h2">
							Information about Recommendation System{" "}
						</Typography>
						<Divider />
						<Typography variant="body2">
							NISHANTY GIMME THE DETAILS BUT STOOPIDIFIED PLEEEEEAAAAASE!!!!!!
						</Typography>
					</Box>
				</Paper>
			</Box>
		</PageTemplate>
	);
}

export default FAQPage;
