import React from "react";

function RepoSearch({ repos }) {
  return (
    <div>
      {repos?.map((el, idx) => (
        <li key={idx}>{el.name}</li>
      ))}
    </div>
  );
}

export default RepoSearch;
