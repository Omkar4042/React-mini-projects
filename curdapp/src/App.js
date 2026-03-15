import React, { useEffect, useState } from "react";
import UserItem from "./Components/UserItem";

export default function CrudApp() {


  const [users, setUsers] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [error, setError] = useState("");




  useEffect(() => {
    const storedUsers = localStorage.getItem("users");

    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);


  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);




  const addOrUpdateUser = () => {

    // Validation
    if (input.trim() === "") {
      setError("Name cannot be empty");
      return;
    }

    if (input.length < 3) {
      setError("Name must be at least 3 characters");
      return;
    }

    setError("");

    if (editId === null) {

      // CREATE
      setUsers([
        ...users,
        { id: Date.now(), name: input }
      ]);

    } else {

      // UPDATE
      setUsers(
        users.map((user) =>
          user.id === editId
            ? { ...user, name: input }
            : user
        )
      );

      setEditId(null);
    }

    setInput("");
  };




  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };




  const startEdit = (user) => {
    setInput(user.name);
    setEditId(user.id);
  };




  const sortedUsers = [...users].sort((a, b) =>
    sortOrder === "asc"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name)
  );




  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "400px",
        margin: "auto",
      }}
    >
      <h2>Simple CRUD App</h2>

      <input
        type="text"
        placeholder="Enter name"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={addOrUpdateUser}>
        {editId === null ? "Add User" : "Update User"}
      </button>

      <button
        onClick={() =>
          setSortOrder(sortOrder === "asc" ? "desc" : "asc")
        }
        style={{ marginLeft: "10px" }}
      >
        Sort: {sortOrder === "asc" ? "A-Z" : "Z-A"}
      </button>


      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}


      <ul>
        {sortedUsers.map((user) => (
          <UserItem
            key={user.id}
            user={user}
            onEdit={startEdit}
            onDelete={deleteUser}
          />
        ))}
      </ul>

    </div>
  );
}