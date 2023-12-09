import {
	Typography,
	Container,
	Box,
	Stack,
	createSvgIcon,
	Icon,
	SvgIcon,
} from "@mui/material";

function NotFoundPage() {
	return (
		<Box mt={5}>
			<Container>
				<Stack alignItems={"center"} spacing={5}>
					<Typography variant="h1" textAlign={"center"}>
						PAGE NOT FOUND
					</Typography>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="120"
						height="120"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="lucide lucide-help-circle"
					>
						<circle cx="12" cy="12" r="10" />
						<path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
						<path d="M12 17h.01" />
					</svg>
				</Stack>
			</Container>
		</Box>
	);
}

export default NotFoundPage;
