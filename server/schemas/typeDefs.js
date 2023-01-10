const { gql } = require('apollo-server-express');

const typeDefs = gql `
    type Query {
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveFriend(input: saveFriend!): User
        removeFriend(friendId: ID!): User
        saveRepo(input: saveRepo!): User
        removeRepo(repoId: ID!): User
        saveIssue(input: saveIssue!): User
        removeIssue(issueId: ID!): User
    }
  
    type User {
        _id: ID!
        username: String
        email: String
        savedFriends: [Friend]
        savedRepos: [Repo]
        savedIssues: [Issue]
    }

    input saveFriend {
        username: String
    }

    type Friend {
        _id: ID!
        username: String
    }

    input saveIssue {
        title: String
        description: String
    }

    type Issue {
        _id: ID!
        title: String
        description: String
    }

    input saveRepo {
        title; String
        description: String
    }

    type Repo {
        _id: ID!
        title: String
        description: String
    }

    type Auth {
        token: ID!
        user: User
    }
`

module.exports = typeDefs;