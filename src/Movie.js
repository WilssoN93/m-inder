import React from "react";
import "./Movie.css";
import { image_base_url } from "./requestUris";

function Movie({
  movie: { title, release_date, overview, poster_path, backdrop_path },
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
            <button onClick={handleLiked}>Like!</button>
            <button onClick={handleDisliked}>Dislike!</button>
          </div>
        </div>
        <div className="movie__description">
          <div className="movie__title">
            <h1>{title}</h1>
            <p>{release_date}</p>
          </div>
          <p className="movie__overview">
            {overview ? overview : "No overview"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Movie;
