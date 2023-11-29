import { API } from "aws-amplify";
import { useMutation, useQueryClient } from "react-query";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useContext } from "react";
import { UserContext } from "../../UserContext/UserContext";
import { FETCH_FAVORITES_QUERY_KEY } from "../../QueryConstants/QueryKeyConstants";

export function AddToFavoritesMutation(
	propertyId,
	successCallback = () => {},
	errorCallback = () => {}
) {
	const queryClient = useQueryClient();
	const { getAccessToken } = useContext(UserContext);
	return useMutation({
		mutationFn: async () => {
			const accessToken = await getAccessToken();
			return API.post("HMEBackend", "/api/user/new/f", {
				headers: {
					Authorization: "Bearer " + accessToken || null,
				},
				response: true,
				queryStringParameters: {
					propertyId: propertyId,
				},
			});
		},
		onMutate: (mut) => {
			console.log(mut);
		},
		onError: (err) => {
			errorCallback(err);
		},
		onSuccess: (data) => {
			successCallback(data);
			queryClient.invalidateQueries({ queryKey: [FETCH_FAVORITES_QUERY_KEY] });
		},
	});
}

export function RemoveFromFavoritesMutation(
	successCallback = () => {},
	errorCallback = () => {}
) {
	const { getAccessToken } = useContext(UserContext);
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (propId) => {
			const accessToken = await getAccessToken();
			return API.del("HMEBackend", "/api/user/remove/f", {
				headers: {
					Authorization: "Bearer " + accessToken || null,
				},
				response: true,
				queryStringParameters: {
					propertyId: propId,
				},
			});
		},
		onMutate: (mut) => {
			console.log(mut);
		},
		onError: (err) => {
			errorCallback(err);
		},
		onSuccess: (data) => {
			successCallback(data);
			queryClient.invalidateQueries({ queryKey: [FETCH_FAVORITES_QUERY_KEY] });
		},
	});
}
