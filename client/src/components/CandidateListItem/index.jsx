import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Card } from "primereact/card";

import CandidateShape from "../../types/candidate";

import TextItem from "../TextItem";
import Avatar from "../Avatar";
import Rating from "../Rating";

import "./CandidateListItem.style.scss";

const CandidateListItem = ({ data, updateVote }) => {
  return (
    <Card className="candidate_card">
      <div className="p-grid candidate_card__content">
        <Link className="p-col-fixed" to={`/candidate/${data.id}`}>
          <Avatar url={data.photo} alt="avatar" voteType={data.vote_type} />
        </Link>
        <div className="p-col">
          <div className="p-grid">
            <div className="p-col-12">
              <h4>
                {data.name} ({data.party})
              </h4>
            </div>
            <div className="p-col-3">
              <TextItem label={"AGE"} value={data.age} />
            </div>
            <div className="p-col-4">
              <TextItem label="POLLS" value={`${data.latest_poll || 0}%`} />
            </div>
            <div className="p-col-4">
              <TextItem label="VS" value={`${data.latest_odds || 0}%`} />
            </div>
            <div className="p-col-12">
              <span>{data.bio_summary}</span>
            </div>
            <div className="p-col-12">
              <Link to={`/candidate/${data.id}`}>more info</Link>
              <span className="pi pi-chevron-right" />
            </div>
          </div>
        </div>
        <div className="p-col-12" style={{ borderTop: "dashed 1px gray" }}>
          <Rating voteType={data.vote_type} updateVote={updateVote} />
        </div>
      </div>
    </Card>
  );
};

CandidateListItem.propTypes = {
  data: CandidateShape.isRequired,
  updateVote: PropTypes.func.isRequired
};

export default CandidateListItem;
