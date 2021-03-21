import React from "react";
import "./Description.css";

function Description(props) {
  return (
    <div className="description">
      <p>{props.description.overview}</p>
      <p>
        <strong>Release Date:</strong> {props.description.release_date}
      </p>
    </div>
  );
}

export default Description;
