import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.scss";

import useFetch from "../../../hooks/useFetch";

import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import VideoTitle from "../../../components/videotitle/VideoTitle";
import VideoBackground from "../../../components/videobackground/VideoBackground";

const HeroBanner = () => {
  // const [random, setRandom] = useState({});
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);
  const { data, loading } = useFetch("/movie/upcoming");

  const random = data?.results?.[Math.floor(Math.random() * 20)];

  //   console.log(random?.original_title);

  //   const id = ;
  //   console.log(id);

  //   useEffect(() => {
  //     const bg =
  //       url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.id;
  //     setBackground(bg);
  //   }, [data]);

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <div className="heroBanner">
      {!loading && (
        <div className="">
          <VideoTitle
            title={random?.original_title}
            overview={random?.overview}
          />
          <VideoBackground movieId={random?.id} />
        </div>
      )}

      <div className="opacity-layer"></div>
      <ContentWrapper>
        {/* <div className="heroBannerContent">
                    <span className="title">Welcome.</span>
                    <span className="subTitle">
                        Millions of movies, TV shows and people to discover.
                        Explore now.
                    </span>
                    <div className="searchInput">
                        <input
                            type="text"
                            placeholder="Search for a movie or tv show...."
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyUp={searchQueryHandler}
                        />
                        <button>Search</button>
                    </div>
                </div> */}
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
