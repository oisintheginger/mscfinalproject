import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { Amplify, API } from "aws-amplify";
import awsExports from "./aws-exports";
Amplify.configure({
	...awsExports,
	API: {
		endpoints: [
			{
				name: "OisinTestAPI",
				endpoint: "https://88u4rq8vn2.execute-api.eu-west-1.amazonaws.com/Dev",
				service: "lambda",
				region: "eu-west-1",
			},
			{
				name: "HMEBackend",
				endpoint: "https://xbqk5zhumf.execute-api.eu-west-1.amazonaws.com/Prod",
				service: "lambda",
				region: "eu-west-1",
			},
		],
	},
});

API.post("OisinTestAPI", "/", {
	header: {},
	response: true,
	body: { message: "This is a test invocation of the test API" },
})
	.then((response) => {
		console.log(response);
	})
	.catch((error) => {
		console.log(error.response);
	});
// API.get("HMEBackend", "/api/properties", { headers: {}, response: true })
// 	.then((response) => console.log(response.data))
// 	.catch((err) => {
// 		console.log(err.response);
// 	});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
