import React from "react";
import Loading from "./Loading";
import "./LoadingContainer.css";

function LoadingContainer({ loading }) {
  return (
    <div className="loading__container">
      <Loading className={loading} />
    </div>
  );
}

export default LoadingContainer;
