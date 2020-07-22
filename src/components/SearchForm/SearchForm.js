import React, { Component } from "react";
import "./SearchForm.css";

class SearchForm extends Component {
  //   state = {
  //     query: "",
  //   };

  inputSearch = ({ target }) => {
    const { value, name } = target;

    this.setState({
      [name]: value,
    });

    // this.props.addQuery(value);
  };

  formSubmit = (e) => {
    const { query } = this.state;
    // const { loaderToggle, errorToggle, updateUsers } = this.props;
    e.preventDefault();

    this.props.addQuery(query);
  };

  render() {
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
  }
}

// const SearchForm = ({ searchQuery, formSubmit, inputSearch }) => {};

export default SearchForm;
