import { gql } from 'apollo-boost';

export const FEEDBACKS = gql`
  query {
    feedbacks {
      _id
      text
    }
  }
`;
