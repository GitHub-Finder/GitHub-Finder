import React from "react";
import Spinner from "../images/Spinner.gif";

function Loading() {
  return (
    <div className="w-100 mt-20">
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
