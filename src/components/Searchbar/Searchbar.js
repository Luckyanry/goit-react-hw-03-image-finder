import React, { Component } from "react";
import "./Searchbar.css";
import SearchForm from "../SearchForm/SearchForm";

class Searchbar extends Component {
  render() {
    return (
      <header className="Searchbar">
        <SearchForm />
        {/* <SearchForm
          searchQuery={query}
          handleSubmit={this.handleSubmit}
          inputSearch={this.inputSearch}
        /> */}
      </header>
    );
  }
}

export default Searchbar;
