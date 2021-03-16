import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import db from "./firebase";
import "./Join.css";

function Join() {
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
    const newUser = db.collection("groups").doc(groupId);

    newUser.get().then((doc) => {
      console.log(doc.data());
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
