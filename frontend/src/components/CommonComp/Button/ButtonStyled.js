import { Button, styled } from "@mui/material";
import {
	buttonHover,
	darkTeal,
	lightTeal,
} from "../../../Styling/styleConstants";

const ButtonStyled = styled(Button)({
	color: "white",
	backgroundColor: darkTeal,
	borderColor: darkTeal,
	"&:hover": {
		color: "white",
		backgroundColor: buttonHover,
	},
});

export default ButtonStyled;
