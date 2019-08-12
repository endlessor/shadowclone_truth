import React, { useState, useEffect } from 'react'
import { InputText } from "primereact/inputtext";
import { InputTextarea } from 'primereact/inputtextarea';
import { Fieldset } from 'primereact/fieldset';
import ProgressSpinner from '../../../../components/ProgressSpinner';
import { QueryContainer, TOPICS } from '../../../../queries';
import TopicForm from "./TopicForm";
import { CreatePosition, DeletePosition, UpdatePosition } from '../../mutations';
import { createNotification } from '../../../../config/notification'
import { LoadingButton } from "../../../../components/Common/Buttons";

const PositionForm = ({ position, onHide }) => {
  const [curPosition, setCurPosition] = useState(position)

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

  const TopicName = ({ data, loading }) => {
    if (loading) return <ProgressSpinner />
    if (data.topics && data.topics.length > 0) {
      const curTop = data.topics.filter(t => t.id === curPosition.topicId)
      if (curTop.length > 0) return curTop[0].name
    }
    return null
  }

  const handleDeletePosition = (deletePosition) => {
    deletePosition({
      variables: { id: position.id }
    }).then(res => onHide())
      .catch(err => createNotification('error', err.message))
  }

  const handleCreatePosition = (createPosition) => {
    createPosition({
      variables: {
        data: {
          ...curPosition
        }
      }
    }).then(res => onHide())
      .catch(err => createNotification('error', err.message))
  }

  const handleUpdatePosition = (updatePosition) => {
    const { id, __typename, ...rest } = curPosition;
    updatePosition({
      variables: {
        data: { ...rest },
        where: { id }
      }
    }).then(res => onHide())
      .catch(err => createNotification('error', err.message))
  }

  const RemovePosition = ({ deletePosition, loading }) => (
    <LoadingButton
      width="100px"
      loading={loading}
      label="Delete"
      icon="pi pi-times"
      className="right-space-20"
      onClick={() => handleDeletePosition(deletePosition)}
    />
  )

  const AddPosition = ({ createPosition, loading }) => (
    <LoadingButton
      width="100px"
      loading={loading}
      label="Create"
      icon="pi pi-save"
      bcolor="#34A835"
      onClick={() => handleCreatePosition(createPosition)}
    />
  )

  const UpdateCurrentPosition = ({ updatePosition, loading }) => (
    <LoadingButton
      width="100px"
      loading={loading}
      label="Save"
      icon="pi pi-save"
      bcolor="#34A835"
      onClick={() => handleUpdatePosition(updatePosition)}
    />
  )

  return (
    <div className="position-form">
      <div className="p-grid p-fluid">
        <div className="p-col-4" style={{ padding: ".75em" }}>
          <label htmlFor="pname">name</label>
        </div>
        <div className="p-col-8" style={{ padding: ".5em" }}>
          <InputText
            id="pname"
            onChange={e => updateProperty("name", e.target.value)}
            value={curPosition.name}
          />
        </div>
        <div className="p-col-4" style={{ padding: ".75em" }}>
          <label htmlFor="psummary">summary</label>
        </div>
        <div className="p-col-8" style={{ padding: ".5em" }}>
          <InputText
            id="psummary"
            onChange={e => updateProperty("summary", e.target.value)}
            value={curPosition.summary}
          />
        </div>
        <div className="p-col-4" style={{ padding: ".75em" }}>
          <label htmlFor="pdetail">detail</label>
        </div>
        <div className="p-col-8" style={{ padding: ".5em" }}>
          <InputTextarea
            id="pdetail"
            rows={3}
            value={curPosition.detail}
            onChange={(e) => updateProperty("detail", e.target.value)} autoResize={true} />
        </div>
        <div className="p-col-4" style={{ padding: ".75em" }}>
          <label htmlFor="ptopic">topic</label>
        </div>
        <div className="p-col-8" style={{ padding: ".5em" }}>
          {curPosition.topicId && (
            <QueryContainer query={TOPICS}>
              <TopicName />
            </QueryContainer>
          )}
        </div>
      </div>
      <div className="bottom-btns">
        {position.id && (
          <React.Fragment>
            <DeletePosition>
              <RemovePosition />
            </DeletePosition>
            <UpdatePosition>
              <UpdateCurrentPosition />
            </UpdatePosition>
          </React.Fragment>
        )}
        {!position.id && (
          <CreatePosition>
            <AddPosition />
          </CreatePosition>
        )}
      </div>
      <br />
      <Fieldset legend="Topic" >
        <QueryContainer query={TOPICS}>
          <TopicForm topicId={curPosition.topicId} assignTopic={assignTopic} />
        </QueryContainer>
      </Fieldset>
    </div>
  )
}

export default PositionForm