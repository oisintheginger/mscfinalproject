import { useEffect, useState } from "react";
import { Authenticator, useAuthenticator, View } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useNavigate, useLocation } from "react-router-dom";
import { TextField, Box } from "@mui/material";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";

import UserPool from "../UserPool/UserPool";
function Login() {
	const auth = useAuthenticator((context) => [context.route]);

	const route = auth.route;
	const location = useLocation();
	const navigator = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	let prev = location.state?.from?.pathname || "/";
	useEffect(() => {
		if (route === "authenticated") {
			navigator(prev, { replace: true });
		}
	}, [route, navigator, prev]);

	function onSubmit(event) {
		event.preventDefault();
		const user = new CognitoUser({ Username: email, Pool: UserPool });

		const authDetails = new AuthenticationDetails({
			Username: email,
			Password: password,
		});

		user.authenticateUser(authDetails, {
			onSuccess: (data) => {
				navigator(0);
			},
			onFailure: (data) => {
				console.log("onFailure", data);
			},
			newPasswordRequired: (data) => {
				console.log("newPasswordRequired", data);
			},
		});
	}

	return (
		<Box height={"100%"} paddingTop={2}>
			<View className="auth-wrapper">
				<Authenticator />
			</View>
		</Box>
	);
}

export default Login;
