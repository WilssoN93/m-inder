import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory, useParams } from "react-router";
import { auth } from "./firebase";
import "./Join.css";
import { addNewUserToGroup, fetchGroupById } from "./requests";

function Join() {
  var { groupId } = useParams();
  const [group, setGroup] = useState({});
  const [user] = useAuthState(auth);
  const history = useHistory();

  useEffect(() => {
    fetchGroupById(groupId)
      .then((group) => setGroup(group))
      .catch((err) => console.log(err.message));
  }, [groupId]);

  const addUser = () => {
    addNewUserToGroup({
      groupId: groupId,
      user: {
        id: user.uid,
        name: user.displayName,
        photoUrl: user.photoURL,
      },
    }).catch((err) => alert(err.message));

    var groupPath = `/group/${groupId}`;
    history.push(groupPath);
  };

  return (
    <div className="join">
      <div className="join__container">
        <h1>Hello, You have been invited to join group "{group.groupName}"!</h1>
        <button className="join__button" onClick={addUser}>
          Join
        </button>
      </div>
    </div>
  );
}

export default Join;
