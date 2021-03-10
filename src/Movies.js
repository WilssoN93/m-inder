import React from "react";
import "./Movies.css";
import { Route, Link } from "react-router-dom";
import TopMovies from "./TopMovies";
import { uris } from "./requestUris";
import MovieMatch from "./MovieMatch";
import Overview from "./Overview";
import AddGroup from "./AddGroup";

function Movies() {
  return (
    <div className="movies">
      <div className="movies__headers">
        <div className="movies__headers_top">
          <Link to="/top-movies">Top Movies</Link>
        </div>
        <div className="movies__headers_up_coming">
          <Link to="/up-and-coming">Up and Coming</Link>
        </div>
        <div className="movies__headers_popular">
          <Link to="/popular">Popular</Link>
        </div>
        <div className="movies__headers_popular">
          <Link to="/movie-match">All Movies</Link>
        </div>
      </div>

      <div className="movies__body">
        <Route path="/movie-match">
          <MovieMatch
            fetchUrl={uris.fetchLatest}
            fetchUrlId={uris.fetchWithId}
          />
        </Route>
        <Route path="/top-movies">
          <TopMovies fetchUrl={uris.fetchTopRated} category="topmovies" />
        </Route>
        <Route path="/up-and-coming">
          <TopMovies fetchUrl={uris.fetchUpAndComing} category="upandcoming" />
        </Route>
        <Route path="/popular">
          <TopMovies fetchUrl={uris.fetchPopular} category="popular" />
        </Route>
        <Route path="/overview/:id">
          <Overview fetchUrlId={uris.fetchWithId} />
        </Route>
        <Route path="/group/:groupId"></Route>
        <Route path="/add-group">
          <AddGroup />
        </Route>
      </div>
    </div>
  );
}

export default Movies;
