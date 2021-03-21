import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import React from "react";
import "./Movie.css";
import { image_base_url } from "./requestUris";

function Movie({
  movie: { title, poster_path, backdrop_path },
  handleLiked,
  handleDisliked,
}) {
  return (
    <div
      className="movie"
      style={{ backgroundImage: `url(${image_base_url}${backdrop_path})` }}
    >
      <div className="movie__body">
        <div className="movie__body__container">
          <img src={`${image_base_url}${poster_path}`} alt={title} />
          <div className="movie__buttons">
            <ThumbUpIcon style={{ color: "#801818" }} onClick={handleLiked} />
            <ThumbDownIcon
              style={{ color: "#801818" }}
              onClick={handleDisliked}
            />
          </div>
        </div>
        <div className="movie__title">
          <h1>{title}</h1>
        </div>
      </div>
    </div>
  );
}

export default Movie;
