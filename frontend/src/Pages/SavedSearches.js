
import PageTemplate from "./PageTemplate";
import RenderSaveSearch from "../components/SearchAndFilters/RenderSaveSearch"
function SavedSearches() {
	return (
		<PageTemplate
			pageTitle="My Saved Searches"
			currPageBreadcrumb={"My Saved Searches"}
		>
			<RenderSaveSearch/>
			{/* <table>
				<thead>
					<tr>
						<th>Search Name</th>
						<th>Min Price</th>
						<th>Max Price</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{searchData.map((search,index)=>(
						<tr key={index}>
							<td>{search.searchName}</td>
							<td>{search.minPrice}</td>
							<td>{search.maxPrice}</td>
							<td><button>Delete</button></td>
						</tr>
					))}
				</tbody>
			</table> */}



		</PageTemplate>
	);
}

export default SavedSearches;
