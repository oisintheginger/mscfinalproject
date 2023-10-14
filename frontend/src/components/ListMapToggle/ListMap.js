import {
	Button,
	ButtonGroup,
	List,
	Box,
	Stack,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
	Container,
} from "@mui/material";
import { styled } from "@mui/material";
import { ListIcon, MapIcon } from "../../Icons/HMEIcons";
import { useState } from "react";
import { darkTeal, fontDark } from "../../Styling/styleConstants";
function ListMap({ children }) {
	const MAP = true;
	const LIST = false;
	const [selected, setSelected] = useState(LIST);

	const ToggleStyled = styled(ToggleButton)({
		"&.Mui-selected, &.Mui-selected:hover": {
			backgroundColor: darkTeal,
		},
	});

	const handleClick = (event, newVal) => {
		if (newVal !== null) {
			setSelected(newVal);
		}
	};
	return (
		<Box maxHeight={"fit-content"} width={"100%"} justifyContent={"center"}>
			<Stack direction={"column"} justifyContent={"center"}>
				<Stack direction={"row"} width={"100%"} justifyContent={"flex-start"}>
					<ToggleButtonGroup
						value={selected}
						exclusive
						onChange={handleClick}
						color="primary"
					>
						<ToggleStyled value={LIST} selected={selected === LIST}>
							<Stack direction={"row"} spacing={2}>
								<Typography
									variant="button"
									sx={{ color: selected == LIST ? "white" : "black" }}
								>
									LIST
								</Typography>
								<ListIcon sx={{ marginLeft: 4 }} />
							</Stack>
						</ToggleStyled>
						<ToggleStyled value={MAP} selected={selected === MAP}>
							<Stack direction={"row"} spacing={2}>
								<Typography
									variant="button"
									sx={{ color: selected == MAP ? "white" : "black" }}
								>
									Map
								</Typography>
								<MapIcon sx={{ marginLeft: 4 }} />
							</Stack>
						</ToggleStyled>
					</ToggleButtonGroup>
				</Stack>
				<Box maxWidth={{ xs: "90vw" }}>{selected && children}</Box>
			</Stack>
		</Box>
	);
}

export default ListMap;
