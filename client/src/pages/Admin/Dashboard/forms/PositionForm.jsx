import React, { useState, useEffect } from 'react'
import { InputText } from "primereact/inputtext";
import { RadioButton } from 'primereact/radiobutton';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Fieldset } from 'primereact/fieldset';
import ProgressSpinner from '../../../../components/ProgressSpinner';
import { QueryContainer, TOPICS } from '../../../../queries';
import TopicForm from "./TopicForm";
import { DeleteCandidatePosition, CreateCandidatePosition, CreatePosition } from '../../mutations';
import { createNotification } from '../../../../config/notification'

const PositionForm = ({ data, loading, position, toDetailCandidate, candidate }) => {
  const [curPosition, setCurPosition] = useState(position)
  const [isNew, setIsNew] = useState(true)
  const positions = data.positions || []

  useEffect(() => {
    setCurPosition(position)
  }, [position])

  const onCreateNewPosition = () => {
    setCurPosition({
      name: "",
      detail: "",
      summary: "",
      topicId: ""
    })
    setIsNew(true)
  }

  const updateProperty = (property, value) => {
    setCurPosition({
      ...curPosition,
      [property]: value
    });
  };

  const assignTopic = (topicId) => {
    setCurPosition({
      ...curPosition,
      topicId
    });
  }

  const TopicName = ({data, loading}) => {
    if (loading) return <ProgressSpinner />
    if (data.topics && data.topics.length > 0) {
      const curTop = data.topics.filter(t => t.id === curPosition.topicId)
      if (curTop.length > 0) return curTop[0].name
    }
    return null
  }

  const handleDeleteCandidatePosition = (deleteCandidatePosition) => {
    deleteCandidatePosition({
      variables: {
        candidateId: candidate.id, positionId: position.id
      }
    }).then(res => toDetailCandidate())
      .catch(err => createNotification('error', err.message))
  }

  const handleAddCandidatePosition = (createCandidatePosition) => {
    createCandidatePosition({
      variables: {
        candidateId: candidate.id, positionId: curPosition.id
      }
    }).then(res => toDetailCandidate())
      .catch(err => createNotification('error', err.message))
  }

  const handleNewPosition = (createPosition) => {
    createPosition({
      variables: { data: {
        name: curPosition.name,
        detail: curPosition.detail,
        summary: curPosition.summary,
        topicId: curPosition.topicId
      }}
    }).then(res => {
      createNotification('success', `New position ${curPosition.name} created successfully, Please add it to candidate`)
      setCurPosition(res.data.createPosition)
      setIsNew(false)
    })
    .catch(err => createNotification('error', err.message))
  }

  const RemoveCandidatePosition = ({deleteCandidatePosition, loading}) => {
    if (loading) return <ProgressSpinner />
    return (
      <Button label="Remove" className="right-space-20" icon="pi pi-times"
        onClick={() => handleDeleteCandidatePosition(deleteCandidatePosition)} />
    )
  }

  const AddCandidatePosition = ({ createCandidatePosition, loading }) => {
    if (loading) return <ProgressSpinner />
    return (
      <Button label="Add" icon="pi pi-check"
        onClick={() => handleAddCandidatePosition(createCandidatePosition)} />
    )
  }

  const CreateNewPosition = ({ createPosition, loading }) => {
    if (loading) return <ProgressSpinner />
    return (
      <Button label="Create" icon="pi pi-plus"
        onClick={() => handleNewPosition(createPosition)} />
    )
  }

  return (
    <div className="p-grid p-fluid">
      {!position.id && (
        <React.Fragment>
          <div className="p-col-6">
            <RadioButton inputId="rb1" name="isNew" value={false}
              onChange={(e) => setIsNew(e.value)} checked={!isNew} />
            <label htmlFor="rb1" className="p-radiobutton-label">Add Existing Position</label>
          </div>
          <div className="p-col-6">
            <RadioButton inputId="rb2" name="isNew" value={true}
              onChange={onCreateNewPosition} checked={isNew} />
            <label htmlFor="rb2" className="p-radiobutton-label">Create New Position</label>
          </div>
        </React.Fragment>
      )}
      {!position.id && !isNew && (
        <React.Fragment>
          <div className="p-col-4" style={{ padding: ".75em" }}>
            <label htmlFor="positionList">select position</label>
          </div>
          <div className="p-col-8" style={{ padding: ".5em" }}>
            {loading && <ProgressSpinner />}
            {!loading && (
              <Dropdown
                id="positionList"
                value={curPosition}
                options={positions}
                onChange={(e) => setCurPosition(e.value)}
                optionLabel="name"
                placeholder="Select a Position" />
            )}
          </div>
        </React.Fragment>
      )}
      <div className="p-col-4" style={{ padding: ".75em" }}>
        <label htmlFor="name">name</label>
      </div>
      <div className="p-col-8" style={{ padding: ".5em" }}>
        <InputText
          id="name"
          onChange={e => updateProperty("name", e.target.value)}
          value={curPosition.name}
          disabled={!isNew || position.id}
        />
      </div>
      <div className="p-col-4" style={{ padding: ".75em" }}>
        <label htmlFor="summary">summary</label>
      </div>
      <div className="p-col-8" style={{ padding: ".5em" }}>
        <InputText
          id="summary"
          onChange={e => updateProperty("summary", e.target.value)}
          value={curPosition.summary}
          disabled={!isNew || position.id}
        />
      </div>
      <div className="p-col-4" style={{ padding: ".75em" }}>
        <label htmlFor="detail">detail</label>
      </div>
      <div className="p-col-8" style={{ padding: ".5em" }}>
        <InputTextarea
          id="detail"
          rows={3}
          value={curPosition.detail}
          disabled={!isNew || position.id}
          onChange={(e) => updateProperty("detail", e.target.value)} autoResize={true} />
      </div>
      <div className="p-col-4" style={{ padding: ".75em" }}>
        <label htmlFor="topic">topic</label>
      </div>
      <div className="p-col-8" style={{ padding: ".5em" }}>
        {curPosition.topicId && (
          <QueryContainer query={TOPICS}>
            <TopicName />
          </QueryContainer>
        )}
      </div>

      {isNew && !position.id && (
        <Fieldset legend="Topic" >
          <QueryContainer query={TOPICS}>
            <TopicForm topicId={curPosition.topicId} assignTopic={assignTopic} />
          </QueryContainer>
        </Fieldset>
      )}
      
      <div className="p-col-4" style={{ padding: ".5em" }}>
        <Button label="Back" icon="pi pi-check" onClick={toDetailCandidate} />
      </div>
      <div className="p-col-8 flex" style={{ padding: ".5em" }}>
        {position.id && (
          <DeleteCandidatePosition candidateId={candidate.id}>
            <RemoveCandidatePosition />
          </DeleteCandidatePosition>
        )}
        {!position.id && !isNew && (
          <CreateCandidatePosition candidateId={candidate.id}>
            <AddCandidatePosition />
          </CreateCandidatePosition>
        )}
        {!position.id && isNew && (
          <CreatePosition>
            <CreateNewPosition />
          </CreatePosition>
        )}
      </div>
    </div>
  )
}

export default PositionForm