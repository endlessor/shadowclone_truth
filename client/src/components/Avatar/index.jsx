import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import "./Avatar.style.scss";

function Avatar({ url, alt, label }) {
  const classname = cn({
    avatar__label: true,
    "brand-background-top": label === "top",
    "brand-background-favorite": label === "favorite",
    "brand-background-compromise": label === "compromise",
    "brand-background-veto": label === "veto",
    "brand-background-tbd": label === "unknowns"
  });
  return (
    <div className="avatar">
      <img src={url} alt={alt} className="avatar__image" />
      {label && <label className={classname}>{label}</label>}
    </div>
  );
}

Avatar.propTypes = {
  url: PropTypes.string,
  alt: PropTypes.string,
  label: PropTypes.string
};

export default Avatar;
