import React from "react";
import PropTypes from "prop-types";

import "./TextItem.style.scss";

function TextItem({ label, value }) {
  return (
    <div className="textItem">
      <p className="textItem__label">{label}</p>
      <span className="textItem__value">{value}</span>
    </div>
  );
}

TextItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default TextItem;
