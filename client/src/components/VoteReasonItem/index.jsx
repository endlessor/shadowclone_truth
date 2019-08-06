import React from "react";
import { oneOfType, func } from "prop-types";
import { Button } from "primereact/button";
import classNames from "classnames";

import { QualificationShape, PolicyPositionShape } from "../../types/candidate";

import "./VoteReasonItem.style.scss";

const VoteReasonItem = ({ data, onToggle }) => {
  return (
    <div className="vote-reason-item">
      <div className="p-grid">
        <div className="p-col-2 p-fluid">
          <Button icon="pi pi-thumbs-down" name="DISLIKE" onChange={onToggle} />
        </div>
        <div className="p-col-8 vote-reason-item__summary">
          <span>{data.summary}</span>
        </div>
        <div className="p-col-2 p-fluid">
          <Button icon="pi pi-thumbs-up" name="LIKE" onChange={onToggle} />
        </div>
      </div>
    </div>
  );
};

VoteReasonItem.propTypes = {
  data: oneOfType([QualificationShape, PolicyPositionShape]).isRequired,
  onToggle: func.isRequired
};

export default VoteReasonItem;
