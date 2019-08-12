import React from "react";
import { Chart } from 'primereact/chart';
import ProgressSpinner from "../../../components/ProgressSpinner"

const AdminHeader = ({ loading, data }) => {
  const voteAttributes = data.voteAttributes || {};
  const lineStylesData = {
    labels: [
      `Top Picks (${voteAttributes.topCount})`,
      `Favorites (${voteAttributes.favoriteCount})`,
      `Compromises (${voteAttributes.compromiseCount})`,
      `Vetos (${voteAttributes.vetoCount})`,
      `Unknowns (${voteAttributes.unknownCount})`
    ],
    datasets: [
      {
        label: `Prevote Analysis (Prevotes: ${voteAttributes.prevotes}, users: ${voteAttributes.users})`,
        data: [
          voteAttributes.average_top,
          voteAttributes.average_favorite,
          voteAttributes.average_compromise,
          voteAttributes.average_veto,
          voteAttributes.average_unknown
        ],
        fill: false,
        backgroundColor: '#66BB6A',
        borderColor: '#66BB6A'
      }
    ]
  };
  const options = {
    scales: {
      xAxes: [{
          barPercentage: 0.4,
          maxBarThickness: 35,
          minBarLength: 10
      }]
    }
  };
  return (
    <div className="admin-chart">
      <h1>Indecision 2020 Administration</h1>
      <div className="content-section implementation">
        {loading && <ProgressSpinner />}
        {/* {!loading && <Chart type="line" data={lineStylesData} />} */}
        {!loading && <Chart type="bar" options={options} data={lineStylesData} />}
      </div>
    </div>
  )
}

export default AdminHeader