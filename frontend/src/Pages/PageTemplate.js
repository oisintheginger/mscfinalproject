import {
	Typography,
	Stack,
	Breadcrumbs,
	Link,
	Container,
	Button,
	Box,
} from "@mui/material";
import { Link as RRDLink } from "react-router-dom";
import { fontDark } from "../Styling/styleConstants";

import { URLToBreadcrumbMapper } from "./BreadCrumbMapper";

function PageTemplate({
	children,
	pageTitle = "Page Title",
	prevPage = null,
	prevPageBreadcrumb = null,
	currPageBreadcrumb = null,
}) {
	return (
		<Stack direction={"column"} spacing={2} mt={2} mr={0} ml={0}>
			<Breadcrumbs aria-label="Breadcrumb">
				<Link component={RRDLink} to={"/"} color={fontDark} underline="hover">
					Home
				</Link>
				{prevPage &&
					URLToBreadcrumbMapper({ inputString: prevPage }) !== "Home" && (
						<Link
							component={RRDLink}
							to={prevPage}
							color={fontDark}
							underline="hover"
						>
							{URLToBreadcrumbMapper({ inputString: prevPage })}
						</Link>
					)}
				{currPageBreadcrumb && (
					<Typography color={fontDark} fontWeight={"bold"}>
						{currPageBreadcrumb}
					</Typography>
				)}
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
