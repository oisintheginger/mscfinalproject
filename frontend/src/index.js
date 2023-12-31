import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports";
Amplify.configure({
	...awsExports,
	API: {
		endpoints: [
			{
				name: "GoogleMapApi",
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
			{
				name: "PersonalScoresAPI",
				endpoint: "https://jt3mygqld8.execute-api.eu-west-1.amazonaws.com/Prod",
				service: "lambda",
				region: "eu-west-1",
			},
			{
				name: "RecommendedAPI",
				endpoint: "https://kcxecfvcyg.execute-api.eu-west-1.amazonaws.com/Prod",
				service: "lambda",
				region: "eu-west-1",
			},
		],
	},
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
