import { createTheme } from "@mui/material/styles";
import { darkTeal, lightTeal, mainWhite, fontDark } from "./styleConstants";

const theme = createTheme({
	palette: {
		primary: {
			main: "#fafcfc",
		},
		darkTeal: {
			main: "#006D77",
		},
		lightTeal: {
			main: "#CEEAEA",
		},
		darkWhite: {
			main: "#e4f0ec",
		},
	},
	typography: {
		h1: {
			fontSize: 44,
		},
		h2: {
			fontSize: 30,
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
	},
	components: {
		MuiTypography: {
			defaultProps: {
				variantMapping: {
					h2: "h1",
					landingPage: "h1",
				},
				color: fontDark,
			},
		},
	},
});

export default theme;
