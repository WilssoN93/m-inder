import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Description from './Description';
import db, { auth } from './firebase';
import Loading from './Loading';
import LoadingContainer from './LoadingContainer';
import Movie from './Movie';
import { addNewMovieToUser, matchMovieWithIds, postGenres } from './requests';
import { uris } from './requestUris';
import './TopMovies.css';
import Trailer from './Trailer';

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
        if (!chosenMovie.poster_path || chosenMovie.poster_path === '') {
          chooseFromArray();
        }
      }
      chooseFromArray();
    })
    .catch((error) => console.log(error));
  return chosenMovie;
}

function writePagesTodb(category, maxPage) {
  db.collection('pages')
    .doc(category)
    .update({
      maxPages: maxPage,
    })
    .then(() => {
      console.log('Document successfully written!');
    });
}

function TopMovies({ fetchUrl, category }) {
  const [movie, setMovie] = useState('');
  const [maxPage, setMaxPage] = useState(0);
  const [user] = useAuthState(auth);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    fetch(uris.fetchGenres)
      .then((res) => res.json())
      .then((data) => setGenres(data.genres));
    if (maxPage !== 0) {
      const chosenMovie = fetchMovies(fetchUrl, maxPage, category);
      chosenMovie.then((data) => setMovie(data));
    }
  }, [fetchUrl, maxPage, category]);

  useEffect(() => {
    const pages = db.collection('pages').doc(category);
    pages
      .get()
      .then((doc) => doc.data())
      .then((maxPages) => setMaxPage(maxPages.maxPages));
  }, [category, movie, genres]);

  function handleLiked() {
    addNewMovieToUser(user.uid, {
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      posterPath: movie.poster_path,
      genres: movie.genres_ids,
    });

    matchMovieWithIds(user.uid, movie.id);

    const chosenMovie = fetchMovies(fetchUrl, maxPage, category);
    chosenMovie.then((data) => setMovie(data));
  }

  function handleDisliked() {
    const chosenMovie = fetchMovies(fetchUrl, maxPage, category);
    chosenMovie.then((data) => setMovie(data));
  }

  return movie && movie.poster_path !== null && movie.poster_path !== '' ? (
    <div className='topmovies__movie'>
      <Movie
        movie={movie}
        handleLiked={handleLiked}
        handleDisliked={handleDisliked}
      />
      {movie.overview ? <Description description={movie} /> : null}
      {movie.video ? <Trailer id={movie.id} /> : null}
    </div>
  ) : (
    <LoadingContainer>
      <Loading loading={true}></Loading>
    </LoadingContainer>
  );
}

export default TopMovies;
