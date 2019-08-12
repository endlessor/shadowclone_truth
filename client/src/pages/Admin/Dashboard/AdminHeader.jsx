import React from "react";
import { Chart } from 'primereact/chart';
import ProgressSpinner from "../../../components/ProgressSpinner"

const AdminHeader = ({ loading, data }) => {
  const voteAttributes = data.voteAttributes || {};
  const lineStylesData = {
    labels: [
      '',
      `Top Picks (${voteAttributes.topCount})`,
      `Favorites (${voteAttributes.favoriteCount})`,
      `Compromises (${voteAttributes.compromiseCount})`,
      `Vetos (${voteAttributes.vetoCount})`,
      `Unknowns (${voteAttributes.unknownCount})`,
      ''
    ],
    datasets: [
      {
        label: `Total Prevote Analysis (Prevotes: ${voteAttributes.prevotes}, users: ${voteAttributes.users})`,
        data: [
          0,
          voteAttributes.average_top,
          voteAttributes.average_favorite,
          voteAttributes.average_compromise,
          voteAttributes.average_veto,
          voteAttributes.average_unknown,
          0
        ],
        fill: false,
        backgroundColor: '#66BB6A',
        borderColor: '#66BB6A'
      }
    ]
  };
  return (
    <div className="admin-chart">
      <h1>Truce Administration</h1>
      <div className="content-section implementation">
        {loading && <ProgressSpinner />}
        {!loading && <Chart type="line" data={lineStylesData} />}
      </div>
    </div>
  )
}

export default AdminHeader