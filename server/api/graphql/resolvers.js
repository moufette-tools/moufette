const User = require('../models/user')
const FeedbackService = require('../services/FeedbackService')

const resolvers = {
   Query: {
      currentUser: (parent, args, context) => context.getUser(),
      feedbacks: (parent, args, context) => FeedbackService.findAll(),
   },
   Mutation: {
      feedback(_, args, ctx) {
         return FeedbackService.recordFeedback(args, ctx);
      },
      signup: async (parent, { firstName, lastName, email, password }, context) => {
         // const existingUsers = context.User.getUsers();
         const userWithEmailAlreadyExists = !!(await User.findOne({ email }))

         if (userWithEmailAlreadyExists) {
            throw new Error('User with email already exists');
         }

         const user = await User.create({
            email,
            password,
         });


         context.login(user);

         return { user };
      },
      login: async (parent, { email, password }, context) => {
         const { user } = await context.authenticate('graphql-local', { email, password });
         context.login(user);
         return { user }
      },
      logout: (parent, args, context) => context.logout(),
   },
};

module.exports = resolvers;