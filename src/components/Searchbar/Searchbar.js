import React, { Component } from "react";
import SearchForm from "../SearchForm/SearchForm";
import "./Searchbar.css";
// import { withCredentials, request } from "../../services/pixabayApi";

class Searchbar extends Component {
  state = {
    query: "",
  };

  inputSearch = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  };

  formSubmit = (e) => {
    const { query } = this.state;
    // const { loaderToggle, errorToggle, updateUsers } = this.props;
    e.preventDefault();

    // const url = withCredentials(`https://pixabay.com/api/?q=${query}`);
    // try {
    //   await loaderToggle(true);
    //   await errorToggle(false);

    //   const result = await request("get", url);
    //   updateUsers(result.items);
    // } catch (error) {
    //   errorToggle(true);
    // } finally {
    //   loaderToggle(false);
    //   this.reset();
    // }

    this.props.addQuery(query);
    this.reset();
  };

  reset = () => {
    this.setState({
      query: "",
    });
  };

  render() {
    const { query } = this.state;
    return (
      <header className="Searchbar">
        {/* <SearchForm
          searchQuery={query}
          formSubmit={this.formSubmit}
          inputSearch={this.inputSearch}
        /> */}
        <form className="SearchForm" onSubmit={this.formSubmit}>
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
            onChange={this.inputSearch}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
