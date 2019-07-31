import React from "react";
import { Query } from "react-apollo";
import { ProgressSpinner } from "primereact/progressspinner";
import { Card } from "primereact/card";

import { AdminTotalUsers, AdminTotalAttributes } from "../../../queries";
import CandidateList from "./CandidateList";
import PositionList from "./PositionList";

const Dashboard = props => {
  return (
    <div className="p-grid">
      <section className="p-col-12">
        <Query query={AdminTotalUsers} fetchPolicy="network-only">
          {({ loading: loadingUsers, data: { users } }) => (
            <Query query={AdminTotalAttributes} fetchPolicy="network-only">
              {({ loading: loadingAttributes, data: { voteAttributes } }) => {
                if (loadingUsers || loadingAttributes)
                  return <ProgressSpinner />;
                return (
                  <div className="p-grid">
                    <div className="p-md-3 p-col-6">
                      <Card
                        title="Prevotes"
                        subTitle={voteAttributes.prevotes.toString()}
                      />
                    </div>
                    <div className="p-md-3 p-col-6">
                      <Card title="Users" subTitle={users.length.toString()} />
                    </div>
                    <div className="p-md-3 p-col-6">
                      <Card
                        title="Top Picks"
                        subTitle={voteAttributes.topCount.toString()}
                      />
                    </div>
                    <div className="p-md-3 p-col-6">
                      <Card
                        title="Favorites"
                        subTitle={voteAttributes.favoriteCount.toString()}
                      />
                    </div>
                    <div className="p-md-2 p-col-6">
                      <Card
                        title="Compromises"
                        subTitle={voteAttributes.compromiseCount.toString()}
                      />
                    </div>
                    <div className="p-md-2 p-col-6">
                      <Card
                        title="Vetos"
                        subTitle={voteAttributes.vetoCount.toString()}
                      />
                    </div>
                    <div className="p-md-2 p-col-6">
                      <Card
                        title="Average Top Picks"
                        subTitle={voteAttributes.average_top.toString()}
                      />
                    </div>
                    <div className="p-md-2 p-col-6">
                      <Card
                        title="Average Favorites"
                        subTitle={voteAttributes.average_favorite.toString()}
                      />
                    </div>
                    <div className="p-md-2 p-col-6">
                      <Card
                        title="Average Compromises"
                        subTitle={voteAttributes.average_compromise.toString()}
                      />
                    </div>
                    <div className="p-md-2 p-col-6">
                      <Card
                        title="Average Vetos"
                        subTitle={voteAttributes.average_veto.toString()}
                      />
                    </div>
                  </div>
                );
              }}
            </Query>
          )}
        </Query>
      </section>
      <section className="p-col-12">
        <CandidateList />
      </section>
      <section className="p-col-12">
        <PositionList />
      </section>
    </div>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
