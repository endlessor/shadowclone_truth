import React, { useState, useEffect } from 'react'
import { InputText } from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';
import { CATEGORY_TYPE } from "../../../../config"
import { UpdateTopic, CreateTopic } from '../../mutations';
import { createNotification } from '../../../../config/notification'
import { LoadingButton } from "../../../../components/Common/Buttons";

const TopicForm = ({ data, loading, topicId, assignTopic }) => {
  const [topic, setTopic] = useState({})
  const [isNewTopic, setIsNewTopic] = useState(false)
  const topics = data.topics || []

  useEffect(() => {
    const result = topics.filter(t => t.id === topicId)
    if (result.length > 0) setTopic(result[0])
    else setTopic({})
  }, [topicId, loading, topics])

  const onChangeTopic = (selectedTopic) => {
    setTopic(selectedTopic)
    assignTopic(selectedTopic.id)
  }

  const addNewTopic = (checked) => {
    setIsNewTopic(checked)
    if (checked) setTopic({ name: '', category: null })
  }

  const getTopicName = (value) => {
    const cats = CATEGORY_TYPE.filter(c => c.value === value)
    if (cats.length > 0) return cats[0].name
    return ""
  }

  const updateProperty = (property, value) => {
    setTopic({
      ...topic,
      [property]: value
    });
  };

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

  const UpdateTopicButton = ({ updateTopic, loading }) => (
    <LoadingButton
      label="Save Topic"
      icon="pi pi-save"
      loading={loading}
      width="130px"
      onClick={() => handleUpdateTopic(updateTopic)}
    />
  )

  const CreateTopicButton = ({ createTopic, loading }) => (
    <LoadingButton
      label="Create Topic"
      icon="pi pi-save"
      loading={loading}
      width="130px"
      onClick={() => handleCreateTopic(createTopic)}
    />
  )

  return (
    <div className="p-grid p-fluid">
      <div className="p-col-4">
        <Checkbox inputId="cb1"
          onChange={(e) => addNewTopic(e.checked)} checked={isNewTopic} />
        <label htmlFor="cb1" className="p-checkbox-label">New</label>
      </div>
      <div className="p-col-8">
        <div className="align-right">
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
      </div>
      {!isNewTopic && (
        <React.Fragment>
          <div className="p-col-4" style={{ padding: ".75em" }}>
            <label htmlFor="topicList">select topic</label>
          </div>
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
          value={{ name: getTopicName(topic.category), value: topic.category }}
          placeholder="Select a Category"
        />
      </div>
    </div>
  )
}

export default TopicForm