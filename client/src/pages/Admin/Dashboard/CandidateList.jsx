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
  POSITIONS,
  CandidateQualificationsQuery
} from '../../../queries'
import CandidateQualificationList from './CandidateQualificationList';
import QualificationForm from "./forms/QualificationForm"

const CandidateList = ({ data, loading }) => {
  const [displayDialog, setDisplayDialog] = useState(false);
  const [candidate, setCandidate] = useState({});
  const [position, setPosition] = useState({})
  const [qualification, setQualification] = useState({})
  const [tabIdx, setTabIdx] = useState(0)
  const [seePosition, setSeePosition] = useState(true)
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
    setSeePosition(true)
    setTabIdx(1)
  }

  const toDetailQualification = (qualification) => {
    setQualification(qualification)
    setSeePosition(false)
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
                <React.Fragment>
                  <div>
                    <QueryContainer query={CandidatePositionsQuery} variables={{ candidateId: candidate.id }}>
                      <CandidatePostionList toDetailPosition={toDetailPosition} />
                    </QueryContainer>
                  </div>
                  <div>
                    <QueryContainer query={CandidateQualificationsQuery} variables={{ candidateId: candidate.id }}>
                      <CandidateQualificationList toDetailQualification={toDetailQualification} candidate={candidate} />
                    </QueryContainer>
                  </div>
                </React.Fragment>
              )}
            </TabPanel>
            <TabPanel headerStyle={{display: "none"}}>
              {seePosition && (
                <QueryContainer query={POSITIONS}>
                  <PositionForm position={position} toDetailCandidate={toDetailCandidate} candidate={candidate} />
                </QueryContainer>                
              )}
              {!seePosition && (
                <QualificationForm
                  qualification={qualification}
                  toDetailCandidate={toDetailCandidate}
                  candidate={candidate}
                />
              )}
            </TabPanel>
        </TabView>
      </Dialog>
    </React.Fragment>
  );
}

export default CandidateList