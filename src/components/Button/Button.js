import React from "react";
import "./Button.css";

const Button = ({ requestOnBtn }) => {
  return (
    <div className="LoadeMoreBtn">
      <button className="Button" type="button" onClick={requestOnBtn}>
        Load more
      </button>
    </div>
  );
};

export default Button;

// window.scrollTo({
//   top: document.documentElement.scrollHeight,
//   behavior: "smooth",
// });
