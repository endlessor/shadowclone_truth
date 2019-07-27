import React from "react";
import { Query } from "react-apollo";
import { DataView } from "primereact/dataview";
import { ProgressSpinner } from "primereact/progressspinner";

import { ResultListItem } from "../../components";
import { ResultQuery, UserVoteQuery } from "../../queries";

function Results() {
  const itemTemplate = (candidate, layout) => {
    if (!candidate) {
      return null;
    }

    if (layout === "list") {
      return <ResultListItem data={candidate} />;
    }
  };
  return (
    <div className="p-col-12 p-sm-12 p-md-6 p-col-align-center">
      <div className="p-grid p-align-center">
        <div className="p-col-fixed">
          <span className="pi pi-external-link" />
        </div>
        <div className="p-col">
          <p>
            Thanks for pre-voting! That was easy...
            <br />
            Here's how you rated the candidates:
          </p>
        </div>
      </div>
      <Query query={ResultQuery}>
        {({ loading: loadingCandidates, error, data: { candidates } }) => (
          <Query query={UserVoteQuery}>
            {({ loading: loadingVotes, error, data: { userVotes } }) => {
              if (loadingCandidates || loadingVotes) return <ProgressSpinner />;
              const candidatesWithVotes = candidates.map(candidate => {
                const userVote = userVotes.find(
                  vote => vote.candidateId === candidate.id
                );
                if (userVote) {
                  return {
                    ...candidate,
                    vote_type: userVote.vote_type.toLowerCase()
                  };
                } else {
                  return candidate;
                }
              });

              return (
                <DataView
                  value={candidatesWithVotes}
                  layout="list"
                  itemTemplate={itemTemplate}
                  rows={20}
                />
              );
            }}
          </Query>
        )}
      </Query>
    </div>
  );
}

Results.propTypes = {};

export default Results;
