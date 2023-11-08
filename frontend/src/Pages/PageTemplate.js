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
import SiteFooter from "../components/SiteFooter/SiteFooter";
import { useEffect } from "react";

function PageTemplate({
	children,
	pageTitle = "Page Title",
	prevPage = null,
	currPageBreadcrumb = null,
}) {
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, []);
	return (
		<>
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
			</Stack>
			<SiteFooter />
		</>
	);
}
export default PageTemplate;
