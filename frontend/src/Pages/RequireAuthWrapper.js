import { useLocation, Navigate } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";

import { Auth } from "aws-amplify";
import { useEffect } from "react";

function RequireAuthWrapper({ children }) {
	const location = useLocation();
	const auth = useAuthenticator((context) => [context.route]);

	useEffect(() => {
		if (auth.route !== "authenticated") {
			Auth.currentSession()
				.then((res) => {
					let accessToken = res.getAccessToken();
					let jwt = accessToken.getJwtToken();
                    console.log(accessToken)
				})
				.catch((err) => console.log(err));
		}
	}, []);

	if (auth.route !== "authenticated") {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}
	return children;
}

export default RequireAuthWrapper;
