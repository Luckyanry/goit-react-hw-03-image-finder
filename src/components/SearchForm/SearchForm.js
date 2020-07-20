import React from "react";
import "./SearchForm.css";

const SearchForm = ({ searchQuery, formSubmit, inputSearch }) => {
  return (
    <form className="SearchForm" onSubmit={formSubmit}>
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
        value={searchQuery}
        onChange={inputSearch}
      />
    </form>
  );
};

export default SearchForm;
