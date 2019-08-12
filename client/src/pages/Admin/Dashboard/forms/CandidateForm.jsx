import React, { useState, useEffect } from 'react'
import { InputText } from "primereact/inputtext";
import { FileUpload } from "primereact/fileupload";
import { Dropdown } from 'primereact/dropdown';
import { LoadingButton } from "../../../../components/Common/Buttons";
import { GENDER } from "../../../../config"
import SaveCandidateForm from "./SaveCandidateForm";
import {
  CreateCandidate,
  UpdateCandidate,
  DeleteCandidate
} from "../../mutations";
import { createNotification } from '../../../../config/notification'

const CandidateForm = ({ curCandidate, hideForm }) => {
  const [candidate, setCandidate] = useState(curCandidate)
  useEffect(() => {
    setCandidate(curCandidate)
  }, [curCandidate])

  console.log('candidate-------', candidate)
  const updateProperty = (property, value) => {
    setCandidate({
      ...candidate,
      [property]: value
    });
  };

  const handleDeleteCandidate = (deleteCandidate) => {
    if (!candidate.id) {
      hideForm()
      return
    }
    deleteCandidate({ variables: { id: candidate.id } })
      .then(result => hideForm())
      .catch(err => createNotification('error', err.message))
  }

  const getGenderName = (value) => {
    const gender = GENDER.filter(g => g.value === value)
    if (gender.length > 0) return gender[0].name
    return ""
  }

  const DeleteCandidateForm = ({ deleteCandidate, loading }) => (
    <LoadingButton
      width="100px"
      loading={loading}
      label="Delete"
      icon="pi pi-times"
      className="right-space-20"
      onClick={() => handleDeleteCandidate(deleteCandidate)}
    />
  )

  return (
    <div className="cand-form">
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

        {!candidate.id && (
          <React.Fragment>
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
          </React.Fragment>
        )}

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
            keyfilter="int"
            onChange={e => {
              updateProperty("age", e.target.value);
            }}
            value={candidate.age}
          />
        </div>

        <div className="p-col-4" style={{ padding: ".75em" }}>
          <label htmlFor="gender">Gender</label>
        </div>
        <div className="p-col-8" style={{ padding: ".5em" }}>
          <Dropdown
            id="gender"
            options={GENDER}
            onChange={e => updateProperty("gender", e.target.value.value)}
            optionLabel="name"
            value={{ name: getGenderName(candidate.gender), value: candidate.gender }}
            placeholder="Select a Gender"
          />
        </div>

        <div className="p-col-4" style={{ padding: ".75em" }}>
          <label htmlFor="poll">Latest Poll</label>
        </div>
        <div className="p-col-8" style={{ padding: ".5em" }}>
          <InputText
            id="poll"
            keyfilter="int"
            onChange={e => {
              updateProperty("latest_poll", e.target.value);
            }}
            value={candidate.latest_poll}
          />
        </div>

        <div className="p-col-4" style={{ padding: ".75em" }}>
          <label htmlFor="odds">Latest Odds</label>
        </div>
        <div className="p-col-8" style={{ padding: ".5em" }}>
          <InputText
            id="odds"
            keyfilter="int"
            onChange={e => {
              updateProperty("latest_odds", e.target.value);
            }}
            value={candidate.latest_odds}
          />
        </div>

        <div className="p-col-4" style={{ padding: ".75em" }}>
          <label htmlFor="age">Bio_summary</label>
        </div>
        <div className="p-col-8" style={{ padding: ".5em" }}>
          <InputText
            id="bio_summary"
            onChange={e => {
              updateProperty("bio_summary", e.target.value);
            }}
            value={candidate.bio_summary}
          />
        </div>
      </div>

      <div className="bottom-btns">
        <DeleteCandidate>
          <DeleteCandidateForm />
        </DeleteCandidate>
        {candidate.id && (
          <UpdateCandidate>
            <SaveCandidateForm candidate={candidate} hideForm={hideForm} />
          </UpdateCandidate>
        )}
        {!candidate.id && (
          <CreateCandidate>
            <SaveCandidateForm candidate={candidate} hideForm={hideForm} />
          </CreateCandidate>
        )}
      </div>
    </div>


  )
}

export default CandidateForm