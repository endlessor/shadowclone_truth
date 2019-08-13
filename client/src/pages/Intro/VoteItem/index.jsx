import React from "react";
import PropTypes from "prop-types";

import "./VoteItem.style.scss";

const VoteItem = ({ icon, label, description }) => {
  return (
    <div className="p-grid vote-item">
      <div className="p-col-fixed">
        <span className={`vote-item__icon ${icon}`} />
      </div>
      <div className="p-col">
        <p className="vote-item__description">
          <span>{label}: </span>
          {description}
        </p>
      </div>
    </div>
  );
};

VoteItem.propTypes = {
  icon: PropTypes.string,
  label: PropTypes.string,
  description: PropTypes.string
};

export default VoteItem;
