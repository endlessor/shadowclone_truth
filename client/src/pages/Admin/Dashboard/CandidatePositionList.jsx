import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import ProgressSpinner from "../../../components/ProgressSpinner"

const CandidatePositionList = ({ loading, data, toDetailPosition }) => {
  const [displayDialog, setDisplayDialog] = useState(false);
  const [position, setPosition] = useState({});

  const positions = data.candidatePositions || []

  const updateProperty = (property, value) => {
    setPosition({
      ...position,
      [property]: value
    });
  };

  const addNewPosition = () => {
    setPosition({
      name: ""
    });
    setDisplayDialog(true);
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
    </React.Fragment>
  );
}

export default CandidatePositionList
