import React from 'react'
import { Button } from "primereact/button";
import { createNotification } from '../../../../config/notification'
import ProgressSpinner from "../../../../components/ProgressSpinner"

export default function SaveCandidateForm ({
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
      updateCandidate({ variables: {
          id: id,
          ...rest,
          age: parseInt(rest.age),
          file: photo
        }
      }).then(result => {
        hideForm()
        createNotification(
          'success',
          `Candidate "${candidate.title}" has been updated successfully`
        )
      })
      .catch(err => createNotification('error', err.message))
    } else {
      createCandidate({ variables: {
        ...rest,
        age: parseInt(rest.age),
        file: photo
      }}).then(result => {
        hideForm()
        createNotification(
          'success',
          `Candidate "${candidate.title}" has been created successfully`
        )
      })
      .catch(err => createNotification('error', err.message))
    }
  }

  if (loading) return <ProgressSpinner />
  return (
    <Button label="Save" icon="pi pi-check" onClick={handleSaveCandidate} />
  )
}
