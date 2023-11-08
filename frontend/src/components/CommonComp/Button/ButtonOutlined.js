import { Button, styled } from "@mui/material";
import {
	buttonHover,
	darkTeal,
	lightTeal,
} from "../../../Styling/styleConstants";

const ButtonOutlined = styled(Button)({
	color: darkTeal,
	backgroundColor: "white",
	borderColor: darkTeal,
	"&:hover": {
		color: "white",
		backgroundColor: buttonHover,
	},
});

export default ButtonOutlined;
