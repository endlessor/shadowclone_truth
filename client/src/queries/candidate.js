import { gql } from "apollo-boost";
import {
  candidateFragment,
  positionFragment,
  qualificationFragment
} from "./fragments";

export const CandidateQuery = gql`
  {
    candidates {
      ...candidate
    }
  }
  ${candidateFragment}
`;

export const CandidateWithVotePercenet = gql`
  {
    candidatesWithVotesPercent {
      candidate {
        ...candidate
      }
      tops
      favorites
      compromises
      vetos
      unknowns
    }
  }
  ${candidateFragment}
`;

export const CandidateQualificationsQuery = gql`
  query qualifications($candidateId: ID!) {
    candidateQualifications(candidateId: $candidateId) {
      ...qualification
    }
  }
  ${qualificationFragment}
`;

export const CandidatePositionsQuery = gql`
  query positions($candidateId: ID!) {
    candidatePositions(candidateId: $candidateId) {
      ...position
    }
  }
  ${positionFragment}
`;

export const PositionQuery = gql`
  query position($id: ID!) {
    position(id: $id) {
      ...position
    }
  }
  ${positionFragment}
`;

export const QualificationQuery = gql`
  query qualification($id: ID!) {
    qualification(id: $id) {
      ...qualification
    }
  }
  ${qualificationFragment}
`;

export const UserVoteMutation = gql`
  mutation createUserVote($candidateId: ID!, $voteType: VoteType) {
    createUserVote(candidateId: $candidateId, voteType: $voteType) {
      id
      vote_type
      time
      latest
    }
  }
`;

export const PositionLikeMutation = gql`
  mutation createUserPositionLike(
    $candidateId: ID!
    $positionId: ID!
    $like: LikeType
  ) {
    createUserPositionLike(
      candidateId: $candidateId
      positionId: $positionId
      like: $like
    ) {
      id
      like
      time
      latest
    }
  }
`;

export const QualificationLikeMutation = gql`
  mutation createUserQualificationLike($qualificationId: ID!, $like: LikeType) {
    createUserQualificationLike(
      qualificationId: $qualificationId
      like: $like
    ) {
      id
      like
      time
      latest
    }
  }
`;

export const ResultQuery = gql`
  {
    candidates {
      id
      name
      photo
      latest_poll
      latest_odds
      prevote_score
    }
  }
`;

export const CandidateDetailQuery = gql`
  query candidate($id: ID!) {
    candidate(id: $id) {
      ...candidate
    }
  }
  ${candidateFragment}
`;
