import PageTemplate from "./PageTemplate";
import RenderSaveSearch from "../components/SaveSearch/RenderSaveSearch";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { API } from "aws-amplify";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useState, useEffect } from "react";
import { useFetchSavedSearchesHook } from "../Utils/DataFetching/FetchSavedSearchesHook";
function SavedSearches() {
	const location = useLocation();
	const [initialBreadcrumbLocation, setInitialBreadcrumbLocation] =
		useState(null);

	useEffect(() => {
		setInitialBreadcrumbLocation(
			location.state?.previousUrl ? location.state.previousUrl : null
		);
	}, []);

	const saveSearchRes = useFetchSavedSearchesHook();

	return (
		<PageTemplate
			pageTitle="My Saved Searches"
			currPageBreadcrumb={"My Saved Searches"}
			prevPage={initialBreadcrumbLocation}
		>
			<RenderSaveSearch {...saveSearchRes} />
		</PageTemplate>
	);
}

export default SavedSearches;
