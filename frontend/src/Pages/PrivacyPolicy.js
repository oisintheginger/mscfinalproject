import { Paper, Box, Typography, Divider } from "@mui/material";
import PageTemplate from "./PageTemplate";

function PrivacyPolicy() {
	return (
		<PageTemplate
			pageTitle="Privacy Notice"
			currPageBreadcrumb={"Privacy Policy"}
		>
			<Box width={"100%"} minHeight={"60vh"}>
				<Paper elevation={3} sx={{ padding: 2 }}>
					<Box>
						<Typography variant="body2">
							Housing Made Easy operates the
							https://main.d3k55wy8obq996.amplifyapp.com/ website, which
							provides the SERVICE.
						</Typography>
						<br />
						<Typography variant="body2">
							This page is used to inform website visitors regarding our
							policies with the collection, use, and disclosure of Personal
							Information if anyone decided to use our Service, the Housing Made
							Easy website.
						</Typography>
						<br />

						<Typography variant="body2">
							If you choose to use our Service, then you agree to the collection
							and use of information in relation with this policy. The Personal
							Information that we collect are used for providing and improving
							the Service. We will not use or share your information with anyone
							except as described in this Privacy Policy.
						</Typography>
						<br />

						<Typography variant="body2">
							The terms used in this Privacy Policy have the same meanings as in
							our Terms and Conditions, which is accessible at
							https://main.d3k55wy8obq996.amplifyapp.com/, unless otherwise
							defined in this Privacy Policy.
						</Typography>
					</Box>

					<Box mt={5}>
						<Typography variant="h2">Information Collection and Use</Typography>
						<Divider />
						<Typography variant="body2">
							For a better experience while using our Service, we may require
							you to provide us with certain personally identifiable
							information, including but not limited to your name, phone number,
							and postal address. The information that we collect will be used
							to contact or identify you.
						</Typography>
					</Box>
					<Box mt={5}>
						<Typography variant="h2">Log Data</Typography>
						<Divider />
						<Typography variant="body2">
							We want to inform you that whenever you visit our Service, we
							collect information that your browser sends to us that is called
							Log Data. This Log Data may include information such as your
							computer's Internet Protocol ("IP") address, browser version,
							pages of our Service that you visit, the time and date of your
							visit, the time spent on those pages, and other statistics.
						</Typography>
					</Box>
					<Box mt={5}>
						<Typography variant="h2">Cookies</Typography>
						<Divider />
						<Typography variant="body2">
							Cookies are files with small amount of data that is commonly used
							an anonymous unique identifier. These are sent to your browser
							from the website that you visit and are stored on your computer's
							hard drive.
						</Typography>
						<br />
						<Typography variant="body2">
							Our website uses these "cookies" to collection information and to
							improve our Service. You have the option to either accept or
							refuse these cookies, and know when a cookie is being sent to your
							computer. If you choose to refuse our cookies, you may not be able
							to use some portions of our Service.
						</Typography>
					</Box>
					<Box mt={5}>
						<Typography variant="h2">Service Providers</Typography>
						<Divider />
						<Typography variant="body2">
							We may employ third-party companies and individuals due to the
							following reasons:
						</Typography>
						<ul>
							<li>
								<Typography variant="body2">
									To facilitate our Service;
								</Typography>
							</li>
							<li>
								<Typography variant="body2">
									To provide the Service on our behalf;
								</Typography>
							</li>
							<li>
								<Typography variant="body2">
									To perform Service-related services; or
								</Typography>
							</li>
							<li>
								<Typography variant="body2">
									To assist us in analyzing how our Service is used.
								</Typography>
							</li>
						</ul>
						<Typography variant="body2">
							We want to inform our Service users that these third parties have
							access to your Personal Information. The reason is to perform the
							tasks assigned to them on our behalf. However, they are obligated
							not to disclose or use the information for any other purpose.
						</Typography>
						<br />
						<Typography variant="body2">
							{
								"This site makes use of Google Places and Maps APIs, be sure to review the following:"
							}
						</Typography>
						<ul>
							<li>
								<Typography
									component={"a"}
									href="https://policies.google.com/privacy"
									variant="body2"
								>
									Google's Privacy Policy
								</Typography>
							</li>
							<li>
								<Typography
									component={"a"}
									href="https://policies.google.com/terms?hl=en"
									variant="body2"
								>
									Google Maps Terms of Service
								</Typography>
							</li>
						</ul>
					</Box>
					<Box mt={5}>
						<Typography variant="h2">Security</Typography>
						<Divider />
						<Typography variant="body2">
							We value your trust in providing us your Personal Information,
							thus we are striving to use commercially acceptable means of
							protecting it. But remember that no method of transmission over
							the internet, or method of electronic storage is 100% secure and
							reliable, and we cannot guarantee its absolute security.
						</Typography>
					</Box>
					<Box mt={5}>
						<Typography variant="h2">Links to Other Sites</Typography>
						<Divider />
						<Typography variant="body2">
							Our Service may contain links to other sites. If you click on a
							third-party link, you will be directed to that site. Note that
							these external sites are not operated by us. Therefore, we
							strongly advise you to review the Privacy Policy of these
							websites. We have no control over, and assume no responsibility
							for the content, privacy policies, or practices of any third-party
							sites or services.
						</Typography>
					</Box>
					<Box mt={5}>
						<Typography variant="h2">Children's Privacy</Typography>
						<Divider />
						<Typography variant="body2">
							Our Services do not address anyone under the age of 13. We do not
							knowingly collect personal identifiable information from children
							under 13. In the case we discover that a child under 13 has
							provided us with personal information, we immediately delete this
							from our servers. If you are a parent or guardian and you are
							aware that your child has provided us with personal information,
							please contact us so that we will be able to do necessary actions.
						</Typography>
					</Box>
					<Box mt={5}>
						<Typography variant="h2">Changes to This Privacy Policy</Typography>
						<Divider />
						<Typography variant="body2">
							We may update our Privacy Policy from time to time. Thus, we
							advise you to review this page periodically for any changes. We
							will notify you of any changes by posting the new Privacy Policy
							on this page. These changes are effective immediately, after they
							are posted on this page.
						</Typography>
					</Box>

					<Box mt={5}>
						<Typography variant="body2">
							<span>
								{"Our Privacy Policy was created with the help of the "}
								<Typography
									variant="body2"
									component={"a"}
									href="https://www.privacypolicytemplate.net"
									style={{ color: "black" }}
								>
									Privacy Policy Template
								</Typography>
							</span>
							.
						</Typography>
					</Box>
					<Box mt={5}>
						<Typography variant="h2">Contact Us</Typography>
						<Divider />
						<Typography variant="body2">
							If you have any questions or suggestions about our Privacy Policy,
							do not hesitate to contact us.
						</Typography>
					</Box>
				</Paper>
			</Box>
		</PageTemplate>
	);
}
export default PrivacyPolicy;
