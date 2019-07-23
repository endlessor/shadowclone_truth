import { gql } from "apollo-boost";

export const CandidateQuery = gql`
  query getCandidates {
    candidates {
      id
      name
      photo
      party
      state
      current_office
      latest_poll
      latest_odds
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
