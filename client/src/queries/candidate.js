import { gql } from "apollo-boost";

export const CandidateQuery = gql`
  {
    candidates {
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
      __typename
    }
  }
`;

export const CandidateWithVotePercenet = gql`
  {
    candidatesWithVotesPercent {
      candidate {
        id
        name
        photo
        party
        state
        current_office
        age
        vote_type
      }
      tops
      favorites
      compromises
      vetos
      unknowns
    }
  }
`;

export const CandidateQualificationsQuery = gql`
  query qualifications($candidateId: ID!) {
    candidateQualifications(candidateId: $candidateId) {
      id
      name
      summary
      detail
      years
      rank
      like_type
    }
  }
`;

export const CandidatePositionsQuery = gql`
  query positions($candidateId: ID!) {
    candidatePositions(candidateId: $candidateId) {
      id
      name
      summary
      detail
      like_type
    }
  }
`;

export const PositionQuery = gql`
  query position($id: ID!) {
    position(id: $id) {
      id
      name
      summary
      detail
      like_type
    }
  }
`;

export const QualificationQuery = gql`
  query qualification($id: ID!) {
    qualification(id: $id) {
      id
      name
      summary
      detail
      like_type
    }
  }
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

export const UserVoteQuery = gql`
  {
    userVotes {
      id
      candidateId
      userId
      vote_type
      time
      latest
    }
  }
`;

export const CandidateDetailQuery = gql`
  query candidate($id: ID!) {
    candidate(id: $id) {
      id
      name
      photo
      age
      latest_poll
      latest_odds
      prevote_score
      bio_summary
      vote_type
    }
  }
`;
