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

// browser router i.e. route tree

import UserPool from "./UserPool/UserPool";

import HMERouter from "./Routers/HMERouter";
import { Authenticator } from "@aws-amplify/ui-react";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Authenticator.Provider>
				<HMERouter />
			</Authenticator.Provider>
		</ThemeProvider>
	);
}

export default App;
