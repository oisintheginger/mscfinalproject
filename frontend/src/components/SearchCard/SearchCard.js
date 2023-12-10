import {
	ButtonBase,
	Paper,
	Grid,
	Typography,
	IconButton,
	Box,
	Stack,
	Divider,
	useTheme,
	useMediaQuery,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import {
	MAX_PRICE,
	MIN_PRICE,
	BEDROOM_COUNT,
	BATHROOM_COUNT,
} from "../../Utils/filter_constants";

export function SearchCard({
	search,
	minPrice,
	maxPrice,
	minBed,
	minBath,
	totalSearch,
	saveSearchRefresh = () => {},
	handleDelete,
}) {
	const navigator = useNavigate();
	const navigateToSearch = () => {
		const searchParams = new URLSearchParams({
			searchString: search,
			[`${MIN_PRICE}`]: minPrice,
			[`${MAX_PRICE}`]: maxPrice,
			[`${BEDROOM_COUNT}`]: minBed,
			[`${BATHROOM_COUNT}`]: minBath,
		});
		const searchString = searchParams.toString();

		navigator(`/browse?${searchString}&page=1`);
	};

	const theme = useTheme();
	const down = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<ButtonBase
			component="div"
			sx={{ width: "100%" }}
			onClick={navigateToSearch}
		>
			<Paper
				elevation={2}
				sx={{ width: "100%", border: 1, borderColor: "divider", p: 2, mt: 1 }}
			>
				<Grid container spacing={2} alignItems="center">
					<Grid
						item
						xs={10}
						justifyContent={"center"}
						sx={{ overflowX: down ? "scroll" : "clip" }}
					>
						<Stack direction={"row"} spacing={3}>
							<Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
								<Typography
									noWrap
									variant="cardHeader"
									sx={{ cursor: "pointer" }}
									onClick={() => navigator("/browse")}
									textOverflow={"ellipsis"}
								>
									{search}
								</Typography>
							</Box>
							<Divider orientation="vertical" />
							<Stack
								direction={"row"}
								alignItems={"center"}
								spacing={2}
								width={"100%"}
							>
								<Stack>
									<Typography textAlign={"center"} variant="searchFilterOption">
										Min. Price
									</Typography>
									<Typography textAlign={"center"} variant="searchFilterValue">
										{minPrice}
									</Typography>
								</Stack>
								<Divider orientation="vertical" />
								<Stack>
									<Typography textAlign={"center"} variant="searchFilterOption">
										Max. Price
									</Typography>
									<Typography textAlign={"center"} variant="searchFilterValue">
										{maxPrice}
									</Typography>
								</Stack>
								<Divider orientation="vertical" />
								<Stack>
									<Typography textAlign={"center"} variant="searchFilterOption">
										Beds
									</Typography>
									<Typography textAlign={"center"} variant="searchFilterValue">
										{minBed}
									</Typography>
								</Stack>
								<Divider orientation="vertical" />

								<Stack>
									<Typography textAlign={"center"} variant="searchFilterOption">
										Baths
									</Typography>
									<Typography textAlign={"center"} variant="searchFilterValue">
										{minBath}
									</Typography>
								</Stack>
							</Stack>
						</Stack>
					</Grid>
					<Grid item xs={1}>
						<Box
							display={"flex"}
							flexDirection={"row"}
							justifyContent={"flex-end"}
						>
							<IconButton
								onClick={async (event) => {
									event.stopPropagation(); // Prevents the ButtonBase onClick from being triggered
									await handleDelete(totalSearch);
								}}
								aria-label="Delete Search"
							>
								<DeleteIcon />
							</IconButton>
						</Box>
					</Grid>
				</Grid>
			</Paper>
		</ButtonBase>
	);
}
