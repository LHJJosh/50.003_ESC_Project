import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Index Page</Link>
        </li>
        <li>
          <Link to="/blogs">Blogs</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/bookings">Bookings</Link>
        </li>
        <li>
          <Link to="/app">App</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;