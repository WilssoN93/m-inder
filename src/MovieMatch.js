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
  var chosenMovie = {};
  if (latest) {
    const randomId = Math.floor(Math.random() * latest.id);
    await axios
      .get(fetchUrlId + randomId + "?api_key=" + api_key)
      .then((res) => {
        if (!res.data.overview || !res.data.poster_path) {
          fetchRandomMovie(fetchUrlId, latest);
        }
        chosenMovie = res.data;
      })
      .catch((error) => {
        console.log(error);
        fetchRandomMovie(fetchUrlId, latest);
      });
    return chosenMovie;
  }
}

function MovieMatch({ fetchUrl, fetchUrlId, handleLiked, handleDisliked }) {
  const [latest, setLatest] = useState(undefined);
  const [movie, setMovie] = useState(undefined);
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
    chosenMovie.then((data) => setMovie(data));
  }

  console.log(movie);

  return movie &&
    movie.poster_path !== null &&
    movie.poster_path !== "" &&
    movie.backdrop_path !== null &&
    movie.backdrop_path !== "" ? (
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
