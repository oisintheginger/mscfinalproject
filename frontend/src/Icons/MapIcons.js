import Leaflet from "leaflet";
import createSvgIcon from "@mui/material/utils/createSvgIcon";

export const LeafletPlaceholder = new Leaflet.Icon({
	iconUrl: require("./MapLocationIcons/Placeholder.png"),
	iconAnchor: [14, 28],
	popupAnchor: [0, -28],
});

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

export const ArtGalleryIcon = createSvgIcon(
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
		class="lucide lucide-brush"
	>
		<path d="m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08" />
		<path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z" />
	</svg>,
	"ArtGalleryIcon"
);

export const LeafletArtGallery = new Leaflet.Icon({
	iconUrl: require("./MapLocationIcons/ArtGallery.png"),
	iconAnchor: [14, 28],
	popupAnchor: [0, -28],
});

export const AmusementParkIcon = createSvgIcon(
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
		class="lucide lucide-ferris-wheel"
	>
		<circle cx="12" cy="12" r="2" />
		<path d="M12 2v4" />
		<path d="m6.8 15-3.5 2" />
		<path d="m20.7 7-3.5 2" />
		<path d="M6.8 9 3.3 7" />
		<path d="m20.7 17-3.5-2" />
		<path d="m9 22 3-8 3 8" />
		<path d="M8 22h8" />
		<path d="M18 18.7a9 9 0 1 0-12 0" />
	</svg>,
	"AmusementParkIcon"
);

export const LeafletAmusementPark = new Leaflet.Icon({
	iconUrl: require("./MapLocationIcons/AmusementPark.png"),
	iconAnchor: [14, 28],
	popupAnchor: [0, -28],
});

export const BowlingIcon = createSvgIcon(
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
		class="lucide lucide-circle"
	>
		<circle cx="12" cy="12" r="10" />
	</svg>,
	"BowlingIcon"
);

export const LeafletBowling = new Leaflet.Icon({
	iconUrl: require("./MapLocationIcons/Bowling.png"),
	iconAnchor: [14, 28],
	popupAnchor: [0, -28],
});

export const AquariumIcon = createSvgIcon(
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
		class="lucide lucide-fish"
	>
		<path d="M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z" />
		<path d="M18 12v.5" />
		<path d="M16 17.93a9.77 9.77 0 0 1 0-11.86" />
		<path d="M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33" />
		<path d="M10.46 7.26C10.2 5.88 9.17 4.24 8 3h5.8a2 2 0 0 1 1.98 1.67l.23 1.4" />
		<path d="m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98" />
	</svg>,
	"AquariumIcon"
);

export const LeafletAquarium = new Leaflet.Icon({
	iconUrl: require("./MapLocationIcons/Aquarium.png"),
	iconAnchor: [14, 28],
	popupAnchor: [0, -28],
});

export const MuseumIcon = createSvgIcon(
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
	"MuseumIcon"
);

export const LeafletMuseum = new Leaflet.Icon({
	iconUrl: require("./MapLocationIcons/Museum.png"),
	iconAnchor: [14, 28],
	popupAnchor: [0, -28],
});

export const MovieTheatreIcon = createSvgIcon(
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
		class="lucide lucide-popcorn"
	>
		<path d="M18 8a2 2 0 0 0 0-4 2 2 0 0 0-4 0 2 2 0 0 0-4 0 2 2 0 0 0-4 0 2 2 0 0 0 0 4" />
		<path d="M10 22 9 8" />
		<path d="m14 22 1-14" />
		<path d="M20 8c.5 0 .9.4.8 1l-2.6 12c-.1.5-.7 1-1.2 1H7c-.6 0-1.1-.4-1.2-1L3.2 9c-.1-.6.3-1 .8-1Z" />
	</svg>,
	"MovieTheatreIcon"
);

export const LeafletMovieTheatre = new Leaflet.Icon({
	iconUrl: require("./MapLocationIcons/MovieTheatre.png"),
	iconAnchor: [14, 28],
	popupAnchor: [0, -28],
});
