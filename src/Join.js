import firebase from "firebase";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router";
import db, { auth } from "./firebase";
import "./Join.css";

function Join() {
  const [user] = useAuthState(auth);
  var { groupId } = useParams();
  const [group, setGroup] = useState({});

  useEffect(() => {
    db.collection("groups")
      .doc(groupId)
      .get()
      .then((doc) => {
        const data = doc.data();
        setGroup(data);
      });
  }, [groupId]);

  const addUser = () => {
    db.collection("groups")
      .doc(groupId)
      .update({
        users: firebase.firestore.FieldValue.arrayUnion({
          id: user.uid,
          name: user.displayName,
          photoUrl: user.photoURL,
          admin: false,
        }),
      });
  };

  return (
    <div className="join">
      <div className="join__container">
        <h1>Hello, You have been invited to join {group.name}!</h1>
        <button onClick={addUser}>Join</button>
      </div>
    </div>
  );
}

export default Join;
