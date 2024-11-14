import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => (
  <nav className="navbar">
    <h1>Parcel Data</h1>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/add">Add Parcel</Link></li>
      <li><Link to="/about">About</Link></li>
    </ul>
  </nav>
);

export default Navbar;
