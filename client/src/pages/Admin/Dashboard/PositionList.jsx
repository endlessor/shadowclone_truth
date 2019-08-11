import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import ProgressSpinner from "../../../components/ProgressSpinner"

const PositionList = ({ loading, data }) => {
  const [displayDialog, setDisplayDialog] = useState(false);
  const [position, setPosition] = useState(null);
  const positionsWithLikes = data.positionsWithLikes || []

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
    setPosition(Object.assign({}, e.data.position));
    setDisplayDialog(true);
  };

  return (
    <React.Fragment>
      <DataTable
        lazy
        rows={10}
        paginator
        responsive
        loading={loading}
        value={positionsWithLikes}
        header={<h2 style={{ margin: 0 }}>Positions</h2>}
        selectionMode="single"
        onRowSelect={onPositionSelect}
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
            <Button
              label="Delete"
              icon="pi pi-times"
              onClick={() => console.log('deletePosition')}
            />
            <Button label="Save" icon="pi pi-check" onClick={() => console.log('savePosition')} />
          </div>
        }
        onHide={() => setDisplayDialog(false)}
      >
        {position && (
          <div className="p-grid p-fluid">
            <div className="p-col-4" style={{ padding: ".75em" }}>
              <label htmlFor="name">Name</label>
            </div>
            <div className="p-col-8" style={{ padding: ".5em" }}>
              <InputText
                id="name"
                onChange={e => {
                  updateProperty("name", e.target.value);
                }}
                value={position.name}
              />
            </div>
            <div className="p-col-4" style={{ padding: ".75em" }}>
              <label htmlFor="topic">Topic</label>
            </div>
            {/* <div className="p-col-8" style={{ padding: ".5em" }}>
              <Dropdown
                id="topic"
                options={topics.topics}
                optionLabel="name"
                dataKey="id"
                placeholder="Select a topic"
                onChange={e => {
                  updateProperty("topic", e.value);
                }}
                value={position.topic}
              />
            </div> */}
          </div>
        )}
      </Dialog>
    </React.Fragment>
  );
}

export default PositionList
