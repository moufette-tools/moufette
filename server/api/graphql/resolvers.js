const User = require('../models/user')
const Team = require('../models/team')
const FeedbackService = require('../services/FeedbackService')
const UserService = require('../services/UserService')
const FeatureService = require('../services/FeatureService')
const PersonService = require('../services/PersonService')
const PropertyService = require('../services/PropertyService')

const resolvers = {
   Feature: {
      myVote(feature, args, ctx) {
         return FeatureService.myVote(feature, ctx)
      }
   },
   Feedback: {
      person({ person }) {
         return PersonService.findOneById(person)
      }
   },
   User: {
      team({ team }) {
         return Team.findOne({ _id: team })
      }
   },
   Team: {
      integrations({ integrations }) {
         const filtered = { ...integrations }
         Object.keys(filtered).forEach(k => filtered[k] = true)
         return filtered
      },
      properties(team) {
         return PropertyService.findByTeam(team)
      }
   },
   Query: {
      currentUser: (parent, args, ctx) => ctx.getUser(),
      feedbacks: (parent, args, ctx) => FeedbackService.findByProperty(args, ctx),
      features: (parent, args, ctx) => FeatureService.findFeatures(args, ctx),
      properties: (parent, args, ctx) => PropertyService.findByUser(ctx),
      property: (parent, args, ctx) => PropertyService.findProperty(args, ctx),
      // api called from the embedded widget
      widget: (parent, args, context) => PropertyService.getConfig(context),
   },
   Mutation: {
      vote(_, args, ctx) {
         return FeatureService.vote(args, ctx);
      },
      feedback(_, args, ctx) {
         return FeedbackService.recordFeedback(args, ctx);
      },
      signup: async (parent, { companyName, firstName, lastName, email, password }, ctx) => {
         // const existingUsers = ctx.User.getUsers();

         // TODO how to block other sign ups
         if (process.env.MULTIPLE_TEAMS !== "true" && !!(await User.findOne())) {
            throw new Error("An admin already exists. Please contact them")
         }

         const userWithEmailAlreadyExists = !!(await User.findOne({ email }))

         if (userWithEmailAlreadyExists) {
            throw new Error('User with email already exists');
         }

         const team = await Team.create({
            name: companyName,
         })

         const user = await User.create({
            email,
            password,
            firstName,
            lastName,
            team: team._id
         });



         await team.update({ $addToSet: { members: user._id } })

         ctx.login(user);

         return { user };
      },
      login: async (parent, { email, password }, ctx) => {
         const { user } = await ctx.authenticate('graphql-local', { email, password });
         ctx.login(user);
         return { user }
      },
      forgotPassword: async (_, args, ctx) => {
         return UserService.forgotPassword(args, ctx)
      },
      resetPassword: async (_, args, ctx) => {
         return UserService.resetPassword(args, ctx)
      },
      logout: (parent, args, ctx) => ctx.logout(),
      updateWidget: (parent, args, ctx) => PropertyService.updateWidget(args, ctx),
      updateFeature: (parent, args, ctx) => FeatureService.updateFeature(args, ctx),

      updateProperty: (parent, args, ctx) => PropertyService.updateProperty(args, ctx),

      // integratinos
      connectSlack: (parent, args, ctx) => UserService.connectSlack(args, ctx),
   },
};

module.exports = resolvers;