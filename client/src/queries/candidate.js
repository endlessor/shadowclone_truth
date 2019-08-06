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
      bio_other
      bio_qualifications {
        id
        name
        summary
      }
      bio_policy_position {
        id
        name
        summary
      }
      __typename
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
  mutation createUserPositionLike($positionId: ID!, $like: LikeType) {
    createUserPositionLike(candidate_positionId: $positionId, like: $like) {
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
