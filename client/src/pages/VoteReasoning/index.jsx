import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Accordion, AccordionTab } from "primereact/accordion";
import { DataView } from "primereact/dataview";
import { withApollo } from "react-apollo";
import { gql } from "apollo-boost";

import VoteReasonItem from "../../components/VoteReasonItem";

function VoteReasoning({ match, client }) {
  const [candidate, setCandidate] = useState({});
  useEffect(() => {
    const { candidate } = client.readQuery({
      query: candidateQuery,
      variables: {
        id: match.params.id
      }
    });
    setCandidate(candidate);
  }, [client, match.params.id]);

  const itemTemplate = (voteReason, layout) => {
    if (!voteReason) {
      return null;
    }

    if (layout === "list") {
      return <VoteReasonItem data={voteReason} />;
    }
  };

  return (
    <div className="p-grid p-justify-center">
      <div className="p-col-12 p-sm-12 p-md-6 p-col-align-center">
        <div className="p-grid p-col-align-center">
          <div className="p-col-4">
            <img src={candidate.photo} alt="avatar" />
          </div>
          <div className="p-col-8">
            <h4>{candidate.name}</h4>
          </div>
        </div>
        <Accordion multiple>
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
              value={candidate.bio_policy_position}
              layout="list"
              itemTemplate={itemTemplate}
              rows={20}
            />
          </AccordionTab>
        </Accordion>
      </div>
    </div>
  );
}

const candidateQuery = gql`
  query candidate($id: ID) {
    candidate(id: $id) {
      id
      name
      photo
      bio_qualifications {
        id
        summary
      }
      bio_policy_position {
        id
        summary
      }
    }
  }
`;

VoteReasoning.propTypes = {
  match: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired
};

export default withApollo(VoteReasoning);
