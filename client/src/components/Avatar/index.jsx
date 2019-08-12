import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import { VOTE_TYPE } from "../../config";

import "./Avatar.style.scss";

function Avatar({ url, alt, label, voteType }) {
  const labelClassname = cn({
    avatar__label: true,
    "avatar__label-top": label === VOTE_TYPE.top,
    "avatar__label-favorite": label === VOTE_TYPE.favorite,
    "avatar__label-compromise": label === VOTE_TYPE.compromise,
    "avatar__label-veto": label === VOTE_TYPE.veto,
    "avatar__label-tbd": label === VOTE_TYPE.unknowns
  });
  const avatarImageClassname = cn({
    avatar__image: true,
    "avatar__image-top": voteType === VOTE_TYPE.top,
    "avatar__image-favorite": voteType === VOTE_TYPE.favorite,
    "avatar__image-compromise": voteType === VOTE_TYPE.compromise,
    "avatar__image-veto": voteType === VOTE_TYPE.veto,
    "avatar__image-tbd": voteType === VOTE_TYPE.unknowns
  });
  return (
    <div className="avatar">
      <img src={url} alt={alt} className={avatarImageClassname} />
      {label && <label className={labelClassname}>{label}</label>}
    </div>
  );
}

Avatar.propTypes = {
  url: PropTypes.string,
  alt: PropTypes.string,
  label: PropTypes.string,
  voteType: PropTypes.string
};

export default Avatar;
