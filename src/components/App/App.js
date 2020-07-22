import React, { Component } from "react";
import Searchbar from "../Searchbar/Searchbar";
import { request, createGalleryUrl } from "../../services/pixabayApi";
import ImageGallery from "../ImageGallery/ImageGallery";
import Spinner from "../Loader/Loader";
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

  refreshSearchQuery = async (...rest) => {
    const URL = createGalleryUrl(...rest);

    try {
      this.loaderToggle(true);
      const result = await request("get", URL);
      this.errorToggle(false);
      return result;
    } catch (error) {
      this.errorToggle(true);
      const message = error.message;
      return message;
    } finally {
      this.loaderToggle(false);
    }
  };

  getImages = async (e) => {
    e.preventDefault();
    const { query } = this.state;
    const result = await this.refreshSearchQuery(query);

    if (result.constructor.name !== "String") {
      this.setState({
        gallery: [...result.hits],
        currentPage: 2,
      });
    } else {
      this.setState({
        message: result,
      });
    }
  };

  loadImages = async () => {
    const { query, currentPage, perPage } = this.state;
    const result = await this.refreshSearchQuery(query, currentPage, perPage);
    this.scrollPage();

    if (result.constructor.name !== "String") {
      this.setState((prev) => ({
        gallery: [...prev.gallery, ...result.hits],
        currentPage: prev.currentPage + 1,
      }));
    } else {
      this.setState({
        message: result,
      });
    }
  };

  addQuery = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
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

  toggleModal = (largeImageURL, tags) => {
    this.setState((state) => ({
      showModal: !state.showModal,
      largeImageURL,
      tags,
    }));
  };

  scrollPage = () => {
    const crossAxis = document.documentElement.offsetHeight - 150;

    setTimeout(() => {
      window.scrollTo({
        top: crossAxis,
        behavior: "smooth",
      });
    }, 100);
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
          getImages={this.getImages}
          // getImages={this.getResult}
        />

        {loader ? (
          <Spinner />
        ) : (
          <ImageGallery
            gallery={gallery}
            loadImages={this.loadImages}
            // loadImages={this.getResult}
            showModal={this.toggleModal}
          />
        )}
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

// getResult = async (e) => {
//   e.preventDefault();
//   e.persist();
//   const { query, currentPage, perPage } = this.state;

//   const result = e.target.dataset.action
//     ? await this.refreshSearchQuery(query, currentPage, perPage)
//     : await this.refreshSearchQuery(query);

//   if (result.constructor.name !== "String") {
//     this.scrolling();
//     e.target.dataset.action
//       ? this.setState((prev) => ({
//           gallery: [...prev.gallery, ...result.hits],
//           currentPage: prev.currentPage + 1,
//         }))
//       : this.setState({
//           gallery: [...result.hits],
//           currentPage: 2,
//         });
//   } else {
//     this.setState({
//       message: result,
//     });
//   }
// };
