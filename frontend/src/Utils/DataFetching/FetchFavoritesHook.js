import { useContext, useEffect } from "react";
import { UserContext } from "../UserContext/UserContext";
import { API } from "aws-amplify";
import { useQuery } from "react-query";
import { useAuthenticator } from "@aws-amplify/ui-react";

export function FetchFavoritesHook() {
	const { getAccessToken } = useContext(UserContext);
	const { route, user } = useAuthenticator((context) => [
		context.route,
		context.user,
	]);

	const {
		isSuccess,
		isError,
		isLoading,
		error,
		data: favoriteData,
		refetch,
	} = useQuery(
		["userFavourites"],
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
			response: true,
			selector: (data) => {
				const out = [
					...data.data?.map((el) => {
						return el.favourite;
					}),
				];
				return out;
			},
			onSuccess: (data) => {
				// console.log(data);
			},
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
				console.log(data);
			},
			onError: (err) => {
				// console.log(err);
			},
		}
	);

	useEffect(() => {
		if (isSuccess) {
			detailsRefetch();
		}
	}, [favoriteData, isLoading, isSuccess]);

	return {
		detailsData,
		isError,
		isLoading,
		isSuccess,
		detailsRefetch,
		favoriteData,
		refetch,
	};
}
