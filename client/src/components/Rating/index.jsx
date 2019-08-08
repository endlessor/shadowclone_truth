import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import RateButton from "./RateButton";
import { VOTE_TYPE } from "../../config";

import "./Rating.style.scss";

function Rating({ voteType, updateVote }) {
  return (
    <div className="p-grid rating">
      <div className="p-col-2 p-fluid">
        <RateButton
          icon="pi pi-star-o"
          label="Top"
          className={classNames({ rating__top: voteType === VOTE_TYPE.top })}
          onClick={updateVote.bind(this, VOTE_TYPE.top)}
        />
      </div>
      <div className="p-col-2 p-fluid">
        <RateButton
          icon="pi pi-thumbs-up"
          label="Favorite"
          className={classNames({
            rating__favorite: voteType === VOTE_TYPE.favorite
          })}
          onClick={updateVote.bind(this, VOTE_TYPE.favorite)}
        />
      </div>
      <div className="p-col-4 p-fluid">
        <RateButton
          icon="pi pi-star-o"
          label="Compromise"
          className={classNames({
            rating__compromise: voteType === VOTE_TYPE.compromise
          })}
          onClick={updateVote.bind(this, VOTE_TYPE.compromise)}
        />
      </div>
      <div className="p-col-2 p-fluid">
        <RateButton
          icon="pi pi-ban"
          label="Veto"
          className={classNames({ rating__veto: voteType === VOTE_TYPE.veto })}
          onClick={updateVote.bind(this, VOTE_TYPE.veto)}
        />
      </div>
      <div className="p-col-2 p-fluid">
        <RateButton
          icon="pi pi-question-circle"
          label="TBD"
          className={classNames({
            rating__unknowns: voteType === VOTE_TYPE.unknowns
          })}
          onClick={updateVote.bind(this, VOTE_TYPE.unknowns)}
        />
      </div>
    </div>
  );
}

Rating.propTypes = {
  voteType: PropTypes.string,
  updateVote: PropTypes.func.isRequired
};

export default Rating;
