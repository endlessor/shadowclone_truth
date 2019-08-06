import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { compose, withApollo, graphql } from "react-apollo";
import { gql } from "apollo-boost";

import { VoteReasonItem, Avatar, TextItem } from "../../components";
import {
  PositionLikeMutation,
  QualificationLikeMutation
} from "../../queries/candidate";

import "./VoteReasoning.style.scss";

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

  const itemTemplateQualification = qualification => {
    if (!qualification) {
      return null;
    }

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
  };

  const itemTemplatePosition = position => {
    if (!position) {
      return null;
    }

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
  };

  return (
    <section className="p-col-12 p-sm-12 p-md-6 p-col-align-center page vote-reason">
      <section className="p-grid vote-reason__header">
        <div className="p-col">
          <p className="vote-reason__header--description">
            <span className="pi pi-question-circle" />
            What do you like or dislike about this candidate?
          </p>
        </div>
      </section>
      <section className="p-grid p-col-align-center vote-reason__main">
        <div className="p-col-fixed">
          <div className="vote-reason__main__avatar">
            <Avatar url={candidate.photo} alt="avatar" />
          </div>
        </div>
        <div className="p-col">
          <div className="p-grid">
            <div className="p-col-12">
              <h4>{candidate.name}</h4>
            </div>
            <div className="p-col-3">
              <TextItem label={"AGE"} value={candidate.age} />
            </div>
            <div className="p-col-4">
              <TextItem
                label="POLLS"
                value={`${candidate.latest_poll || 0}%`}
              />
            </div>
            <div className="p-col-4">
              <TextItem label="VS" value={`${candidate.latest_odds || 0}%`} />
            </div>
          </div>
        </div>
      </section>
      <section className="p-grid p-col-align-center vote-reason__qualification">
        <div className="p-col">
          <h3>QUALIFICATIONS</h3>
        </div>
        {candidate.bio_qualifications && (
          <div className="p-col-12">
            {candidate.bio_qualifications.map(qualification =>
              itemTemplateQualification(qualification)
            )}
          </div>
        )}
      </section>
      <section className="p-grid p-col-align-center vote-reason__position">
        <div className="p-col">
          <h3>POLICY POSITIONS</h3>
        </div>
        {candidate.bio_policy_position && (
          <div className="p-col-12">
            {candidate.bio_policy_position.map(position =>
              itemTemplatePosition(position)
            )}
          </div>
        )}
      </section>
    </section>
  );
}

const candidateQuery = gql`
  query candidate($id: ID) {
    candidate(id: $id) {
      id
      name
      photo
      age
      latest_odds
      latest_poll
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
