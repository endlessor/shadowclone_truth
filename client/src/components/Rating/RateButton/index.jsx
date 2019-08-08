import React from "react";
import PropTypes from "prop-types";

import "./RateButton.style.scss";

const RateButton = ({ icon, label, onClick, className }) => {
  return (
    <button
      className={`p-grid p-component rate-button ${className}`}
      onClick={onClick}
    >
      {icon && (
        <div className="p-col-12">
          <span className={`rate-button-icon ${icon}`} />
        </div>
      )}
      {label && (
        <div className="p-col-12">
          <span className="rate-button-label">{label}</span>
        </div>
      )}
    </button>
  );
};

RateButton.propTypes = {
  icon: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func
};

RateButton.defaultProps = {
  onClick: () => {}
};

export default RateButton;
