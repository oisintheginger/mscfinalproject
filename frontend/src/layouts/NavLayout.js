import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import { useLocation, Link as RRDLink } from "react-router-dom";
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
import { darkTeal, fontDark } from "../Styling/styleConstants";
import HMELogo from "./../Icons/HME.png";

function NavLayout() {
	const [drawerOpen, setDrawerOpen] = useState(false);

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

	return (
		<Box sx={{ flexGrow: 1, width: "100%" }}>
			<AppBar position="static" sx={{ width: "100%" }}>
				<Toolbar disableGutters variant="dense" sx={{ width: "100%" }}>
					<Button
						size="large"
						aria-label="menu"
						onClick={toggleDrawer(true)}
						sx={{ color: fontDark }}
					>
						<MenuIcon sx={{ color: fontDark }} />
						<Typography
							variant="button"
							display={{ xs: "none", lg: "block" }}
							marginLeft={2}
						>
							MAIN MENU
						</Typography>
					</Button>
					<Container sx={{ paddingLeft: 0 }}>
						<Stack
							justifyContent="center"
							alignItems="center"
							alignContent="center"
						>
							<ListItemButton to="/" sx={{ transform: "translate(-3vw,0px)" }}>
								<Box
									component={"img"}
									src={HMELogo}
									sx={{ width: "100px", height: "100%" }}
									alt="Housing Made Easy Logo"
								/>
							</ListItemButton>
						</Stack>
					</Container>
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
					<Typography variant="h6">MAIN MENU</Typography>
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
				<Box id="DrawerMenu" sx={{ ml: 2, mr: 2, mt: 3 }}>
					<Typography variant="h6">My Stuff</Typography>
					<Divider />
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
								primary="MY SAVED SEARCHES"
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
				</Box>
			</Drawer>
			{/* MAIN CONTENT OUTLET GOES HERE */}
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
	);
}

export default NavLayout;
