import React, { useState } from "react";

export default function RegistrationForm() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [passwordVisible, setPasswordVisible] = useState(false);


  const handleSubmit = (e) => {

    e.preventDefault();
    setSubmitted(true);

    if (!name) {
      setMessage("Please enter name");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setMessage("Please enter valid email");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters");
      return;
    }

    setMessage(`Registration successful: ${name}`);

    setName("");
    setEmail("");
    setPassword("");
  };


  return (

    <form onSubmit={handleSubmit}>

      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br />

      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />

      <input
        type={passwordVisible ? "text" : "password"}
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />

      <button type="submit">Submit</button>

      <button
        type="button"
        onClick={() => setPasswordVisible(!passwordVisible)}
      >
        {passwordVisible ? "Hide" : "Show"}
      </button>

      {submitted && <p>{message}</p>}

    </form>
  );
}