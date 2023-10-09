import { createTheme } from "@mui/material/styles";

const theme = createTheme({
	palette: {
		primary: {
			main: "#F3FCFF",
		},
		darkTeal: {
			main: "#006D77",
		},
		lightTeal: {
			main: "#CEEAEA",
		},
	},
	typography: {
		h1: {
			fontSize: {
				xs: 32,
				sm: 48,
			},
		},
	},
	// components: {
	// 	MuiTypography: {
	// 		defaultProps: {
	// 			variantMapping: {
	// 				h2: "h1",
	// 			},
	// 		},
	// 	},
	// },
});

export default theme;
