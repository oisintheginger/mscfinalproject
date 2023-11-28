import { Button, Box, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useState } from "react";
export function AddFavoriteButton({ action = () => {}, down = false }) {
	return (
		<Tooltip title={"Add to your Favorites"}>
			<Button
				variant="outlined"
				sx={{
					maxWidth: down ? "100vw" : "20vw",
					transform: down ? "" : "translate(0px, 8px)",
					backgroundColor: "white",
					color: "darkTeal.main",
					borderColor: "darkTeal.main",
					borderWidth: 1,
					"&:hover": {
						backgroundColor: "darkWhite.main",
						color: "darkTeal.main",
						borderColor: "darkTeal.main",
						borderWidth: 1,
					},
					marginRight: 2,
					height: 45,
				}}
				fullWidth={down}
				endIcon={<FavoriteBorderIcon fontSize="large" />}
				onClick={() => {
					action();
				}}
			>
				Favorite
			</Button>
		</Tooltip>
	);
}

export function RemoveFavoriteButton({ action = () => {}, down = false }) {
	const [hovering, setHovering] = useState(false);
	const style = down
		? {
				width: down ? "100%" : "20vw",
				backgroundColor: "lightRed.main",
				color: "darkRed.main",
				borderColor: "darkRed.main",
				borderWidth: 1,
				marginRight: 2,
				height: 45,
				"&:hover": {
					backgroundColor: "lightRed.main",
					color: "darkRed.main",
					borderColor: "darkRed.main",
					borderWidth: 1,
				},
		  }
		: {
				maxWidth: "30vw",
				width: down ? "100%" : "15vw",
				backgroundColor: "white",
				transform: "translate(0px, 8px)",
				color: "darkTeal.main",
				borderColor: "darkTeal.main",
				borderWidth: 1,
				"&:hover": {
					backgroundColor: "lightRed.main",
					color: "darkRed.main",
					borderColor: "darkRed.main",
					borderWidth: 1,
				},
				marginRight: 2,
				height: 45,
		  };

	return (
		<Tooltip title={"Remove from your Favorites"}>
			<Button
				variant="outlined"
				sx={style}
				endIcon={
					hovering || down ? (
						<DeleteIcon fontSize="large" />
					) : (
						<CheckIcon fontSize="large" />
					)
				}
				fullWidth={down}
				onMouseEnter={() => setHovering(true)}
				onMouseLeave={() => {
					setHovering(false);
				}}
				onClick={() => {
					action();
				}}
			>
				{hovering || down ? "Remove" : "Favorited"}
			</Button>
		</Tooltip>
	);
}
