const { gql } = require("apollo-server-express");

// Definicja typów GraphQL
const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    username: String!
    password: String!
    roles: [String]
    settings: Settings
  }

  type Player {
    id: ID!
    name: String!
    ally: Int!
    villages: Int!
    points: Int!
    rank: Int!
  }

  type Village {
    id: ID!
    name: String!
    x: Int!
    y: Int!
    player: Int!
    points: Int!
    rank: Int!
  }

  type Tribe {
    id: ID!
    name: String!
    tag: String!
    members: Int!
    villages: Int!
    points: Int!
    all_points: Int!
    rank: Int!
  }

  type Settings {
    lang: String!
    tribe: ID
    player: ID
  }

  type AuthPayload {
    id: ID!
    username: String!
    token: String!
  }

  input CreateUserInput {
    name: String!
    username: String!
    password: String!
    roles: [String]
    settings: UpdateSettingsInput
  }

  input UpdateUserInput {
    name: String
    password: String
    roles: [String]
    settings: UpdateSettingsInput
  }

  input UpdateSettingsInput {
    lang: String
    tribe: ID
    player: ID
  }

  type Query {
    user(id: ID!): User
    users: [User]
    players: [Player]
    player(id: ID!): Player
    villages: [Village]
    village(id: ID!): Village
    tribes: [Tribe]
    tribe(id: ID!): Tribe
  }

  type Mutation {
    createUser(input: CreateUserInput!): User
    updateUser(id: ID!, input: UpdateUserInput!): User
    deleteUser(id: ID!): Boolean
    createPlayer(
      name: String!
      ally: Int!
      villages: Int!
      points: Int!
      rank: Int!
    ): Player
    updatePlayer(
      id: ID!
      name: String
      ally: Int
      villages: Int
      points: Int
      rank: Int
    ): Player
    deletePlayer(id: ID!): Boolean
    createVillage(
      name: String!
      x: Int!
      y: Int!
      player: Int!
      points: Int!
      rank: Int!
    ): Village
    updateVillage(
      id: ID!
      name: String
      x: Int
      y: Int
      player: Int
      points: Int
      rank: Int
    ): Village
    deleteVillage(id: ID!): Boolean
    createTribe(
      name: String!
      tag: String!
      members: Int!
      villages: Int!
      points: Int!
      all_points: Int!
      rank: Int!
    ): Tribe
    updateTribe(
      id: ID!
      name: String
      tag: String
      members: Int
      villages: Int
      points: Int
      all_points: Int
      rank: Int
    ): Tribe
    deleteTribe(id: ID!): Boolean
    login(username: String!, password: String!): AuthPayload!
  }
  type AuthData {
    id: ID!
    username: String!
    token: String!
  }
`;

module.exports = typeDefs;
