import { gql } from 'apollo-boost';


export const LOGIN = gql`
mutation Login($email: String!, $password: String!) {
   login(email: $email, password: $password) {
     user {
       _id
       email
       team {
         _id
         name
         token
       }
     }
   }
 }
`;
