import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../Avatar";
import TextItem from "../TextItem";
import { VOTE_TYPE } from "../../config";

import "./ResultListItem.style.scss";

function ResultListItem({ data }) {
  return (
    <div className="result-list-item">
      <div className="p-grid">
        <Link
          className="p-col-fixed"
          to={`/voter-reason/candidate/${data.candidate.id}`}
        >
          <Avatar
            url={data.candidate.photo}
            alt="avatar"
            label={data.candidate.vote_type}
          />
        </Link>
        <div className="p-col">
          <h4>{data.candidate.name}</h4>
          <div className="p-grid result-list-item__values">
            <div className="p-col">
              <TextItem label={VOTE_TYPE.top} value={`${data.tops}%`} />
            </div>
            <div className="p-col">
              <TextItem
                label={VOTE_TYPE.favorite}
                value={`${data.favorites}%`}
              />
            </div>
            <div className="p-col">
              <TextItem
                label={VOTE_TYPE.compromise}
                value={`${data.compromises}%`}
              />
            </div>
            <div className="p-col">
              <TextItem label={VOTE_TYPE.veto} value={`${data.vetos}%`} />
            </div>
            <div className="p-col">
              <TextItem label={"TBD"} value={`${data.unknowns || 0}%`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ResultListItem.propTypes = {};

export default ResultListItem;
