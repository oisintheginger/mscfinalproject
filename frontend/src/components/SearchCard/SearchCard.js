import {
	ButtonBase,
	Paper,
	Grid,
	Typography,
	IconButton,
	Box,
} from "@mui/material";
import { parseSearchString } from "../../Utils/ParseSearchString";
import DeleteIcon from "@mui/icons-material/Delete";
import { RemoveFromSaveSearchMutation } from "../../Utils/Mutations/SearchMutation/SearchMutation";
import { useContext } from "react";
import { UserContext } from "../../Utils/UserContext/UserContext";
import { useQuery, useQueryClient } from "react-query";
import { API } from "aws-amplify";

export function SearchCard({
	search,
	minPrice,
	maxPrice,
	totalSearch,
	saveSearchRefresh = () => {},
}) {
	const navigateToSearch = () => {
		const searchParams = new URLSearchParams({
			searchString: search,
			"Min Price": minPrice,
			"Max Price": maxPrice,
		});
		const searchString = searchParams.toString();

		navigator(`/browse?${searchString}`);
	};
	const queryClient = useQueryClient();

	const { getAccessToken } = useContext(UserContext);
	const { mutate: handleDelete } = RemoveFromSaveSearchMutation({
		successCallback: () => {
			console.log("success delete search");
			saveSearchRefresh();
		},
	});

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
								variant="h6"
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
								onClick={(event) => {
									event.stopPropagation(); // Prevents the ButtonBase onClick from being triggered
									handleDelete(totalSearch);
								}}
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
