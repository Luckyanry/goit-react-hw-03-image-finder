import React from "react";
import "./ImageGalleryItem.css";

const ImageGalleryItem = ({ webformatURL, largeImageURL, tags, showModal }) => {
  return (
    <li
      className="ImageGalleryItem"
      onClick={() => {
        showModal(largeImageURL, tags);
      }}
    >
      <img src={webformatURL} alt={tags} className="ImageGalleryItem-image" />
    </li>
  );
};

export default ImageGalleryItem;
