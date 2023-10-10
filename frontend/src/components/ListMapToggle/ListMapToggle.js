import {
	Button,
	ButtonGroup,
	List,
	Stack,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
} from "@mui/material";
import { styled } from "@mui/material";
import { ListIcon, MapIcon } from "../../Icons/HMEIcons";
import { useState } from "react";
import { darkTeal } from "../../Styling/styleConstants";
function ListMapToggle({ children }) {
	const MAP = true;
	const LIST = false;
	const [selected, setSelected] = useState(LIST);

	const ToggleStyled = styled(ToggleButton)({
		"&.Mui-selected, &.Mui-selected:hover": {
			color: "white",
			backgroundColor: darkTeal,
		},
	});

	const handleClick = (event, newVal) => {
		if (newVal !== null) {
			setSelected(newVal);
		}
	};
	return (
		<>
			<Stack>
				<ToggleButtonGroup
					value={selected}
					exclusive
					onChange={handleClick}
					color="primary"
				>
					<ToggleStyled value={LIST} selected={selected === LIST}>
						<Stack direction={"row"} spacing={2}>
							<Typography variant="button">LIST</Typography>
							<ListIcon sx={{ marginLeft: 4 }} />
						</Stack>
					</ToggleStyled>
					<ToggleStyled value={MAP} selected={selected === MAP}>
						<Stack direction={"row"} spacing={2}>
							<Typography variant="button">Map</Typography>
							<MapIcon sx={{ marginLeft: 4 }} />
						</Stack>
					</ToggleStyled>
				</ToggleButtonGroup>
			</Stack>
			{selected && children}
		</>
	);
}

export default ListMapToggle;
