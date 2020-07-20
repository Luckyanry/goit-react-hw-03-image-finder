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
    text: "",
    currentPage: 1,
    perPage: 12,
    totalItemCount: 1000,
    showModal: false,
  };

  toggleModal = () => {
    this.setState((state) => ({
      showModal: !state.showModal,
    }));
  };

  render() {
    const { loader, error, text, showModal } = this.state;
    return (
      <div className="App">
        <Searchbar />
        {error && (
          <h2 className="error">Whoops, something went wrong: {text}</h2>
        )}
        {loader && <Loader />}
        {showModal && <Modal onClose={this.toggleModal} />}
        <ImageGallery />
        <Button />
      </div>
    );
  }
}

export default App;
