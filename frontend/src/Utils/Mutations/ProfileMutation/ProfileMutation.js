import { useAuthenticator } from "@aws-amplify/ui-react";
import { API } from "aws-amplify";
import { useMutation } from "react-query";
export function UpdateWeightsMutation(
	successCallback = () => {},
	errorCallback = () => {},
	getAccessToken = () => {}
) {
	const { user } = useAuthenticator((context) => [context.user]);

	return useMutation({
		mutationFn: async ({
			leisure,
			personal_care,
			retail,
			finance,
			transportation,
			fitness,
			emergency,
		}) => {
			const accessToken = await getAccessToken();
			return API.patch("HMEBackend", "/api/user/update/w", {
				headers: {
					Authorization: "Bearer " + accessToken || null,
				},
				queryStringParameters: {
					leisure: leisure,
					personal_care: personal_care,
					retail: retail,
					fitness: fitness,
					finance: finance,
					transportation: transportation,
					emergency: emergency,
				},
			});
		},
		onSuccess: (data) => {
			successCallback(data);
		},
		onMutate: (d) => {
			console.log(d);
		},
	});
}
