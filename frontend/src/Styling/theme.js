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
		secureChip: {
			main: "#3277a8",
		},
		nightlifeChip: {
			main: "#041829",
		},
		gymsChip: {
			main: "#25693c",
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
		button: { fontWeight: 700 },
		landingPage: {
			fontFamily: '"Urbanist", sans-serif',
			fontSize: 44,
			fontWeight: 200,
			letterSpacing: 15,
		},
		cardHeader: {
			fontFamily: '"Urbanist", sans-serif',
			fontSize: 28,
			fontWeight: 600,
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
