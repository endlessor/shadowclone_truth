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

const PositionForm = ({ data, loading, position, toDetailCandidate }) => {
  const [curPosition, setCurPosition] = useState(position)
  const [isNew, setIsNew] = useState(false)
  const positions = data.positions || []

  useEffect(() => {
    setCurPosition(position)
  }, [position])

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

  return (
    <div className="p-grid p-fluid">
      {!position.id && (
        <div className="" style={{ display: "flex" }}>
          <div className="p-col-6">
            <RadioButton inputId="rb1" name="isNew" value={!isNew}
              onChange={(e) => setIsNew(!e.value)} checked={!isNew} />
            <label htmlFor="rb1" className="p-radiobutton-label">Add Existing Position</label>
          </div>
          <div className="p-col-6">
            <RadioButton inputId="rb2" name="isNew" value={isNew}
              onChange={(e) => setIsNew(e.value)} checked={isNew} />
            <label htmlFor="rb2" className="p-radiobutton-label">Create New Position</label>
          </div>
        </div>
      )}
      {!position.id && !isNew && (
        <div>
          <div className="p-col-4" style={{ padding: ".75em" }}>
            <label htmlFor="positionList">select position</label>
          </div>
          {loading && <ProgressSpinner />}
          {!loading && (
            <div className="p-col-8" style={{ padding: ".5em" }}>
              <Dropdown
                id="positionList"
                value={curPosition}
                options={positions}
                onChange={(e) => setCurPosition(e.value)}
                optionLabel="name"
                placeholder="Select a Position" />
            </div>
          )}
        </div>
      )}
      <div className="p-col-4" style={{ padding: ".75em" }}>
        <label htmlFor="name">name</label>
      </div>
      <div className="p-col-8" style={{ padding: ".5em" }}>
        <InputText
          id="name"
          onChange={e => updateProperty("name", e.target.value)}
          value={curPosition.name}
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
          onChange={(e) => updateProperty({ "detail": e.target.value })} autoResize={true} />
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
      <Fieldset legend="Topic" >
        <QueryContainer query={TOPICS}>
          <TopicForm topicId={curPosition.topicId} assignTopic={assignTopic} />
        </QueryContainer>
      </Fieldset>

      <div className="ui-dialog-buttonpane p-clearfix">
        <Button label="Back" onClick={toDetailCandidate} />
      </div>
    </div>
  )
}

export default PositionForm