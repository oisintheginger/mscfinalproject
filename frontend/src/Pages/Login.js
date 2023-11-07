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
	// Auth.currentSession()
	// 	.then((res) => {
	// 		let accessToken = res.getAccessToken();
	// 		let jwt = accessToken.getJwtToken();

	// 		//You can print them to see the full objects
	// 		console.log(`myAccessToken: ${JSON.stringify(accessToken)}`);
	// 		console.log(`myJwt: ${jwt}`);
	// 	})
	// 	.catch((err) => {
	// 		console.log(err);
	// 	});

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
				{/* <form onSubmit={onSubmit}>
					<fieldset>
						<legend>TEST LOGIN FOR CUSTOM LOGIN EVENTS</legend>
						<Box display={"flex"} flexDirection={"column"}>
							<TextField
								value={email}
								onChange={(event) => {
									setEmail(event.target.value);
								}}
								placeholder="EMAIL"
							/>
							<TextField
								value={password}
								onChange={(event) => {
									setPassword(event.target.value);
								}}
								placeholder="PASSWORD"
							/>
							<button type="submit">submit</button>
						</Box>
					</fieldset>
				</form> */}
				<Authenticator />
			</View>
		</Box>
	);
}

export default Login;
