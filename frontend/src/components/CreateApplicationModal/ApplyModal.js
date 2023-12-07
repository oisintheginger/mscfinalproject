import {
	Box,
	Stack,
	Typography,
	Button,
	IconButton,
	TextField,
} from "@mui/material";
import { CloseIcon } from "../../Icons/HMEIcons";
import { useForm } from "react-hook-form";

function ApplyModal({ closeModal, submitFunction }) {
	const methods = useForm({ defaultValues: { message: "" } });

	const submitHandler = (e) => {
		submitFunction(e);
	};

	return (
		<Box
			display={"flex"}
			flexDirection={"column"}
			alignItems={"center"}
			width={"100%"}
			height={"100%"}
		>
			<IconButton
				onClick={closeModal}
				sx={{ position: "absolute", right: 0, top: 0 }}
			>
				<CloseIcon />
			</IconButton>
			<Typography variant="h3" fontWeight={"bold"} mb={3} textAlign={"center"}>
				Application Form
			</Typography>
			<Stack
				sx={{
					alignItems: "center",
					height: "100%",
				}}
				component={"form"}
				spacing={2}
			>
				<TextField
					placeholder="Message"
					sx={{ width: "100%" }}
					color="darkTeal"
					fullWidth={true}
					multiline={true}
					rows={6}
					error={methods.formState.errors.message}
					helperText={methods.formState.errors.message?.message}
					{...methods.register("message", {
						required: "This Field Is Required",
						maxLength: {
							value: 500,
							message: "Max 500 Characters Long",
						},
					})}
				/>
				<Button
					onClick={methods.handleSubmit(submitHandler)}
					variant="contained"
					sx={{ backgroundColor: "darkTeal.main", color: "white", mb: 2 }}
				>
					Submit
				</Button>
			</Stack>
		</Box>
	);
}

export default ApplyModal;
