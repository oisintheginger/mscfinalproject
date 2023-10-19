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
import Homepage from "./Pages/Homepage";
import Favorites from "./Pages/Favorites";
import Applications from "./Pages/Applications";
import SavedSearches from "./Pages/SavedSearches";
import PropertyPage from "./Pages/PropertyPage";

import Profile from "./Pages/Profile";

//layout
import NavLayout from "./layouts/NavLayout.js";
import theme from "./Styling/theme";

import { Amplify, Auth, API } from "aws-amplify";
import awsconfig from "./aws-exports";
Amplify.configure(awsconfig);

// browser router i.e. route tree
const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<NavLayout />}>
			<Route index element={<Homepage />} />
			<Route path="/browse" element={<Browse />}/>
			<Route path="/favorites" element={<Favorites />} />
			<Route path="/applications" element={<Applications />} />
			<Route path="/savedsearches" element={<SavedSearches />} />
			<Route path="/profile" element={<Profile />} />
			<Route path="/property/:id" element={<PropertyPage />} />
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
