import { Typography, Stack, Breadcrumbs, Link } from "@mui/material";
import { Link as RRDLink } from "react-router-dom";
import { fontDark } from "../Styling/styleConstants";

function PageTemplate({ children, pageTitle = "Page Title" }) {
	return (
		<Stack direction={"column"} spacing={2} mt={2}>
			<Breadcrumbs aria-label="Breadcrumb">
				<Link component={RRDLink} to={"/"} color={fontDark} underline="hover">
					Home
				</Link>
				<Link
					component={RRDLink}
					to={"/browse"}
					color={fontDark}
					underline="hover"
				>
					Browse
				</Link>
			</Breadcrumbs>
			<Typography variant="h1">{pageTitle}</Typography>
			{children}
		</Stack>
	);
}
export default PageTemplate;
