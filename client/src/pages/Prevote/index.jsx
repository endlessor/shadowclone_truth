import React from "react";
import { Query } from "react-apollo";
import { DataView } from "primereact/dataview";

import CandidateListItem from "../../components/CandidateListItem";
import { CandidateQuery } from "../../queries/candidate";

function PreVote() {
  const itemTemplate = (candidate, layout) => {
    if (!candidate) {
      return null;
    }

    if (layout === "list") {
      return <CandidateListItem data={candidate} />;
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
