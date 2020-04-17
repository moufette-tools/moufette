const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type User {
    _id: ID
    email: String
  }

  type Feedback {
    _id: ID
    text: String!
  }

  type Query {
    currentUser: User
    feedbacks: [Feedback]
  }

  type AuthPayload {
    user: User
  }

  type Mutation {

    # feedback
    feedback(message: String!): Boolean!

    # user
    signup(firstName: String!, lastName: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    logout: Boolean
  }
  
`;

module.exports = typeDefs;