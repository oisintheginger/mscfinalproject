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

import UserPool from "./UserPool/UserPool";

import HMERouter from "./Routers/HMERouter";
import { Authenticator } from "@aws-amplify/ui-react";

import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={theme}>
				<Authenticator.Provider>
					<HMERouter />
				</Authenticator.Provider>
			</ThemeProvider>
			<ReactQueryDevtools isOpen={false} position={"bottom-right"} />
		</QueryClientProvider>
	);
}

export default App;
