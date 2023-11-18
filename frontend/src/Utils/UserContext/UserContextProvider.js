import { useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { useQuery } from "react-query";
import { API } from "aws-amplify";
import { useAuthenticator } from "@aws-amplify/ui-react";
function UserContextProvider({ children }) {
	const { route, user } = useAuthenticator((context) => [
		context.route,
		context.user,
	]);
	const { data, refetch } = useQuery(
		"user",
		() => {
			return API.get("HMEBackend", `/api/user`, {
				headers: {
					Authorization:
						user.getSignInUserSession().getAccessToken().getJwtToken() || null,
				},
				response: true,
				enabled: false,
				queryStringParameters: {
					userId: user.username || null,
				},
			});
		},
		{
			select: (data) => {
				return data.data;
			},
			enabled: false,
			onError: (err) => {
				console.log(err);
			},
		}
	);

	useEffect(() => {
		if (route == "authenticated") {
			console.log(
				"user jwt: " +
					user.getSignInUserSession().getAccessToken().getJwtToken()
			);
			refetch();
		}
	}, [user]);

	function handleRefresh() {
		if (route == "authenticated") {
			refetch();
		}
	}

	return (
		<UserContext.Provider
			value={{ userData: data, handleRefresh: handleRefresh, route }}
		>
			{children}
		</UserContext.Provider>
	);
}

export default UserContextProvider;
