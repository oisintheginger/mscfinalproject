import { Card, Skeleton } from "@mui/material";
function SkeletonCard() {
	return (
		<Card variant="outlined" sx={{ display: "flex", gap: 2 }}>
			<Skeleton variant="rectangular" width={"100%"} height={200} />
		</Card>
	);
}
export default SkeletonCard;
