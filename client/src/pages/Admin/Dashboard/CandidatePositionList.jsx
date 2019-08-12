import React from "react";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { Accordion, AccordionTab } from 'primereact/accordion';

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
    <Accordion>
      <AccordionTab header={`Positions (${positions.length})`}>
        <DataTable
          responsive
          loading={loading}
          value={positions}
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
          selectionMode="single"
          onRowSelect={onPositionSelect}
          resizableColumns
          reorderableColumns
        >
          <Column field="name" header="Name" />
          <Column field="summary" header="Summary" />
          <Column field="detail" header="Detail" />
        </DataTable>
      </AccordionTab>
    </Accordion>
  );
}

export default CandidatePositionList
