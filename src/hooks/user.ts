import { gql } from 'apollo-boost';
import { useQuery, useMutation, } from '@apollo/client';
import produce from 'immer'


const FORGOT_PASSWORD = gql`
 mutation forgotPassword($email: String!) {
   forgotPassword(email: $email) 
 }
`;


export const useForgotPassword = () => {
   return useMutation(FORGOT_PASSWORD, {
   })
}


// export const useQueryTemplates = () => {
//    return useQuery(TEMPLATES, { context: { clientName: 'api' } })
// }
