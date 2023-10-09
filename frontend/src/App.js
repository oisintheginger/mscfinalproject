import {
	createBrowserRouter,
	Route,
	createRoutesFromElements,
	RouterProvider,
} from "react-router-dom";

import { ThemeProvider } from "@mui/material";
import "./App.css";

//pages
import Browse from "./Pages/Browse";
import Homepage from "./components/Homepage";
import Profile from "./components/Profile";

//layout
import NavLayout from "./layouts/NavLayout";
import theme from "./Styling/theme";

// browser router i.e. route tree
const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<NavLayout />}>
			<Route index element={<Homepage />} />
			<Route path="/browse" element={<Browse />} />
			<Route path="/profile" element={<Profile />} />
			<Route path="/favorites" element={<Browse />} />
			<Route path="/savedsearches" element={<Browse />} />
			<Route path="/applications" element={<Browse />} />
		</Route>
	)
);

function App() {
	return (
		<ThemeProvider theme={theme}>
			<RouterProvider router={router} />
		</ThemeProvider>
	);
}

export default App;
