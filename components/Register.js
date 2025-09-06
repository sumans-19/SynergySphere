import React, { useState } from "react";

function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    setError("");
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");
      localStorage.setItem("user", JSON.stringify(data));
      if (onRegister) onRegister(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        type="text"
        placeholder="Name"
        required
      />
      <input
        value={email}
        onChange={e => setEmail(e.target.value)}
        type="email"
        placeholder="Email"
        required
      />
      <input
        value={password}
        onChange={e => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        required
      />
      <button onClick={handleRegister}>Register</button>
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default Register;