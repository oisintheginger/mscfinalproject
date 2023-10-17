import { createTheme } from "@mui/material/styles";
import { darkTeal, lightTeal, mainWhite, fontDark } from "./styleConstants";

const theme = createTheme({
	palette: {
		primary: {
			main: "#fafcfc",
		},
		darkTeal: {
			main: "#05363D",
		},
		buttonHover: {
			main: "#034b54",
		},
		lightTeal: {
			main: "#CEEAEA",
		},
		darkWhite: {
			main: "#e4f0ec",
		},
		greyDark: {
			main: "#2E3637",
		},
	},
	typography: {
		h1: {
			fontSize: 44,
			fontFamily: '"Urbanist", sans-serif',
		},
		h2: {
			fontSize: 30,
			fontWeight: 400,

			fontFamily: '"Urbanist", sans-serif',
		},
		h3: {
			fontSize: 24,
		},
		button: { fontWeight: 700 },
		landingPage: {
			fontFamily: '"Urbanist", sans-serif',
			fontSize: 44,
			fontWeight: 200,
			letterSpacing: 15,
		},
		propertyPrice: {
			fontFamily: '"Urbanist", sans-serif',
			fontSize: 34,
			fontWeight: 600,
		},
		propertyAddress: {
			fontFamily: '"Urbanist", sans-serif',
			fontSize: 22,
			fontWeight: 300,
		},
		toggleMenu: {
			fontFamily: '"Urbanist", sans-serif',
			fontSize: 18,
			fontWeight: 600,
		},
	},
	components: {
		MuiTypography: {
			defaultProps: {
				variantMapping: {
					landingPage: "h1",
				},
				color: fontDark,
			},
		},
	},
});

export default theme;
