import { useContext, useEffect } from "react";
import { UserContext } from "../UserContext/UserContext";
import { API } from "aws-amplify";
import { useQuery } from "react-query";
import { useAuthenticator } from "@aws-amplify/ui-react";

export function useFetchSavedSearchesHook() {
	const { route, user } = useAuthenticator((context) => [
		context.route,
		context.user,
	]);
	const { getAccessToken } = useContext(UserContext);

	const { data, isLoading, isError, error, refetch } = useQuery(
		"userSearches",
		async () => {
			const accessToken = await getAccessToken();
			return API.get("HMEBackend", "/api/user/s", {
				headers: {
					Authorization: "Bearer " + accessToken || null,
				},
			});
		},
		{
			onSuccess: (data) => {
				console.log("success", data);
			},
			selector: (data) => {
				return data;
			},
			response: true,
			refetchOnMount: true,
		}
	);

	return {
		savedSearchesData: data,
		savedSearchesIsLoading: isLoading,
		savedSearchesIsError: isError,
		savedSearchesError: error,
		savedSearchesRefetch: refetch,
	};
}
