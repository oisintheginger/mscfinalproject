import { Button, styled } from "@mui/material";
import { deleteButton } from "../../../Styling/styleConstants";

const DeleteButton = styled(Button)({
	color: deleteButton,
	backgroundColor: "#fae1e1",
	borderColor: deleteButton,
	"&:hover": {
		color: "white",
		backgroundColor: deleteButton,
	},
});

export default DeleteButton;
