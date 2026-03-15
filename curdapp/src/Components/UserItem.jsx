import React from "react";

export default function UserItem({ user, onEdit, onDelete }) {

  return (
    <li>
      {user.name}

      <button onClick={() => onEdit(user)}>
        Edit
      </button>

      <button onClick={() => onDelete(user.id)}>
        Delete
      </button>

    </li>
  );
}