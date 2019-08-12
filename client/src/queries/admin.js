import { gql } from "apollo-boost";
import {
  candidateFragment,
  positionFragment,
  topicFragment,
  userFragment,
  qualificationFragment,
} from "./fragments"

export const AdminTotalUsers = gql`
  {
    users {
      ...user
    }
  }
  ${userFragment}
`;

export const ADMIN_TOTAL_ATTRIBUTES = gql`
  {
    voteAttributes {
      prevotes
      users
      topCount
      favoriteCount
      compromiseCount
      vetoCount
      unknownCount
      average_top
      average_favorite
      average_compromise
      average_veto
      average_unknown
    }
  }
`;

export const ADMIN_CANDIDATES = gql`
  {
    candidatesWithVotes {
      candidate {
        ...candidate
      }
      tops
      favorites
      compromises
      vetos
    }
  }
  ${candidateFragment}
`;

export const ADMIN_POSITIONS = gql`
  {
    positionsWithLikes {
      position {
        ...position
      }
      likes
      dislikes
    }
  }
  ${positionFragment}
`;

export const POSITIONS = gql`
  {
    positions {
      ...position
    }
  }
  ${positionFragment}
`

export const QUALIFICATIONS = gql`
  {
    qualifications {
      ...qualification
    }
  }
  ${qualificationFragment}
`

export const TOPICS = gql`
  {
    topics {
      ...topic
    }
  }
  ${topicFragment}
`;

export const CREATE_CANDIDATE = gql`
  mutation createCandidate(
    $name: String!
    $age: Int
    $party: String!
    $state: String!
    $gender: Gender
    $current_office: String!
    $bio_summary: String
    $latest_poll: Float
    $latest_odds: Float
    $file: Upload
  ) {
    createCandidate(
      name: $name
      age: $age
      party: $party
      state: $state
      gender: $gender
      current_office: $current_office
      bio_summary: $bio_summary
      latest_poll: $latest_poll
      latest_odds: $latest_odds
      file: $file
    ) {
      ...candidate
    }
  }
  ${candidateFragment}
`;

export const UPDATE_CANDIDATE = gql`
  mutation updateCandidate(
    $id: ID!
    $name: String!
    $age: Int
    $party: String!
    $state: String!
    $gender: Gender
    $current_office: String!
    $bio_summary: String
    $latest_poll: Float
    $latest_odds: Float
    $file: Upload
  ) {
    updateCandidate(
      id: $id
      name: $name
      age: $age
      party: $party
      state: $state
      gender: $gender
      current_office: $current_office
      bio_summary: $bio_summary
      latest_poll: $latest_poll
      latest_odds: $latest_odds
      file: $file
    ) {
      ...candidate
    }
  }
  ${candidateFragment}
`;

export const DELETE_CANDIDATE = gql`
  mutation deleteCandidate($id: ID!) {
    deleteCandidate(id: $id) {
      ...candidate
    }
  }
  ${candidateFragment}
`;

export const CREATE_POSITION = gql`
  mutation createPosition($data: PositionCreateInput!) {
    createPosition(data: $data) {
      ...position
    }
  }
  ${positionFragment}
`;

export const DELETE_POSITION = gql`
  mutation deletePosition($id: ID!) {
    deletePosition(id: $id) {
      ...position
    }
  }
  ${positionFragment}
`;

export const UPDATE_POSITION = gql`
  mutation updatePosition(
    $data: PositionUpdateInput!
    $where: PositionWhereUniqueInput!
  ) {
    updatePosition(data: $data, where: $where) {
      ...position
    }
  }
  ${positionFragment}
`;

export const CREATE_QUALIFICATION = gql`
  mutation createQualification($data: QualificationCreateInput!) {
    createQualification(data: $data) {
      ...qualification
    }
  }
  ${qualificationFragment}
`;

export const DELETE_QUALIFICATION = gql`
  mutation deleteQualification($id: ID!) {
    deleteQualification(id: $id) {
      ...qualification
    }
  }
  ${qualificationFragment}
`;

export const UPDATE_QUALIFICATION = gql`
  mutation updateQualification(
    $data: QualificationUpdateInput!
    $where: QualificationWhereUniqueInput!
  ) {
    updateQualification(data: $data, where: $where) {
      ...qualification
    }
  }
  ${qualificationFragment}
`;

export const CREATE_TOPIC = gql`
  mutation createTopic($data: TopicCreateInput!) {
    createTopic(data: $data) {
      ...topic
    }
  }
  ${topicFragment}
`;

export const DELETE_TOPIC = gql`
  mutation deleteTopic($where: TopicWhereUniqueInput!) {
    deleteTopic(where: $where) {
      ...topic
    }
  }
  ${topicFragment}
`;

export const UPDATE_TOPIC = gql`
  mutation updateTopic(
    $data: TopicUpdateInput!
    $where: TopicWhereUniqueInput!
  ) {
    updateTopic(data: $data, where: $where) {
      ...topic
    }
  }
  ${topicFragment}
`;

export const CREATE_CANDIDATE_POSITION = gql`
  mutation createCandidatePosition($candidateId: ID!, $positionId: ID!) {
    createCandidatePosition(candidateId: $candidateId, positionId: $positionId) {
      ...position
    }
  }
  ${positionFragment}
`;

export const DELETE_CANDIDATE_POSITION = gql`
  mutation deleteCandidatePosition($candidateId: ID!, $positionId: ID!) {
    deleteCandidatePosition(candidateId: $candidateId, positionId: $positionId) {
      ...position
    }
  }
  ${positionFragment}
`;