import { API } from "aws-amplify";
import { useMutation } from "react-query";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useContext } from "react";
import { UserContext } from "../../UserContext/UserContext";

export function SendRecommendationFeedback(
	propertyId,
	successCallback = () => {},
	errorCallback = () => {}
) {
	const { getAccessToken } = useContext(UserContext);
	return useMutation({
		mutationFn: async (feedback) => {
			const accessToken = await getAccessToken();
			return API.post("HMEBackend", `/api/properties/eval/${propertyId}`, {
				headers: {
					Authorization: "Bearer " + accessToken || null,
				},
				queryStringParameters: {
					feedback: feedback,
				},
			});
		},
		onMutate: (val) => {
			console.log(val);
		},
		onError: (err) => {
			errorCallback(err);
		},
		onSuccess: (data) => {
			successCallback(data);
		},
	});
}
