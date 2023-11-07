import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import { Stack, Chip } from "@mui/material";
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

export default function PropertyCard({ data, key, inPopup = false }) {
	const [expanded, setExpanded] = useState(false);

	const navigator = useNavigate();
	const location = useLocation();

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<Card elevation={inPopup ? 0 : 6} sx={{ height: "100%" }}>
			<CardMedia
				onClick={() =>
					navigator("/property/" + data.propertyId, {
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
				image={data.image}
				alt="Property Image"
			/>
			<CardHeader title={"$" + data.price} subheader={data.address} />

			<CardContent>
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
