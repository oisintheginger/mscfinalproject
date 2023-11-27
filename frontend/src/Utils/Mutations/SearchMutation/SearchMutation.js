import { useContext } from "react";
import { UserContext } from "../../UserContext/UserContext";
import { API } from "aws-amplify";
import { useMutation } from "react-query";

export function RemoveFromSaveSearchMutation({
	successCallback = () => {},
	errorCallback = () => {},
}) {
	const { getAccessToken } = useContext(UserContext);

	return useMutation({
		mutationFn: async (search) => {
			const accessToken = await getAccessToken();
			return API.del("HMEBackend", "/api/user/remove/s", {
				headers: {
					Authorization: "Bearer " + accessToken || null,
				},
				response: true,
				queryStringParameters: {
					searchString: search,
				},
			});
		},
		onMutate: (mut) => {
			// console.log(mut);
		},
		onError: (err) => {
			errorCallback(err);
		},
		onSuccess: (data) => {
			successCallback(data);
		},
	});
}
