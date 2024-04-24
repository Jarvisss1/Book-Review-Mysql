import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Check if user data exists in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (credentials, setUser) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        JSON.stringify(credentials),
        { headers: { "Content-Type": "application/json" } }
      );
      const user = response.data;
      setCurrentUser(user);
      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("Login failed");
    }
  };

  const logout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout");
      setCurrentUser(null);
      // Remove user data from localStorage
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Logout error:", error);
      throw new Error("Logout failed");
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
