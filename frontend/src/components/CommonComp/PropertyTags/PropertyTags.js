import { Stack, Chip } from "@mui/material";
import CommuteIcon from "@mui/icons-material/Commute";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import SecurityIcon from "@mui/icons-material/Security";
import SpaIcon from "@mui/icons-material/Spa";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import AttractionsIcon from "@mui/icons-material/Attractions";
import NightlifeIcon from "@mui/icons-material/Nightlife";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService";
const TagMap = {
	"safe area": {
		label: "Secure",
		style: {
			bgcolor: "#e9f2f7",
			borderColor: "#3277a8",
			color: "#033f61",
		},

		icon: <SecurityIcon fontSize="small" color="#00572b" />,
	},
	finance: {
		label: "Finance",
		style: {
			borderColor: "#32a871",
			color: "#00572b",
			bgcolor: "#e4f0ea",
		},
		icon: <AccountBalanceIcon fontSize="small" color="#00572b" />,
	},
	transportation: {
		label: "Transport",
		style: {
			borderColor: "#61a832",
			color: "#296601",
			bgcolor: "#ebf2e6",
		},
		icon: <CommuteIcon fontSize="small" color="#296601" />,
	},
	personal_care: {
		label: "Personal Care",
		style: {
			borderColor: "#a8a832",
			color: "#666900",
			bgcolor: "#fafaeb",
		},
		icon: <LocalPharmacyIcon fontSize="small" color="#296601" />,
	},
	retail: {
		label: "Retail",
		style: {
			borderColor: "#3296a8",
			color: "#00515c",
			bgcolor: "#e9f5f7",
		},
		icon: <PointOfSaleIcon fontSize="small" color="#296601" />,
	},
	fitness: {
		label: "Fitness",
		style: {
			borderColor: "#963f05",
			color: "#803301",
			bgcolor: "#f2ece9",
		},
		icon: <FitnessCenterIcon fontSize="small" color="#296601" />,
	},
	leisure: {
		label: "Leisure",
		style: {
			borderColor: "#53387a",
			color: "#261145",
			bgcolor: "#f0ebf7",
		},
		icon: <NightlifeIcon fontSize="small" color="#296601" />,
	},
	"emergency services": {
		label: "Emergency Services",
		style: {
			borderColor: "#a83e32",
			color: "#780c00",
			bgcolor: "#faeae8",
		},
		icon: <LocalPoliceIcon fontSize="small" color="#296601" />,
	},
	"Sufficient Amenities": {
		label: "Amenities",
		style: {
			borderColor: "#7a3874",
			color: "#610058",
			bgcolor: "#f5e9f4",
		},
		icon: <LocalLaundryServiceIcon fontSize="small" color="#296601" />,
	},
};

export function PropertyTags({ tags }) {
	return (
		<Stack
			direction={"row"}
			flexWrap={"wrap"}
			justifyContent={"flex-start"}
			useFlexGap
			spacing={1}
		>
			{tags?.map((el) => {
				return (
					<Chip
						label={TagMap[el].label}
						sx={{
							fontSize: 15,
							fontWeight: 600,
							...TagMap[el].style,
							borderWidth: 2,
						}}
						icon={TagMap[el].icon}
						variant="outlined"
					/>
				);
			})}
		</Stack>
	);
}
