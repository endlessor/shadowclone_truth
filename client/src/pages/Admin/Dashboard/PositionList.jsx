import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import PositionForm from "./forms/PositionForm";

const PositionList = ({ loading, data }) => {
  const [displayDialog, setDisplayDialog] = useState(false);
  const [position, setPosition] = useState(null);
  const [sortOrder, setSortOrder] = useState(1)
  const [sortField, setSortField] = useState("likes")
  const positionsWithLikes = data.positionsWithLikes || []

  const onSort = (e) => {
    setSortField(e.sortField)
    setSortOrder(e.sortOrder)
  }

  const addNewPosition = () => {
    setPosition({
      name: "",
      detail: "",
      summary: "",
      topicId: ""
    });
    setDisplayDialog(true)
  };

  const onPositionSelect = e => {
    setPosition(Object.assign({}, e.data.position));
    setDisplayDialog(true);
  };

  return (
    <React.Fragment>
      <DataTable
        rows={10}
        paginator
        responsive
        loading={loading}
        value={positionsWithLikes}
        header={<h2 style={{ margin: 0 }}>Positions ({positionsWithLikes.length})</h2>}
        selectionMode="single"
        onRowSelect={onPositionSelect}
        footer={
          <div className="p-clearfix">
            <Button
              style={{ float: "right" }}
              label="Add"
              icon="pi pi-plus"
              onClick={addNewPosition}
            />
          </div>
        }
        sortField={sortField}
        sortOrder={sortOrder}
        onSort={(e) => onSort(e)}
      >
        <Column field="position.name" header="Position" sortable />
        <Column field="likes" header="Likes" sortable />
        <Column field="dislikes" header="Dislikes" sortable />
      </DataTable>
      <Dialog
        visible={displayDialog}
        width="300px"
        header="Position Details"
        modal={true}
        footer={
          <div className="ui-dialog-buttonpane p-clearfix">
            <Button label="Close" icon="pi pi-check" onClick={() => setDisplayDialog(false)} />
          </div>
        }
        onHide={() => setDisplayDialog(false)}
      >
        {position && <PositionForm position={position} onHide={() => setDisplayDialog(false)} />}
      </Dialog>
    </React.Fragment>
  );
}

export default PositionList
