import createSvgIcon from "@mui/material/utils/createSvgIcon";
const STROKE_WIDTH = 1.5;

export const CloseIcon = createSvgIcon(
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="36"
		height="36"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width={STROKE_WIDTH}
		stroke-linecap="round"
		stroke-linejoin="round"
		class="lucide lucide-x"
	>
		<path d="M18 6 6 18" />
		<path d="m6 6 12 12" />
	</svg>,
	"Close"
);

export const SmallCloseIcon = createSvgIcon(
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		class="lucide lucide-x"
	>
		<path d="M18 6 6 18" />
		<path d="m6 6 12 12" />
	</svg>,
	"SmallClose"
);

export const HomeIcon = createSvgIcon(
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="36"
		height="36"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width={STROKE_WIDTH}
		stroke-linecap="round"
		stroke-linejoin="round"
		class="lucide lucide-home"
	>
		<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
		<polyline points="9 22 9 12 15 12 15 22" />
	</svg>,
	"Home"
);

export const SearchIcon = createSvgIcon(
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="36"
		height="36"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width={STROKE_WIDTH}
		stroke-linecap="round"
		stroke-linejoin="round"
		class="lucide lucide-search"
	>
		<circle cx="11" cy="11" r="8" />
		<path d="m21 21-4.3-4.3" />
	</svg>,
	"Search"
);

export const UserIcon = createSvgIcon(
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="36"
		height="36"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width={STROKE_WIDTH}
		stroke-linecap="round"
		stroke-linejoin="round"
		class="lucide lucide-user"
	>
		<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
		<circle cx="12" cy="7" r="4" />
	</svg>,
	"User"
);

export const FavoriteIcon = createSvgIcon(
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="36"
		height="36"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width={STROKE_WIDTH}
		stroke-linecap="round"
		stroke-linejoin="round"
		class="lucide lucide-star"
	>
		<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
	</svg>,
	"Favorite"
);

export const BookmarkIcon = createSvgIcon(
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="36"
		height="36"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width={STROKE_WIDTH}
		stroke-linecap="round"
		stroke-linejoin="round"
		class="lucide lucide-bookmark"
	>
		<path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
	</svg>,
	"Bookmark"
);

export const ApplicationIcon = createSvgIcon(
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="36"
		height="36"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="1.5"
		stroke-linecap="round"
		stroke-linejoin="round"
		class="lucide lucide-clipboard-list"
	>
		<rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
		<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
		<path d="M12 11h4" />
		<path d="M12 16h4" />
		<path d="M8 11h.01" />
		<path d="M8 16h.01" />
	</svg>,
	"Application"
);

export const FilterIcon = createSvgIcon(
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="36"
		height="36"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="1.5"
		stroke-linecap="round"
		stroke-linejoin="round"
		class="lucide lucide-sliders-horizontal"
	>
		<line x1="21" x2="14" y1="4" y2="4" />
		<line x1="10" x2="3" y1="4" y2="4" />
		<line x1="21" x2="12" y1="12" y2="12" />
		<line x1="8" x2="3" y1="12" y2="12" />
		<line x1="21" x2="16" y1="20" y2="20" />
		<line x1="12" x2="3" y1="20" y2="20" />
		<line x1="14" x2="14" y1="2" y2="6" />
		<line x1="8" x2="8" y1="10" y2="14" />
		<line x1="16" x2="16" y1="18" y2="22" />
	</svg>,
	"Filter"
);

export const SortIcon = createSvgIcon(
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="36"
		height="36"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="1.5"
		stroke-linecap="round"
		stroke-linejoin="round"
		class="lucide lucide-arrow-down-narrow-wide"
	>
		<path d="m3 16 4 4 4-4" />
		<path d="M7 20V4" />
		<path d="M11 4h4" />
		<path d="M11 8h7" />
		<path d="M11 12h10" />
	</svg>,
	"Sort"
);

export const ListIcon = createSvgIcon(
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		class="lucide lucide-list"
	>
		<line x1="8" x2="21" y1="6" y2="6" />
		<line x1="8" x2="21" y1="12" y2="12" />
		<line x1="8" x2="21" y1="18" y2="18" />
		<line x1="3" x2="3.01" y1="6" y2="6" />
		<line x1="3" x2="3.01" y1="12" y2="12" />
		<line x1="3" x2="3.01" y1="18" y2="18" />
	</svg>,
	"List"
);

export const MapIcon = createSvgIcon(
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		class="lucide lucide-map"
	>
		<polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
		<line x1="9" x2="9" y1="3" y2="18" />
		<line x1="15" x2="15" y1="6" y2="21" />
	</svg>,
	"Map"
);
