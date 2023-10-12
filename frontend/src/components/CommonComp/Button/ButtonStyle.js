import { Button, styled } from "@mui/material";
import { darkTeal, lightTeal } from "../../../Styling/styleConstants";

const ButtonStyled = styled(Button)({
	color: "white",
	backgroundColor: darkTeal,
	borderColor: darkTeal,
	"&:hover": {
		color: darkTeal,
		backgroundColor: lightTeal,
	},
});

export default ButtonStyled;
