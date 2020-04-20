const { gql } = require('apollo-server-express')

const typeDefs = gql`

directive @auth on FIELD_DEFINITION

  type User {
    _id: ID
    email: String
  }

  type Feedback {
    _id: ID
    text: String!
  }

  type AuthPayload {
    user: User
  }

  type Query {
    currentUser: User
    feedbacks: [Feedback] @auth
  }

  type Mutation {

    # feedback
    feedback(message: String!): Boolean! @auth

    # user
    signup(firstName: String!, lastName: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    logout: Boolean
  }
  
`;

module.exports = typeDefs;