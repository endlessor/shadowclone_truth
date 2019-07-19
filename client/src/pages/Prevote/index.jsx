import React, { useState, useEffect } from "react";
import { DataView } from "primereact/dataview";

import CandidateListItem from "../../components/CandidateListItem";

function PreVote() {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    setCandidates([
      {
        id: 123,
        name: "Cory Booker",
        image: "https://i.pravatar.cc/100",
        party: "democrats",
        state: "de",
        office: "n/a",
        age: 76,
        gender: "male",
        latest_poll: "76%",
        latest_odds: "30%"
      },
      {
        id: 124,
        name: "Kamala Haris",
        image: "https://i.pravatar.cc/100",
        party: "democrats",
        state: "de",
        office: "n/a",
        age: 76,
        gender: "female",
        latest_poll: "76%",
        latest_odds: "30%"
      },
      {
        id: 125,
        name: "Bernie Sanders",
        image: "https://i.pravatar.cc/100",
        party: "democrats",
        state: "de",
        office: "n/a",
        age: 76,
        gender: "male",
        latest_poll: "76%",
        latest_odds: "30%"
      },
      {
        id: 126,
        name: "Elizabeth Warren",
        image: "https://i.pravatar.cc/100",
        party: "democrats",
        state: "de",
        office: "n/a",
        age: 76,
        gender: "female",
        latest_poll: "76%",
        latest_odds: "30%"
      }
    ]);
  }, [candidates]);

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

export default PreVote;
