import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";

import { Avatar, TextItem, ProgressSpinner } from "../../components";

import {
  CandidatePositionsQuery,
  CandidateQualificationsQuery,
  CandidateDetailQuery
} from "../../queries";

import "./CandidateDetail.style.scss";

function CandidateDetail({ match, history }) {
  return (
    <Query query={CandidateDetailQuery} variables={{ id: match.params.id }}>
      {({ data: candidateData, loadingCandidate }) => {
        if (loadingCandidate) return <ProgressSpinner />;
        const { candidate } = candidateData;
        return (
          <div className="p-col-12 p-sm-12 p-md-6 p-col-align-center page candidate-detail">
            <section className="p-grid candidate-detail__header">
              <div className="p-col" onClick={() => history.goBack()}>
                <p>
                  <span className="pi pi-chevron-left" />
                  Back to candidates
                </p>
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
                    <TextItem
                      label="VS"
                      value={`${candidate.latest_odds || 0}%`}
                    />
                  </div>
                  <div className="p-col-12">{candidate.bio_summary}</div>
                </div>
              </div>
            </section>
            <section className="p-grid p-col-align-center candidate-detail__experience">
              <div className="p-col">
                <h3>EXPERIENCE</h3>
              </div>
              <Query
                query={CandidateQualificationsQuery}
                variables={{ candidateId: match.params.id }}
              >
                {({ data, loading, error }) => {
                  if (loading) return <ProgressSpinner />;
                  return (
                    <div className="p-col-12">
                      <ul>
                        {data.candidateQualifications.map(({ id, summary }) => (
                          <li key={id}>{summary}</li>
                        ))}
                      </ul>
                    </div>
                  );
                }}
              </Query>
            </section>

            <section className="p-grid p-col-align-center candidate-detail__position">
              <div className="p-col">
                <h3>POLICY POSITIONS</h3>
              </div>
              <Query
                query={CandidatePositionsQuery}
                variables={{ candidateId: match.params.id }}
              >
                {({ data, loading, error }) => {
                  if (loading) return <ProgressSpinner />;
                  return (
                    <div className="p-col-12">
                      <ul>
                        {data.candidatePositions.map(({ id, summary }) => (
                          <li key={id}>{summary}</li>
                        ))}
                      </ul>
                    </div>
                  );
                }}
              </Query>
            </section>
          </div>
        );
      }}
    </Query>
  );
}

CandidateDetail.propTypes = {
  match: PropTypes.object.isRequired
};

export default CandidateDetail;
