"use client";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async(event) => {
    event.preventDefault();
    try{
      const response = await fetch("http://localhost:3000/api/user/login", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })
      const responseData = await response.json();
      localStorage.setItem("token", responseData.token);
    }catch{
      console.error("Error occurred while logging in");
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <input 
          value={email} onChange={(event) => setEmail(event.target.value)}
          type="text"
          name="email"
          placeholder="email"
          required
        />
        <input 
          value={password} onChange={(event) => setPassword(event.target.value)}
          type="password"
          name="password"
          placeholder="password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );  
};

export default Login; 