import { gql } from 'apollo-boost';


export const UPDATE_WIDGET = gql`
  mutation UpdateWidget($config: JSON!) {
    updateWidget(config: $config)
  }
`;
