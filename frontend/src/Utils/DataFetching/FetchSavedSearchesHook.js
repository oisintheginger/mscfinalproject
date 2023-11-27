import { useContext, useEffect } from "react";
import { UserContext } from "../UserContext/UserContext";
import { API } from "aws-amplify";
import { useQuery } from "react-query";
import { useAuthenticator } from "@aws-amplify/ui-react";

export function useFetchSavedSearchesHook() {
	const { getAccessToken } = useContext(UserContext);

	const { data, isLoading, isError, error, refetch, isSuccess } = useQuery(
		["userSearches"],
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
			select: (data) => {
				return data;
			},
			response: true,
			staleTime: 0,
			refetchOnMount: true,
		}
	);

	return {
		savedSearchesData: data?.filter((el) => {
			return el.search != "1";
		}),
		savedSearchesIsSuccess: isSuccess,
		savedSearchesIsLoading: isLoading,
		savedSearchesIsError: isError,
		savedSearchesError: error,
		savedSearchesRefetch: refetch,
	};
}
