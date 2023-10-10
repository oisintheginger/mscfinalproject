import { Container, Divider, Stack } from "@mui/material";
import SearchAndFilters from "../components/SearchAndFilters/SearchAndFilter";
import PageTemplate from "./PageTemplate";
import ListMap from "../components/ListMapToggle/ListMap";
import LeafletMap from "../components/MapComponent/LeafletMap";
import ResultGrid from "../components/ResultsGrid/ResultsGrid";
import Pagination from "@mui/material/Pagination";
function Browse() {
	return (
		<PageTemplate pageTitle="Browse">
			<SearchAndFilters />
			<Divider />
			<ListMap>
				<LeafletMap />
			</ListMap>

			<ResultGrid></ResultGrid>
			<Pagination count={10} variant="outlined" sx={{ alignSelf: "center" }} />
		</PageTemplate>
	);
}

export default Browse;
