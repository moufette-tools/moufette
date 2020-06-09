import { gql } from 'apollo-boost';
import { useQuery, useMutation, } from '@apollo/client';
import produce from 'immer'

export const USER = gql`
  query {
    currentUser {
      _id
      email
      team {
        _id
        name
        properties {
          _id
          name
          url
        }
        integrations
      }
    }
  }
`;

export const SIGNUP = gql`
mutation Signup($firstName: String!, $lastName: String!, $companyName: String!, $email: String!, $password: String!) {
   signup(firstName: $firstName, lastName: $lastName, companyName: $companyName, email: $email, password: $password) {
     user {
       _id
       email
       team {
        _id
        name
        properties {
          _id
          name
          url
        }
      }
     }
   }
 }
`;


export const LOGIN = gql`
mutation Login($email: String!, $password: String!) {
   login(email: $email, password: $password) {
     user {
       _id
       email
       team {
         _id
         name
         properties {
           _id
           name
           url
         }
       }
     }
   }
 }
`;


const FORGOT_PASSWORD = gql`
 mutation forgotPassword($email: String!) {
   forgotPassword(email: $email) 
 }
`;

const RESET_PASSWORD = gql`
 mutation resetPassword($password: String!) {
   resetPassword(password: $password) 
 }
`;



export const useQueryUser = () => {
  return useQuery(USER, {
  })
}

export const useForgotPassword = () => {
  return useMutation(FORGOT_PASSWORD, {
  })
}

export const useResetPassword = () => {
  return useMutation(RESET_PASSWORD, {
  })
}

export const useLogin = () => {
  return useMutation(LOGIN, {
    update(cache, { data: { login } }) {
      cache.writeQuery({
        query: USER,
        data: { currentUser: login.user },
      });
    }
  })
}

export const useSignup = () => {
  return useMutation(SIGNUP, {
    update(cache, { data: { signup } }) {
      cache.writeQuery({
        query: USER,
        data: { currentUser: signup.user },
      });
    }
  })
}


// export const useQueryTemplates = () => {
//    return useQuery(TEMPLATES, { context: { clientName: 'api' } })
// }
