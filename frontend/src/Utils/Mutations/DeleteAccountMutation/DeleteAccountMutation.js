import { useAuthenticator } from "@aws-amplify/ui-react";
import { API } from "aws-amplify";
import { useMutation } from "react-query";
import { useContext } from "react";
import { UserContext } from "../../UserContext/UserContext";

export function DeleteAccountMutation() {
	const { getAccessToken } = useContext(UserContext);
	const { signOut } = useAuthenticator((context) => [context.signOut]);

	// console.log(search);
	return useMutation({
		mutationFn: async () => {
			const accessToken = await getAccessToken();
			return API.del("HMEBackend", "/api/user/remove", {
				headers: {
					Authorization: "Bearer " + accessToken || null,
				},
			});
		},
		onError: (err) => {
			console.log(err);
		},
		onMutate: (inp) => {
			// signOut();
			// console.log(inp);
		},
		onSuccess: () => {},
	});
}
