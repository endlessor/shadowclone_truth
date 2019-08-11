import React, { useState, useEffect } from 'react'
import { InputText } from "primereact/inputtext";
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import ProgressSpinner from '../../../../components/ProgressSpinner';
import { createNotification } from '../../../../config/notification'
import { DeleteQualification, CreateQualification, UpdateQualification } from '../../mutations';

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
    const { years, ...rest } = curQualification;
    createQualification({
      variables: { data: {
        ...rest, years: parseInt(years)
      }}
    }).then(res => toDetailCandidate())
      .catch(err => createNotification('error', err.message))
  }

  const handleUpdateQualification = (updateQualification) => {
    const { id, __typename, years, ...rest } = curQualification;
    updateQualification({
      variables: { 
        data: { ...rest, years: parseInt(years) },
        where: { id }
      }
    }).then(res => toDetailCandidate())
      .catch(err => createNotification('error', err.message))
  }

  const RemoveQualification = ({deleteQualification, loading}) => {
    if (loading) return <ProgressSpinner />
    return (
      <Button label="Remove" className="right-space-20" icon="pi pi-times"
        onClick={() => handleDeleteQualification(deleteQualification)} />
    )
  }

  const UpdateCurrentQualification = ({ updateQualification, loading }) => {
    if (loading) return <ProgressSpinner />
    return (
      <Button label="Save" icon="pi pi-save"
        onClick={() => handleUpdateQualification(updateQualification)} />
    )
  }

  const AddQualification = ({ createQualification, loading }) => {
    if (loading) return <ProgressSpinner />
    return (
      <Button label="Save" icon="pi pi-save"
        onClick={() => handleAddQualification(createQualification)} />
    )
  }

  return (
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
        <label htmlFor="qdetail">detail</label>
      </div>
      <div className="p-col-8" style={{ padding: ".5em" }}>
        <InputTextarea
          id="qdetail"
          rows={3}
          value={curQualification.detail}
          onChange={(e) => updateProperty("detail", e.target.value)} autoResize={true} />
      </div>
      
      <div className="p-col-4" style={{ padding: ".5em" }}>
        <Button label="Back" icon="pi pi-check" onClick={toDetailCandidate} />
      </div>
      <div className="p-col-8 flex" style={{ padding: ".5em" }}>
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
    </div>
  )
}

export default QualificationForm