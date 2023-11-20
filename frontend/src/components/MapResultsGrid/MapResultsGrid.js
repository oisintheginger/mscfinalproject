import ResultGrid from "../ResultsGrid/ResultsGrid";
import { API } from "aws-amplify";
import { useQueries } from "react-query";

function MapResultsGrid({ properties }) {
	return (
		<>
			<ResultGrid id={"results"} propertyData={properties} />
		</>
	);
}
export default MapResultsGrid;
