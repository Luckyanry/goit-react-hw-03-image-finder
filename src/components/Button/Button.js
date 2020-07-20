import React from "react";
import "./Button.css";

const Button = ({ requestOnBtn }) => {
  return (
    <button className="Button" type="button" onClick={requestOnBtn}>
      Load more
    </button>
  );
};

export default Button;

// window.scrollTo({
//   top: document.documentElement.scrollHeight,
//   behavior: "smooth",
// });
