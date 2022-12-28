import React from "react";
import Spinner from "../images/Spinner.gif";

function Loading() {
  return (
    <div className="loadingSpinner">
      <img
        src={Spinner}
        width={90}
        className="text-center mx-auto bg-dark-600"
        alt="Loading ..."
      />
    </div>
  );
}

export default Loading;
