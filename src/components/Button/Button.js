import React from "react";
import "./Button.css";

const Button = ({ requestOnBtn }) => {
  return (
    <div className="LoadeMoreBtn">
      <button
        className="Button"
        type="button"
        onClick={requestOnBtn}
        data-action="loadMore"
      >
        Load more
      </button>
    </div>
  );
};

export default Button;
