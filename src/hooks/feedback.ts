import { gql } from 'apollo-boost';
import { useQuery, useMutation, } from '@apollo/client';
import { useDispatch, useSelector } from "react-redux";
import produce from 'immer'

export const FEEDBACKS = gql`
  query Feedback($property: ID!) {
    feedbacks(property: $property) {
      _id
      text
      image
      createdAt
      person {
        _id
        uuid
      }
    }
  }
`;


export const useQueryFeedback = () => {
  const { property } = useSelector((state: any) => state.global);
  return useQuery(FEEDBACKS, {
    variables: {
      property: property?._id
    },
    skip: !property
  })
}


