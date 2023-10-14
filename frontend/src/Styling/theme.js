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
	},
	components: {
		MuiTypography: {
			defaultProps: {
				variantMapping: {
					h2: "h1",
				},
				color: fontDark,
			},
		},
	},
});

export default theme;
