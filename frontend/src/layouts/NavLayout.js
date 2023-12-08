import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import HelpIcon from "@mui/icons-material/Help";
import {
	AppBar,
	Box,
	Toolbar,
	Typography,
	IconButton,
	List,
	Stack,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Divider,
	Container,
	Button,
	Tooltip,
	Menu,
	MenuItem,
	ListItem,
	ListSubheader,
	Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Popover from "@mui/material/Popover";

import Drawer from "@mui/material/Drawer";
import { useNavigate, Link as RRDLink, useLocation } from "react-router-dom";
import "./NavLayout.css";
import {
	ApplicationIcon,
	BookmarkIcon,
	CloseIcon,
	FavoriteIcon,
	HomeIcon,
	SearchIcon,
	UserIcon,
} from "../Icons/HMEIcons";
import { fontDark } from "../Styling/styleConstants";
import { useMediaQuery, useTheme } from "@mui/material";
import { useAuthenticator } from "@aws-amplify/ui-react";

import HMELogo from "./../Icons/NewLogo.png";
import HMELogoCompact from "./../Icons/NewLogoCompact.png";
import CreateAccountModal from "../components/CreateAccountModal/CreateAccountModal";
import ButtonStyled from "../components/CommonComp/Button/ButtonStyled";

function NavLayout() {
	const theme = useTheme();
	const above = useMediaQuery(theme.breakpoints.up("sm"));
	const down = useMediaQuery(theme.breakpoints.down("md"));

	const [drawerOpen, setDrawerOpen] = useState(false);

	const [modalOpen, setModalOpen] = useState(false);
	const location = useLocation();
	const [anchorEl, setAnchorEl] = useState(null);

	const toggleDrawer = (open) => (event) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}
		setDrawerOpen(open);
	};

	const navIconStyle = {
		width: {
			xs: "16px",
			sm: "24px",
		},
		height: {
			xs: "16px",
			sm: "24px",
		},
	};

	const { route, signOut } = useAuthenticator((context) => [
		context.route,
		context.signOut,
	]);

	const navigate = useNavigate();
	const LogoutFunc = () => {
		signOut();
	};

	// Popover
	const handlePopoverOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handlePopoverClose = () => {
		setMenuOpen(false);
		setAnchorEl(null);
	};

	const [menuOpen, setMenuOpen] = useState(false);

	useEffect(() => {
		setMenuOpen(anchorEl != null);
	}, [anchorEl]);
	return (
		<>
			<Box sx={{ flexGrow: 1, width: "100%", backgroundColor: "primary.main" }}>
				<AppBar position="sticky" sx={{ width: "100%" }}>
					<Toolbar
						disableGutters
						variant="dense"
						sx={{
							width: "100%",
							justifyContent: "space-between",
							height: "48px",
						}}
					>
						<Button
							size="large"
							aria-label="Main Menu"
							onClick={toggleDrawer(true)}
							sx={{ color: fontDark, height: "100%" }}
							startIcon={<MenuIcon sx={{ color: fontDark }} />}
						>
							<Typography
								variant="button"
								display={{ xs: "none", md: "block" }}
								fontSize={16}
							>
								MAIN MENU
							</Typography>
						</Button>
						<Box
							component={"img"}
							src={above ? HMELogo : HMELogoCompact}
							sx={{
								cursor: "pointer",
								height: "36px",
								flexGrow: 0,
								alignSelf: "center",
							}}
							alt="Renting Made Easy Logo"
							onClick={() => navigate("/")}
						></Box>
						<Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
							<Box
								sx={{
									display: !down ? "block" : "none",
								}}
							>
								<Tooltip title={"Account Menu"}>
									<IconButton size="small" onClick={handlePopoverOpen}>
										<Avatar
											src={
												route === "authenticated"
													? "/Yoda.jpeg"
													: "/PlaceholderAvatar.jpg"
											}
											sx={{ width: 30, height: 30 }}
											alt={
												route === "authenticated"
													? "User Account Menu"
													: "Account Menu"
											}
										/>
									</IconButton>
								</Tooltip>
							</Box>
							<Popover
								open={menuOpen}
								onClose={handlePopoverClose}
								anchorEl={anchorEl}
								anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
								transformOrigin={{ vertical: "top", horizontal: "right" }}
							>
								{route === "authenticated" ? (
									<Stack alignItems={"center"} mb={2} pl={1} pr={1}>
										<List>
											<ListItemButton
												component={RRDLink}
												to={"/favorites?page=1"}
												onClick={handlePopoverClose}
											>
												My Favorites
											</ListItemButton>
											<ListItemButton
												component={RRDLink}
												to={"/savedsearches?page=1"}
												onClick={handlePopoverClose}
											>
												My Searches
											</ListItemButton>
											<ListItemButton
												component={RRDLink}
												to={"/applications?page=1"}
												onClick={handlePopoverClose}
											>
												My Applications
											</ListItemButton>
											<Divider />
											<ListItemButton
												component={RRDLink}
												to={"/profile"}
												onClick={handlePopoverClose}
											>
												My Profile
											</ListItemButton>
										</List>
										<ButtonStyled
											onClick={() => {
												handlePopoverClose();
												LogoutFunc();
											}}
										>
											SIGN OUT
										</ButtonStyled>
									</Stack>
								) : (
									<Stack alignItems={"center"} mt={1} mb={1} p={1}>
										<ButtonStyled
											onClick={() => {
												setDrawerOpen(false);
												handlePopoverClose();
												navigate("/login", { state: { from: location } });
											}}
										>
											SIGN IN TO VIEW ACCOUNT MENU
										</ButtonStyled>
									</Stack>
								)}
							</Popover>
							<Tooltip title={"Click here to visit our FAQ page"}>
								<Button
									size="large"
									aria-label="help"
									onClick={() => navigate("/FAQ")}
									sx={{ color: fontDark, height: "100%" }}
								>
									<HelpIcon />
								</Button>
							</Tooltip>
						</Box>
					</Toolbar>
				</AppBar>

				<Drawer
					anchor="left"
					open={drawerOpen}
					onClose={toggleDrawer(false)}
					PaperProps={{
						sx: {
							width: { xs: "100vw", sm: "16vw" },
							pt: { xs: "2px", sm: "20px" },
							minWidth: { xs: "100vw", sm: "300px" },
						},
					}}
				>
					<Stack
						direction={"row"}
						alignItems={"center"}
						justifyContent={"flex-end"}
						sx={{ display: { sm: "none" }, m: 1, height: "24px" }}
					>
						<IconButton
							onClick={toggleDrawer(false)}
							sx={{ color: fontDark, height: "100%" }}
						>
							<CloseIcon sx={{ height: "100%", m: 0 }} />
						</IconButton>
					</Stack>
					<Box id="DrawerMenu" sx={{ ml: 2, mr: 2, mt: 0 }}>
						<Typography variant="h2">MAIN MENU</Typography>
					</Box>
					<Box>
						<List sx={{ m: 2, mt: 0 }}>
							<ListItemButton
								to="/"
								component={RRDLink}
								onClick={toggleDrawer(false)}
							>
								<ListItemText primary="HOME" secondary="Landing Page" />
								<ListItemIcon sx={{ color: fontDark }}>
									<HomeIcon color="black" sx={navIconStyle} />
								</ListItemIcon>
							</ListItemButton>
							<Divider />

							<ListItemButton
								to="/browse"
								component={RRDLink}
								onClick={toggleDrawer(false)}
							>
								<ListItemText
									primary="BROWSE"
									secondary="Search for your new home"
								/>
								<ListItemIcon sx={{ color: fontDark }}>
									<SearchIcon sx={navIconStyle} />
								</ListItemIcon>
							</ListItemButton>
							<Divider />
						</List>
					</Box>

					<Box
						id="DrawerMenu"
						sx={{ ml: 2, mr: 2, mt: 3 }}
						display={"flex"}
						flexDirection={"column"}
						justifyContent={"center"}
					>
						<Typography variant="h3">MY CORNER</Typography>
						<Divider />
						{route !== "authenticated" ? (
							<Stack mt={3} spacing={1}>
								<ButtonStyled
									onClick={() => {
										setDrawerOpen(false);
										navigate("/login", { state: { from: location } });
									}}
								>
									SIGN IN
								</ButtonStyled>
								<Typography variant="subtitle1" textAlign={"center"}>
									Sign in to access your corner
								</Typography>
							</Stack>
						) : (
							<List sx={{ m: 2, mt: 0 }}>
								<ListItemButton
									to="/favorites"
									component={RRDLink}
									onClick={toggleDrawer(false)}
								>
									<ListItemText
										primary="MY FAVORITES"
										secondary="View Saved Listings Here"
									/>
									<ListItemIcon sx={{ color: fontDark }}>
										<FavoriteIcon color="black" sx={navIconStyle} />
									</ListItemIcon>
								</ListItemButton>
								<Divider />

								<ListItemButton
									to="/savedsearches"
									component={RRDLink}
									onClick={toggleDrawer(false)}
								>
									<ListItemText
										primary="MY SEARCHES"
										secondary="View Saved Searches Here"
									/>
									<ListItemIcon sx={{ color: fontDark }}>
										<BookmarkIcon color="black" sx={navIconStyle} />
									</ListItemIcon>
								</ListItemButton>
								<Divider />

								<ListItemButton
									to="/applications"
									component={RRDLink}
									onClick={toggleDrawer(false)}
								>
									<ListItemText
										primary="MY APPLICATIONS"
										secondary="View and Edit your Applications"
									/>
									<ListItemIcon sx={{ color: fontDark }}>
										<ApplicationIcon color="black" sx={navIconStyle} />
									</ListItemIcon>
								</ListItemButton>
								<Divider />
								<ListItemButton
									to="/profile"
									component={RRDLink}
									onClick={toggleDrawer(false)}
								>
									<ListItemText
										primary="MY PROFILE"
										secondary="View and Edit your Profile"
									/>
									<ListItemIcon sx={{ color: fontDark }}>
										<UserIcon color="black" sx={navIconStyle} />
									</ListItemIcon>
								</ListItemButton>
							</List>
						)}
						{route === "authenticated" && (
							<ButtonStyled
								onClick={() => {
									handlePopoverClose();
									LogoutFunc();
								}}
							>
								SIGN OUT
							</ButtonStyled>
						)}
					</Box>
				</Drawer>
				<Container
					component="main"
					sx={{
						width: { xs: "98vw", sm: "1150px" },
						maxWidth: { sm: "98vw" },
					}}
				>
					<Outlet />
				</Container>
			</Box>

			<CreateAccountModal setModalOpen={setModalOpen} modalOpen={modalOpen} />
		</>
	);
}

export default NavLayout;
