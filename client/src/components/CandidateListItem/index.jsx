import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Panel } from "primereact/panel";
import { Card } from "primereact/card";
import { ToggleButton } from "primereact/togglebutton";

import CandidateShape from "../../types/candidate";

import "./CandidateListItem.style.scss";

const CandidateListItem = ({ data, updateVote }) => {
  const [collapsed, setCollapsed] = useState(true);

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleUpdateVote = e => {
    if (e.value) {
      updateVote({
        variables: {
          userId: "cjyg2k9vkhc3b0b19tkwr49fu",
          candidateId: data.id,
          voteType: e.target.name
        }
      });
    }
  };

  return (
    <Card className="candidate_card">
      <Link className="p-grid" to={`/candidate/${data.id}`}>
        <div className="p-col-4">
          <img src={data.photo} alt="avatar" />
        </div>
        <div className="p-col-8">
          <h4>{data.name}</h4>
          <span>({data.party})</span>
        </div>
      </Link>
      <div className="p-grid candidate_card__content">
        <div className="p-col-3">
          <span>{data.state}</span>
        </div>
        <div className="p-col-3">
          <span>{data.latest_poll}</span>
        </div>
        <div className="p-col-3">
          <span>{data.latest_odds}</span>
        </div>
        <div className="p-col-3">
          <i className="pi pi-chevron-down" onClick={onCollapse} />
        </div>
      </div>
      <Panel
        toggleable
        collapsed={collapsed}
        onToggle={onCollapse}
        collapseIcon=""
        expandIcon=""
      >
        <div className="p-grid">
          <div className="p-col p-fluid">
            <ToggleButton
              onIcon={"pi pi-star-o"}
              offIcon={"pi pi-star"}
              onLabel="Top"
              offLabel="Top"
              name="TOP"
              onChange={handleUpdateVote}
            />
          </div>
          <div className="p-col p-fluid">
            <ToggleButton
              onIcon={"pi pi-star-o"}
              offIcon={"pi pi-star"}
              onLabel="Favorites"
              offLabel="Favorites"
              name="FAVORITE"
              onChange={handleUpdateVote}
            />
          </div>
          <div className="p-col p-fluid">
            <ToggleButton
              onIcon={"pi pi-star-o"}
              offIcon={"pi pi-star"}
              onLabel="Compromises"
              offLabel="Compromises"
              name="COMPROMISE"
              onChange={handleUpdateVote}
            />
          </div>
          <div className="p-col p-fluid">
            <ToggleButton
              onIcon={"pi pi-star-o"}
              offIcon={"pi pi-star"}
              onLabel="vetos"
              offLabel="vetos"
              name="VETO"
              onChange={handleUpdateVote}
            />
          </div>
          <div className="p-col p-fluid">
            <ToggleButton
              onIcon={"pi pi-star-o"}
              offIcon={"pi pi-star"}
              onLabel="Unknowns"
              offLabel="Unknowns"
              name="UNKNOWNS"
              onChange={handleUpdateVote}
            />
          </div>
        </div>
      </Panel>
    </Card>
  );
};

CandidateListItem.propTypes = {
  data: CandidateShape.isRequired,
  updateVote: PropTypes.func.isRequired
};

export default CandidateListItem;
