import React, { useState } from "react";

export default function ControlledForm() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);


  const handleSubmit = (e) => {

    e.preventDefault();
    setSubmitted(true);

    if (!name) {
      setMessage("Please enter name");
      return;
    }

    if (!email) {
      setMessage("Please enter email");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setMessage("Please enter valid email (example@email.com)");
      return;
    }

    setMessage(`Welcome ${name}, your email is ${email}`);

    setName("");
    setEmail("");
  };


  const isInvalid =
    name === "" ||
    email === "" ||
    !email.includes("@") ||
    !email.includes(".");


  return (

    <form onSubmit={handleSubmit}>

      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button type="submit" disabled={isInvalid}>
        Submit
      </button>

      {submitted && <p>{message}</p>}

    </form>
  );
}