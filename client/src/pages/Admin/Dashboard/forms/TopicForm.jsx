import React, { useState, useEffect } from 'react'
import { InputText } from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import ProgressSpinner from '../../../../components/ProgressSpinner';
import { CATEGORY_TYPE } from "../../../../config"
import { UpdateTopic, CreateTopic } from '../../mutations';
import { createNotification } from '../../../../config/notification'

const TopicForm = ({ data, loading, topicId, assignTopic }) => {
  const [topic, setTopic] = useState({})
  const [isNewTopic, setIsNewTopic] = useState(false)
  const topics = data.topics || []

  useEffect(() => {
    if (topicId) {
      setTopic(topics.filter(t => t.id === topicId)[0])
    }
  }, [topics])

  const onChangeTopic = (selectedTopic) => {
    setTopic(selectedTopic)
    assignTopic(selectedTopic.id)
  }
  
  const addNewTopic = (checked) => {
    setIsNewTopic(checked)
    if (checked) setTopic({ name: '', category: null })
  }

  const updateProperty = (property, value) => {
    setTopic({
      ...topic,
      [property]: value
    });
  };

  const handleDeleteTopic = () => {
    assignTopic('')
    setTopic({ name: '', category: null })
  }

  const handleUpdateTopic = (updateTopic) => {
    updateTopic({
      variables: {
        data: { name: topic.name, category: topic.category },
        where: { id: topic.id }
      }
    })
      .catch(err => createNotification('error', err.message))
  }

  const handleCreateTopic = (createTopic) => {
    createTopic({
      variables: {
        data: { name: topic.name, category: topic.category }
      }
    }).then(result => {
      assignTopic(result.data.createTopic.id)
    })
      .catch(err => createNotification('error', err.message))
  }

  const UpdateTopicButton = ({ updateTopic, loading }) => {
    if (loading) return <ProgressSpinner />
    return (
      <Button
        icon="pi pi-save"
        className="p-button-raised p-button-primary"
        tooltip="Save Topic"
        tooltipOptions={{ position: 'top' }}
        onClick={() => handleUpdateTopic(updateTopic)} />
    )
  }

  const CreateTopicButton = ({ createTopic, loading }) => {
    if (loading) return <ProgressSpinner />
    return (
      <Button
        icon="pi pi-save"
        className="p-button-raised p-button-primary"
        tooltip="Save Topic"
        tooltipOptions={{ position: 'top' }}
        onClick={() => handleCreateTopic(createTopic)} />
    )
  }

  return (
    <div className="p-grid p-fluid">
      <div className="p-col-4">
        <Checkbox inputId="cb1"
          onChange={(e) => addNewTopic(e.checked)} checked={isNewTopic} />
        <label htmlFor="cb1" className="p-checkbox-label">New Topic</label>
      </div>
      <div className="p-col-8 align-right">
        <Button
          icon="pi pi-trash"
          className="p-button-raised p-button-danger right-space-20"
          tooltip="Delete Topic"
          tooltipOptions={{ position: 'top' }}
          onClick={handleDeleteTopic} />
        {topic.id && (
          <UpdateTopic>
            <UpdateTopicButton />
          </UpdateTopic>
        )}
        {!topic.id && (
          <CreateTopic>
            <CreateTopicButton />
          </CreateTopic>
        )}
      </div>
      {!isNewTopic && (
        <React.Fragment>
          <div className="p-col-4" style={{ padding: ".75em" }}>
            <label htmlFor="topicList">select topic</label>
          </div>
          {loading && <ProgressSpinner />}
          {!loading && (
            <div className="p-col-8" style={{ padding: ".5em" }}>
              <Dropdown
                id="topicList"
                value={topic}
                options={topics}
                onChange={(e) => onChangeTopic(e.value)}
                optionLabel="name"
                placeholder="Select a Topic" />
            </div>
          )}
        </React.Fragment>
      )}
      <div className="p-col-4" style={{ padding: ".75em" }}>
        <label htmlFor="topic_name">name</label>
      </div>
      <div className="p-col-8" style={{ padding: ".5em" }}>
        <InputText
          id="topic_name"
          onChange={e => updateProperty("name", e.target.value)}
          value={topic.name}
        />
      </div>

      <div className="p-col-4" style={{ padding: ".75em" }}>
        <label htmlFor="category">category</label>
      </div>
      <div className="p-col-8" style={{ padding: ".5em" }}>
        <Dropdown
          id="category"
          options={CATEGORY_TYPE}
          onChange={e => updateProperty("category", e.target.value.value)}
          optionLabel="name"
          value={{name: "health", value: topic.category}}
          placeholder="Select a Category"
        />
      </div>
    </div>
  )
}

export default TopicForm