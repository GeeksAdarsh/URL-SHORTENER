import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStoreContext } from "../contextApi/ContextApi";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setToken } = useStoreContext();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // prevent form from refreshing the page

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        setToken(data.token); 
        navigate("/landing"); 
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error("Login failed:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4 w-80 mx-auto mt-10">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Login
      </button>
    </form>
  );
};

export default Login;
