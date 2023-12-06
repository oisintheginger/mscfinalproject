import React, { useState, useContext } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { Stack, Typography, CardActionArea } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
// import {
// 	AddToFavoritesMutation,
// 	RemoveFromFavoritesMutation,
// } from "../../../../Utils/Mutations/FavoriteMutation/FavoritesMutation";
import { PropertyTags } from "../../PropertyTags/PropertyTags";
// const ExpandMore = styled((props) => {
// 	const { expand, ...other } = props;
// 	return <IconButton {...other} />;
// })(({ theme, expand }) => ({
// 	transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
// 	marginLeft: "auto",
// 	transition: theme.transitions.create("transform", {
// 		duration: theme.transitions.duration.shortest,
// 	}),
// }));

function PropertyCard({ data, key, inPopup = false, children }) {
	const [expanded, setExpanded] = useState(false);
	const theme = useTheme();
	const down = useMediaQuery(theme.breakpoints.down("md"));
	const navigator = useNavigate();
	const location = useLocation();

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	// const { mutate: addToFavorites } = AddToFavoritesMutation(
	// 	data?.propertyId,
	// 	() => {
	// 		handleRefresh();
	// 	},
	// 	(err) => {
	// 		console.log(err);
	// 	}
	// );
	// const { mutate: removeFromFavorites } = RemoveFromFavoritesMutation(
	// 	data?.propertyId,
	// 	() => {
	// 		handleRefresh();
	// 	},
	// 	(err) => {
	// 		console.log(err);
	// 	}
	// );

	// const isFavorited =
	// 	userData?.favourites.includes(data?.propertyId.toString()) || false;

	return (
		<Card elevation={inPopup ? 0 : 6} sx={{ height: "100%" }}>
			{children}
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
						width: {
							xs: "100%",
						},
					}}
					component="img"
					height={down ? "120" : "194"}
					image={data?.images ? data.images[0] : null}
					alt={`Image of Property: ${data?.streetAddress}`}
					loading="lazy"
					placeholder="/CardImagePlaceholder.png"
				/>

				<CardContent>
					<Grid container minWidth={"fit-content"}>
						<Grid item xs={9}>
							<Stack overflow={"clip"} width={"100%"}>
								<Stack direction={"row"} justifyContent={"space-between"}>
									<Typography variant="cardHeader">
										{"$" + data?.price + "/mon"}
									</Typography>
								</Stack>
								<Typography variant="cardSubTitle" noWrap>
									{data?.streetAddress}
								</Typography>
								<Typography variant="cardSubTitle" noWrap>
									{"Zip Code: " + data?.zipcode}
								</Typography>
							</Stack>
						</Grid>
					</Grid>
					<PropertyTags tags={data?.tags} />
				</CardContent>
			</CardActionArea>
		</Card>
	);
}
export default PropertyCard;
