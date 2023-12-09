import { API } from "@aws-amplify/api";
import { useMutation } from "react-query";
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
			// console.log(val);
		},
		onError: (err) => {
			errorCallback(err);
		},
		onSuccess: (data) => {
			successCallback(data);
		},
	});
}
