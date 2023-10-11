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
			fontSize: 44,
		},
		h2: {
			fontSize: 30,
		},
		h3: {
			fontSize: 24,
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
