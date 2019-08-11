import React from "react";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";

const CandidatePositionList = ({ loading, data, toDetailPosition }) => {
  const positions = data.candidatePositions || []

  const addNewPosition = () => {
    toDetailPosition({
      name: "",
      detail: "",
      summary: "",
      topicId: ""
    });
  };

  const onPositionSelect = e => {
    toDetailPosition(e.data)
  };

  return (
    <React.Fragment>
      <DataTable
        lazy
        responsive
        loading={loading}
        value={positions}
        header={<h2 style={{ margin: 0 }}>Positions</h2>}
        selectionMode="single"
        onRowSelect={onPositionSelect}
      >
        <Column field="name" header="Position" sortable />
        <Column field="detail" header="Detail" sortable />
        <Column field="summary" header="Summary" sortable />
      </DataTable>
      <Button onClick={addNewPosition} label="Add Position" />
    </React.Fragment>
  );
}

export default CandidatePositionList
