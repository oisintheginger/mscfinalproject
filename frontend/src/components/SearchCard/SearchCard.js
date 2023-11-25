import { ButtonBase, Paper, Grid, Typography, IconButton } from "@mui/material";
import { parseSearchString } from "../../Utils/ParseSearchString";
import DeleteIcon from "@mui/icons-material/Delete";
import { RemoveFromSaveSearchMutation } from "../../Utils/Mutations/SearchMutation/SearchMutation";

export function SearchCard({ search, minPrice, maxPrice }) {
	const navigateToSearch = () => {
		const searchParams = new URLSearchParams({
			searchString: search,
			"Min Price": minPrice,
			"Max Price": maxPrice,
		});
		const searchString = searchParams.toString();

		navigator(`/browse?${searchString}`);
	};

	const { mutate: handleDelete } = RemoveFromSaveSearchMutation({ search });

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
					<Grid item xs={3}>
						<Typography
							variant="h6"
							sx={{ cursor: "pointer" }}
							onClick={() => navigator("/browse")}
						>
							{search}
						</Typography>
					</Grid>
					<Grid item xs={3}>
						<Typography>Min Price: {minPrice}</Typography>
					</Grid>
					<Grid item xs={3}>
						<Typography>Max Price: {maxPrice}</Typography>
					</Grid>
					<Grid item xs={3} justifyContent={"flex-end"}>
						<IconButton
							onClick={(event) => {
								event.stopPropagation(); // Prevents the ButtonBase onClick from being triggered
								// handleDelete(search.searchString);
							}}
						>
							<DeleteIcon />
						</IconButton>
					</Grid>
				</Grid>
			</Paper>
		</ButtonBase>
	);
}
