import { gql } from 'apollo-boost';


export const FEEDBACK_MUTATION = gql`
  mutation Feedback($message: String!) {
    feedback(message: $message)
  }
`;


export const LOGOUT = gql`
  mutation {
    logout
  }
`;
