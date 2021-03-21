import React from "react";
import { useParams } from "react-router";
import "./Invite.css";

function Invite() {
  var { groupId } = useParams();
  return (
    <div className="invite">
      <div className="invite__container">
        <h1 className="invite__text">
          Copy this link and share it with your friends so they can join your
          group!
        </h1>
        <p>
          OBS! Rememeber that if another person joins your group your matched
          movies vill be reset and matched against all persons
        </p>
        <br />
        <p className="invite__link">
          http://localhost:3000/group/{groupId}/join
        </p>
      </div>
    </div>
  );
}

export default Invite;
