import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";
const YouTubeVideo = ({ videoId }) => {
	const src = `https://www.youtube.com/embed/${videoId}`;
	const theme = useTheme();
	const down = useMediaQuery(theme.breakpoints.down("md"));

	return (
		<iframe
			width="560"
			style={{ maxWidth: "70vw", height: down ? "43vw" : 350 }}
			src={src}
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowFullScreen
			title="Embedded youtube"
		/>
	);
};

export default YouTubeVideo;
