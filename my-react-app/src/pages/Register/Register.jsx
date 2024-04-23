import React, { useState } from 'react'
import "./Register.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


function Register() {
  const [inputs, setinputs] = useState(
    {
      username: "",
      email: "",
      password: "",
    }
  );
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setinputs(prev => ({...prev, [e.target.name]: e.target.value}))
  }

  const handleSubmit = async e => {
    e.preventDefault();
    console.log(inputs);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        JSON.stringify(inputs),
        { headers: { "Content-Type": "application/json" } }
      );
       console.log(res);
        navigate("/login");
    } catch (error) {
      console.log("bas hai");
      console.log(error);
    }
   
  }
      return (
    <div className="container">
      <form className="form">
        Create an Account Now! 🔪
        <input type="text" placeholder="username" name="username"onChange={handleChange} />
        <input type="text" placeholder="email" name = "email" onChange={handleChange} />
        <input type="password" placeholder="password" name="password" onChange={handleChange} />
        <button onClick={handleSubmit}>Register</button>
        <div>
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
}

export default Register
