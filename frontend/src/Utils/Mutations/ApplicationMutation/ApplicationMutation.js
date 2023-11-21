import { useAuthenticator } from "@aws-amplify/ui-react";
import { API } from "aws-amplify";
import { useMutation } from "react-query";
export function CreateApplicationMutation(
	successCallback = () => {},
	errorCallback = () => {}
) {
	const { user } = useAuthenticator((context) => [context.user]);

	return useMutation({
		mutationFn: (data) => {
			return API.del("HMEBackend", "/api/user/remove/f", {
				headers: {
					Authorization:
						"Bearer " +
							user?.getSignInUserSession().getAccessToken().getJwtToken() ||
						null,
				},
				response: true,
				queryStringParameters: {
					propertyId: data.propertyId,
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

export function DeleteApplicationMutation(
	successCallback = () => {},
	errorCallback = () => {}
) {
	const { user } = useAuthenticator((context) => [context.user]);

	return useMutation({
		mutationFn: ({ propertyId, message }) => {
			return API.post("HMEBackend", "/api/user/new/a", {
				headers: {
					Authorization:
						"Bearer " +
							user?.getSignInUserSession().getAccessToken().getJwtToken() ||
						null,
				},
				response: true,
				queryStringParameters: {
					propertyId: propertyId,
					message: message,
				},
			});
		},
		onSuccess: () => {
			successCallback();
		},
	});
}
