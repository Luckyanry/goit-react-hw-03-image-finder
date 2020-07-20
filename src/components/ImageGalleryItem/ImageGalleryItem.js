import React from "react";
import "./ImageGalleryItem.css";

const ImageGalleryItem = ({ webformatURL, largeImageURL, tags, showModal }) => {
  return (
    <li className="ImageGalleryItem">
      <img src={webformatURL} alt={tags} className="ImageGalleryItem-image" />
      {/* <img src={func ? webformatURL : largeImageURL} alt={tags} className="ImageGalleryItem-image" /> */}
    </li>
  );
};

export default ImageGalleryItem;
