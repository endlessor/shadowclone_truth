import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Panel } from "primereact/panel";
import { Card } from "primereact/card";
import { ToggleButton } from "primereact/togglebutton";

import CandidateShape from "../../types/candidate";

import "./CandidateListItem.style.scss";
import TextItem from "../TextItem";
import Avatar from "../Avatar";

const CandidateListItem = ({ data, updateVote }) => {
  const [collapsed, setCollapsed] = useState(true);

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Card className="candidate_card">
      <div className="p-grid candidate_card__content">
        <Link className="p-col-fixed" to={`/candidate/${data.id}`}>
          <Avatar url={data.photo} alt="avatar" />
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
              <Link to={`/candidate/${data.id}`}>more info</Link>
              <span className="pi pi-chevron-right" />
            </div>
            <div className="p-col-3">
              <i className="pi pi-chevron-down" onClick={onCollapse} />
            </div>
          </div>
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
              onChange={updateVote}
            />
          </div>
          <div className="p-col p-fluid">
            <ToggleButton
              onIcon={"pi pi-thumbs-up"}
              offIcon={"pi pi-thumbs-up"}
              onLabel="Favorite"
              offLabel="Favorite"
              name="FAVORITE"
              onChange={updateVote}
            />
          </div>
          <div className="p-col p-fluid">
            <ToggleButton
              onIcon={"pi pi-star-o"}
              offIcon={"pi pi-star"}
              onLabel="Compromise"
              offLabel="Compromise"
              name="COMPROMISE"
              onChange={updateVote}
            />
          </div>
          <div className="p-col p-fluid">
            <ToggleButton
              onIcon={"pi pi-ban"}
              offIcon={"pi pi-ban"}
              onLabel="Veto"
              offLabel="Veto"
              name="VETO"
              onChange={updateVote}
            />
          </div>
          <div className="p-col p-fluid">
            <ToggleButton
              onIcon={"pi pi-question-circle"}
              offIcon={"pi pi-question-circle"}
              onLabel="TBD"
              offLabel="TBD"
              name="UNKNOWNS"
              onChange={updateVote}
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
