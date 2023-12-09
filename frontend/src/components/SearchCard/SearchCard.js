import {
	ButtonBase,
	Paper,
	Grid,
	Typography,
	IconButton,
	Box,
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

	return (
		<ButtonBase
			component="div"
			sx={{ width: "100%" }}
			onClick={navigateToSearch}
		>
			<Paper
				elevation={2}
				sx={{ width: "100%", border: 1, borderColor: "divider", p: 2, my: 1 }}
			>
				<Grid container spacing={2} alignItems="center">
					<Grid item xs={5} overflow={"hidden"}>
						<Box>
							<Typography
								variant="cardHeader"
								sx={{ cursor: "pointer" }}
								onClick={() => navigator("/browse")}
								textOverflow={"ellipsis"}
							>
								{search}
							</Typography>
						</Box>
					</Grid>
					<Grid item xs={2}>
						<Typography textAlign={"center"}>Min Price: {minPrice}</Typography>
					</Grid>
					<Grid item xs={2}>
						<Typography textAlign={"center"}>Max Price: {maxPrice}</Typography>
					</Grid>
					<Grid item xs={2} justifyContent={"flex-end"}>
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
