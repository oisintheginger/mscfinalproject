import ResultGrid from "../ResultsGrid/ResultsGrid";

function MapResultsGrid({ properties }) {
	return (
		<>
			<ResultGrid id={"results"} propertyData={properties} />
		</>
	);
}
export default MapResultsGrid;
