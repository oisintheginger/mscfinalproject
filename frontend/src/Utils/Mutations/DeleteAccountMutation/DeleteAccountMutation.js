import { useAuthenticator } from "@aws-amplify/ui-react";
import { API } from "aws-amplify";
import { useMutation } from "react-query";
import { useContext } from "react";
import { UserContext } from "../../UserContext/UserContext";

export function DeleteAccountMutation() {
	const { getAccessToken } = useContext(UserContext);
	// console.log(search);
	return useMutation({
		mutationFn: async ({ search }) => {
			const accessToken = await getAccessToken();
			return API.del("HMEBackend", "/api/user/remove/dsgisbnglsdnfhsgbsfdg", {
				headers: {
					Authorization: "Bearer " + accessToken || null,
				},
				response: true,
			});
		},
		onError: (err) => {
			console.log(err);
		},
		onMutate: (inp) => {
			console.log(inp);
		},
		onSuccess: () => {},
	});
}
