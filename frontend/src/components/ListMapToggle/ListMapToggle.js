import {
	Box,
	Stack,
	ToggleButtonGroup,
	Tooltip,
	Typography,
} from "@mui/material";
import StyledToggle from "../CommonComp/Button/StyledToggle";
import { MapIcon, ListIcon } from "../../Icons/HMEIcons";
function ListMapToggle({ mapEnabled, setMapEnabled }) {
	const MAP = true;
	const LIST = false;
	const handleToggle = (_, newVal) => {
		if (newVal !== null) {
			setMapEnabled(newVal);
		}
	};

	return (
		<Box maxHeight={"fit-content"} width={"100%"} justifyContent={"center"}>
			<Stack direction={"column"} justifyContent={"center"}>
				<Stack direction={"row"} width={"100%"} justifyContent={"flex-start"}>
					<ToggleButtonGroup
						value={mapEnabled}
						exclusive
						onChange={handleToggle}
						color="primary"
					>
						<Tooltip title={"Open List View"}>
							<StyledToggle value={LIST} selected={mapEnabled === LIST}>
								<Stack direction={"row"} spacing={2}>
									<Typography
										variant="button"
										sx={{ color: mapEnabled == LIST ? "white" : "black" }}
									>
										LIST
									</Typography>
									<ListIcon sx={{ marginLeft: 4 }} />
								</Stack>
							</StyledToggle>
						</Tooltip>
						<Tooltip title={"Open Map View"}>
							<StyledToggle value={MAP} selected={mapEnabled === MAP}>
								<Stack direction={"row"} spacing={2}>
									<Typography
										variant="button"
										sx={{ color: mapEnabled == MAP ? "white" : "black" }}
									>
										Map
									</Typography>
									<MapIcon sx={{ marginLeft: 4 }} />
								</Stack>
							</StyledToggle>
						</Tooltip>
					</ToggleButtonGroup>
				</Stack>
			</Stack>
		</Box>
	);
}
export default ListMapToggle;
