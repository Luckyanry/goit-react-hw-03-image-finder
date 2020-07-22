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
    loader: false,
    error: false,
    message: "",
    currentPage: 1,
    perPage: 12,
    showModal: false,
    tags: "",
    largeImageURL: "",
  };

  // componentDidMount() {
  //   const { query } = this.state;
  //   this.refreshSearchQuery(query);
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   const { currentPage, query } = this.state;
  //   const oldPage = prevState.currentPage;
  //   const oldQuery = prevState.query;

  //   if (currentPage !== oldPage) {
  //     this.refreshSearchQuery();
  //   }

  //   if (query !== oldQuery) {
  //     this.refreshSearchQuery();
  //   }
  // }

  refreshSearchQuery = async (...rest) => {
    const URL = createGalleryUrl(...rest);

    try {
      await this.loaderToggle(true);
      const result = await request("get", URL);
      await this.errorToggle(false);
      return result;
    } catch (error) {
      this.errorToggle(true);
      const message = error.message;
      return message;
    } finally {
      this.loaderToggle(false);
    }
  };

  // getImages = async (e) => {
  //   e.preventDefault();
  //   const { query } = this.state;
  //   const result = await this.refreshSearchQuery(query);
  //   console.log("result", result);

  //   if (result.constructor.name !== "String") {
  //     this.setState({
  //       gallery: [...result.hits],
  //       currentPage: 2,
  //     });
  //   } else {
  //     this.setState({
  //       message: result,
  //     });
  //   }
  // };

  getResult = async (e) => {
    e.preventDefault();
    e.persist();
    console.dir(e.target);
    const { query, currentPage, perPage } = this.state;

    const result = e.target.dataset.action
      ? await this.refreshSearchQuery(query, currentPage, perPage)
      : await this.refreshSearchQuery(query);

    if (result.constructor.name !== "String") {
      e.target.dataset.action
        ? this.setState((prev) => ({
            gallery: [...prev.gallery, ...result.hits],
            currentPage: prev.currentPage + 1,
          }))
        : this.setState({
            gallery: [...result.hits],
            currentPage: 2,
          });
    } else {
      this.setState({
        message: result,
      });
    }
  };

  // loadImages = async () => {
  //   const { query, currentPage, perPage } = this.state;
  //   const result = await this.refreshSearchQuery(query, currentPage, perPage);

  //   if (result.constructor.name !== "String") {
  //     this.setState((prev) => ({
  //       gallery: [...prev.gallery, ...result.hits],
  //       currentPage: prev.currentPage + 1,
  //     }));
  //   } else {
  //     this.setState({
  //       message: result,
  //     });
  //   }
  // };

  addQuery = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  // updateGallery = (result) => {
  //   this.setState({
  //     gallery: result.hits,
  //     currentPage: 2,
  //   });
  // };

  // addQuery = (value) => {
  //   this.setState({
  //     query: value,
  //   });
  // };

  // loadMoreBtn = (e) => {
  //   e.preventDefault();

  //   const { gallery, currentPage } = this.state;

  //   this.setState((prev) => {
  //     console.log("prev.gallery", prev.gallery);
  //     console.log("gallery", gallery);
  //     console.log("currentPage", currentPage + 1);
  //     console.log("prev.currentPage", prev.currentPage + 1);
  //     // ({
  //     //   gallery: [...prev.gallery, ...gallery],
  //     //   currentPage: prev.currentPage + 1,
  //     // });
  //   });

  // this.setState((prev) => ({
  //   gallery: [...prev.gallery, ...gallery],
  //   currentPage: prev.currentPage + 1,
  // }));
  // };

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

  toggleModal = (largeImageURL, tags) => {
    this.setState((state) => ({
      showModal: !state.showModal,
      largeImageURL,
      tags,
    }));
  };

  render() {
    const {
      loader,
      error,
      message,
      showModal,
      gallery,
      query,
      largeImageURL,
      tags,
    } = this.state;
    return (
      <div className="App">
        <Searchbar
          addQuery={this.addQuery}
          query={query}
          // getImages={this.getImages}
          getImages={this.getResult}
        />
        <ImageGallery
          gallery={gallery}
          // loadMoreBtn={this.loadMoreBtn}
          // loadImages={this.loadImages}
          loadImages={this.getResult}
          showModal={this.toggleModal}
        />
        {loader && <Spinner />}
        {error && (
          <h2 className="error">Whoops, something went wrong: {message}</h2>
        )}
        {showModal && (
          <Modal
            onClose={this.toggleModal}
            largeImageURL={largeImageURL}
            tags={tags}
          />
        )}
      </div>
    );
  }
}

export default App;
