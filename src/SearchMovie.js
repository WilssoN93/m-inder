import React, { useEffect, useRef, useState } from 'react';
import './SearchMovie.css';
import { image_base_url, uris } from './requestUris';
import { addNewMovieToUser, matchMovieWithIds } from './requests';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';

function SearchMovie() {
  const [movieName, setMovieName] = useState('');
  const [movies, setMovies] = useState([]);
  const [user] = useAuthState(auth);
  const searchInput = useRef(null);
  const result = useRef(null);

  useEffect(() => {
    searchInput.current.focus();
  }, []);

  const handleSearch = (e) => {
    setMovieName(e.target.value);
  };

  const handleLiked = async (movie) => {
    await addNewMovieToUser(user.uid, {
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      posterPath: movie.poster_path,
    }).then((res) => console.log(res));
    await matchMovieWithIds(user.uid, movie.id).then((res) =>
      console.log(res.json())
    );
  };

  const searchMovie = async (e) => {
    e.preventDefault();

    await fetch(uris.fetchSearchQuery + movieName)
      .then((res) => res.json())
      .then((data) => setMovies(data.results));
    result.current.scrollIntoView({ behavior: 'smooth' });
    setMovieName('');
  };
  return (
    <div className='search'>
      <div className='search__form__container'>
        <form className='search__form' onSubmit={searchMovie}>
          <div className='search__header'>
            <h2>Search Movie</h2>
          </div>
          <input
            ref={searchInput}
            value={movieName}
            placeholder='Enter Movie name'
            onChange={handleSearch}
          />
        </form>
      </div>
      <div ref={result} className='search__movies'>
        {movies.map((movie, index) =>
          movie.poster_path ? (
            <div className='search__movie' key={movie.id}>
              <img
                src={`${image_base_url}${movie.poster_path}`}
                alt={movie.name}
              ></img>
              <div className='search__movie-text'>
                <h3>{movie.title}</h3>
                <p>{movie.overview ? movie.overview : 'No Overview found'}</p>
              </div>
              <div className='search__movie__button__container'>
                <button onClick={() => handleLiked(movie)}>
                  Add to Watchlist
                </button>
              </div>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}

export default SearchMovie;
