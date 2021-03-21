import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { auth } from "./firebase";
import "./GroupPage.css";
import { fetchGroupById } from "./requests";
import { image_base_url } from "./requestUris";

function GroupPage() {
  const [user] = useAuthState(auth);
  const [users, setUsers] = useState([]);
  const [watchList, setWatchList] = useState([]);
  var { groupId } = useParams();

  useEffect(() => {
    fetchGroupById(groupId).then((res) => {
      setUsers(res.users);
      setWatchList(res.matchedMovies);
    });
  }, [groupId, user.uid]);

  return (
    <div className="grouppage">
      <div className="grouppage__users">
        {users.map((user) => (
          <div className="grouppage__user" key={user.id}>
            <Avatar src={user.photoUrl} />
            <p>{user.name}</p>
          </div>
        ))}
        {true ? (
          <div>
            <Link to={`/group/${groupId}/invite`}>Invite</Link>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <div className="grouppage__watchlist">
        {watchList.map((movie) => (
          <div className="grouppage__movie" key={movie.id}>
            <img
              src={`${image_base_url}${movie.posterPath}`}
              alt={movie.name}
            ></img>
            <div className="grouppage__movie-text">
              <h3>{movie.title}</h3>
              <p>{movie.overview ? movie.overview : "No Overview found"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GroupPage;
