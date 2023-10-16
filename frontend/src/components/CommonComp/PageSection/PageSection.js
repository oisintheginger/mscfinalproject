import { Divider, Typography, Box, Stack } from "@mui/material";

function PageSection({
	children,
	background = true,
	sectionTitle = "Section Title",
	id = null,
}) {
	return (
		<Box component={"section"} id={id}>
			<Typography variant="h2">{sectionTitle}</Typography>
			<Divider />
			<Box
				minHeight={100}
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
