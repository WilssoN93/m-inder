import React from "react";
import "./Description.css";

function Description(props) {
  return (
    <div className="description">
      <p>{props.description.overview}</p>
      <p>
        <strong>Release Date:</strong> {props.description.release_date}{" "}
        <strong>Spoken Language: </strong>{" "}
        {props.description.original_language.toUpperCase()}
      </p>
    </div>
  );
}

export default Description;
