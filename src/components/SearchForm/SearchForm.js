import React from "react";
import "./SearchForm.css";

const SearchForm = ({ searchQuery, handleSubmit, inputSearch }) => {
  return (
    <form className="SearchForm" onSubmit={handleSubmit}>
      <button type="submit" className="SearchForm-button">
        <span className="SearchForm-button-label">Search</span>
      </button>

      <input
        className="SearchForm-input"
        type="text"
        autocomplete="off"
        autofocus
        placeholder="Search images and photos"
        name="query"
        value={searchQuery}
        onChange={inputSearch}
      />
    </form>
  );
};

export default SearchForm;
