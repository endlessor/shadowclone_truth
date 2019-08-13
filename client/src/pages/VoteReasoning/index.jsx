import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { compose, graphql, Query, withApollo } from "react-apollo";
import { Button } from "primereact/button";

import {
  VoteReasonItem,
  Avatar,
  TextItem,
  ProgressSpinner,
  Rating
} from "../../components";
import {
  PositionLikeMutation,
  QualificationLikeMutation,
  CandidateDetailQuery,
  CandidateQualificationsQuery,
  CandidatePositionsQuery,
  PositionQuery,
  QualificationQuery,
  UserVoteMutation,
  CandidateQuery
} from "../../queries/candidate";

import "./VoteReasoning.style.scss";

function VoteReasoning({
  match,
  history,
  client,
  candidateVote,
  positionLike,
  qualificationLike
}) {
  const [candidateId, setCandidateId] = useState(match.params.id);
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const { candidates } = client.readQuery({ query: CandidateQuery });
    setCandidates(candidates);
  }, [client]);

  const curIndex = candidates.findIndex(
    candidate => candidate.id === candidateId
  );

  const handlePrevVote = () => {
    if (curIndex > 0) {
      setCandidateId(candidates[curIndex - 1].id);
    } else {
      history.goBack();
    }
  };

  const handleNextVote = () => {
    if (curIndex < candidates.length - 1) {
      setCandidateId(candidates[curIndex + 1].id);
    } else {
      history.push("/final");
    }
  };

  const handleDone = () => {
    history.push("/final");
  };

  const handleQualificationLike = (qualificationId, like) => {
    qualificationLike({
      variables: {
        candidateId,
        qualificationId,
        like
      },
      optimisticResponse: {
        __typename: "Mutation",
        createUserQualificationLike: {
          __typename: "Qualification",
          like
        }
      },
      update: (cache, { data: { createUserQualificationLike } }) => {
        const { qualification } = cache.readQuery({
          query: QualificationQuery,
          variables: { id: qualificationId }
        });
        cache.writeQuery({
          query: QualificationQuery,
          variables: { id: qualificationId },
          data: {
            qualification: {
              ...qualification,
              like_type: createUserQualificationLike.like
            }
          }
        });
      }
    });
  };
  const handlePositionLike = (positionId, like) => {
    positionLike({
      variables: {
        candidateId,
        positionId,
        like
      },
      optimisticResponse: {
        __typename: "Mutation",
        createUserPositionLike: {
          __typename: "Position",
          like
        }
      },
      update: (cache, { data: { createUserPositionLike } }) => {
        const { position } = cache.readQuery({
          query: PositionQuery,
          variables: { id: positionId }
        });
        cache.writeQuery({
          query: PositionQuery,
          variables: { id: positionId },
          data: {
            position: {
              ...position,
              like_type: createUserPositionLike.like
            }
          }
        });
      }
    });
  };

  const handleVote = vote_type => {
    candidateVote({
      variables: {
        candidateId,
        voteType: vote_type
      },
      optimisticResponse: {
        __typename: "Mutation",
        createUserVote: {
          __typename: "Candidate",
          vote_type
        }
      },
      update: (cache, { data: { createUserVote } }) => {
        const { candidate } = cache.readQuery({
          query: CandidateDetailQuery,
          variables: { id: candidateId }
        });
        cache.writeQuery({
          query: CandidateDetailQuery,
          variables: { id: candidateId },
          data: {
            candidate: {
              ...candidate,
              vote_type: createUserVote.vote_type
            }
          }
        });
      }
    });
  };

  const renderQualification = qualification => (
    <VoteReasonItem
      key={qualification.id}
      data={qualification}
      handleLike={handleQualificationLike.bind(this, qualification.id, "LIKE")}
      handleDislike={handleQualificationLike.bind(
        this,
        qualification.id,
        "DISLIKE"
      )}
    />
  );

  const renderPosition = position => (
    <VoteReasonItem
      key={position.id}
      data={position}
      handleLike={handlePositionLike.bind(this, position.id, "LIKE")}
      handleDislike={handlePositionLike.bind(this, position.id, "DISLIKE")}
    />
  );

  return (
    <div className="p-col-12 page vote-reason">
      <section className="p-grid p-align-center vote-reason__header">
        <div className="p-col-fixed">
          <span className="pi pi-question-circle" />
        </div>
        <div className="p-col">
          <p className="vote-reason__header--description">
            What do you like or dislike about this candidate?
          </p>
        </div>
      </section>
      <Query
        query={CandidateDetailQuery}
        variables={{ id: candidateId }}
        fetchPolicy="cache-only"
      >
        {({ data, loading }) => {
          if (loading) return <ProgressSpinner />;
          const { candidate } = data;
          return (
            <React.Fragment>
              <section className="p-grid vote-reason__main">
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
                      <TextItem
                        label="VS"
                        value={`${candidate.latest_odds || 0}%`}
                      />
                    </div>
                  </div>
                </div>
              </section>
              <section className="p-grid p-col-align-center vote-reason__rating">
                <div className="p-col">
                  <h3>YOUR RATING</h3>
                </div>
                <div className="p-col-12">
                  <Rating
                    voteType={candidate.vote_type}
                    updateVote={handleVote}
                  />
                </div>
              </section>
            </React.Fragment>
          );
        }}
      </Query>
      <section className="p-grid p-col-align-center vote-reason__qualification">
        <div className="p-col">
          <h3>QUALIFICATIONS</h3>
        </div>
        <Query
          query={CandidateQualificationsQuery}
          variables={{ candidateId }}
          fetchPolicy="network-only"
        >
          {({ data, loading, error }) => {
            if (loading) return <ProgressSpinner />;
            return (
              <div className="p-col-12">
                {data.candidateQualifications.map(qualification =>
                  renderQualification(qualification)
                )}
              </div>
            );
          }}
        </Query>
      </section>
      <section className="p-grid p-col-align-center vote-reason__position">
        <div className="p-col">
          <h3>POLICY POSITIONS</h3>
        </div>
        <Query
          query={CandidatePositionsQuery}
          variables={{ candidateId }}
          fetchPolicy="network-only"
        >
          {({ data, loading, error }) => {
            if (loading) return <ProgressSpinner />;
            return (
              <div className="p-col-12">
                {data.candidatePositions.map(position =>
                  renderPosition(position)
                )}
              </div>
            );
          }}
        </Query>
      </section>
      <div className="p-grid p-justify-center vote-reason__footer">
        <div className="p-col p-fluid">
          <Button
            label="Prev"
            icon="pi pi-caret-left"
            onClick={handlePrevVote}
          />
        </div>
        <div className="p-col p-fluid">
          <Button label="Done" onClick={handleDone} />
        </div>
        <div className="p-col p-fluid">
          <Button
            label="Next"
            icon="pi pi-caret-right"
            iconPos="right"
            onClick={handleNextVote}
          />
        </div>
      </div>
    </div>
  );
}

VoteReasoning.propTypes = {
  match: PropTypes.object.isRequired,
  candidateVote: PropTypes.func.isRequired,
  positionLike: PropTypes.func.isRequired,
  qualificationLike: PropTypes.func.isRequired
};

export default compose(
  withApollo,
  graphql(UserVoteMutation, { name: "candidateVote" }),
  graphql(PositionLikeMutation, { name: "positionLike" }),
  graphql(QualificationLikeMutation, { name: "qualificationLike" })
)(VoteReasoning);
