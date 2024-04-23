import React, { useState } from "react";
import "./App.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Book from "./pages/Book/Book";

const Layout = ({ onSearch, searchTerm }) => {
  return (
    <div>
      <Navbar onSearch={onSearch} />
      <Outlet />
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/book/:id",
        element: <Book />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (searchTerm) => {
    // Update the search term state
    setSearchTerm(searchTerm);
    console.log("Searching for:", searchTerm);
  };

  return (
    <div className="App">
      <RouterProvider router={router}>
        <Layout onSearch={handleSearch} searchTerm={searchTerm} />
      </RouterProvider>
    </div>
  );
}

export default App;
