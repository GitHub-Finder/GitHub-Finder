import React from "react";

function Issues({ issues }) {
  console.log(`Issues: `, issues);
  return (
    <div>
      {issues?.map((issue, idx) => (
        <li key={idx}>issue</li>
      ))}
    </div>
  );
}

export default Issues;
