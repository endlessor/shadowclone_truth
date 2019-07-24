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
        <div className="p-col-2">
          <ToggleButton
            onIcon={"pi pi-star-o"}
            offIcon={"pi pi-star"}
            name="LIKE"
            onChange={onToggle}
          />
        </div>
        <div className="p-col-8">
          <p>{data.summary}</p>
        </div>
        <div className="p-col-2">
          <ToggleButton
            onIcon={"pi pi-star-o"}
            offIcon={"pi pi-star"}
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
