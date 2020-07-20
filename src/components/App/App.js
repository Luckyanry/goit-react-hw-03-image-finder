import React, { Component } from "react";
import Searchbar from "../Searchbar/Searchbar";
import { request, withCredentials } from "../../services/pixabayApi";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import "./App.css";

class App extends Component {
  state = {
    gallery: [],
    loader: true,
    error: false,
    currentPage: 1,
    perPage: 12,
    totalItemCount: 1000,
  };

  render() {
    const {} = this.state;
    return (
      <div className="App">
        <Searchbar />
        <ImageGallery />
        <Loader />
        <Button />
        <Modal />
      </div>
    );
  }
}

export default App;
