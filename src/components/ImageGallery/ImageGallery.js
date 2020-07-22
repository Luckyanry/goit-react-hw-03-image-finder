import React from "react";
import "./ImageGallery.css";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import Button from "../Button/Button";

const ImageGallery = ({ gallery, showModal, loadImages }) => {
  return (
    <>
      <ul className="ImageGallery">
        {gallery.map((item) => (
          <ImageGalleryItem key={item.id} {...item} showModal={showModal} />
        ))}
      </ul>
      {gallery.length > 0 && <Button requestOnBtn={loadImages} />}
    </>
  );
};

export default ImageGallery;
