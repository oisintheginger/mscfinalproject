import {
	Card,
	CardActionArea,
	CardMedia,
	CardContent,
	CardActions,
	Typography,
	Stack,
	Divider,
	Box,
	Grid,
	useTheme,
	useMediaQuery,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import ButtonOutlined from "../../Button/ButtonOutlined";
import {
	EditApplicationIcon,
	NextCarouselIcon,
} from "../../../../Icons/HMEIcons";
import DeleteButton from "../../Button/DeleteButton";
import { useLocation, useNavigate } from "react-router-dom";
import { useRef } from "react";

function ApplicationCard({
	data,
	openConfirmDelete = () => {},
	openApplicationDetails = () => {},
}) {
	const theme = useTheme();
	const down = useMediaQuery(theme.breakpoints.down("md"));
	const ref = useRef(null);

	const navigate = useNavigate();
	const location = useLocation();

	return !data ? (
		<></>
	) : (
		<Card elevation={4} ref={ref}>
			<CardActionArea
				onClick={(event) => {
					event.preventDefault();
					openApplicationDetails(data.message);
				}}
			>
				<CardMedia
					component={"img"}
					sx={{ height: { xs: "100px", md: "140px" } }}
					image={data.thumbnail}
					alt="Image of Rental Listing"
				/>

				<CardContent>
					<Stack>
						<Stack
							direction={"row"}
							alignItems={"center"}
							justifyContent={"space-between"}
						>
							<Typography variant="cardHeader">{`$${data.price}`}</Typography>
							<Typography variant="body1">{data.date}</Typography>
						</Stack>
						<Typography variant="propertyAddress" noWrap>
							{data.address}
						</Typography>
					</Stack>
					<Divider />
					<Box mt={2}>
						<Stack justifyContent={"center"} alignItems={"center"}>
							<Typography>{data.status?.toUpperCase()}</Typography>
						</Stack>
					</Box>
				</CardContent>
			</CardActionArea>
			<CardActions>
				<Grid container justifyContent={"center"} spacing={1}>
					<Grid item xs={4} sm={4} md={4} lg={4}>
						<ButtonOutlined
							fullWidth
							endIcon={
								down || ref.current?.clientWidth < 300 ? (
									<></>
								) : (
									<NextCarouselIcon />
								)
							}
							variant="outlined"
							onClick={(event) => {
								event.preventDefault();
								navigate("/property/" + data.propertyId, {
									state: { previousUrl: location.pathname },
								});
							}}
						>
							VIEW
						</ButtonOutlined>
					</Grid>
					<Grid item xs={4} sm={4} md={4} lg={4}>
						<ButtonOutlined
							disabled
							fullWidth
							endIcon={
								down || ref.current?.clientWidth < 300 ? (
									<></>
								) : (
									<EditApplicationIcon />
								)
							}
							variant="outlined"
						>
							Edit
						</ButtonOutlined>
					</Grid>
					<Grid item xs={4} sm={4} md={4} lg={4}>
						<DeleteButton
							fullWidth
							disabled
							endIcon={
								down || ref.current?.clientWidth < 300 ? (
									<></>
								) : (
									<DeleteIcon fontSize="large" />
								)
							}
							variant="outlined"
							onClick={(event) => {
								event.preventDefault();
								openConfirmDelete(data.applicationId);
							}}
						>
							Delete
						</DeleteButton>
					</Grid>
				</Grid>
			</CardActions>
		</Card>
	);
}

export default ApplicationCard;
