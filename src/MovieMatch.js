import axios from "axios";
import React, { useEffect, useState } from "react";
import Movie from "./Movie";
import { api_key } from "./requestUris";
import "./MovieMatch.css";

function MovieMatch({ fetchUrl, fetchUrlId }) {
  const [latest, setLatest] = useState(undefined);
  const [movie, setMovie] = useState(undefined);
  useEffect(() => {
    async function fetchLatest() {
      const request = await axios.get(fetchUrl);
      setLatest(request.data);
    }
    fetchLatest();
  }, [fetchUrl]);

  useEffect(() => {
    async function fetchRandomMovie() {
      if (latest) {
        const randomId = Math.floor(Math.random() * latest.id);
        await axios
          .get(fetchUrlId + randomId + "?api_key=" + api_key)
          .then((res) => {
            if (!res.data.overview || !res.data.poster_path) {
              fetchRandomMovie();
            }
            setMovie(res.data);
          })
          .catch((error) => {
            console.log(error);
            fetchRandomMovie();
          });
      }
    }
    fetchRandomMovie();
  }, [latest, fetchUrlId]);

  return movie && movie.poster_path !== null && movie.poster_path !== "" ? (
    <div className="moviematch__movie">
      <Movie movie={movie} />
    </div>
  ) : (
    <h1>Loading....</h1>
  );
}
export default MovieMatch;
