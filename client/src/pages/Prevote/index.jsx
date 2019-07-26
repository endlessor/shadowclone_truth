import React from "react";
import { Query, Mutation } from "react-apollo";
import { DataView } from "primereact/dataview";

import CandidateListItem from "../../components/CandidateListItem";
import { CandidateQuery, UserVoteMutation } from "../../queries/candidate";

function PreVote() {
  const itemTemplate = (candidate, layout) => {
    if (!candidate) {
      return null;
    }

    if (layout === "list") {
      return (
        <Mutation mutation={UserVoteMutation}>
          {createUserVote => (
            <CandidateListItem
              data={candidate}
              updateVote={e => {
                if (e.value) {
                  createUserVote({
                    variables: {
                      candidateId: candidate.id,
                      voteType: e.target.name
                    }
                  });
                }
              }}
            />
          )}
        </Mutation>
      );
    }
  };

  return (
    <div className="p-grid p-justify-center">
      <div className="p-col-12">
        <div className="feature-intro">
          <h1>Prevoting</h1>
        </div>
      </div>

      <div className="p-col-12 p-sm-12 p-md-6 p-col-align-center">
        <Query query={CandidateQuery}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
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
    </div>
  );
}

export default PreVote;
