import React from "react";
import PropTypes from "prop-types";
import { DataView } from "primereact/dataview";
import ResultListItem from "../../components/ResultListItem";

const candidates = [
  {
    name: "Joe Biden",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    latestPoll: "25%",
    oddsVsIncumbent: "45%",
    prevoteScore: "35%"
  }
];
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
    <div className="p-grid p-justify-center">
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

        <DataView
          value={candidates}
          layout="list"
          itemTemplate={itemTemplate}
          rows={20}
        />
      </div>
    </div>
  );
}

Results.propTypes = {};

export default Results;
