import { API } from "aws-amplify";
import { useContext, useEffect, useState } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { UserContext } from "../UserContext/UserContext";
import { Auth } from "aws-amplify";
import { useQuery } from "react-query";
export function FetchRecommendedHook() {
	const { route, getAccessToken } = useContext(UserContext);
	console.log(process.env.REACT_APP_GOOGLE_MAP_ENABLED);
	const { data, error, isLoading, isError, isSuccess, refetch } = useQuery(
		["userRecommended"],
		async () => {
			const userInfo = await Auth.currentUserInfo();
			const accessToken = (await Auth.currentSession())
				.getIdToken()
				.getJwtToken();

			if (process.env.REACT_APP_RECOMMENDATION_SYSTEM == "KNN") {
				return API.get("HMEBackend", `/api/recs/1`, {
					...(route == "authenticated" && {
						headers: {
							Authorization: "Bearer " + accessToken || null,
						},
					}),
				});
			}

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
		},
		{
			staleTime: 30000,
			select: (data) => {
				let newArr = [
					...data.body.map((el) => {
						return el.property_ID;
					}),
				];
				return newArr;
			},
			enabled: false,
			onSuccess: (data) => {
				console.log(data);
			},
			onError: (err) => {
				console.log(err);
			},
			refetchOnMount: true,
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
				console.log(data);
			},
			onError: (err) => {
				console.log(err);
			},
		}
	);

	useEffect(() => {
		if (route === "authenticated") {
			refetch();
		}
	}, [route]);

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
