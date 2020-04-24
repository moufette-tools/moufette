const Feedback = require('../models/feedback');

const recordFeedback = async ({ message, image }, { user }) => {
  const feed = Feedback.create({
    from: user && user._id,
    text: message,
    image
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
