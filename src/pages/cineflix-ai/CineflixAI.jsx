import React, { useEffect, useRef, useState } from "react";
import "./style.scss";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import axios from "axios";
import { fetchDataFromApi } from "../../utils/api";
import SearchResult from "../searchResult/SearchResult";
const { GoogleGenerativeAI } = require("@google/generative-ai");
const apiKey = process.env.REACT_APP_GEMINI_API;
const genAI = new GoogleGenerativeAI(apiKey);

const CineflixAI = () => {
  const searchText = useRef(null);
  const [movies, setMovies] = useState([]);

  const fetchAIresponse = async () => {
    console.log(searchText.current.value);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        response_mime_type: "application/json",
      },
    });
    const prompt = `I am in ${searchText.current.value} mood today so me some only 3 movies based on my mood. Return the movie names in comma seperated values and not in array format, for example: Interstellar, Fight Club, Tenet. `;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    setMovies(text.replace('"', "").split(","));
    // setMovies(text);
    searchText.current.value = "";

    // console.log(text);
    // console.log(movies);
    // console.log(searchText.current.value);
  };
  useEffect(() => {
    fetchAIresponse();
  }, [searchText]);

  return (
    <div className="cineflix-ai-page">
      <ContentWrapper>
        <h2>Cineflix AI</h2>
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <input
            ref={searchText}
            type="text"
            placeholder="Enter your mood today"
            className="ai-searchbar"
          />
          <button className="search-btn" onClick={fetchAIresponse}>
            Search
          </button>
        </form>
        {searchText !== null ? (
          movies.map((movie, i) => {
            return (
              <SearchResult
                key={i}
                movie={movie.replace(/["/]/g, "")}
                aisearch={true}
              />
            );
          })
        ) : (
          <span className="emptysearch">
            Enter Your mood on the Cineflix AI search box
          </span>
        )}
      </ContentWrapper>
    </div>
  );
};

export default CineflixAI;
