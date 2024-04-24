import React, { useState } from "react";
import "./App.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Book from "./pages/Book/Book";
import MyReviews from "./pages/MyReviews/MyReviews";

const Layout = ({ results, setResults,user }) => {
  return (
    <div>
      {/* Pass results to the Navbar component */}
      <Navbar setResults={setResults} user={user} />
      <Outlet />
      <Footer />
    </div>
  );
};

function App() {
  const [results, setResults] = useState([]);
  const [user, setUser] = useState(null);

  // Define the routes with the correct props
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout results={results} setResults={setResults} />, // Pass results to the Layout component
      children: [
        {
          path: "/",
          element: <Home results={results} user={user}/>, // Pass results to the Home component
        },
        {
          path: "/book/:id",
          element: <Book />,
        },
        {
          path: "/myReviews",
          element: <MyReviews />,
        },
      ],
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login setUser={setUser} />,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router}>
        {/* Pass results to the Layout component */}
        <Layout results={results} user={user}/>
      </RouterProvider>
    </div>
  );
}

export default App;
