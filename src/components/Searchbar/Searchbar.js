import React, { Component } from "react";
// import SearchForm from "../SearchForm/SearchForm";
import "./Searchbar.css";

class Searchbar extends Component {
  state = {
    query: "",
  };

  //   inputSearch = ({ target }) => {
  //     const { value } = target;
  //     this.props.addQuery(value);
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
    // this.reset();
  };

  reset = () => {
    this.setState({
      query: "",
    });
  };

  render() {
    // const { query } = this.props;
    const { query } = this.state;
    return (
      <header className="Searchbar">
        {/* <SearchForm
          searchQuery={query}
          formSubmit={this.formSubmit}
          inputSearch={this.inputSearch}
        /> */}
        <form className="SearchForm" onSubmit={this.formSubmit}>
          {/* <form className="SearchForm" onSubmit={this.props.getImages}> */}
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
            // onChange={this.props.addQuery}
            onChange={this.inputSearch}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
