const { get, pick } = require('lodash');
const Person = require('../models/person');
const Feedback = require('../models/feedback');

const recordFeedback = async ({ message, image, email }, { user, req }) => {
  const uuid = get(req, 'headers.mf_uuid')
  const person = await Person.findOneAndUpdate({ uuid }, { email }, { upsert: true, new: true })

  const feed = Feedback.create({
    person: person._id,
    from: user && user._id,
    text: message,
    image,
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
