import { gql } from 'apollo-boost';


export const SIGNUP = gql`
mutation Signup($firstName: String!, $lastName: String!, $companyName: String!, $email: String!, $password: String!) {
   signup(firstName: $firstName, lastName: $lastName, companyName: $companyName, email: $email, password: $password) {
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
