import { create } from "@mui/material/styles/createTransitions";
import createSvgIcon from "@mui/material/utils/createSvgIcon";
import Leaflet from "leaflet";

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
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		class="lucide lucide-heart"
	>
		<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
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
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
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

export const ExpandLeftIcon = createSvgIcon(
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
		class="lucide lucide-chevrons-left"
	>
		<path d="m11 17-5-5 5-5" />
		<path d="m18 17-5-5 5-5" />
	</svg>,
	"ExpandLeft"
);

export const ExpandRightIcon = createSvgIcon(
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
		class="lucide lucide-chevrons-right"
	>
		<path d="m6 17 5-5-5-5" />
		<path d="m13 17 5-5-5-5" />
	</svg>,
	"ExpandRight"
);

export const HospitalIcon = createSvgIcon(
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="28"
		height="28"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		class="lucide lucide-stethoscope"
	>
		<path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
		<path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
		<circle cx="20" cy="10" r="2" />
	</svg>,
	"Hospital"
);
export const LeafletHospital = new Leaflet.Icon({
	iconUrl: require("./MapLocationIcons/Hospital.png"),
	iconAnchor: [14, 28],
	popupAnchor: [0, -28],
});

export const PoliceIcon = createSvgIcon(
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="28"
		height="28"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		class="lucide lucide-shield-half"
	>
		<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
		<path d="M12 22V2" />
	</svg>,
	"Police"
);
export const LeafletPolice = new Leaflet.Icon({
	iconUrl: require("./MapLocationIcons/Police.png"),
	iconAnchor: [14, 28],
	popupAnchor: [0, -28],
});

export const BankIcon = createSvgIcon(
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
		class="lucide lucide-landmark"
	>
		<line x1="3" x2="21" y1="22" y2="22" />
		<line x1="6" x2="6" y1="18" y2="11" />
		<line x1="10" x2="10" y1="18" y2="11" />
		<line x1="14" x2="14" y1="18" y2="11" />
		<line x1="18" x2="18" y1="18" y2="11" />
		<polygon points="12 2 20 7 4 7" />
	</svg>,
	"BankIcon"
);
export const LeafletBank = new Leaflet.Icon({
	iconUrl: require("./MapLocationIcons/BankIcon.png"),
	iconAnchor: [14, 28],
	popupAnchor: [0, -28],
});

export const BusStationIcon = createSvgIcon(
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
		class="lucide lucide-bus-front"
	>
		<path d="M4 6 2 7" />
		<path d="M10 6h4" />
		<path d="m22 7-2-1" />
		<rect width="16" height="16" x="4" y="3" rx="2" />
		<path d="M4 11h16" />
		<path d="M8 15h.01" />
		<path d="M16 15h.01" />
		<path d="M6 19v2" />
		<path d="M18 21v-2" />
	</svg>,
	"BusIcon"
);
export const LeafletBus = new Leaflet.Icon({
	iconUrl: require("./MapLocationIcons/BusStation.png"),
	iconAnchor: [14, 28],
	popupAnchor: [0, -28],
});

export const CafeIcon = createSvgIcon(
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
		class="lucide lucide-coffee"
	>
		<path d="M17 8h1a4 4 0 1 1 0 8h-1" />
		<path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
		<line x1="6" x2="6" y1="2" y2="4" />
		<line x1="10" x2="10" y1="2" y2="4" />
		<line x1="14" x2="14" y1="2" y2="4" />
	</svg>,
	"CafeIcon"
);
export const LeafletCafe = new Leaflet.Icon({
	iconUrl: require("./MapLocationIcons/Cafe.png"),
	iconAnchor: [14, 28],
	popupAnchor: [0, -28],
});

export const PharmacyIcon = createSvgIcon(
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
		class="lucide lucide-pill"
	>
		<path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
		<path d="m8.5 8.5 7 7" />
	</svg>,
	"PharmacyIcon"
);
export const LeafletPharmacy = new Leaflet.Icon({
	iconUrl: require("./MapLocationIcons/Pharmacy.png"),
	iconAnchor: [14, 28],
	popupAnchor: [0, -28],
});

export const SupermarketIcon = createSvgIcon(
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
		class="lucide lucide-store"
	>
		<path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
		<path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
		<path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
		<path d="M2 7h20" />
		<path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7" />
	</svg>,
	"SupermarketIcon"
);
export const LeafletSupermarket = new Leaflet.Icon({
	iconUrl: require("./MapLocationIcons/Supermarket.png"),
	iconAnchor: [14, 28],
	popupAnchor: [0, -28],
});

export const GymIcon = createSvgIcon(
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
		class="lucide lucide-dumbbell"
	>
		<path d="m6.5 6.5 11 11" />
		<path d="m21 21-1-1" />
		<path d="m3 3 1 1" />
		<path d="m18 22 4-4" />
		<path d="m2 6 4-4" />
		<path d="m3 10 7-7" />
		<path d="m14 21 7-7" />
	</svg>,
	"GymIcon"
);
export const LeafletGym = new Leaflet.Icon({
	iconUrl: require("./MapLocationIcons/Gym.png"),
	iconAnchor: [14, 28],
	popupAnchor: [0, -28],
});

export const RestaurantIcon = createSvgIcon(
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
		class="lucide lucide-utensils"
	>
		<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
		<path d="M7 2v20" />
		<path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
	</svg>,
	"RestaurantIcon"
);
export const LeafletRestaurant = new Leaflet.Icon({
	iconUrl: require("./MapLocationIcons/Restaurant.png"),
	iconAnchor: [14, 28],
	popupAnchor: [0, -28],
});

export const NightclubIcon = createSvgIcon(
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
		class="lucide lucide-martini"
	>
		<path d="M8 22h8" />
		<path d="M12 11v11" />
		<path d="m19 3-7 8-7-8Z" />
	</svg>,
	"NightclubIcon"
);
export const LeafletNightclub = new Leaflet.Icon({
	iconUrl: require("./MapLocationIcons/Nightclub.png"),
	iconAnchor: [14, 28],
	popupAnchor: [0, -28],
});

export const FireStationIcon = createSvgIcon(
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
		class="lucide lucide-flame"
	>
		<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
	</svg>,
	"FirstationIcon"
);
export const LeafletFireStation = new Leaflet.Icon({
	iconUrl: require("./MapLocationIcons/FireStation.png"),
	iconAnchor: [14, 28],
	popupAnchor: [0, -28],
});

export const TrainIcon = createSvgIcon(
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
		class="lucide lucide-train-front"
	>
		<path d="M8 3.1V7a4 4 0 0 0 8 0V3.1" />
		<path d="m9 15-1-1" />
		<path d="m15 15 1-1" />
		<path d="M9 19c-2.8 0-5-2.2-5-5v-4a8 8 0 0 1 16 0v4c0 2.8-2.2 5-5 5Z" />
		<path d="m8 19-2 3" />
		<path d="m16 19 2 3" />
	</svg>,
	"TrainIcon"
);
export const LeafletTrain = new Leaflet.Icon({
	iconUrl: require("./MapLocationIcons/Train.png"),
	iconAnchor: [14, 28],
	popupAnchor: [0, -28],
});

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

export const NextCarouselIcon = createSvgIcon(
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
		class="lucide lucide-chevron-right"
	>
		<path d="m9 18 6-6-6-6" />
	</svg>,
	"Next"
);
export const PrevCarouselIcon = createSvgIcon(
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
		class="lucide lucide-chevron-left"
	>
		<path d="m15 18-6-6 6-6" />
	</svg>,
	"Prev"
);

export const EditApplicationIcon = createSvgIcon(
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="1.25"
		stroke-linecap="round"
		stroke-linejoin="round"
		class="lucide lucide-file-edit"
	>
		<path d="M4 13.5V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2h-5.5" />
		<polyline points="14 2 14 8 20 8" />
		<path d="M10.42 12.61a2.1 2.1 0 1 1 2.97 2.97L7.95 21 4 22l.99-3.95 5.43-5.44Z" />
	</svg>,
	"EditApplication"
);

export const DeleteIcon = createSvgIcon(
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="1.25"
		stroke-linecap="round"
		stroke-linejoin="round"
		class="lucide lucide-x-circle"
	>
		<circle cx="12" cy="12" r="10" />
		<path d="m15 9-6 6" />
		<path d="m9 9 6 6" />
	</svg>,
	"Delete"
);
