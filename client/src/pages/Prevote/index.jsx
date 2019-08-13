import React, { useState } from "react";
import PropTypes from "prop-types";
import { Query, Mutation } from "react-apollo";
import { DataView } from "primereact/dataview";
import { Button } from "primereact/button";

import { CandidateListItem, ProgressSpinner } from "../../components";
import {
  CandidateQuery,
  UserVoteMutation,
  CandidateDetailQuery
} from "../../queries/candidate";
import { VOTE_TYPE } from "../../config";

import "./Prevote.style.scss";

function PreVote({ history }) {
  const [topCandidateId, setTopCandidateId] = useState(null);
  const onCompleteQueryFetch = data => {
    const topCandidate = data.candidates.find(
      ({ vote_type }) => vote_type === VOTE_TYPE.top
    );
    if (topCandidate) setTopCandidateId(topCandidate.id);
  };

  const itemTemplate = (candidate, layout) => {
    if (!candidate) {
      return null;
    }

    if (layout === "list") {
      return (
        <Mutation mutation={UserVoteMutation}>
          {createUserVote => {
            const handleVote = vote_type => {
              const { id } = candidate;
              createUserVote({
                variables: {
                  candidateId: id,
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
                    variables: { id }
                  });
                  cache.writeQuery({
                    query: CandidateDetailQuery,
                    variables: { id },
                    data: {
                      candidate: {
                        ...candidate,
                        vote_type: createUserVote.vote_type
                      }
                    }
                  });
                  if (vote_type === VOTE_TYPE.top && topCandidateId !== id) {
                    const { candidate: prevTopCandidate } = cache.readQuery({
                      query: CandidateDetailQuery,
                      variables: { id: topCandidateId }
                    });
                    cache.writeQuery({
                      query: CandidateDetailQuery,
                      variables: { topCandidateId },
                      data: {
                        candidate: {
                          ...prevTopCandidate,
                          vote_type: VOTE_TYPE.favorite
                        }
                      }
                    });
                    setTopCandidateId(id);
                  }
                }
              });
            };
            return (
              <CandidateListItem data={candidate} updateVote={handleVote} />
            );
          }}
        </Mutation>
      );
    }
  };

  const handleNext = () => {
    history.push("/result");
  };

  return (
    <div className="p-col-12 p-sm-12 p-md-6 page prevote">
      <div className="p-grid p-justify-between p-align-center prevote__header">
        <div className="p-col-12">
          <h1>Prevoting</h1>
        </div>
      </div>
      <div className="p-grid p-justify-center">
        <Query
          query={CandidateQuery}
          fetchPolicy="network-only"
          onCompleted={onCompleteQueryFetch}
        >
          {({ loading, error, data }) => {
            if (loading) return <ProgressSpinner />;
            if (error) return <p>Error : {error}</p>;
            return (
              <DataView
                value={data.candidates}
                layout="list"
                itemTemplate={itemTemplate}
                rows={20}
              />
            );
          }}
        </Query>
      </div>
      <div className="p-grid p-justify-between prevote__footer">
        <div className="p-col-3 p-fluid">
          <Button
            label="Back"
            icon="pi pi-caret-left"
            onClick={() => history.goBack()}
          />
        </div>
        <div className="p-col-3 p-fluid">
          <Button
            label="Next"
            icon="pi pi-caret-right"
            iconPos="right"
            onClick={handleNext}
          />
        </div>
      </div>
    </div>
  );
}

PreVote.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired
  })
};
export default PreVote;
