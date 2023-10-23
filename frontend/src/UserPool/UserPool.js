import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
	UserPoolId: "eu-north-1_SvnV7EDxt",
	ClientId: "65etcmma09pdvc75gnhl908aae",
};

export default new CognitoUserPool(poolData);
