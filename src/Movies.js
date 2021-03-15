import React from "react";
import { Link, Route } from "react-router-dom";
import AddGroup from "./AddGroup";
import GroupPage from "./GroupPage";
import Invite from "./Invite";
import Join from "./Join";
import MovieMatch from "./MovieMatch";
import "./Movies.css";
import Overview from "./Overview";
import { uris } from "./requestUris";
import TopMovies from "./TopMovies";

function Movies() {
  return (
    <div className="movies">
      <div className="movies__headers">
        <div className="movies__headers__header">
          <Link className="movies__link" to="/top-movies">
            Top Movies
          </Link>
        </div>
        <div className="movies__headers__header">
          <Link className="movies__link" to="/up-and-coming">
            Up and Coming
          </Link>
        </div>
        <div className="movies__headers__header">
          <Link className="movies__link" to="/popular">
            Popular
          </Link>
        </div>
        <div className="movies__headers__header">
          <Link className="movies__link" to="/movie-match">
            All Movies
          </Link>
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
        <Route exact path="/group/:groupId">
          <GroupPage />
        </Route>
        <Route path="/add-group">
          <AddGroup />
        </Route>
        <Route path="/group/:groupId/join">
          <Join />
        </Route>
        <Route path="/group/:groupId/invite">
          <Invite />
        </Route>
      </div>
    </div>
  );
}

export default Movies;
