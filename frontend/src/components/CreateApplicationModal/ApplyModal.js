import {
	Modal,
	Box,
	Typography,
	Paper,
	Button,
	IconButton,
    FormControl,
    OutlinedInput,
} from "@mui/material";
import { CloseIcon } from "../../Icons/HMEIcons";
import { useState } from "react";
import { Form } from "react-router-dom";
const contentContainerStyle = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
};
function ApplyModal({closeModal}) {

    const [firstName, setFirstName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [contactNumber, setContactNumber] = useState("");

    const handleSubmit = () => {
        console.log("First Name:", firstName);
        console.log("Surname:", surname);
        console.log("Email Address:", email);
        console.log("Contact Number:", contactNumber);
    };
	return (
		
			<Box
				justifyContent={"center"}
				alignItems={"center"}
				width={"100%"}
				height={"100%"}
                
			>
				{/* <IconButton
					disableRipple
					disableFocusRipple
					sx={{
						color: "white",
						position: "absolute",
						top: "5%",
						left: "95%",
						transform: "translate(-50%, -50%)",
					}}
					
				>
					<CloseIcon sx={{ strokeWidth: 4 }} />
				</IconButton> */}
                <IconButton onClick={closeModal} sx={{ position: 'absolute', right: 0, top: 0 }}>
                    <CloseIcon />
                </IconButton>
				<Box sx={contentContainerStyle}>
                <Typography variant="body1" fontWeight={"bold"} mb={3}>
							Application Form
						</Typography>
					{/* <form>
                        <FormControl>
                        <Box display="flex" mb={2} gap={2}>
                            <OutlinedInput placeholder="First Name" sx={{ flexGrow: 1 }} />
                            <OutlinedInput placeholder="Surname" sx={{ flexGrow: 1 }} />
                        </Box>
                            <OutlinedInput placeholder="Email Address" sx={{mb:2}}/>
                            <OutlinedInput placeholder="Contact Number" sx={{mb:2}}/>
                            <Button 
                        onClick={()=>{alert("Well done you pushed a button!")}}
                        variant="contained"
                        sx={{backgroundColor: "darkTeal.main",
                            color: "white",
                            mb:2}}>
                            Submit
                        </Button>
                        </FormControl>
                    </form> */}

<form>
            <FormControl>
                <Box display="flex" mb={2} gap={2}>
                    <OutlinedInput 
                        placeholder="First Name" 
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        sx={{ flexGrow: 1 }} 
                    />
                    <OutlinedInput 
                        placeholder="Surname" 
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        sx={{ flexGrow: 1 }} 
                    />
                </Box>
                <OutlinedInput 
                    placeholder="Email Address" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{mb:2}}
                />
                <OutlinedInput 
                    placeholder="Contact Number" 
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    sx={{mb:2}}
                />
                <Button 
                    onClick={handleSubmit}
                    variant="contained"
                    sx={{backgroundColor: "darkTeal.main",
                        color: "white",
                        mb:2}}
                >
                    Submit
                </Button>
            </FormControl>
        </form>
						
					
				</Box>
			</Box>
		
	);
}

export default ApplyModal;
