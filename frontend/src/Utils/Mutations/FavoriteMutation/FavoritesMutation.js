import { API } from "aws-amplify";
import { useMutation } from "react-query";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useContext } from "react";
import { UserContext } from "../../UserContext/UserContext";

export function AddToFavoritesMutation(
	propertyId,
	successCallback = () => {},
	errorCallback = () => {}
) {
	const { user } = useAuthenticator((context) => [context.user]);

	return useMutation({
		mutationFn: () => {
			return API.post("HMEBackend", "/api/user/new/f", {
				headers: {
					Authorization:
						"Bearer " +
							user?.getSignInUserSession().getAccessToken().getJwtToken() ||
						null,
				},
				response: true,
				queryStringParameters: {
					propertyId: propertyId,
				},
			});
		},
		onMutate: () => {
			console.log("triggered");
		},
		onError: (err) => {
			errorCallback(err);
			console.log(err);
		},
		onSuccess: (data) => {
			successCallback(data);
		},
	});
}

export function RemoveFromFavoritesMutation(
	propertyId,
	successCallback = () => {},
	errorCallback = () => {}
) {
	const { user } = useAuthenticator((context) => [context.user]);
	return useMutation({
		mutationFn: () => {
			return API.del("HMEBackend", "/api/user/remove/f", {
				headers: {
					Authorization:
						"Bearer " +
							user?.getSignInUserSession().getAccessToken().getJwtToken() ||
						null,
				},
				response: true,
				queryStringParameters: {
					propertyId: propertyId,
				},
			});
		},
		onMutate: () => {
			console.log("triggered");
		},
		onError: (err) => {
			errorCallback(err);
			console.log(err);
		},
		onSuccess: (data) => {
			successCallback(data);
		},
	});
}
