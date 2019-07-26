import React from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import { DataView } from "primereact/dataview";
import { ResultListItem } from "../../components";
import { ResultQuery } from "../../queries";

function Results(props) {
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
  );
}

Results.propTypes = {};

export default Results;
