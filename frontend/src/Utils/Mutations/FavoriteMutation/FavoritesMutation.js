import { API } from "aws-amplify";
import { useMutation } from "react-query";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useContext } from "react";
import { UserContext } from "../../UserContext/UserContext";

export function AddToFavoritesMutation(
	propertyId,
	successCallback = () => {},
	errorCallback = () => {},
	getAccessToken = () => {}
) {
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
		onMutate: () => {},
		onError: (err) => {
			errorCallback(err);
		},
		onSuccess: (data) => {
			successCallback(data);
		},
	});
}

export function RemoveFromFavoritesMutation(
	propertyId,
	successCallback = () => {},
	errorCallback = () => {},
	getAccessToken = () => {}
) {
	return useMutation({
		mutationFn: async () => {
			const accessToken = await getAccessToken();
			return API.del("HMEBackend", "/api/user/remove/f", {
				headers: {
					Authorization: "Bearer " + accessToken || null,
				},
				response: true,
				queryStringParameters: {
					propertyId: propertyId,
				},
			});
		},
		onMutate: () => {},
		onError: (err) => {
			errorCallback(err);
		},
		onSuccess: (data) => {
			successCallback(data);
		},
	});
}
