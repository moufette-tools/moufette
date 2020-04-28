const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Team = require('../models/team')
const FeedbackService = require('../services/FeedbackService')
const UserService = require('../services/UserService')
const FeatureService = require('../services/FeatureService')
const PersonService = require('../services/PersonService')

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
   Query: {
      currentUser: (parent, args, context) => context.getUser(),
      feedbacks: (parent, args, context) => FeedbackService.findAll(),
      widget: (parent, args, context) => UserService.getConfig(context),
      features: (parent, args, context) => FeatureService.findFeatures(context),
   },
   Mutation: {
      vote(_, args, ctx) {
         return FeatureService.vote(args, ctx);
      },
      feedback(_, args, ctx) {
         return FeedbackService.recordFeedback(args, ctx);
      },
      signup: async (parent, { companyName, firstName, lastName, email, password }, context) => {
         // const existingUsers = context.User.getUsers();
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

         const token = jwt.sign({}, process.env.JWT_SECRET, {
            algorithm: 'HS256',
         })
         // console.log('token:', token)

         await team.update({ $addToSet: { members: user._id }, token })

         context.login(user);

         return { user };
      },
      login: async (parent, { email, password }, context) => {
         const { user } = await context.authenticate('graphql-local', { email, password });
         context.login(user);
         return { user }
      },
      logout: (parent, args, context) => context.logout(),
      updateWidget: (parent, args, ctx) => UserService.updateWidget(args, ctx),
      updateFeature: (parent, args, ctx) => FeatureService.updateFeature(args, ctx)
   },
};

module.exports = resolvers;