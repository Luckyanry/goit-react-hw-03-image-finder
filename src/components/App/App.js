import React, { Component } from "react";
import Searchbar from "../Searchbar/Searchbar";
import { request, withCredentials } from "../../services/pixabayApi";
import ImageGallery from "../ImageGallery/ImageGallery";
// import Loader from "../Loader/Loader";
import Button from "../Button/Button";
// import Modal from "../Modal/Modal";
import "./App.css";

class App extends Component {
  state = {
    gallery: [],
    query: "",
    loader: true,
    error: false,
    text: "",
    currentPage: 1,
    showModal: false,
  };

  componentDidMount() {
    const { query, currentPage } = this.state;
    this.refreshSearchQuery(query, currentPage);
  }

  componentDidUpdate(prevProps, prevState) {
    const { query, currentPage } = this.state;
    const oldCurrentPage = prevState.currentPage;

    if (currentPage !== oldCurrentPage) {
      this.refreshSearchQuery(query, currentPage);
    }
  }

  refreshSearchQuery = async (query, currentPage) => {
    const url = withCredentials(
      `https://pixabay.com/api/?q=${query}&page=${currentPage}&image_type=photo&orientation=horizontal&per_page=12`
    );
    try {
      await this.loaderToggle(true);
      await this.errorToggle(false);

      const result = await request("get", url);
      this.updateGallery(result.hits);
    } catch (error) {
      this.errorToggle(true);
    } finally {
      this.loaderToggle(false);
    }
  };

  addQuery = (query) => {
    this.setState({ query });
  };

  toggleModal = () => {
    this.setState((state) => ({
      showModal: !state.showModal,
    }));
  };

  updateGallery = (gallery) => {
    this.setState({
      gallery,
    });
  };

  loaderToggle = (status) => {
    this.setState({
      loader: status,
    });
  };

  errorToggle = (status) => {
    this.setState({ error: status });
  };

  render() {
    const { loader, error, text, showModal, gallery } = this.state;
    return (
      <div className="App">
        <Searchbar addQuery={this.addQuery} />
        {/* {error && (
          <h2 className="error">Whoops, something went wrong: {text}</h2>
        )} */}
        {/* {loader && <Loader />} */}
        {/* {showModal && <Modal onClose={this.toggleModal} />} */}
        <ImageGallery gallery={gallery} />
        <Button />
      </div>
    );
  }
}

export default App;
