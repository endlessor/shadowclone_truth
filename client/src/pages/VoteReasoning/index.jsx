import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Accordion, AccordionTab } from "primereact/accordion";
import { DataView } from "primereact/dataview";
import { compose, withApollo, graphql } from "react-apollo";
import { gql } from "apollo-boost";

import { VoteReasonItem, Avatar } from "../../components";
import {
  PositionLikeMutation,
  QualificationLikeMutation
} from "../../queries/candidate";

function VoteReasoning({ match, client, positionLike, qualificationLike }) {
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

  const itemTemplateQualification = (qualification, layout) => {
    if (!qualification) {
      return null;
    }

    if (layout === "list") {
      return (
        <VoteReasonItem
          data={qualification}
          onToggle={e => {
            qualificationLike({
              variables: {
                qualificationId: qualification.id,
                like: e.target.name
              }
            });
          }}
        />
      );
    }
  };

  const itemTemplatePosition = (position, layout) => {
    if (!position) {
      return null;
    }

    if (layout === "list") {
      return (
        <VoteReasonItem
          data={position}
          onToggle={e => {
            positionLike({
              variables: {
                userId: "cjyg2k9vkhc3b0b19tkwr49fu",
                positionId: position.id,
                like: e.target.name
              }
            });
          }}
        />
      );
    }
  };

  return (
    <div className="p-grid p-justify-center">
      <div className="p-col-12 p-sm-12 p-md-6 p-col-align-center">
        <div className="p-grid p-col-align-center">
          <div className="p-col-4">
            <Avatar url={candidate.photo} alt="avatar" />
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
              itemTemplate={itemTemplateQualification}
              rows={20}
            />
          </AccordionTab>
          <AccordionTab header="Policies">
            <DataView
              value={candidate.bio_policy_position}
              layout="list"
              itemTemplate={itemTemplatePosition}
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
  client: PropTypes.object.isRequired,
  positionLike: PropTypes.func.isRequired,
  qualificationLike: PropTypes.func.isRequired
};

export default compose(
  withApollo,
  graphql(PositionLikeMutation, { name: "positionLike" }),
  graphql(QualificationLikeMutation, { name: "qualificationLike" })
)(VoteReasoning);
