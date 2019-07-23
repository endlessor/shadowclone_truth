import React from "react";
import { oneOfType } from "prop-types";
import { Card } from "primereact/card";
import { ToggleButton } from "primereact/togglebutton";

import { QualificationShape, PolicyPositionShape } from "../../types/candidate";

import "./VoteReasonItem.style.scss";

const VoteReasonItem = ({ data }) => {
  return (
    <Card className="candidate_card">
      <div className="p-grid p-align-center">
        <div className="p-col-2">
          <ToggleButton
            onIcon={"pi pi-star-o"}
            offIcon={"pi pi-star"}
          />
        </div>
        <div className="p-col-8">
          <p>{data.summary}</p>
        </div>
        <div className="p-col-2">
          <ToggleButton
            onIcon={"pi pi-star-o"}
            offIcon={"pi pi-star"}
          />
        </div>
      </div>
    </Card>
  );
};

VoteReasonItem.propTypes = {
  data: oneOfType([QualificationShape, PolicyPositionShape]).isRequired
};

export default VoteReasonItem;
