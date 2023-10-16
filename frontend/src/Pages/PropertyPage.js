import { useLocation } from "react-router-dom";
import PageTemplate from "./PageTemplate";

function PropertyPage() {
	const location = useLocation();
	return (
		<PageTemplate
			pageTitle="Property Price Here"
			prevPage={location.state.previousUrl}
			prevPageBreadcrumb={location.state.previousUrl}
			currPageBreadcrumb={"Property Details"}
		>
			<div>Carousel Here</div>
		</PageTemplate>
	);
}

export default PropertyPage;
