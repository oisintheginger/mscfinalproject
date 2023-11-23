import { Button, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useState } from "react";
export function AddFavoriteButton({ action = () => {}, down = false }) {
	return (
		<Button
			variant="outlined"
			sx={{
				maxWidth: down ? "100vw" : "30vw",
				transform: "translate(0px, 8px)",
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
	);
}

export function RemoveFavoriteButton({ action = () => {}, down = false }) {
	const [hovering, setHovering] = useState(false);
	const style = down
		? {
				minWidth: "150px",
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
				minWidth: "150px",
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
	);
}
