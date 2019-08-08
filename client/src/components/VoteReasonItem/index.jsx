import React from "react";
import { oneOfType, func } from "prop-types";
import { Button } from "primereact/button";
import classNames from "classnames";

import { QualificationShape, PolicyPositionShape } from "../../types/candidate";

import "./VoteReasonItem.style.scss";

const VoteReasonItem = ({ data, handleLike, handleDislike }) => {
  const btnDislike = classNames({
    dislike: data.like_type === "DISLIKE"
  });
  const btnLike = classNames({
    like: data.like_type === "LIKE"
  });
  const summaryClassName = classNames({
    "p-col-8": true,
    "vote-reason-item__summary": true,
    like: data.like_type === "LIKE",
    dislike: data.like_type === "DISLIKE"
  });

  return (
    <div className="vote-reason-item">
      <div className="p-grid">
        <div className="p-col-2 p-fluid">
          <Button
            icon="pi pi-thumbs-down"
            className={btnDislike}
            onClick={handleDislike}
          />
        </div>
        <div className={summaryClassName}>
          <span>{data.summary}</span>
        </div>
        <div className="p-col-2 p-fluid">
          <Button
            icon="pi pi-thumbs-up"
            className={btnLike}
            onClick={handleLike}
          />
        </div>
      </div>
    </div>
  );
};

VoteReasonItem.propTypes = {
  data: oneOfType([QualificationShape, PolicyPositionShape]).isRequired,
  handleLike: func.isRequired,
  handleDislike: func.isRequired
};

export default VoteReasonItem;
