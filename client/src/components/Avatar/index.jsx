import React from "react";
import PropTypes from "prop-types";

import "./Avatar.style.scss";

function Avatar({ url, alt }) {
  return <img src={url} alt={alt} className="avatar" />;
}

Avatar.propTypes = {
  url: PropTypes.string,
  alt: PropTypes.string,
  label: PropTypes.string
};

export default Avatar;
