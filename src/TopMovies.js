import React, { useEffect, useState } from "react";
import Movie from "./Movie";
import axios from "axios";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./TopMovies.css";
import db, { auth } from "./firebase";

async function fetchMovies(fetchUrl, maxPage, category) {
  var random = Math.floor(Math.random() * maxPage + 1);
  const uri = fetchUrl + random;
  var chosenMovie = {};
  await axios
    .get(uri)
    .then((res) => {
      function chooseFromArray() {
        const pageSize = res.data.total_pages;
        writePagesTodb(category, pageSize);
        const length = res.data.results.length;
        const randomMovie = Math.floor(Math.random() * (length - 1));
        chosenMovie = res.data.results[randomMovie];
        if (!chosenMovie.poster_path || chosenMovie.poster_path === "") {
          chooseFromArray();
        }
      }
      chooseFromArray();
    })
    .catch((error) => console.log(error));
  return chosenMovie;
}

function writePagesTodb(category, maxPage) {
  db.collection("pages")
    .doc(category)
    .update({
      maxPages: maxPage,
    })
    .then(() => {
      console.log("Document successfully written!");
    });
}

function TopMovies({ fetchUrl, category }) {
  const [movie, setMovie] = useState("");
  const [maxPage, setMaxPage] = useState(0);
  const [groupUsers, setGroupUsers] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (maxPage !== 0) {
      const chosenMovie = fetchMovies(fetchUrl, maxPage, category);
      chosenMovie.then((data) => setMovie(data));
    }
  }, [fetchUrl, maxPage, category]);

  useEffect(() => {
    const pages = db.collection("pages").doc(category);
    pages
      .get()
      .then((doc) => doc.data())
      .then((maxPages) => setMaxPage(maxPages.maxPages));
  }, [category]);

  function handleLiked() {
    console.log(user.uid);
    const id = user.uid;
    db.collection("watchlists")
      .doc(id)
      .update({
        movies: firebase.firestore.FieldValue.arrayUnion({
          title: movie.title,
          poster_path: movie.poster_path,
          movieId: movie.id,
        }),
      });

    const chosenMovie = fetchMovies(fetchUrl, maxPage, category);
    chosenMovie.then((data) => setMovie(data));
  }

  function handleDisliked() {
    const chosenMovie = fetchMovies(fetchUrl, maxPage, category);
    chosenMovie.then((data) => setMovie(data));
  }

  return movie && movie.poster_path !== null && movie.poster_path !== "" ? (
    <div className="topmovies__movie">
      <Movie
        movie={movie}
        handleLiked={handleLiked}
        handleDisliked={handleDisliked}
      />
    </div>
  ) : (
    <h1>Loading....</h1>
  );
}

export default TopMovies;
