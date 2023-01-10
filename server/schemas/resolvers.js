const { User, Issue, Repo } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {

    Query: {
        me: async (parent, args, context) => {
            if(context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                .select('-__v -password')
            
                return userData;
            }
                throw new AuthenticationError('Not logged in')
            },
        },

    Mutation: {
        addUser: async (parent, { name, email, password }) => {
            const user = await User.create({ name, email, password });
            const token = signToken(user);
          
            return {token, user};
        },
        login: async (parent, {email, password}) => {
            const user = await User.findOne({email});
            
            if(!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if(!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return {token, user};
        },

        saveRepo: async (parent, { repo }, context) => {
            if (context.user) {
          
             const updatedUser =  await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedRepos: repo } },
                { new: true }
              );
          
            return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in!');
        },

        removeRepo: async (parent, { repoId }, context) => {
            if(context.user) {
            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedRepos: { repoId: repoId } } },
                { new: true }
            );

            return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in!');
        },

        saveIssue: async (parent, { issue }, context) => {
            if (context.user) {
          
             const updatedUser =  await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedIssues: issue } },
                { new: true }
              );
          
            return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in!');
        },

        removeIssue: async (parent, { issueId }, context) => {
            if(context.user) {
            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedIssues: { issueId: issueId } } },
                { new: true }
            );

            return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in!');
        }
    }
};

module.exports = resolvers;