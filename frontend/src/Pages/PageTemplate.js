import {
	Typography,
	Stack,
	Breadcrumbs,
	Link,
	Container,
	Box,
} from "@mui/material";
import { Link as RRDLink } from "react-router-dom";
import { fontDark } from "../Styling/styleConstants";

function PageTemplate({ children, pageTitle = "Page Title" }) {
	return (
		<Stack direction={"column"} spacing={2} mt={2} mr={0} ml={0}>
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
			<Box
				height={"100px"}
				alignItems={"flex-end"}
				display={"flex"}
				width={"100%"}
			>
				<Stack
					direction={"row"}
					justifyContent={"space-between"}
					width={"100%"}
				>
					<Typography textAlign={"center"}>Footer information</Typography>
					<Typography textAlign={"center"}>Footer information</Typography>
					<Typography textAlign={"center"}>Footer information</Typography>
				</Stack>
			</Box>
		</Stack>
	);
}
export default PageTemplate;
