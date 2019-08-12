import React, { useState, useEffect } from 'react'
import { InputText } from "primereact/inputtext";
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { createNotification } from '../../../../config/notification'
import { DeleteQualification, CreateQualification, UpdateQualification } from '../../mutations';
import { LoadingButton } from "../../../../components/Common/Buttons";

const QualificationForm = ({ qualification, toDetailCandidate, candidate }) => {
  const [curQualification, setCurQualification] = useState(qualification)

  useEffect(() => {
    setCurQualification(qualification)
  }, [qualification])

  const updateProperty = (property, value) => {
    setCurQualification({
      ...curQualification,
      [property]: value
    });
  };

  const handleDeleteQualification = (deleteQualification) => {
    deleteQualification({
      variables: { id: qualification.id }
    }).then(res => toDetailCandidate())
      .catch(err => createNotification('error', err.message))
  }

  const handleAddQualification = (createQualification) => {
    const { years, rank, ...rest } = curQualification;
    createQualification({
      variables: {
        data: {
          ...rest, years: parseInt(years), rank: parseInt(rank)
        }
      }
    }).then(res => toDetailCandidate())
      .catch(err => createNotification('error', err.message))
  }

  const handleUpdateQualification = (updateQualification) => {
    const { id, __typename, years, rank, ...rest } = curQualification;
    updateQualification({
      variables: {
        data: { ...rest, years: parseInt(years), rank: parseInt(rank) },
        where: { id }
      }
    }).then(res => toDetailCandidate())
      .catch(err => createNotification('error', err.message))
  }

  const RemoveQualification = ({ deleteQualification, loading }) => (
    <LoadingButton
      width="100px"
      loading={loading}
      label="Delete"
      icon="pi pi-times"
      className="right-space-20"
      onClick={() => handleDeleteQualification(deleteQualification)}
    />
  )

  const UpdateCurrentQualification = ({ updateQualification, loading }) => (
    <LoadingButton
      width="100px"
      loading={loading}
      label="Save"
      icon="pi pi-save"
      bcolor="#34A835"
      onClick={() => handleUpdateQualification(updateQualification)}
    />
  )

  const AddQualification = ({ createQualification, loading }) => (
    <LoadingButton
      width="100px"
      loading={loading}
      label="Create"
      icon="pi pi-save"
      bcolor="#34A835"
      onClick={() => handleAddQualification(createQualification)}
    />
  )

  return (
    <div className="qualification-form">
      <div className="p-grid p-fluid">
        <div className="p-col-4" style={{ padding: ".75em" }}>
          <label htmlFor="qname">name</label>
        </div>
        <div className="p-col-8" style={{ padding: ".5em" }}>
          <InputText
            id="qname"
            onChange={e => updateProperty("name", e.target.value)}
            value={curQualification.name}
          />
        </div>
        <div className="p-col-4" style={{ padding: ".75em" }}>
          <label htmlFor="qsummary">summary</label>
        </div>
        <div className="p-col-8" style={{ padding: ".5em" }}>
          <InputText
            id="qsummary"
            onChange={e => updateProperty("summary", e.target.value)}
            value={curQualification.summary}
          />
        </div>
        <div className="p-col-4" style={{ padding: ".75em" }}>
          <label htmlFor="qyears">years</label>
        </div>
        <div className="p-col-8" style={{ padding: ".5em" }}>
          <InputText
            id="qyears"
            keyfilter="pint"
            onChange={e => updateProperty("years", e.target.value)}
            value={curQualification.years}
          />
        </div>
        <div className="p-col-4" style={{ padding: ".75em" }}>
          <label htmlFor="qrank">rank</label>
        </div>
        <div className="p-col-8" style={{ padding: ".5em" }}>
          <InputText
            id="qrank"
            keyfilter="pint"
            onChange={e => updateProperty("rank", e.target.value)}
            value={curQualification.rank}
          />
        </div>
        <div className="p-col-4" style={{ padding: ".75em" }}>
          <label htmlFor="qdetail">detail</label>
        </div>
        <div className="p-col-8" style={{ padding: ".5em" }}>
          <InputTextarea
            id="qdetail"
            rows={3}
            value={curQualification.detail}
            onChange={(e) => updateProperty("detail", e.target.value)} autoResize={true} />
        </div>
      </div>
      <div className="bottom-btns">
        {qualification.id && (
          <React.Fragment>
            <DeleteQualification candidateId={candidate.id}>
              <RemoveQualification />
            </DeleteQualification>
            <UpdateQualification candidateId={candidate.id}>
              <UpdateCurrentQualification />
            </UpdateQualification>
          </React.Fragment>
        )}
        {!qualification.id && (
          <CreateQualification candidateId={candidate.id}>
            <AddQualification />
          </CreateQualification>
        )}
      </div>
      <Button
        label="Back"
        icon="pi pi-angle-left"
        onClick={toDetailCandidate}
        className="btn-back p-button-raised p-button-secondary"
      />
    </div>
  )
}

export default QualificationForm