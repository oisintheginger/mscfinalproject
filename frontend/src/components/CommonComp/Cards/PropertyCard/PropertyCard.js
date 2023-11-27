import React, { useState, useContext } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Stack, Chip, Typography, CardActionArea } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../../../../Utils/UserContext/UserContext";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { AddToFavoritesMutation } from "../../../../Utils/Mutations/FavoriteMutation/FavoritesMutation";

const ExpandMore = styled((props) => {
	const { expand, ...other } = props;
	return <IconButton {...other} />;
})(({ theme, expand }) => ({
	transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
	marginLeft: "auto",
	transition: theme.transitions.create("transform", {
		duration: theme.transitions.duration.shortest,
	}),
}));

function PropertyCard({ data, key, inPopup = false }) {
	const { userData, handleRefresh, route } = useContext(UserContext);
	const [expanded, setExpanded] = useState(false);

	const navigator = useNavigate();
	const location = useLocation();

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	const { mutate: addToFavorites } = AddToFavoritesMutation(
		data?.propertyId,
		() => {
			handleRefresh();
		},
		(err) => {
			console.log(err);
		}
	);

	const isFavorited =
		userData?.favourites.includes(data?.propertyId.toString()) || false;

	// console.log(isFavorited);

	return (
		<Card elevation={inPopup ? 0 : 6} sx={{ height: "100%" }}>
			<CardActionArea
				onClick={() =>
					navigator("/property/" + data.propertyId, {
						state: {
							previousUrl: location.pathname,
						},
					})
				}
			>
				<CardMedia
					sx={{
						"&:hover": {
							cursor: "pointer",
						},
					}}
					component="img"
					height="194"
					image={data?.images ? data.images[0] : null}
					alt="Property Image"
				/>
			</CardActionArea>
			<CardContent>
				<Grid container>
					<Grid item xs={9}>
						<Stack overflow={"clip"}>
							<Typography variant="cardHeader">{"$" + data?.price}</Typography>
							<Typography variant="subtitle1" noWrap>
								{data?.streetAddress}
							</Typography>
							<Typography variant="subtitle1" noWrap>
								{"Zip Code: " + data?.zipcode}
							</Typography>
						</Stack>
					</Grid>
					{/* <Grid item>
						{isFavorited ? (
							<IconButton
								onClick={(e) => {
									e.stopPropagation();
									// addToFavorites();
								}}
							>
								<FavoriteIcon fontSize="large" />
							</IconButton>
						) : (
							<IconButton
								onClick={async (e) => {
									e.stopPropagation();
									await addToFavorites();
								}}
							>
								<FavoriteBorderIcon fontSize="large" />
							</IconButton>
						)}
					</Grid> */}
				</Grid>
				<Stack
					direction="row"
					spacing={1}
					sx={{
						overflowX: "auto",
						whiteSpace: "nowrap",
						"&::-webkit-scrollbar": { display: "none" },
					}}
				>
					<Chip
						label="SECURE"
						sx={{
							backgroundColor: "secureChip.main",
							color: "white",
							fontWeight: 600,
						}}
					/>
					<Chip
						label="NIGHTLIFE"
						sx={{
							backgroundColor: "nightlifeChip.main",
							color: "white",
							fontWeight: 600,
						}}
					/>
					<Chip
						label="GYMS"
						sx={{
							backgroundColor: "gymsChip.main",
							color: "white",
							fontWeight: 600,
						}}
					/>
				</Stack>
			</CardContent>
		</Card>
	);
}
export default PropertyCard;
