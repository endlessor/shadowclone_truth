import React, { useState } from "react";
import PropTypes from "prop-types";
import { graphql, compose } from "react-apollo";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { FileUpload } from "primereact/fileupload";

import {
  AdminCandidatesQuery,
  AdminAddCandidate,
  AdminDeleteCandidate,
  AdminUpdateCandidate
} from "../../../queries";

function CandidateList(props) {
  const [newCandidate, setNewCandidate] = useState(false);
  const [displayDialog, setDisplayDialog] = useState(false);
  const [candidate, setCandidate] = useState(null);

  const saveCandidate = () => {
    const { addCandidate, updateCandidate } = props;
    const { id, __typename, file, ...rest } = candidate;
    if (newCandidate) {
      const photo = new Blob([file]);
      addCandidate({
        variables: {
          ...rest,
          age: parseInt(rest.age),
          file: photo
        }
      }).then(() => setDisplayDialog(false));
    } else {
      updateCandidate({
        variables: {
          data: { ...rest, age: parseInt(rest.age) },
          where: {
            id
          }
        }
      }).then(() => setDisplayDialog(false));
    }
  };

  const deleteCandidate = () => {
    const { deleteCandidate } = props;
    deleteCandidate({
      variables: {
        where: {
          id: candidate.id
        }
      }
    }).then(() => setDisplayDialog(false));
  };

  const updateProperty = (property, value) => {
    setCandidate({
      ...candidate,
      [property]: value
    });
  };

  const addNewCandidate = () => {
    setNewCandidate(true);
    setCandidate({
      name: "",
      party: "",
      state: "",
      current_office: "",
      age: 0
    });
    setDisplayDialog(true);
  };

  const onCandidateSelect = e => {
    setNewCandidate(false);
    setCandidate(Object.assign({}, e.data.candidate));
    setDisplayDialog(true);
  };

  const {
    candidates: { loading, candidatesWithVotes }
  } = props;
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
        footer={
          <div className="ui-dialog-buttonpane p-clearfix">
            <Button
              label="Delete"
              icon="pi pi-times"
              onClick={deleteCandidate}
            />
            <Button label="Save" icon="pi pi-check" onClick={saveCandidate} />
          </div>
        }
        onHide={() => setDisplayDialog(false)}
      >
        {candidate && (
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
                value={candidate.name}
              />
            </div>

            <div className="p-col-4" style={{ padding: ".75em" }}>
              <label htmlFor="photo">Photo</label>
            </div>
            <div className="p-col-8" style={{ padding: ".5em" }}>
              <FileUpload
                id="photo"
                name="file"
                accept="image/*"
                mode="basic"
                onSelect={e => {
                  updateProperty("file", e.files[0]);
                }}
                value={candidate.photo}
              />
            </div>

            <div className="p-col-4" style={{ padding: ".75em" }}>
              <label htmlFor="party">Party</label>
            </div>
            <div className="p-col-8" style={{ padding: ".5em" }}>
              <InputText
                id="party"
                onChange={e => {
                  updateProperty("party", e.target.value);
                }}
                value={candidate.party}
              />
            </div>

            <div className="p-col-4" style={{ padding: ".75em" }}>
              <label htmlFor="state">State</label>
            </div>
            <div className="p-col-8" style={{ padding: ".5em" }}>
              <InputText
                id="state"
                onChange={e => {
                  updateProperty("state", e.target.value);
                }}
                value={candidate.state}
              />
            </div>

            <div className="p-col-4" style={{ padding: ".75em" }}>
              <label htmlFor="current_office">Current Office</label>
            </div>
            <div className="p-col-8" style={{ padding: ".5em" }}>
              <InputText
                id="current_office"
                onChange={e => {
                  updateProperty("current_office", e.target.value);
                }}
                value={candidate.current_office}
              />
            </div>

            <div className="p-col-4" style={{ padding: ".75em" }}>
              <label htmlFor="age">Age</label>
            </div>
            <div className="p-col-8" style={{ padding: ".5em" }}>
              <InputText
                id="age"
                onChange={e => {
                  updateProperty("age", e.target.value);
                }}
                value={candidate.age}
              />
            </div>
          </div>
        )}
      </Dialog>
    </React.Fragment>
  );
}

CandidateList.propTypes = {};

export default compose(
  graphql(AdminCandidatesQuery, {
    name: "candidates",
    options: { fetchPolicy: "network-only" }
  }),
  graphql(AdminAddCandidate, {
    name: "addCandidate",
    options: { refetchQueries: [{ query: AdminCandidatesQuery }] }
  }),
  graphql(AdminUpdateCandidate, {
    name: "updateCandidate",
    options: { refetchQueries: [{ query: AdminCandidatesQuery }] }
  }),
  graphql(AdminDeleteCandidate, {
    name: "deleteCandidate",
    options: {
      update: (proxy, { data: { deleteCandidate } }) => {
        const { candidatesWithVotes } = proxy.readQuery({
          query: AdminCandidatesQuery
        });
        proxy.writeQuery({
          query: AdminCandidatesQuery,
          data: {
            candidatesWithVotes: candidatesWithVotes.filter(
              ({ candidate }) => candidate.id !== deleteCandidate.id
            )
          }
        });
      }
    }
  })
)(CandidateList);
