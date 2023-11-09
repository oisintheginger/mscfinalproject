import PageTemplate from "./PageTemplate";
import RenderSaveSearch from "../components/SearchAndFilters/RenderSaveSearch";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { API } from "aws-amplify";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useState, useEffect } from "react";
function SavedSearches() {
	const location = useLocation();
	const { route, user } = useAuthenticator((context) => [
		context.route,
		context.user,
	]);
	const [initialBreadcrumbLocation, setInitialBreadcrumbLocation] =
		useState(null);

	const { data, isLoading, isError, error, refetch } = useQuery(
		"SavedSearches",
		() => {
			return API.get("HMEBackend", "/api/user/searches", {
				headers: {
					Authorization:
						user?.getSignInUserSession().getAccessToken().jwtToken || null,
				},
				response: true,
				queryStringParameters: {
					userId: user?.username || null,
				},
				selector: (data) => {
					return data.data;
				},
			});
		}
	);

	useEffect(() => {
		setInitialBreadcrumbLocation(
			location.state?.previousUrl ? location.state.previousUrl : null
		);
	}, []);

	return (
		<PageTemplate
			pageTitle="My Saved Searches"
			currPageBreadcrumb={"My Saved Searches"}
			prevPage={initialBreadcrumbLocation}
		>
			<RenderSaveSearch searchData={data} />
		</PageTemplate>
	);
}

export default SavedSearches;
