import NavLayout from "../layouts/NavLayout";

import Browse from "../Pages/Browse";
import Homepage from "../Pages/Homepage";
import Favorites from "../Pages/Favorites";
import Applications from "../Pages/Applications";
import SavedSearches from "../Pages/SavedSearches";
import PropertyPage from "../Pages/PropertyPage";
import Profile from "../Pages/Profile";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import RequireAuthWrapper from "../Pages/RequireAuthWrapper";
import Login from "../Pages/Login";
import ContactInformationPage from "../Pages/ContactInformation";
import PrivacyPolicy from "../Pages/PrivacyPolicy";
import TermsAndConditions from "../Pages/TermsAndConditionsPage";
import NotFoundPage from "../Pages/NotFoundPage";
import FAQPage from "../Pages/FAQPage";

function HMERouter() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<NavLayout />}>
					<Route index element={<Homepage />} />
					<Route path="/browse" element={<Browse />} />
					<Route
						path="/favorites"
						element={
							<RequireAuthWrapper>
								<Favorites />
							</RequireAuthWrapper>
						}
					/>
					<Route
						path="/applications"
						element={
							<RequireAuthWrapper>
								<Applications />
							</RequireAuthWrapper>
						}
					/>
					<Route
						path="/savedsearches"
						element={
							<RequireAuthWrapper>
								<SavedSearches />
							</RequireAuthWrapper>
						}
					/>
					<Route
						path="/profile"
						element={
							<RequireAuthWrapper>
								<Profile />
							</RequireAuthWrapper>
						}
					/>
					<Route path="/login" element={<Login />} />
					<Route path="/property/:id" element={<PropertyPage />} />
					<Route path="/contactus" element={<ContactInformationPage />} />
					<Route path="/privacypolicy" element={<PrivacyPolicy />} />
					<Route path="/termsandconditions" element={<TermsAndConditions />} />
					<Route path="/FAQ" element={<FAQPage />} />
					<Route path="*" element={<NotFoundPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default HMERouter;
