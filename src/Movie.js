import React from "react";
import "./Movie.css";
import { image_base_url } from "./requestUris";

function Movie({
  movie: { title, release_date, overview, poster_path },
  handleLiked,
  handleDisliked,
}) {
  return (
    <div className="movie">
      <div className="movie__title">
        <h1>{title}</h1>
        <p>{release_date}</p>
      </div>
      <p className="movie__overview">{overview}</p>
      <div className="movie__center">
        <button onClick={handleLiked}>Like!</button>
        <img src={`${image_base_url}${poster_path}`} alt={title} />
        <button onClick={handleDisliked}>Dislike!</button>
      </div>
    </div>
  );
}

export default Movie;
