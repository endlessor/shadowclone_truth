import { gql } from "apollo-boost";

export const LoginMutation = gql`
  mutation login($email: String, $password: String) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        email
        gender
      }
    }
  }
`;

export const SignupMutation = gql`
  mutation signup($email: String, $password: String) {
    signup(email: $email, password: $password) {
      token
      user {
        id
        name
        email
        gender
      }
    }
  }
`;
