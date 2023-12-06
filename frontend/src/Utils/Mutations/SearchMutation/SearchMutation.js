import { useContext } from "react";
import { UserContext } from "../../UserContext/UserContext";
import { API } from "@aws-amplify/api";
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
export function DeleteHandlerConstructor({
	successCallback = () => {},
	errorCallback = () => {},
}) {
	const { getAccessToken } = useContext(UserContext);
	return async (searchString) => {
		const token = await getAccessToken();
		if (!token) {
			console.error("Authentication token not available.");
			return;
		}

		try {
			await API.del("HMEBackend", "/api/user/remove/s", {
				headers: { Authorization: `Bearer ${token}` },
				response: true,
				queryStringParameters: {
					searchString,
				},
			});
			successCallback();
		} catch (error) {
			errorCallback();
			console.error("Failed to delete:", error);
		}
	};
}
