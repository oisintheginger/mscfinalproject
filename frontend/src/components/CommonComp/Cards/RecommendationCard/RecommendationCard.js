import PropertyCard from "../PropertyCard/PropertyCard";
import {
	CardHeader,
	Tooltip,
	IconButton,
	Menu,
	MenuItem,
	MenuList,
	Box,
	Typography,
	Stack,
	Divider,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import { useState, useRef } from "react";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import { SendRecommendationFeedback } from "../../../../Utils/Mutations/RecommendationMutation/RecommendationMutation";

export function RecommendationCard({ data }) {
	const handleMenuClose = () => {
		setMenuOpen(false);
		setCurrentAnchor(null);
	};

	const [anchor, setCurrentAnchor] = useState(null);
	const [menuOpen, setMenuOpen] = useState(false);
	const anchorRef = useRef();

	const { mutate: sendFeedback } = SendRecommendationFeedback(
		data?.propertyId,
		(data) => {
			console.log(data);
		},
		(err) => {
			console.log(err);
		}
	);

	return (
		<PropertyCard data={data}>
			<>
				<CardHeader
					title={"Recommended for You"}
					titleTypographyProps={{
						fontFamily: '"Urbanist", sans-serif',
						fontSize: 20,
					}}
					action={
						<Tooltip title="Recommendation Feedback">
							<IconButton
								onClick={() => {
									setCurrentAnchor(anchorRef.current);
									setMenuOpen(true);
								}}
								ref={anchorRef}
							>
								<MoreVertIcon fontSize="medium" />
							</IconButton>
						</Tooltip>
					}
				/>
				<Menu
					open={menuOpen}
					anchorEl={anchor}
					onClose={handleMenuClose}
					anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
					transformOrigin={{ vertical: "top", horizontal: "center" }}
				>
					<Box pl={1} pr={1}>
						<Typography variant="body1">Recommendation Feedback</Typography>
						<Divider orientation="horizontal" />
					</Box>
					<MenuList>
						{/* I like */}
						<MenuItem
							onClick={() => {
								sendFeedback(2);
							}}
						>
							<Stack spacing={1} direction={"row"}>
								<ListItemIcon>
									<ThumbUpOffAltIcon fontSize="medium" />
								</ListItemIcon>
								<ListItemText>I like this</ListItemText>
							</Stack>
						</MenuItem>
						{/* I Dislike */}
						<MenuItem
							onClick={() => {
								sendFeedback(1);
							}}
						>
							<Stack spacing={1} direction={"row"}>
								<ListItemIcon>
									<ThumbDownOffAltIcon fontSize="medium" />
								</ListItemIcon>
								<ListItemText>I don't like this</ListItemText>
							</Stack>
						</MenuItem>
					</MenuList>
				</Menu>
			</>
		</PropertyCard>
	);
}
