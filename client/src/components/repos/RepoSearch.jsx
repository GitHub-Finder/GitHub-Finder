import React from "react";

function RepoSearch({ repos }) {
  return (
    <ul>
      {repos?.map((el, idx) => (
        <li key={idx}>{el.name}</li>
      ))}
    </ul>
  );
}

export default RepoSearch;
