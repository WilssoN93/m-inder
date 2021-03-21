import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import "./AddGroup.css";
import { auth } from "./firebase";
import { createGroup } from "./requests";

function AddGroup() {
  const [groupName, setGroupName] = useState("");
  const [user] = useAuthState(auth);

  function handleAddGroup(e) {
    e.preventDefault();
    createGroup({
      groupName: groupName,
      users: [
        {
          id: user.uid,
          name: user.displayName,
          photoUrl: user.photoURL,
          watchList: [],
        },
      ],
      matchedMovies: [],
    }).catch((err) => console.log(err.message));

    setGroupName("");
  }

  function handleInput(e) {
    setGroupName(e.target.value);
  }

  return (
    <div className="add-group">
      <form className="add-group__form" onSubmit={handleAddGroup}>
        <input
          value={groupName}
          placeholder="Ender Group name"
          onChange={handleInput}
        />
        <button></button>
      </form>
    </div>
  );
}

export default AddGroup;
