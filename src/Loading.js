import React from "react";
import { CircleSpinner } from "react-spinners-kit";

function Loading({ loading }) {
  return <CircleSpinner loading={true} />;
}

export default Loading;
