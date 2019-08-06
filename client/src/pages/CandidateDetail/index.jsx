import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import { compose, withApollo } from "react-apollo";
import { gql } from "apollo-boost";

import { Avatar, TextItem } from "../../components";

import "./CandidateDetail.style.scss";

function CandidateDetail({ match, client }) {
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

  return (
    <div className="p-col-12 p-sm-12 p-md-6 p-col-align-center page candidate-detail">
      <section className="p-grid candidate-detail__header">
        <div className="p-col">
          <Link to="/prevote">
            <span className="pi pi-chevron-left" />
            Back to candidates
          </Link>
        </div>
      </section>
      <section className="p-grid p-col-align-center candidate-detail__main">
        <div className="p-col-fixed">
          <Avatar url={candidate.photo} alt="avatar" />
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
      <section className="p-grid p-col-align-center candidate-detail__experience">
        <div className="p-col">
          <h3>EXPERIENCE</h3>
        </div>
        <div />
      </section>

      <section className="p-grid p-col-align-center candidate-detail__position">
        <div className="p-col">
          <h3>POLICY POSITIONS</h3>
        </div>
        {candidate.bio_policy_position && (
          <div className="p-col-12">
            <ul>
              {candidate.bio_policy_position.map(({ id, summary }) => (
                <li key={id}>{summary}</li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}

const candidateQuery = gql`
  query candidate($id: ID) {
    candidate(id: $id) {
      id
      name
      photo
      age
      latest_poll
      latest_odds
      prevote_score
      bio_other
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

CandidateDetail.propTypes = {
  match: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired
};

export default compose(withApollo)(CandidateDetail);
