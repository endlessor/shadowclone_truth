import React from "react";
import {
  QueryContainer,
  ADMIN_TOTAL_ATTRIBUTES,
  ADMIN_CANDIDATES,
  ADMIN_POSITIONS,
} from '../../../queries'
import CandidateList from "./CandidateList";
import PositionList from "./PositionList";
import AdminHeader from "./AdminHeader";
import "./style.scss"

const Dashboard = () => {
  return (
    <div className="p-grid admin-page">
      <section className="p-col-12 admin-header">
        <QueryContainer query={ADMIN_TOTAL_ATTRIBUTES} fetchPolicy="network-only" >
          <AdminHeader />
        </QueryContainer>
      </section>
      <div className="p-col-12 admin-section">
        <section className="p-col-12 admin-content">
          <QueryContainer query={ADMIN_CANDIDATES} fetchPolicy="network-only">
            <CandidateList />
          </QueryContainer>
        </section>
        <section className="p-col-12 admin-content">
          <QueryContainer query={ADMIN_POSITIONS} fetchPolicy="network-only">
            <PositionList />
          </QueryContainer>
        </section>
      </div>
    </div>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
