import { API } from "@aws-amplify/api";
import { useContext, useEffect } from "react";
import { UserContext } from "../UserContext/UserContext";
import { Auth } from "@aws-amplify/auth";
import { useQuery } from "react-query";
import { FetchFavoritesHook } from "./FetchFavoritesHook";
export function FetchRecommendedHook() {
	const { route, getAccessToken } = useContext(UserContext);

	const { favoriteData } = FetchFavoritesHook();
	const ids =
		favoriteData?.map((el) => {
			return parseInt(el.favourite);
		}) || null;

	const { data, error, isLoading, isError, isSuccess, refetch } = useQuery(
		["userRecommended"],
		async () => {
			const userInfo = await Auth.currentUserInfo();
			const accessToken = (await Auth.currentSession())
				.getIdToken()
				.getJwtToken();

			if (
				process.env.REACT_APP_RECOMMENDATION_SYSTEM == "KNN" &&
				process.env.REACT_APP_RECOMMENDATION_KNN_URL
			) {
				return fetch(process.env.REACT_APP_RECOMMENDATION_KNN_URL, {
					method: "POST",
					"Content-Type": "application/json",
					body: JSON.stringify({
						property_ids: ids,
					}),
				}).then((res) => res.json());
			} else {
				return API.post("RecommendedAPI", `/`, {
					...(route == "authenticated" && {
						headers: {
							Authorization: "Bearer " + accessToken || null,
						},
					}),
					body: {
						id: userInfo.username.toString(),
					},
				});
			}
		},
		{
			staleTime: 30000,
			select: (data) => {
				if (process.env.REACT_APP_RECOMMENDATION_SYSTEM == "KNN") {
					return data.recommended_property_ids;
				}
				let newArr = [
					...data.body.map((el) => {
						return el.property_ID;
					}),
				];
				return newArr;
			},
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			enabled: false,
			onSuccess: (data) => {
				// console.log(data);
			},
			onError: (err) => {
				// console.log(err);
			},
		}
	);

	const {
		isLoading: detailsIsLoading,
		error: detailsError,
		data: detailsData,
		refetch: detailsRefetch,
		isSuccess: detailsSuccess,
		isError: detailsIsError,
	} = useQuery(
		["recommendedQuickViews"],
		async () => {
			const accessToken = await getAccessToken();
			return API.get("HMEBackend", `/api/properties/batch`, {
				headers: {
					Authorization: "Bearer " + accessToken || null,
				},
				queryStringParameters: {
					ids: data,
				},
			});
		},
		{
			enabled: false,
			onSuccess: (data) => {
				// console.log(data);
			},
			onError: (err) => {
				// console.log(err);
			},
		}
	);

	useEffect(() => {
		if (route === "authenticated" && favoriteData) {
			refetch();
		}
	}, [route, favoriteData]);

	useEffect(() => {
		if (isSuccess) {
			detailsRefetch();
		}
	}, [data]);

	return {
		data: detailsData,
		error: { error, detailsError },
		isLoading: isLoading || detailsIsLoading,
		isError: isError || detailsIsError,
		isSuccess: isSuccess && detailsSuccess,
	};
}
