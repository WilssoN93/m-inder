import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api_key, image_base_url } from "./requestUris";

function Overview({ fetchUrlId }) {
  const [movie, setMovie] = useState({});
  var { id } = useParams();

  useEffect(() => {
    async function fethMovieWithId() {
      const request = await axios.get(fetchUrlId + id + "?api_key=" + api_key);
      setMovie(request.data);
    }
    fethMovieWithId();
  }, [fetchUrlId, id]);

  return movie ? (
    <div className="movie">
      <div className="movie__title">
        <h1>{movie.title}</h1>
        <p>{movie.release_date}</p>
      </div>
      <img src={`${image_base_url}${movie.poster_path}`} alt={movie.title} />
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default Overview;
