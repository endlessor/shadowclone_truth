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

const Dashboard = props => {
  return (
    <div className="p-grid">
      <section className="p-col-12">
        <QueryContainer query={ADMIN_TOTAL_ATTRIBUTES}>
          <AdminHeader />
        </QueryContainer>
      </section>
      <section className="p-col-12">
        <QueryContainer query={ADMIN_CANDIDATES}>
          <CandidateList />
        </QueryContainer>
      </section>
      <section className="p-col-12">
        <QueryContainer query={ADMIN_POSITIONS}>
          <PositionList />
        </QueryContainer>
      </section>
    </div>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
