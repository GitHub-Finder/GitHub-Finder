import React from "react";
import Spinner from "../Utilities/Loading";

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
