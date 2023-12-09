export const MIN_PRICE = "minPrice";
export const MAX_PRICE = "maxPrice";
export const SEARCH_TERM = "searchString";
export const BEDROOM_COUNT = "minBed";
export const BATHROOM_COUNT = "minBath";
export const SHOW_HOUSES = "Houses";
export const SHOW_FLAT = "Flats/Apartments/Condos";
export const SHOW_TOWNHOUSE = "Townhouses";

export const DEFAULT_FIELD_VALUES = {
	[`${SEARCH_TERM}`]: "",
	[`${MIN_PRICE}`]: 1,
	[`${MAX_PRICE}`]: 10000,
	[`${BEDROOM_COUNT}`]: 1,
	[`${BATHROOM_COUNT}`]: 1,
	[`${SHOW_FLAT}`]: true,
	[`${SHOW_HOUSES}`]: true,
	[`${SHOW_TOWNHOUSE}`]: true,
};

export const DEFAULT_FAVORITE_FILTER_VALUES = {
	[`${MIN_PRICE}`]: 1,
	[`${MAX_PRICE}`]: 10000,
	[`${BEDROOM_COUNT}`]: 1,
	[`${BATHROOM_COUNT}`]: 1,
	[`${SHOW_FLAT}`]: true,
	[`${SHOW_HOUSES}`]: true,
	[`${SHOW_TOWNHOUSE}`]: true,
};
