import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
//import Avatar from '@mui/material/Avatar';
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
//import { red } from '@mui/material/colors';
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
//import MoreVertIcon from '@mui/icons-material/MoreVert';
import { propertyData } from "../../../../MockData/PropertyDataSample";
import { Grid, Stack, Chip } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

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

export default function PropertyCard({ data, key }) {
	const [expanded, setExpanded] = useState(false);

	const navigator = useNavigate();
	const location = useLocation();
	console.log(location);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<Card elevation={6}>
			<CardMedia
				onClick={() =>
					navigator("/property/" + data.zpid, {
						state: {
							previousUrl: location.pathname,
						},
					})
				}
				sx={{
					"&:hover": {
						cursor: "pointer",
					},
				}}
				component="img"
				height="194"
				image={data.imgSrc}
				alt="Property Image"
			/>
			<CardHeader title={data.price} subheader={data.address} />

			<CardContent>
				<Stack
					direction="row"
					spacing={1}
					sx={{ overflowX: "auto", whiteSpace: "nowrap" }}
				>
					<Chip label={data.listingStatus} color="warning" />
					<Chip color="success" label="Other1" />
					<Chip color="primary" label="Other2" />
					<Chip color="secondary" label="Other3" />
				</Stack>
			</CardContent>
		</Card>
	);
}
