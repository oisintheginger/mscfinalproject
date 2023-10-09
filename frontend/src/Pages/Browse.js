import { Divider } from "@mui/material";
import SearchAndFilters from "../components/SearchAndFilters/SearchAndFilter";
import PageTemplate from "./PageTemplate";
function Browse() {
	return (
		<PageTemplate pageTitle="Browse">
			<SearchAndFilters />
			<Divider />
		</PageTemplate>
	);
}

export default Browse;
