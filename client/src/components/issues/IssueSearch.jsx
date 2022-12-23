import React from "react";
import { Link } from "react-router-dom";

function IssueSearch({ issues }) {
  return (
    <ul>
      {issues?.map((issue, idx) => (
        <li key={idx}>
          <Link to>{issue.url}</Link>
        </li>
      ))}
    </ul>
  );
}

export default IssueSearch;
