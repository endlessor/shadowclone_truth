import React from 'react'
import { createNotification } from '../../../../config/notification'
import { LoadingButton } from "../../../../components/Common/Buttons";

export default function SaveCandidateForm({
  createCandidate,
  updateCandidate,
  loading,
  hideForm,
  candidate
}) {
  const { id, __typename, file, ...rest } = candidate;
  const photo = new Blob([file]);
  const handleSaveCandidate = () => {
    if (typeof updateCandidate !== typeof undefined) {
      updateCandidate({
        variables: {
          id: id,
          ...rest,
          age: parseInt(rest.age),
          latest_poll: parseFloat(rest.latest_poll),
          latest_odds: parseFloat(rest.latest_odds)
        }
      }).then(result => {
        hideForm()
      })
        .catch(err => createNotification('error', err.message))
    } else {
      createCandidate({
        variables: {
          ...rest,
          age: parseInt(rest.age),
          latest_poll: parseFloat(rest.latest_poll),
          latest_odds: parseFloat(rest.latest_odds),
          file: photo
        }
      }).then(result => {
        hideForm()
      })
        .catch(err => createNotification('error', err.message))
    }
  }

  return (
    <LoadingButton
      width="100px"
      bcolor="#34A835"
      loading={loading}
      label="Save"
      icon="pi pi-save"
      onClick={handleSaveCandidate}
    />
  )
}
