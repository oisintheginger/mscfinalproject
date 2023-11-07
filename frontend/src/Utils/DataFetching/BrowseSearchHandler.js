import { API } from "aws-amplify";

async function BrowseSearchHandler(pageNum) {
	try {
		const res = await API.get("HMEBackend", "/api/properties", {
			headers: {},
			response: true,
			queryStringParameters: {
				page: pageNum || 1,
			},
		});
		return res.data;
	} catch (err) {}
}

export default BrowseSearchHandler;
