import { gql } from 'apollo-boost';


export const UPDATE_FEATURE = gql`
mutation UpdateFeature($feature: FeatureInput!) {
   updateFeature(feature: $feature) {
    title
    notes
    score
   }
 }
`;
