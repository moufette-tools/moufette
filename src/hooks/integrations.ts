import { gql } from 'apollo-boost';
// import { useQuery, useMutation } from '@apollo/react-hooks';
import { useQuery, useMutation, } from '@apollo/client';
import produce from 'immer'

// const TEMPLATES = gql`
//   query templates{
//     templates {
//       _id
//       name
//       text
//     }
//   }
// `;

const CONNECT_SLACK = gql`
 mutation connectSlack($code: String!) {
   connectSlack(code: $code) 
 }
`;


export const useConnectSlack = () => {
   return useMutation(CONNECT_SLACK, {
      // update(cache, { data: { createTemplate: template } }) {
      //    const { templates } = cache.readQuery({ query: TEMPLATES });
      //    cache.writeQuery({
      //       query: TEMPLATES,
      //       data: {
      //          templates: produce(templates, draft => {
      //             draft.push(template)
      //          })
      //       },
      //    })
      // }
   })
}


// export const useQueryTemplates = () => {
//    return useQuery(TEMPLATES, { context: { clientName: 'api' } })
// }
