import { gql } from 'apollo-boost';


export const FEATURES = gql`
query Features {
   features {
      title
      notes
      score
   }
 }
`;
