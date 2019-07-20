import React from "react";
import { Accordion, AccordionTab } from "primereact/accordion";
import { DataView } from "primereact/dataview";

import VoteReasonItem from "../../components/VoteReasonItem";
import CandidateShape from "../../types/candidate";

function VoteReasoning({ candidate }) {
  const itemTemplate = (voteReason, layout) => {
    if (!voteReason) {
      return null;
    }

    if (layout === "list") {
      return <VoteReasonItem data={voteReason} />;
    }
  };

  return (
    <div className="p-grid">
      <div className="p-grid">
        <div className="p-col-4">
          <img src={candidate.photo} alt="avatar" />
        </div>
        <div className="p-col-8">
          <h4>{candidate.name}</h4>
        </div>
      </div>
      <Accordion>
        <AccordionTab header="Qualifications">
          <DataView
            value={candidate.bio_qualifications}
            layout="list"
            itemTemplate={itemTemplate}
            rows={20}
          />
        </AccordionTab>
        <AccordionTab header="Policies">
          <DataView
            value={candidate.bio_policy_positions}
            layout="list"
            itemTemplate={itemTemplate}
            rows={20}
          />
        </AccordionTab>
      </Accordion>
    </div>
  );
}

VoteReasoning.propTypes = {
  candidate: CandidateShape.isRequired
};

export default VoteReasoning;
