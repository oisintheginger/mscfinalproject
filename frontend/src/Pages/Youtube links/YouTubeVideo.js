import React from 'react';
const YouTubeVideo = ({ videoId }) => {
    const src = `https://www.youtube.com/embed/${videoId}`;
    return (
        <iframe
            width="560"
            height="315"
            src={src}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
        />
    );
};

export default YouTubeVideo;