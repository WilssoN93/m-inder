import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Description from "./Description";
import { auth } from "./firebase";
import Loading from "./Loading";
import LoadingContainer from "./LoadingContainer";
import Movie from "./Movie";
import "./MovieMatch.css";
import { addNewMovieToUser, matchMovieWithIds } from "./requests";
import { api_key } from "./requestUris";

async function fetchRandomMovie(fetchUrlId, latest) {
  console.log("latest:" + latest.id);
  if (latest.id) {
    const randomId = Math.floor(Math.random() * latest.id);
    return await fetch(fetchUrlId + randomId + "?api_key=" + api_key)
      .then((res) => res.json())
      .then((data) => {
        const chosenMovie = data;
        if (
          !data.poster_path ||
          data.poster_path === "" ||
          data.poster_path === null
        ) {
          console.log("Reroll");
          return fetchRandomMovie(fetchUrlId, latest);
        }
        console.log(chosenMovie);
        return chosenMovie;
      });
  }
}

function MovieMatch({ fetchUrl, fetchUrlId }) {
  const [latest, setLatest] = useState({});
  const [movie, setMovie] = useState("");
  const [user] = useAuthState(auth);
  useEffect(() => {
    async function fetchLatest() {
      const request = await axios.get(fetchUrl);
      setLatest(request.data);
    }
    fetchLatest();
  }, [fetchUrl]);

  useEffect(() => {
    const chosenMovie = fetchRandomMovie(fetchUrlId, latest);
    chosenMovie.then((data) => setMovie(data));
  }, [latest, fetchUrlId]);

  function handleLiked() {
    addNewMovieToUser(user.uid, {
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      posterPath: movie.poster_path,
    }).then((res) => console.log(res));
    matchMovieWithIds(user.uid, movie.id).then((res) =>
      console.log(res.json())
    );

    const chosenMovie = fetchRandomMovie(fetchUrlId, latest);
    chosenMovie.then((data) => setMovie(data));
  }

  function handleDisliked() {
    const chosenMovie = fetchRandomMovie(fetchUrlId, latest);
    chosenMovie.then((data) => {
      setMovie(data);
    });
  }

  return movie && movie.poster_path !== null && movie.poster_path !== "" ? (
    <div className="moviematch__movie">
      <Movie
        movie={movie}
        handleLiked={handleLiked}
        handleDisliked={handleDisliked}
      />
      {movie.overview ? <Description description={movie} /> : null}
    </div>
  ) : (
    <LoadingContainer>
      <Loading loading={true}></Loading>
    </LoadingContainer>
  );
}
export default MovieMatch;
