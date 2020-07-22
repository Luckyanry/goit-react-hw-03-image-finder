import React, { Component } from "react";
import Searchbar from "../Searchbar/Searchbar";
import { request, createGalleryUrl } from "../../services/pixabayApi";
import ImageGallery from "../ImageGallery/ImageGallery";
import Spinner from "../Loader/Loader";
// import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import "./App.css";

class App extends Component {
  state = {
    gallery: [],
    query: "",
    loader: true,
    error: false,
    message: "",
    currentPage: 1,
    perPage: 12,
    showModal: false,
  };

  // componentDidMount() {
  //   const { query } = this.state;
  //   this.refreshSearchQuery(query);
  // }

  componentDidUpdate(prevProps, prevState) {
    const { currentPage, query } = this.state;
    const oldPage = prevState.currentPage;
    const oldQuery = prevState.query;

    if (currentPage !== oldPage || query !== oldQuery) {
      this.refreshSearchQuery(query);
    }
  }

  refreshSearchQuery = async (query = "") => {
    const { currentPage, perPage } = this.state;
    const URL = createGalleryUrl(query, currentPage, perPage);

    try {
      const result = await request("get", URL);
      this.updateGallery(result);

      // await this.loaderToggle(true);
      await this.errorToggle(false);
    } catch (error) {
      // const message = error.message;
      this.errorToggle(true);
    } finally {
      this.loaderToggle(false);
    }
  };

  // getImages = async (e) => {
  //   e.preventDefault();
  //   const { query } = this.state;
  //   const URL = createGalleryUrl(query);

  //   const result = await request("get", URL);
  //   console.log("result", result);
  //   this.setState({
  //     gallery: [...result.hits],
  //     currentPage: 2,
  //   });
  // };

  // loadImages = async () => {
  //   const { query, currentPage, perPage } = this.state;
  //   const URL = createGalleryUrl(query, currentPage, perPage);

  //   const result = await request("get", URL);
  //   this.setState((prev) => ({
  //     gallery: [...prev.gallery, ...result.hits],
  //     currentPage: prev.currentPage + 1,
  //   }));
  // };

  // addQuery = ({ target: { name, value } }) => {
  //   this.setState({
  //     [name]: value,
  //   });
  // };

  addQuery = (value) => {
    this.setState({
      query: value,
    });
  };

  updateGallery = (result) => {
    this.setState({
      gallery: result.hits,
    });
  };

  loadMoreBtn = () => {
    const { gallery } = this.state;
    this.setState((prev) => ({
      gallery: [...prev.gallery, ...gallery],
      currentPage: prev.currentPage + 1,
    }));
  };

  loaderToggle = (status) => {
    this.setState({
      loader: status,
    });
  };

  errorToggle = (status) => {
    this.setState({
      error: status,
    });
  };

  toggleModal = () => {
    this.setState((state) => ({
      showModal: !state.showModal,
    }));
  };

  render() {
    const { loader, error, message, showModal, gallery, query } = this.state;
    return (
      <div className="App">
        {loader && <Spinner />}
        <Searchbar
          addQuery={this.addQuery}
          query={query}
          getImages={this.getImages}
        />
        {error && (
          <h2 className="error">Whoops, something went wrong: {message}</h2>
        )}
        {showModal && <Modal onClose={this.toggleModal} />}
        <ImageGallery
          gallery={gallery}
          loadMoreBtn={this.loadMoreBtn}
          // loadImages={this.loadImages}
        />
      </div>
    );
  }
}

export default App;
