const { gql } = require('apollo-server-express')

const typeDefs = gql`

directive @auth on FIELD_DEFINITION
directive @token on FIELD_DEFINITION

  type User {
    _id: ID
    email: String
    team: Team
  }

  type Feedback {
    _id: ID
    text: String!
  }

  type AuthPayload {
    user: User
  }

  type Team {
    _id: ID!
    name: String!
    token: String!
  }

  type Query {
    currentUser: User
    feedbacks: [Feedback] @auth
  }

  type Mutation {

    # feedback
    feedback(message: String!): Boolean! @token

    # user
    signup(companyName: String!, firstName: String!, lastName: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    logout: Boolean
  }
  
`;

module.exports = typeDefs;