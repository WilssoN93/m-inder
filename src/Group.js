import React from "react";
import { Link } from "react-router-dom";
import "./Group.css";

function Group(props) {
  return props.isGroup ? (
    <div className="group">
      <Link to={`/group/${props.group.id}`}>
        <h1>{props.group.data.name}</h1>
      </Link>
    </div>
  ) : (
    <div>
      <Link to="/add-group">
        <h2>Start New Group</h2>
      </Link>
    </div>
  );
}

export default Group;
