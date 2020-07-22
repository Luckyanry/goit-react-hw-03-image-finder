import React, { Component } from "react";
import "./Modal.css";

class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    e.code === "Escape" && this.props.onClose();
  };

  handleClickOnOverlay = (e) => {
    e.target.nodeName === "DIV" && this.props.onClose();
  };

  render() {
    const { largeImageURL, tags } = this.props;
    return (
      <div className="Overlay" onClick={this.handleClickOnOverlay}>
        <div className="Modal">
          <img src={largeImageURL} alt={tags} />
        </div>
      </div>
    );
  }
}

export default Modal;
