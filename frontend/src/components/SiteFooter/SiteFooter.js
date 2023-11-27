import {
	Box,
	Stack,
	Typography,
	Link,
	useTheme,
	useMediaQuery,
} from "@mui/material";
import { Link as RRDLink } from "react-router-dom";
import { fontDark } from "../../Styling/styleConstants";

function SiteFooter() {
	const theme = useTheme();
	const below = useMediaQuery(theme.breakpoints.down("sm"));
	return (
		<Box
			height={"100px"}
			display={"flex"}
			flexDirection={"column"}
			justifyContent={"center"}
			alignItems={"center"}
			width={"100%"}
			pt={10}
		>
			<Stack
				direction={below ? "column" : "row"}
				spacing={below ? 1 : 4}
				justifyContent={"space-between"}
				width={"100%"}
			>
				<Link
					component={RRDLink}
					to={"/contactus"}
					color={fontDark}
					underline="hover"
				>
					<Typography textAlign={"center"} fontSize={15}>
						Contact Information
					</Typography>
				</Link>
				<Link
					component={RRDLink}
					to={"/privacypolicy"}
					color={fontDark}
					underline="hover"
				>
					<Typography textAlign={"center"} fontSize={15}>
						Privacy Policy
					</Typography>
				</Link>
				<Link
					component={RRDLink}
					to={"/termsandconditions"}
					color={fontDark}
					underline="hover"
				>
					<Typography textAlign={"center"} fontSize={15}>
						Terms and Conditions
					</Typography>
				</Link>
				<Link component={RRDLink} to={"/FAQ"} color={fontDark} underline="hover">
					<Typography textAlign={"center"} fontSize={15}>
						FAQ
					</Typography>
				</Link>
			</Stack>
			<Typography mt={2} fontSize={12}>
				© 2023 HousingMadeEasy. All Rights Reserved.
			</Typography>
		</Box>
	);
}

export default SiteFooter;
