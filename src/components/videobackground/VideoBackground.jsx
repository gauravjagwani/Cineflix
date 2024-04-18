import React, { useEffect, useState } from "react";
import "./style.scss";
import { addTrailerVideo } from "../../store/homeSlice";
import useFetch from "../../hooks/useFetch";
import { useSelector, useDispatch } from "react-redux";
import ContentWrapper from "../contentWrapper/ContentWrapper";
const VideoBackground = ({ movieId }) => {
  const [videokey, setVideokey] = useState([]);
  //   const { data, loading } = useFetch(`/movie/
  //   634492/videos?language=en-US`);
  //   console.log(data);
  //   const filterData = data?.results.filter(
  //     (video) => video?.type === "Trailer" || video?.name === "Official Trailer"
  //   );

  const dispatch = useDispatch();

  const { data, loading } = useFetch(`/movie/${movieId}/videos?language=en-US`);

  const key =
    data?.results.length > 0 ? data?.results[1].key : data?.results[0].key;
  console.log(key);

  return (
    <div className="video-bg">
      <iframe
        width="1920"
        height="720"
        src={"https://www.youtube.com/embed/" + key + "?autoplay=1&mute=1"}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoBackground;
