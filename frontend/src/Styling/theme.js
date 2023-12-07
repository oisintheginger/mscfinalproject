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
		darkRed: {
			main: "#3d0507",
		},
		lightRed: {
			main: "#f0e4e4",
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
		lightGrey: {
			main: "#d3deda",
		},
		greyDark: {
			main: "#2E3637",
		},
		fullDark: { main: "#232a2b" },
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
			fontFamily: '"Urbanist", sans-serif',
		},
		alertToast: { fontSize: 18, fontFamily: '"Urbanist", sans-serif' },
		button: { fontWeight: 700 },
		landingPage: {
			fontFamily: '"Urbanist", sans-serif',
			fontSize: 44,
			fontWeight: 200,
			letterSpacing: 15,
		},
		filterTitle: {
			fontFamily: '"Urbanist", sans-serif',
			fontSize: 20,
			fontWeight: 600,
		},
		cardHeader: {
			fontFamily: '"Urbanist", sans-serif',
			fontSize: 28,
			fontWeight: 700,
		},
		cardSubTitle: {
			fontFamily: '"Urbanist", sans-serif',
			fontSize: 20,
			fontWeight: 500,
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
			fontSize: 22,
			fontWeight: 800,
			color: fontDark,
		},
		menuSubCategory: {
			fontFamily: '"Urbanist", sans-serif',
			fontSize: 16,
			fontWeight: 600,
			color: fontDark,
		},
		weightsIndicator: {
			fontSize: 22,
			fontFamily: '"Urbanist", sans-serif',
			fontWeight: 800,
		},
		weightsIndicatorUpper: {
			fontSize: 26,
			fontFamily: '"Urbanist", sans-serif',
			fontWeight: 800,
		},
		weightsOption: {
			fontSize: 16,
			fontFamily: '"Urbanist", sans-serif',
			fontWeight: 600,
		},
		scoreCategory: {
			fontFamily: '"Urbanist", sans-serif',
			fontSize: 22,
			fontWeight: 600,
			color: fontDark,
		},
		scoreValue: {
			fontFamily: '"Urbanist", sans-serif',
			fontSize: 30,
			fontWeight: 600,
		},
		individualScoreLabel: {
			fontFamily: '"Urbanist", sans-serif',
			fontSize: 20,
			fontWeight: 500,
		},
		individualScoreValue: {
			fontFamily: '"Urbanist", sans-serif',
			fontSize: 30,
			fontWeight: 800,
		},
		overallMatchScore: {
			fontFamily: '"Urbanist", sans-serif',
			fontSize: 64,
			fontWeight: 800,
		},
		crimeScoreValue: {
			fontFamily: '"Urbanist", sans-serif',
			fontSize: 56,
			fontWeight: 800,
		},
		crimeScoreDescription: {
			fontFamily: '"Urbanist", sans-serif',
			fontSize: 22,
			fontWeight: 400,
		},
		mapPopupName: {
			fontFamily: '"Urbanist", sans-serif',
			fontSize: 18,
			fontWeight: 700,
		},
		mapPopupRating: {
			fontFamily: '"Urbanist", sans-serif',
			fontSize: 22,
			fontWeight: 400,
		},
		mapBrowsingMultiPoint: {
			fontFamily: '"Urbanist", sans-serif',
			fontSize: 24,
			fontWeight: 600,
		},
		systemState: {
			fontFamily: '"Urbanist", sans-serif',
			fontSize: 22,
			fontWeight: 300,
		},
	},
	components: {
		MuiTypography: {
			defaultProps: {
				variantMapping: {
					landingPage: "h1",
					mapBrowsingMultiPoint: "p",
				},
				color: fontDark,
			},
		},

		MuiFormLabel: {
			styleOverrides: {
				root: {
					color: "greyDark.main",
					fontWeight: 600,
				},
			},
		},
	},
});

export default theme;
