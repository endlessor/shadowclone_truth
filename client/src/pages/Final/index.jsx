import React from "react";
import { Query } from "react-apollo";
import { DataView } from "primereact/dataview";

import { FinalListItem, ProgressSpinner } from "../../components";
// import { AdminCandidatesQuery as VoteResultQuery } from "../../queries";

import "./Final.style.scss";

function Final({ history }) {
  const itemTemplate = (candidate, layout) => {
    if (!candidate) {
      return null;
    }

    if (layout === "list") {
      return (
        <FinalListItem
          data={candidate}
          onInfo={() => history.push(`/candidate/${candidate.candidate.id}`)}
          onRate={() =>
            history.push(`/voter-reason/candidate/${candidate.candidate.id}`)
          }
        />
      );
    }
  };
  return (
    <div className="p-col-12 p-sm-12 p-md-6 p-col-align-center final page">
      <div className="p-grid p-align-center final__header">
        <div className="p-col-12">
          <h2>
            <span className="pi pi-external-link" />
            Indecision 2020
          </h2>
        </div>
        <div className="p-col-12 final__header--description">
          <span>
            Indecision 2020 is a 501c3 non-profit dedicated to informing and
            empowering voters. Learn more here.
            <br />
            <br />
            Welcome back! Thanks for telling us WHO you'd vote for. Next, click
            "Rate this candidate" to say WHY you like or dislike them (or to
            change your pre-vote).
          </span>
        </div>
      </div>
      {/* <Query query={VoteResultQuery} fetchPolicy="network-only">
        {({ loading, error, data: { candidatesWithVotes } }) => {
          if (loading) return <ProgressSpinner />;
          return (
            <DataView
              value={candidatesWithVotes}
              layout="list"
              itemTemplate={itemTemplate}
              rows={20}
            />
          );
        }}
      </Query> */}
    </div>
  );
}

Final.propTypes = {};

export default Final;
