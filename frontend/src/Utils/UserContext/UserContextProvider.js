import { useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { useQuery } from "react-query";
import { API } from "aws-amplify";
import { useAuthenticator } from "@aws-amplify/ui-react";
import cloneDeep from "clone-deep";
import { Auth } from "aws-amplify";

const getAccessToken = async () => {
	try {
		const session = await Auth.currentSession();
		return session?.getAccessToken().getJwtToken();
	} catch (err) {
		return null;
	}
};
function UserContextProvider({ children }) {
	const { route, user } = useAuthenticator((context) => [
		context.route,
		context.user,
	]);
	const { data, refetch } = useQuery(
		"user",
		async () => {
			const accessToken = await getAccessToken();
			return API.get("HMEBackend", `/api/user`, {
				headers: {
					Authorization: "Bearer " + accessToken || null,
				},
			});
		},
		{
			select: (data) => {
				const ParseFavorites = (userObject) => {
					const copy = cloneDeep(userObject);
					copy.favourites = copy.favourites
						.map((el) => {
							return el.favourite;
						})
						.filter((el) => {
							return el != "1";
						});
					return copy;
				};
				let out = ParseFavorites(data);
				return out;
			},
			enabled: false,
			onError: (err) => {
				console.log("Error in user context", err);
			},
			onSuccess: (data) => {
				// console.log(data);
			},
		}
	);

	useEffect(() => {
		if (route == "authenticated") {
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
			value={{
				userData: data,
				handleRefresh: handleRefresh,
				route,
				getAccessToken,
			}}
		>
			{children}
		</UserContext.Provider>
	);
}

export default UserContextProvider;
