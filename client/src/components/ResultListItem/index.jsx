import React from "react";
import { Card } from "primereact/card";

function ResultListItem({ data }) {
  return (
    <Card>
      <div className="p-grid p-align-center">
        <div className="p-col-4">
          <img src={data.photo} alt="avatar" />
        </div>
        <div className="p-col-8">
          <h4>{data.name}</h4>
          <div className="p-grid">
            <div className="p-col-4">
              <p>POLLS</p>
              <span>{data.latestPoll}</span>
            </div>
            <div className="p-col-4">
              <p>VS </p>
              <span>{data.oddsVsIncumbent}</span>
            </div>
            <div className="p-col-4">
              <p>PREVOTES</p>
              <span>{data.prevoteScore}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

ResultListItem.propTypes = {};

export default ResultListItem;
