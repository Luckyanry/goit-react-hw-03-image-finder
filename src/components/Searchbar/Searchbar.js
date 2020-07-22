import React from "react";
import "./Searchbar.css";

const Searchbar = ({ query, addQuery, getImages }) => {
  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={getImages} data-action="search">
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="query"
          value={query}
          onChange={addQuery}
        />
      </form>
    </header>
  );
};

export default Searchbar;
