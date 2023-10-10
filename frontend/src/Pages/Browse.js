import { Divider } from "@mui/material";
import SearchAndFilters from "../components/SearchAndFilters/SearchAndFilter";
import PageTemplate from "./PageTemplate";
import ListMapToggle from "../components/ListMapToggle/ListMapToggle";
import LeafletMap from "../components/MapComponent/LeafletMap";
function Browse() {
	return (
		<PageTemplate pageTitle="Browse">
			<SearchAndFilters />
			<Divider />
			<ListMapToggle>
				<LeafletMap />
			</ListMapToggle>
		</PageTemplate>
	);
}

export default Browse;
