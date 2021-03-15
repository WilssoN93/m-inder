import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import "./AddGroup.css";
import db, { auth } from "./firebase";

function AddGroup() {
  const [groupName, setGroupName] = useState("");
  const [user] = useAuthState(auth);

  function handleAddGroup(e) {
    e.preventDefault();
    db.collection("groups").add({
      name: groupName,
      users: [
        {
          id: user.uid,
          name: user.displayName,
          photoUrl:user.photoURL,
          admin: true,
        },
      ],
    });
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
