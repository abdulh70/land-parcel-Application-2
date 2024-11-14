import React from "react";
import "./SearchBar.css";

const SearchBar = ({ searchTerm, onSearchChange }) => (
  <div className="search-bar">
    <input
      type="text"
      placeholder="Search by owner name or ID"
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  </div>
);

export default SearchBar;
