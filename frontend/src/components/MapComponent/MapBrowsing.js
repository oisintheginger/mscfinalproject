import { Box } from "@mui/material";
import LeafletMap from "./LeafletMap";

function MapBrowsing({ mapData }) {
	return (
		<Box maxWidth={{ xs: "90vw" }}>
			<LeafletMap propertyData={mapData?.data} />
		</Box>
	);
}
export default MapBrowsing;
