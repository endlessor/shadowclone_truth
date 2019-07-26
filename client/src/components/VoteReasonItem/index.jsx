import React from "react";
import { oneOfType, func } from "prop-types";
import { Card } from "primereact/card";
import { ToggleButton } from "primereact/togglebutton";

import { QualificationShape, PolicyPositionShape } from "../../types/candidate";

import "./VoteReasonItem.style.scss";

const VoteReasonItem = ({ data, onToggle }) => {
  return (
    <Card className="candidate_card">
      <div className="p-grid p-align-center">
        <div className="p-col-2 p-fluid">
          <ToggleButton
            onIcon={"pi pi-thumbs-up"}
            offIcon={"pi pi-thumbs-up"}
            name="LIKE"
            onChange={onToggle}
          />
        </div>
        <div className="p-col-8">
          <p>{data.summary}</p>
        </div>
        <div className="p-col-2 p-fluid">
          <ToggleButton
            onIcon={"pi pi-thumbs-down"}
            offIcon={"pi pi-thumbs-down"}
            name="DISLIKE"
            onChange={onToggle}
          />
        </div>
      </div>
    </Card>
  );
};

VoteReasonItem.propTypes = {
  data: oneOfType([QualificationShape, PolicyPositionShape]).isRequired,
  onToggle: func.isRequired
};

export default VoteReasonItem;
