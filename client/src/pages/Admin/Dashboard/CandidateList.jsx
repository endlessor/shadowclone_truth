import React, { useState } from 'react'
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import {TabView,TabPanel} from 'primereact/tabview';
import CandidateForm from "./forms/CandidateForm";
import PositionForm from "./forms/PositionForm";
import CandidatePostionList from "./CandidatePositionList"
import { 
  QueryContainer,
  CandidatePositionsQuery,
  POSITIONS
} from '../../../queries'

const CandidateList = ({ data, loading }) => {
  const [displayDialog, setDisplayDialog] = useState(false);
  const [candidate, setCandidate] = useState({});
  const [position, setPosition] = useState({})
  const [tabIdx, setTabIdx] = useState(0)
  const candidatesWithVotes = data.candidatesWithVotes || []

  const showDialog = () => {
    setTabIdx(0);
    setDisplayDialog(true);
  }

  const addNewCandidate = () => {
    setCandidate({
      name: "",
      party: "",
      state: "",
      current_office: "",
      age: 0,
      bio_summary: ""
    });
    showDialog();
  };

  const onCandidateSelect = e => {
    setCandidate(Object.assign({}, e.data.candidate));
    showDialog();
  };

  const toDetailPosition = (position) => {
    setPosition(position)
    setTabIdx(1)
  }

  const toDetailCandidate = () => {
    setPosition({})
    setTabIdx(0)
  }

  return (
    <React.Fragment>
      <DataTable
        lazy
        rows={10}
        paginator
        responsive
        loading={loading}
        value={candidatesWithVotes}
        header={<h2 style={{ margin: 0 }}>Candidates</h2>}
        footer={
          <div className="p-clearfix">
            <Button
              style={{ float: "left" }}
              label="Add"
              icon="pi pi-plus"
              onClick={addNewCandidate}
            />
          </div>
        }
        selectionMode="single"
        onRowSelect={onCandidateSelect}
      >
        <Column field="candidate.name" header="Name" sortable />
        <Column field="tops" header="Top Picks" sortable />
        <Column field="favorites" header="Favorites" sortable />
        <Column field="compromises" header="Compromises" sortable />
        <Column field="vetos" header="Vetos" sortable />
      </DataTable>

      {candidate && (
        <Dialog
          visible={displayDialog}
          width="300px"
          header="Candidate Details"
          modal={true}
          onHide={() => setDisplayDialog(false)}
          footer={
            <div className="ui-dialog-buttonpane p-clearfix">
              <Button
                label="Close"
                icon="pi pi-times"
                onClick={() => setDisplayDialog(false)}
              />
            </div>
          }
        >
          <TabView activeIndex={tabIdx} onTabChange={(e) => setTabIdx(e.index)}>
              <TabPanel headerStyle={{display: "none"}}>
                <CandidateForm curCandidate={candidate} hideForm={() => setDisplayDialog(false)} />
                {candidate.id && (
                  <div>
                    <QueryContainer query={CandidatePositionsQuery} variables={{ candidateId: candidate.id }}>
                      <CandidatePostionList toDetailPosition={toDetailPosition} />
                    </QueryContainer>
                  </div>
                )}
              </TabPanel>
              <TabPanel headerStyle={{display: "none"}}>
                <QueryContainer query={POSITIONS}>
                  <PositionForm position={position} toDetailCandidate={toDetailCandidate} />
                </QueryContainer>
              </TabPanel>
              <TabPanel headerStyle={{display: "none"}}>
                  Content III
              </TabPanel>
          </TabView>
        </Dialog>
      )}
    </React.Fragment>
  );
}

export default CandidateList