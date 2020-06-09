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
    properties: [Property]!
    integrations: JSON
  }

  type Property {
    _id: ID!
    name: String!
    url: String!
    widgetConfig: JSON!
    token: String!
  }

  input PropertyInput {
    _id: ID
    name: String!
    url: String!
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
    feedbacks(property: ID!): [Feedback] @auth
    properties: [Property]! @tokenOrAuth
    property(_id: ID!): Property! @tokenOrAuth

    widget: JSON! @tokenOrAuth

    features(property: ID!): [Feature]! @tokenOrAuth
  }

  type Mutation {

    # feedback
    feedback(message: String!, image: String, email: String): Boolean! @tokenOrAuth

    # user
    signup(companyName: String!, firstName: String!, lastName: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    forgotPassword(email: String!): Boolean
    resetPassword(password: String!): Boolean
    logout: Boolean @auth
    updateProperty(property: PropertyInput!): Property!

    # widget
    updateWidget(config: JSON!, property: ID!): JSON! @auth
    vote(voting: Int!, feature: String!): Feature! @tokenOrAuth
    updateFeature(feature: FeatureInput!, property: ID!): Feature!


    # integratinos
    connectSlack(code: String!): Boolean


  }
  
`;

module.exports = typeDefs;