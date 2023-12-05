import React, { useState, useContext, useRef } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import {
	Grid,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	MenuList,
	Popover,
	Box,
	Tooltip,
	Divider,
	CardActions,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Stack, Chip, Typography, CardActionArea } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../../../../Utils/UserContext/UserContext";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
	AddToFavoritesMutation,
	RemoveFromFavoritesMutation,
} from "../../../../Utils/Mutations/FavoriteMutation/FavoritesMutation";
import { PropertyTags } from "../../PropertyTags/PropertyTags";
import ButtonOutlined from "../../Button/ButtonOutlined";
import ChevronRight from "@mui/icons-material/ChevronRight";
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

function PropertyCard({ data, key, inPopup = false, children }) {
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
	const { mutate: removeFromFavorites } = RemoveFromFavoritesMutation(
		data?.propertyId,
		() => {
			handleRefresh();
		},
		(err) => {
			console.log(err);
		}
	);

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
					}}
					component="img"
					height="194"
					image={data?.images ? data.images[0] : null}
					alt="Property Image"
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
								<Typography variant="subtitle1" noWrap>
									{data?.streetAddress}
								</Typography>
								<Typography variant="subtitle1" noWrap>
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
