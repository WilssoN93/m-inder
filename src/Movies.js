import React from 'react';
import { Link, Route } from 'react-router-dom';
import AddGroup from './AddGroup';
import GroupPage from './GroupPage';
import Invite from './Invite';
import Join from './Join';
import MovieMatch from './MovieMatch';
import './Movies.css';
import Overview from './Overview';
import { uris } from './requestUris';
import SearchMovie from './SearchMovie';
import TopMovies from './TopMovies';

function Movies({ fetchGroups }) {
  return (
    <div className='movies'>
      <div className='movies__headers'>
        <div className='movies__headers__header'>
          <Link className='movies__link' to='/movies/top-movies'>
            Top Movies
          </Link>
        </div>
        <div className='movies__headers__header'>
          <Link className='movies__link' to='/movies/up-and-coming'>
            Up and Coming
          </Link>
        </div>
        <div className='movies__headers__header'>
          <Link className='movies__link' to='/movies/popular'>
            Popular
          </Link>
        </div>
        <div className='movies__headers__header'>
          <Link className='movies__link' to='/movies/movie-match'>
            All Movies
          </Link>
        </div>
        <div className='movies__headers__header'>
          <Link className='movies__link' to='/movies/search'>
            Search
          </Link>
        </div>
      </div>

      <div className='movies__body'>
        <Route path='/movies/movie-match'>
          <MovieMatch
            fetchUrl={uris.fetchLatest}
            fetchUrlId={uris.fetchWithId}
          />
        </Route>
        <Route path='/movies/top-movies'>
          <TopMovies fetchUrl={uris.fetchTopRated} category='topmovies' />
        </Route>
        <Route path='/movies/up-and-coming'>
          <TopMovies fetchUrl={uris.fetchUpAndComing} category='upandcoming' />
        </Route>
        <Route path='/movies/popular'>
          <TopMovies fetchUrl={uris.fetchPopular} category='popular' />
        </Route>
        <Route path='/movies/search'>
          <SearchMovie />
        </Route>
        <Route path='/movies/overview/:id'>
          <Overview fetchUrlId={uris.fetchWithId} />
        </Route>
      </div>
    </div>
  );
}

export default Movies;
