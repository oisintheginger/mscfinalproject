import { useContext, useEffect } from "react";
import { UserContext } from "../UserContext/UserContext";
import { API } from "@aws-amplify/api";
import { useQuery } from "react-query";
import { FETCH_FAVORITES_QUERY_KEY } from "../QueryConstants/QueryKeyConstants";

export function FetchFavoritesHook() {
	const { getAccessToken } = useContext(UserContext);

	const {
		isSuccess,
		isError,
		isLoading,
		error,
		data: favoriteData,
		refetch,
	} = useQuery(
		[FETCH_FAVORITES_QUERY_KEY],
		async () => {
			const accessToken = await getAccessToken();
			return API.get("HMEBackend", `/api/user/f`, {
				headers: {
					Authorization: "Bearer " + accessToken || null,
				},
			});
		},
		{
			refetchOnMount: true,
			staleTime: 0,
			response: true,
			onSuccess: (data) => {},
		}
	);

	const favoriteIds = favoriteData
		?.map((el) => {
			return el.favourite.toString();
		})
		.filter((el) => {
			return el != "1";
		});

	const {
		isError: detailsIsError,
		isLoading: detailsIsLoading,
		error: detailsError,
		data: detailsData,
		refetch: detailsRefetch,
	} = useQuery(
		["favoriteQuickViews"],
		() => {
			return API.get("HMEBackend", `/api/properties/batch`, {
				queryStringParameters: {
					ids: favoriteIds,
				},
			});
		},
		{
			response: true,
			enabled: false,
			refetchOnWindowFocus: false,
			select: (data) => {
				return data;
			},
			onSuccess: (data) => {
				// console.log(data);
			},
			onError: (err) => {
				// console.log(err);
			},
		}
	);

	useEffect(() => {
		if (isSuccess && favoriteIds?.length > 0) {
			detailsRefetch();
		}
	}, [favoriteData, isLoading, isSuccess]);

	return {
		detailsData,
		detailsRefetch,
		detailsIsLoading: detailsIsLoading || isLoading,
		detailsIsError: detailsIsError || isError,
		isError,
		isLoading,
		isSuccess,
		favoriteData,
		refetch,
	};
}
