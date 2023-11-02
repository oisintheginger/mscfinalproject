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
				display={"flex"}
				flexDirection={"column"}
				justifyContent={"center"}
				alignItems={"center"}
				width={"100%"}
			>
				<Stack
					direction={"row"}
					spacing={4}
					justifyContent={"space-between"}
					width={"100%"}
				>
					<Link href="/contact" color="inherit">
            <Typography textAlign={"center"} fontSize={15}>
                Contact Information
            </Typography>
        </Link>
        <Link href="/privacy-policy" color="inherit">
            <Typography textAlign={"center"} fontSize={15}>
                Privacy Policy
            </Typography>
        </Link>
        <Link href="/terms-of-service" color="inherit">
            <Typography textAlign={"center"} fontSize={15}>
                Terms of Service
            </Typography>
        </Link>
        <Link href="/faq" color="inherit">
            <Typography textAlign={"center"}  fontSize={15}>
                FAQ
            </Typography>
        </Link>
    </Stack>
    <Typography mt={2} fontSize={12}>
        © 2023 HousingMadeEasy. All Rights Reserved.
    </Typography>
				
			</Box>
		</Stack>
	);
}
export default PageTemplate;
