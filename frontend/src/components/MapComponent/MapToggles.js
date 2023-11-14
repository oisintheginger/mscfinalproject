import { Stack } from "@mui/material";
import MapToggleList from "./MapToggleList";
function MapToggles({ mapFeatures }) {
	if (!mapFeatures) return <></>;
	return (
		<Stack paddingLeft={1} width={"100%"}>
			<MapToggleList
				displayTitle={"Emergency Services"}
				features={[
					mapFeatures.police,
					mapFeatures.hospital,
					mapFeatures.fire_station,
				]}
			/>
			<MapToggleList
				displayTitle={"Transport Services"}
				features={[mapFeatures.bus_station, mapFeatures.train_station]}
			/>
			<MapToggleList
				displayTitle={"Retail Services"}
				features={[
					mapFeatures.supermarket,
					mapFeatures.pharmacy,
					mapFeatures.bank,
				]}
			/>
			<MapToggleList
				displayTitle={"Food and Drink"}
				features={[
					mapFeatures.cafe,
					mapFeatures.restaurant,
					mapFeatures.night_club,
				]}
			/>
			<MapToggleList
				displayTitle={"Entertainment and Recreation"}
				features={[
					mapFeatures.gym,
					mapFeatures.amusement_park,
					mapFeatures.art_gallery,
					mapFeatures.bowling_alley,
					mapFeatures.aquarium,
					mapFeatures.movie_theater,
					mapFeatures.museum,
				]}
			/>
		</Stack>
	);
}
export default MapToggles;
