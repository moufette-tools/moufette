import { gql } from 'apollo-boost';
import { useQuery, useMutation, } from '@apollo/client';
import { useDispatch, useSelector } from "react-redux";

import produce from 'immer'

export const FEATURES = gql`
query Features($property: ID!) {
   features(property: $property) {
      _id
      title
      notes
      score
   }
 }
`;

export const UPDATE_FEATURE = gql`
mutation UpdateFeature($feature: FeatureInput!, $property: ID!) {
   updateFeature(feature: $feature, property: $property) {
    _id
    title
    notes
    score
   }
 }
`;


export const useQueryFeatures = () => {
  const { property } = useSelector((state: any) => state.global);
  return useQuery(FEATURES, {
    variables: {
      property: property?._id
    },
    skip: !property
  })
}


export const useUpdateFeature = () => {
  const { property } = useSelector((state: any) => state.global);
  return useMutation(UPDATE_FEATURE, {
    variables: {
      property: property?._id
    } as any,
    update(cache, { data: { updateFeature } }) {
      const { features } = cache.readQuery({ query: FEATURES, variables: { property: property?._id } }) as any;
      cache.writeQuery({
        query: FEATURES,
        variables: { property: property?._id },
        data: {
          features: produce(features, (draft: any) => {
            draft.push(updateFeature)
          })
        },
      })
    }
  })
}
