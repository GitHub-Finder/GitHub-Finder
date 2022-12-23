import React from "react";

function UserSearch({ users }) {
  return (
    <div>
      {users?.map((el, idx) => (
        <li key={idx}>{el.login}</li>
      ))}
    </div>
  );
}

export default UserSearch;
