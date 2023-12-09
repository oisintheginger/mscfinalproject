import { useEffect } from "react";
import { Authenticator, useAuthenticator, View } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useNavigate, useLocation } from "react-router-dom";
import { Box } from "@mui/material";

function Login() {
	const auth = useAuthenticator((context) => [context.route]);

	const route = auth.route;
	const location = useLocation();
	const navigator = useNavigate();

	let prev = location.state?.from?.pathname || "/";
	useEffect(() => {
		if (route === "authenticated") {
			navigator(prev, { replace: true });
		}
	}, [route, navigator, prev]);

	return (
		<Box height={"100%"} paddingTop={2}>
			<View className="auth-wrapper">
				<Authenticator />
			</View>
		</Box>
	);
}

export default Login;
