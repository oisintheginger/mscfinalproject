import { useAuthenticator } from "@aws-amplify/ui-react";
import { API } from "aws-amplify";
import { useMutation } from "react-query";

import { useContext } from "react";
import { UserContext } from "../../UserContext/UserContext";
export function CreateApplicationMutation(
	successCallback = () => {},
	errorCallback = () => {}
) {
	const { getAccessToken } = useContext(UserContext);

	return useMutation({
		mutationFn: async ({ propertyId, message }) => {
			const accessToken = await getAccessToken();
			return API.post("HMEBackend", "/api/user/new/a", {
				headers: {
					Authorization: "Bearer " + accessToken || null,
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
		onError: () => {
			errorCallback();
		},
		onMutate: (d) => {
			// console.log(d);
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
			return API.del("HMEBackend", "/api/user/remove/a", {
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
