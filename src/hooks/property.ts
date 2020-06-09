import { gql } from 'apollo-boost';
import { useQuery, useMutation, } from '@apollo/client';
import { useDispatch, useSelector } from "react-redux";
import produce from 'immer'


export const PROPERTIES = gql`
query Properties {
   properties {
      _id
      name
      url
   }
 }
`;

export const PROPERTY = gql`
query Property($_id: ID!) {
   property(_id: $_id) {
      _id
      name
      url
      token
      widgetConfig
   }
 }
`;

export const UPDATE_PROPERTY = gql`
mutation UpdateProperty($property: PropertyInput!) {
   updateProperty(property: $property) {
      _id
      name
      url
   }
 }
`;

export const UPDATE_WIDGET = gql`
  mutation UpdateWidget($config: JSON!, $property: ID!) {
    updateWidget(config: $config, property: $property)
  }
`;



export const useQueryProperties = () => {
  return useQuery(PROPERTIES, {})
}

export const useQueryProperty = () => {
  const { property } = useSelector((state: any) => state.global);
  return useQuery(PROPERTY, {
    variables: {
      _id: property?._id
    },
    skip: !property
  })
}


export const useUpdateProperty = () => {

  return useMutation(UPDATE_PROPERTY, {
    update(cache, { data: { updateProperty } }) {
      const { properties } = cache.readQuery({ query: PROPERTIES }) as any;
      cache.writeQuery({
        query: PROPERTIES,
        data: {
          properties: produce(properties, (draft: any) => {
            draft.push(updateProperty)
          })
        },
      });
    }
  })
}

export const useUpdateWidget = () => {
  const global = useSelector((state: any) => state.global);
  return useMutation(UPDATE_WIDGET, {
    variables: {
      property: global.property?._id
    } as any,
    update(cache, { data: { updateWidget } }) {
      const { property } = cache.readQuery({ query: PROPERTY, variables: { _id: global.property?._id } }) as any;
      cache.writeQuery({
        query: PROPERTY,
        variables: {
          property: global.property?._id
        },
        data: {
          property: produce(property, (draft: any) => {
            draft.widgetConfig = updateWidget
          })
        },
      });
    }
  })
}
