import { gql } from "apollo-boost";

export const candidateFragment = gql`
  fragment candidate on Candidate {
    id
    name
    photo
    party
    state
    age
    current_office
    latest_poll
    latest_odds
    prevote_score
    bio_summary
    vote_type
  }
`

export const positionFragment = gql`
  fragment position on Position {
    id
    name
    summary
    topicId
    detail
    like_type
  }
`

export const qualificationFragment = gql`
  fragment qualification on Qualification {
    id
    name
    summary
    detail
    years
    rank
    candidateId
    like_type
  }
`

export const topicFragment = gql`
  fragment topic on Topic {
    id
    name
    category
  }
`

export const userFragment = gql`
  fragment user on User {
    id
    name
    email
    gender
    role
  }
`

export const candidatePositionFragment = gql`
  fragment candidatePosition on CandidatePosition {
    id
    positionId
    candidateId
    time
    link
    rank
    latest
  }
`