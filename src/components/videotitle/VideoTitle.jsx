import React from "react";
import "./style.scss";
const VideoTitle = ({ title, overview }) => {
  return (
    <div className="video-title-container">
      <h1 className="movie-title">{title}</h1>
      <p className="movie-overview">{overview}</p>
    </div>
  );
};

export default VideoTitle;
