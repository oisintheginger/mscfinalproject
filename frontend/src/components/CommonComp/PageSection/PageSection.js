import { Divider, Typography, Box, Stack, IconButton } from "@mui/material";
import { NextCarouselIcon } from "../../../Icons/HMEIcons";

function PageSection({
	children,
	background = true,
	sectionTitle = "Section Title",
	id = null,
	action = null,
}) {
	return (
		<Box component={"section"} id={id}>
			<Stack direction={"row"} spacing={2}>
				<Typography variant="h2">{sectionTitle}</Typography>
				{action && (
					<IconButton
						onClick={() => {
							action();
						}}
						sx={{ color: "black" }}
					>
						<NextCarouselIcon />
					</IconButton>
				)}
			</Stack>
			<Divider />
			<Box
				minHeight={50}
				sx={{
					backgroundColor: background ? "darkWhite.main" : null,
					mt: 0.5,
					borderRadius: 0.5,
				}}
			>
				<Stack width={"100%"} spacing={2} direction={"column"}>
					{children}
				</Stack>
			</Box>
		</Box>
	);
}

export default PageSection;
