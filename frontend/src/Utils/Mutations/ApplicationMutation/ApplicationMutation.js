import { useAuthenticator } from "@aws-amplify/ui-react";
import { API } from "aws-amplify";
import { useMutation } from "react-query";
export function CreateApplicationMutation(
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
