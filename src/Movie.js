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
  console.log(poster_path + " " + title + " " + backdrop_path);
  return (
    <div
      className="movie"
      style={
        backdrop_path
          ? { backgroundImage: `url(${image_base_url}${backdrop_path})` }
          : {
              backgroundImage: `url(https://upload.wikimedia.org/wikipedia/commons/7/75/No_image_available.png)`,
            }
      }
    >
      <div className="movie__body">
        <div className="movie__body__container">
          <img src={`${image_base_url}${poster_path}`} alt={title} />
          <div className="movie__buttons">
            <div className="like__container">
              <ThumbUpIcon
                fontSize="large"
                className="like"
                onClick={handleLiked}
              />
            </div>
            <div className="dislike__container">
              <ThumbDownIcon
                fontSize="large"
                className="dislike"
                onClick={handleDisliked}
              />
            </div>
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
