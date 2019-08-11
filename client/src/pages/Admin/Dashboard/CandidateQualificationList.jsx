import React from "react";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";

const CandidateQualificationList = ({ loading, data, toDetailQualification, candidate }) => {
  const qualifications = data.candidateQualifications || []

  const addNewQualification = () => {
    toDetailQualification({
      name: "",
      detail: "",
      summary: "",
      years: 0,
      candidateId: candidate.id
    });
  };

  const onQualificationSelect = e => {
    toDetailQualification(e.data)
  };

  return (
    <React.Fragment>
      <DataTable
        lazy
        responsive
        loading={loading}
        value={qualifications}
        header={<h2 style={{ margin: 0 }}>Qualifications</h2>}
        selectionMode="single"
        onRowSelect={onQualificationSelect}
      >
        <Column field="name" header="Qualification" sortable />
        <Column field="summary" header="Summary" sortable />
        <Column field="years" header="Years" sortable />
        <Column field="detail" header="Detail" sortable />
      </DataTable>
      <Button onClick={addNewQualification} label="Add Qualification" />
    </React.Fragment>
  );
}

export default CandidateQualificationList
