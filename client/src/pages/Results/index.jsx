import React from "react";
import { Query } from "react-apollo";
import { DataView } from "primereact/dataview";
import { Button } from "primereact/button";

import { ResultListItem, ProgressSpinner } from "../../components";
import { CandidateWithVotePercenet as VoteResultQuery } from "../../queries";

import "./Result.style.scss";

function Results({ history }) {
  const itemTemplate = (candidate, layout) => {
    if (!candidate) {
      return null;
    }

    if (layout === "list") {
      return <ResultListItem data={candidate} />;
    }
  };
  return (
    <div className="p-col-12 p-sm-12 p-md-6 p-col-align-center result page">
      <div className="p-grid p-align-center result__header">
        <div className="p-col-fixed result__header--icon">
          <span className="pi pi-external-link" />
        </div>
        <div className="p-col">
          <p className="result__header--description">
            Thanks for pre-voting! That was easy...
            <br />
            Here's how you rated the candidates:
          </p>
        </div>
      </div>
      <div className="p-grid p-dir-rev">
        <div className="p-col-4 p-fluid">
          <Button label="Next" onClick={() => history.push("./final")} />
        </div>
      </div>
      <Query query={VoteResultQuery} fetchPolicy="network-only">
        {({ loading, error, data: { candidatesWithVotesPercent } }) => {
          if (loading) return <ProgressSpinner />;
          return (
            <DataView
              value={candidatesWithVotesPercent}
              layout="list"
              itemTemplate={itemTemplate}
              rows={20}
            />
          );
        }}
      </Query>
    </div>
  );
}

Results.propTypes = {};

export default Results;
