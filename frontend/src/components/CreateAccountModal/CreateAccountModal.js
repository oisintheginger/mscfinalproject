import {
	Modal,
	Box,
	Typography,
	Paper,
	Button,
	IconButton,
} from "@mui/material";
import { CloseIcon } from "../../Icons/HMEIcons";
import { useState } from "react";
const contentContainerStyle = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
};
function CreateAccountModal({ modalOpen, setModalOpen }) {
	return (
		<Modal open={modalOpen}>
			<Box
				justifyContent={"center"}
				alignItems={"center"}
				width={"100%"}
				height={"100%"}
			>
				<IconButton
					disableRipple
					disableFocusRipple
					sx={{
						color: "white",
						position: "absolute",
						top: "5%",
						left: "95%",
						transform: "translate(-50%, -50%)",
					}}
					onClick={() => setModalOpen(!modalOpen)}
				>
					<CloseIcon sx={{ strokeWidth: 4 }} />
				</IconButton>
				<Box sx={contentContainerStyle}>
					<Paper>
						<Typography variant="body1" border={0}>
							HELLO
						</Typography>
					</Paper>
				</Box>
			</Box>
		</Modal>
	);
}

export default CreateAccountModal;
