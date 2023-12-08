import React, { useState, useContext } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import {
	Box,
	Chip,
	Divider,
	Grid,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import { Stack, Typography, CardActionArea } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import SingleBedIcon from "@mui/icons-material/SingleBed";
import BathtubIcon from "@mui/icons-material/Bathtub";
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
					<Stack overflow={"clip"} width={"100%"} spacing={1}>
						<Stack>
							<Typography variant="cardHeader">{"$" + data?.price}</Typography>
							<Stack direction={"row"} spacing={1}>
								<Chip
									label={data?.bedrooms + " Bed"}
									sx={{
										fontSize: 15,
										fontWeight: 600,
										borderWidth: 2,
										borderColor: "#192623",
										color: "#192623",
										bgcolor: "#e9f2f0",
									}}
									icon={<SingleBedIcon fontSize="small" color="#192623" />}
									variant="outlined"
								/>
								<Chip
									label={data?.bathrooms + " Bath"}
									sx={{
										fontSize: 15,
										fontWeight: 600,
										borderWidth: 2,
										borderColor: "#192623",
										color: "#192623",
										bgcolor: "#e9f2f0",
									}}
									icon={<BathtubIcon fontSize="small" color="#192623" />}
									variant="outlined"
								/>
							</Stack>
						</Stack>
						<Divider />
						<Stack>
							<Typography variant="cardSubTitle" noWrap>
								{data?.streetAddress}
							</Typography>
							<Typography variant="cardSubTitle" noWrap>
								{"Zip Code: " + data?.zipcode}
							</Typography>
						</Stack>
						<PropertyTags tags={data?.tags} />
					</Stack>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}
export default PropertyCard;
