import { Divider } from "@mui/material";
import SearchAndFilters from "../components/SearchAndFilters/SearchAndFilter";
import PageTemplate from "./PageTemplate";
import ListMapToggle from "../components/ListMapToggle/ListMapToggle";
function Browse() {
	return (
		<PageTemplate pageTitle="Browse">
			<SearchAndFilters />
			<Divider />
			<ListMapToggle />
		</PageTemplate>
	);
}

export default Browse;
