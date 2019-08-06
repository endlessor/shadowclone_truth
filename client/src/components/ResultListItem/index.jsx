import React from "react";
import { Link } from "react-router-dom";
import { Card } from "primereact/card";
import Avatar from "../Avatar";
import TextItem from "../TextItem";

function ResultListItem({ data }) {
  return (
    <Card>
      <div className="p-grid p-align-center">
        <Link className="p-col-4" to={`/voter-reason/candidate/${data.id}`}>
          <Avatar url={data.photo} alt="avatar" label={data.vote_type} />
        </Link>
        <div className="p-col-8">
          <h4>{data.name}</h4>
          <div className="p-grid">
            <div className="p-col-4">
              <TextItem label="POLLS" value={`${data.latest_poll}%`} />
            </div>
            <div className="p-col-4">
              <TextItem label="VS.TRUMP" value={`${data.latest_odds}%`} />
            </div>
            <div className="p-col-4">
              <TextItem label="PREVOTES" value={`${data.prevote_score}%`} />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

ResultListItem.propTypes = {};

export default ResultListItem;
