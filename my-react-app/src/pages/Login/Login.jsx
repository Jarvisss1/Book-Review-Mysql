import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Register/Register.css";
import { useAuth } from "../../context/authContext";

function Login({setUser}) {
  const { login } = useAuth();
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    try {
      await login(inputs,setUser); // Pass inputs to login function
      // Redirect to home page
    } catch (error) {
      console.log("Error occurred while logging in:", error);
    }
  };

  return (
    <div className="container">
      <form className="form">
        <h2>Login Page</h2>
        <input
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />

        <button onClick={handleSubmit}>Login</button>
        <div>
          Don't have an account? <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
