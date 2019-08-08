import React from "react";
import { Query } from "react-apollo";
import { DataView } from "primereact/dataview";
import { ProgressSpinner } from "primereact/progressspinner";

import { ResultListItem } from "../../components";
import { CandidateQuery } from "../../queries";

import "./Result.style.scss";

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
    <div className="p-col-12 p-sm-12 p-md-6 p-col-align-center result page">
      <div className="p-grid p-align-center">
        <div className="p-col-fixed">
          <span className="pi pi-external-link" />
        </div>
        <div className="p-col">
          <p className="result--description">
            Thanks for pre-voting! That was easy...
            <br />
            Here's how you rated the candidates:
          </p>
        </div>
      </div>
      <Query query={CandidateQuery} fetchPolicy="network-only">
        {({ loading, error, data: { candidates } }) => {
          if (loading) return <ProgressSpinner />;
          return (
            <DataView
              value={candidates}
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
