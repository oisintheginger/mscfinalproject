export function URLToBreadcrumbMapper({ inputString }) {
	switch (inputString) {
		case "/":
			return "Home";
		case "/browse":
			return "Browse";
		case "/favorites":
			return "My Favorites";
		case "/applications":
			return "My Applications";
		case "/profile":
			return "My Profile";
		case "/savedsearches":
			return "My Searches";
		case "/contactus":
			return "Contact";
	}
}
