import { API } from "@aws-amplify/api";
import { useContext } from "react";
import { useMutation } from "react-query";
import { UserContext } from "../../UserContext/UserContext";
export function UpdateWeightsMutation(
	successCallback = () => {},
	errorCallback = () => {}
) {
	const { getAccessToken } = useContext(UserContext);

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
			// console.log("success updating weights");
			successCallback(data);
		},
		onMutate: (d) => {
			// console.log(d);
		},
	});
}
