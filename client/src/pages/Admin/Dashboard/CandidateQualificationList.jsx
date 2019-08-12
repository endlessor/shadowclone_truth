import React from "react";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { Accordion, AccordionTab } from 'primereact/accordion';

const CandidateQualificationList = ({ loading, data, toDetailQualification, candidate }) => {
  const qualifications = data.candidateQualifications || []

  const addNewQualification = () => {
    toDetailQualification({
      name: "",
      detail: "",
      summary: "",
      years: 0,
      rank: 1,
      candidateId: candidate.id
    });
  };

  const onQualificationSelect = e => {
    toDetailQualification(e.data)
  };

  return (
    <Accordion>
      <AccordionTab header={`Qualification (${qualifications.length})`}>
        <DataTable
          responsive
          loading={loading}
          value={qualifications}
          footer={
            <div className="p-clearfix">
              <Button
                style={{ float: "right" }}
                label="Add"
                icon="pi pi-plus"
                onClick={addNewQualification}
              />
            </div>
          }
          selectionMode="single"
          onRowSelect={onQualificationSelect}
          resizableColumns
          reorderableColumns
        >
          <Column field="name" header="Name" sortable />
          <Column field="summary" header="Summary" sortable />
          <Column field="detail" header="Detail" sortable />
          <Column field="years" header="Years" sortable />
          <Column field="rank" header="Rank" sortable />
        </DataTable>
      </AccordionTab>
    </Accordion>
  );
}

export default CandidateQualificationList
