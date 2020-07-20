import React from "react";
import "./ImageGallery.css";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";

const ImageGallery = ({ gallery, showModal }) => {
  return (
    <ul className="ImageGallery">
      {gallery.map((item) => (
        <ImageGalleryItem {...item} showModal={showModal} key={item.id} />
      ))}
    </ul>
  );
};

export default ImageGallery;
