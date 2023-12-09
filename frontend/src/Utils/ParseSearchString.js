import {
	MIN_PRICE,
	MAX_PRICE,
	BEDROOM_COUNT,
	BATHROOM_COUNT,
} from "./filter_constants";

export const parseSearchString = (searchString) => {
	// Replacing %2B or space encoded as %20 back to the actual plus sign or space for URLSearchParams
	const correctedString = searchString
		.replace(/%2B/g, "+")
		.replace(/%20/g, " ");
	const params = new URLSearchParams(correctedString);
	const search = params.get("searchString") || "";
	const minPrice = params.get(MIN_PRICE) || "";
	const maxPrice = params.get(MAX_PRICE) || "";
	const minBed = params.get(BEDROOM_COUNT) || "";
	const minBath = params.get(BATHROOM_COUNT) || "";
	return { search, minPrice, maxPrice, minBed, minBath };
};
