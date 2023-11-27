import { API } from "aws-amplify";
import { useContext, useEffect } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { UserContext } from "../UserContext/UserContext";
import { isError, useQuery } from "react-query";

export function FetchApplicationsHook() {
	const { user } = useAuthenticator((context) => [context.user]);
	const { getAccessToken } = useContext(UserContext);

	const {
		isLoading,
		isSuccess,
		isError,
		data: applicationData,
		refetch,
	} = useQuery(
		["userApplications"],
		async () => {
			const accessToken = await getAccessToken();
			return API.get("HMEBackend", `/api/user/a`, {
				headers: {
					Authorization: "Bearer " + accessToken || null,
				},
				queryStringParameters: {
					userId: user?.username || null,
				},
			});
		},
		{
			response: true,
			refetchOnMount: true,
			refetchOnWindowFocus: false,
			enabled: true,
			select: (data) => {
				return data.filter((el) => {
					return el.propertyId !== 1;
				});
			},
			onSuccess: (data) => {},
			onError: (err) => {},
		}
	);

	const applicationPropIds = applicationData?.map((el) => {
		return el.propertyId.toString();
	});

	const {
		isLoading: detailsIsLoading,
		data: detailsData,
		refetch: detailsRefetch,
		isSuccess: detailsSuccess,
		isError: detailsIsError,
	} = useQuery(
		["propertyQuickViews"],
		async () => {
			const accessToken = await getAccessToken();

			return API.get("HMEBackend", `/api/properties/batch`, {
				headers: {
					Authorization: "Bearer " + accessToken || null,
				},
				queryStringParameters: {
					ids: applicationPropIds,
				},
			});
		},
		{
			response: true,
			enabled: false,
			refetchOnWindowFocus: false,
			refetchOnMount: true,
			select: (rawData) => {
				let out = [
					...rawData.map((el) => {
						let appDet = applicationData.find((app) => {
							return app.propertyId == el.propertyId;
						});
						return {
							...el,
							message: appDet.message,
							price: el.price,
							address: el.streetAddress,
							thumbnail: el.images[0],
							status: "pending",
						};
					}),
				];

				return out;
			},
			onSuccess: (data) => {
				// console.log(data);
			},
			onError: (err) => {
				console.log(err);
			},
		}
	);
	useEffect(() => {
		if (isSuccess && applicationPropIds?.length > 0) {
			detailsRefetch();
		}
	}, [applicationData, isLoading, isSuccess]);

	return {
		detailsIsLoading: detailsIsLoading || isLoading,
		detailsError: detailsIsError || isError,
		detailsData,
		detailsSuccess,
		detailsRefetch,
		isLoading,
		isSuccess,
		applicationData,
		applicationPropIds,
		refetch,
	};
}
