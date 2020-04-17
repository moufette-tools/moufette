const Feedback = require('../models/feedback');

const recordFeedback = async ({ message }, { user }) => {
  const feed = Feedback.create({
    from: user && user._id,
    text: message
  })

  return !!feed
}

const findAll = async () => {
  return Feedback.find()
}

module.exports = {
  recordFeedback,
  findAll
};
