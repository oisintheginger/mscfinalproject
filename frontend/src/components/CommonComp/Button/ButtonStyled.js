import { Button, styled } from "@mui/material";
import {
	buttonHover,
	darkTeal,
} from "../../../Styling/styleConstants";

const ButtonStyled = styled(Button)({
	color: "white",
	backgroundColor: darkTeal,
	borderColor: darkTeal,
	"&:hover": {
		color: "white",
		backgroundColor: buttonHover,
	},
	"&:disabled": {
		color: "greyDark",
		backgroundColor: "#d3deda",
	},
});

export default ButtonStyled;
