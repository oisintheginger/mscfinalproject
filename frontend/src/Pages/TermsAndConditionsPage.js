import { Paper, Box, Typography, Divider } from "@mui/material";
import PageTemplate from "./PageTemplate";
function TermsAndConditions() {
	return (
		<PageTemplate
			pageTitle="Terms and Conditions"
			currPageBreadcrumb={"Terms and Condition"}
		>
			<Box width={"100%"} minHeight={"60vh"}>
				<Paper elevation={3} sx={{ padding: 2 }}>
					<Box>
						<Typography variant="body2">
							{
								"These terms and conditions govern the use of HME (the Site). This Site is owned and operated by the HME Team. This Site is a rental listings website, connecting with external 3rd Party APIs and Services, including but not limited to Google Places/Google Maps API. \n By using this Site, you indicate that you have read and understand these Terms and Conditions and agree to abide by them at all times."
							}
						</Typography>
					</Box>
					<Box mt={3}>
						<Typography variant="h2">{"Notice"}</Typography>
						<Divider />
						<Typography variant="body2">
							{
								"This site makes use of third party APIs to gather publicly posted rental listings data from Zillow.com. This site uses this data as part of developing a proof of concept Rental Listings Site featuring a recommendation system. This is not a commercial project, and is being developed strictly for educational purposes in pursuit of the MSc in TU059 at Technological University Dublin. We do not claim any right to the properties listed on this site. If you own a property on this site and wish to see the listing removed, please get in contact and we will facilitate removal."
							}
						</Typography>
					</Box>
					<Box mt={3}>
						<Typography variant="h2">{"Acceptable Use"}</Typography>
						<Divider />
						<Typography variant="body2">
							{
								"As a user of the Site, you agree to use our Site legally, not to use our Site for illegal purposes, and not to:"
							}
						</Typography>
						<ul>
							<li>
								<Typography variant="body2">
									{"Harass or mistreat other users of the Site"}
								</Typography>
							</li>
							<li>
								<Typography variant="body2">
									{"Violate the rights of other users of the Site"}
								</Typography>
							</li>
							<li>
								<Typography variant="body2">
									{"Hack into the account of another user of the Site"}
								</Typography>
							</li>
							<li>
								<Typography variant="body2">
									{"Act in any way that could be considered fraudulent; or"}
								</Typography>
							</li>
							<li>
								<Typography variant="body2">
									{
										"Post any material that may be deemed inappropriate or offensive"
									}
								</Typography>
							</li>
						</ul>
						<Typography variant="body2">
							{
								"If we believe you are using our Site illegally or in a manner that violates these Terms and Conditions, we reserve the right to limit, suspend or terminate your access to the Site. WE also reserve the right to take any legal steps necessary to prevent you from accessing our Site."
							}
						</Typography>
					</Box>
					<Box mt={3}>
						<Typography variant="h2">{"Accounts"}</Typography>
						<Divider />
						<Typography variant="body2">
							{
								"When you create an account on the site, you agree to the following:"
							}
						</Typography>
						<ul>
							<li>
								<Typography variant="body2">
									{
										"You are solely responsible for your account and the security and privacy of you account, including passwords or sensitive information attached to that account; and"
									}
								</Typography>
							</li>
							<li>
								<Typography variant="body2">
									{
										"All personal information you provide to us through your account is up to date, accurate, and truthful and that you will update your personal information if it changes."
									}
								</Typography>
							</li>
						</ul>
						<Typography variant="body2">
							{
								"We reserve the right to suspend or terminate your account if you are using our Site illegally or if you violate these Terms and Conditions"
							}
						</Typography>
					</Box>
					<Box mt={3}>
						<Typography variant="h2">{"Limited Liability"}</Typography>
						<Divider />
						<Typography variant="body2">
							{
								"The team, and its affiliates will not be liable for any actions, claims, losses, damages, liabilities and expenses including legal fess from your use of the Site."
							}
						</Typography>
					</Box>
					<Box mt={3}>
						<Typography variant="h2">{"Indemnity"}</Typography>
						<Divider />
						<Typography variant="body2">
							{
								"Except where prohibited by law, by using this Site, you indemnify and hold harmless the HME team, and its affiliates, from any actions, claims, losses, damages, liabilities and expenses including legal fees arising out of your use of the Site or your violation of these Terms and Conditions."
							}
						</Typography>
					</Box>
					<Box mt={3}>
						<Typography variant="h2">{"Applicable Law"}</Typography>
						<Divider />
						<Typography variant="body2">
							{"These Terms and Conditions are governed by the laws of Ireland"}
						</Typography>
					</Box>
					<Box mt={3}>
						<Typography variant="h2">{"Severability"}</Typography>
						<Divider />
						<Typography variant="body2">
							{
								"If at any time any of the provisions set forth in these Terms and Conditions are found to be inconsistent or invalid under applicable laws, those provisions will be deemed void and will be removed from these Terms and Conditions. All other provisions will not be affected by the removal and the rest of these Terms and Conditions will still be considered valid."
							}
						</Typography>
					</Box>
					<Box mt={3}>
						<Typography variant="h2">{"Changes"}</Typography>
						<Divider />
						<Typography variant="body2">
							{
								"These Terms and Conditions may be amended from time to time in order to maintain compliance with the law and to reflect any changes to the way we operate our Site and the wa we expect users to behave on our Site. We will aim to notify users by email of changes to these Terms and Conditions."
							}
						</Typography>
					</Box>
					<Box mt={3}>
						<Typography variant="h2">{"Contact"}</Typography>
						<Divider />
						<Typography
							component={"a"}
							variant="body2"
							href="mailto:hmeprojectemail@gmail.com"
						>
							hmeprojectemail@gmail.com
						</Typography>
					</Box>
				</Paper>
			</Box>
		</PageTemplate>
	);
}
export default TermsAndConditions;
