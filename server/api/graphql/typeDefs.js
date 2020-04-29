const { gql } = require('apollo-server-express')

const typeDefs = gql`

  directive @auth on FIELD_DEFINITION
  directive @token on FIELD_DEFINITION
  directive @tokenOrAuth on FIELD_DEFINITION

  scalar Date
  scalar JSON

  type User {
    _id: ID
    email: String
    team: Team
  }

  type Person {
    _id: ID!
    uuid: String
  }

  type Feedback {
    _id: ID
    person: Person
    text: String!
    image: String
    createdAt: Date!
  }

  type AuthPayload {
    user: User
  }

  type Team {
    _id: ID!
    name: String!
    token: String!
  }

  type Feature {
    _id: ID!
    title: String!
    notes: String!
    score: Int!
    myVote: JSON
  }

  input FeatureInput {
    _id: ID
    title: String!
    notes: String!
  }

  type Query {
    currentUser: User
    feedbacks: [Feedback] @auth

    widget: JSON! @tokenOrAuth

    features: [Feature]! @tokenOrAuth
  }

  type Mutation {

    # feedback
    feedback(message: String!, image: String, email: String): Boolean! @token

    # user
    signup(companyName: String!, firstName: String!, lastName: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    logout: Boolean @auth

    # widget
    updateWidget(config: JSON!): JSON! @auth
    vote(voting: Int!, feature: String!): Feature! @token

    updateFeature(feature: FeatureInput!): Feature!


  }
  
`;

module.exports = typeDefs;