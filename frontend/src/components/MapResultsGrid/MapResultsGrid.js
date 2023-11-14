import ResultGrid from "../ResultsGrid/ResultsGrid";
import { API } from "aws-amplify";
import { useQueries } from "react-query";

function MapResultsGrid({ properties }) {
	const pointQuickViews = useQueries([
		...properties?.map((point, ind) => {
			return {
				queryKey: ["Map Result", ind],
				queryFn: () => {
					return API.get(
						"HMEBackend",
						`/api/properties/${point.propertyId}`,
						{}
					);
				},
				enabled: false,
				refetchOnWindowFocus: false,
			};
		}),
	]);
	return (
		<>
			<ResultGrid id={"results"} propertyData={[{}]} />;
		</>
	);
}
export default MapResultsGrid;
