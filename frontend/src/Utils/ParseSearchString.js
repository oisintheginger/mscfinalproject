export const parseSearchString = (searchString) => {
	// Replacing %2B or space encoded as %20 back to the actual plus sign or space for URLSearchParams
	const correctedString = searchString
		.replace(/%2B/g, "+")
		.replace(/%20/g, " ");
	const params = new URLSearchParams(correctedString);
	const search = params.get("searchString") || "";
	const minPrice = params.get("Min Price") || "";
	const maxPrice = params.get("Max Price") || "";
	return { search, minPrice, maxPrice };
};
