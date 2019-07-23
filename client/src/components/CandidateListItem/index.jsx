import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Panel } from "primereact/panel";
import { Card } from "primereact/card";
import { ToggleButton } from "primereact/togglebutton";

import CandidateShape from "../../types/candidate";

import "./CandidateListItem.style.scss";

const CandidateListItem = ({ data }) => {
  const [collapsed, setCollapsed] = useState(true);

  const onCollapse = () => {
    setCollapsed(!collapsed);
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
            />
          </div>
          <div className="p-col p-fluid">
            <ToggleButton
              onIcon={"pi pi-star-o"}
              offIcon={"pi pi-star"}
              onLabel="Favorites"
              offLabel="Favorites"
            />
          </div>
          <div className="p-col p-fluid">
            <ToggleButton
              onIcon={"pi pi-star-o"}
              offIcon={"pi pi-star"}
              onLabel="Compromises"
              offLabel="Compromises"
            />
          </div>
          <div className="p-col p-fluid">
            <ToggleButton
              onIcon={"pi pi-star-o"}
              offIcon={"pi pi-star"}
              onLabel="vetos"
              offLabel="vetos"
            />
          </div>
          <div className="p-col p-fluid">
            <ToggleButton
              onIcon={"pi pi-star-o"}
              offIcon={"pi pi-star"}
              onLabel="Unknowns"
              offLabel="Unknowns"
            />
          </div>
        </div>
      </Panel>
    </Card>
  );
};

CandidateListItem.propTypes = {
  data: CandidateShape.isRequired
};

export default CandidateListItem;
