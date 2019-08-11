import React from "react";
import { Card } from "primereact/card";
import ProgressSpinner from "../../../components/ProgressSpinner"

const AdminHeader = ({ loading, data }) => {
  if (loading) return <ProgressSpinner />;
  const voteAttributes = data.voteAttributes;

  if (!voteAttributes) return null;
  return (
    <div className="p-grid">
      <div className="p-md-3 p-col-6">
        <Card
          title="Prevotes"
          subTitle={voteAttributes.prevotes.toString()}
        />
      </div>
      <div className="p-md-3 p-col-6">
        <Card title="Users" subTitle={voteAttributes.users.toString()} />
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
}

export default AdminHeader