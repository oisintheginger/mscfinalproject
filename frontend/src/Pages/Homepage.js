import PropertyCard from "../components/CommonComp/Cards/PropertyCard/PropertyCard";
import {
	Box,
	Container,
	Grid,
	Stack,
	Typography,
	TextField,
	Button,
	InputAdornment,
	IconButton,
	useMediaQuery,
	useTheme,
	Popover,
	List,
	ListItem,
	Menu,
	MenuItem,
	Divider,
} from "@mui/material";
import { useForm } from "react-hook-form";
import ButtonStyled from "../components/CommonComp/Button/ButtonStyled.js";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";

import SiteFooter from "../components/SiteFooter/SiteFooter.js";

import { useEffect, useContext, useState, useRef } from "react";
import { UserContext } from "../Utils/UserContext/UserContext.js";
import { RecommendedCarousel } from "../components/RecommendedCarousel/RecommendedCarousel.js";
import SearchIcon from "@mui/icons-material/Search";

function Homepage() {
	const { register, formState, getValues } = useForm();
	const { getAccessToken } = useContext(UserContext);
	const theme = useTheme();
	const down = useMediaQuery(theme.breakpoints.down("md"));
	const navigator = useNavigate();
	const location = useLocation();
	const { route, user } = useAuthenticator((context) => [
		context.route,
		context.user,
	]);
	const [searchState, setSearchState] = useState("");

	useEffect(() => {
		if (route == "authenticated") {
			// refetch();
		}
	}, [user]);

	const [searchSuggestionsAnchor, setSearchSuggestionsAnchor] = useState(null);
	const [showSuggestions, setShowSuggestions] = useState(false);

	const handleCloseSuggestions = () => {
		setShowSuggestions(false);
		setSearchSuggestionsAnchor(null);
	};

	const navigateToBrowse = (val) => {
		navigator({
			pathname: "/browse",
			search: "searchString=" + val + "&page=1",
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		navigateToBrowse(searchState);
	};

	return (
		<>
			<Stack direction={"column"} spacing={1} mt={10} alignItems={"center"}>
				<Box width={"100%"} display={"flex"} alignItems={"center"}>
					<Typography textAlign={"center"} variant="landingPage" width={"100%"}>
						RENTING MADE EASY
					</Typography>
				</Box>
				<Box
					width={"100%"}
					mb={1}
					component={"label"}
					form="Search Box"
					display={"flex"}
					justifyContent={"center"}
				>
					<Box
						width={"100%"}
						mb={1}
						display={"flex"}
						justifyContent={"center"}
						component={"form"}
						onSubmit={handleSubmit}
						aria-label="Search Form"
						aria-labelledby="Searchbox"
						id="Search Box"
					>
						<TextField
							value={searchState}
							id="Searchbox"
							variant="outlined"
							type="search"
							sx={{
								zIndex: 10,
								backgroundColor: "white",
								width: { xs: "100%", md: "55%" },
								"& .MuiInputBase-root": {
									height: 50,
									color: "black",
									"& fieldset": {
										borderWidth: 1,
										borderColor: "darkTeal.main",
									},
									"&.Mui-focused fieldset": {
										borderWidth: 2,
										borderColor: "darkTeal.main",
									},
									"&:hover fieldset": {
										borderWidth: 2,
										borderColor: "darkTeal.main",
									},
								},
							}}
							aria-label="Searchbox"
							color="darkTeal"
							placeholder="Search here for your new home"
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											onClick={handleSubmit}
											aria-label="Search Button"
										>
											<SearchIcon fontSize="large" />
										</IconButton>
									</InputAdornment>
								),
							}}
							onChange={(event) => {
								setSearchSuggestionsAnchor(event.currentTarget);
								setShowSuggestions(true);
								setSearchState(event.currentTarget.value);
							}}
						/>
					</Box>
					<Popover
						open={showSuggestions}
						anchorEl={searchSuggestionsAnchor}
						onClose={handleCloseSuggestions}
						anchorOrigin={{
							vertical: "bottom",
							horizontal: "left",
						}}
						disableAutoFocus
					>
						<Box
							sx={{
								width: searchSuggestionsAnchor?.offsetWidth + 70,
							}}
						>
							<Box pl={2}>
								<Typography variant="overline">Search Suggestions </Typography>
							</Box>
							<ListItem
								sx={{
									width: "100%",
									cursor: "pointer",
									pl: 1,
									pr: 1,
									"& :hover": {
										backgroundColor: "lightgrey",
										borderRadius: 1,
									},
								}}
								onClick={() => {
									navigateToBrowse("Baltimore, MD");
								}}
							>
								<Stack
									direction={"row"}
									alignItems={"center"}
									spacing={5}
									sx={{ width: "100%" }}
									pl={1}
								>
									<Typography variant="searchSuggestion">
										Baltimore, MD
									</Typography>
									<ChevronRightIcon fontSize="medium" />
								</Stack>
								<Divider />
							</ListItem>
							<ListItem
								sx={{
									width: "100%",
									cursor: "pointer",
									pl: 1,
									pr: 1,
									"& :hover": {
										backgroundColor: "lightgrey",
										borderRadius: 1,
									},
								}}
								onClick={() => {
									navigateToBrowse("Baltimore, MD");
								}}
							>
								<Stack
									direction={"row"}
									alignItems={"center"}
									spacing={5}
									sx={{ width: "100%" }}
									pl={1}
								>
									<Typography variant="searchSuggestion">
										Baltimore, MD
									</Typography>
									<ChevronRightIcon fontSize="medium" />
								</Stack>
								<Divider />
							</ListItem>
							<ListItem
								sx={{
									width: "100%",
									cursor: "pointer",
									pl: 1,
									pr: 1,
									"& :hover": {
										backgroundColor: "lightgrey",
										borderRadius: 1,
									},
								}}
								onClick={() => {
									navigateToBrowse("Baltimore, MD");
								}}
							>
								<Stack
									direction={"row"}
									alignItems={"center"}
									spacing={5}
									sx={{ width: "100%" }}
									pl={1}
								>
									<Typography variant="searchSuggestion">
										Baltimore, MD
									</Typography>
									<ChevronRightIcon fontSize="medium" />
								</Stack>
								<Divider />
							</ListItem>
						</Box>
					</Popover>
				</Box>
				<Box
					component={"img"}
					src="/CityscapeSVG.svg"
					width={"80%"}
					display={down ? "none" : "block"}
					height={"auto"}
					overflow={"hidden"}
					sx={{
						opacity: "20%",
						position: "absolute",
						top: "20%",
						zIndex: 0,
						pointerEvents: "none",
					}}
					aria-label="Background Image"
				/>
			</Stack>

			<Box
				width={"100%"}
				display={"flex"}
				flexDirection={"column"}
				justifyContent={"center"}
				alignItems={"center"}
				sx={{ mt: { xs: 7, md: "100px" } }}
			>
				<Stack
					minHeight={"35vh"}
					width={"100%"}
					display={"flex"}
					alignItems={"center"}
				>
					{route === "authenticated" ? (
						<RecommendedCarousel />
					) : (
						<ButtonStyled
							onClick={() => {
								navigator("/login", { state: { from: location } });
							}}
						>
							Sign in to View Recommendations
						</ButtonStyled>
					)}
				</Stack>
			</Box>
			<SiteFooter positionProps={{ position: "relative", top: "20px" }} />
		</>
	);
}

export default Homepage;
