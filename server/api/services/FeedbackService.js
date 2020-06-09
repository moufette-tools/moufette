const { WebClient } = require('@slack/web-api');
const { get, pick } = require('lodash');
const Person = require('../models/person');
const Team = require('../models/team');
const Feedback = require('../models/feedback');
const Property = require('../models/property');

const recordFeedback = async ({ message, image, email }, ctx) => {
  const user = await ctx.getUser()
  console.log({ h: ctx.req.headers })
  const token = get(ctx.req, 'headers.token')
  console.log({ token })
  const property = await Property.findOne({ token })
  const team = await Team.findOne({ _id: property.team })

  const uuid = get(ctx.req, 'headers.mf_uuid')
  const person = await Person.findOneAndUpdate({ uuid }, { email }, { upsert: true, new: true })

  const feed = Feedback.create({
    person: person._id,
    property: property._id,
    from: ctx.user && ctx.user._id,
    text: message,
    image,
  })

  try {
    // Use the `chat.postMessage` method to send a message from this app
    await (new WebClient(team.integrations.slack.access_token)).chat.postMessage({
      channel: '#feedback',
      text: `You have new feedback from ${email}:
      ${message}`,
    });
  } catch (error) {
    console.log(error);
  }

  return !!feed
}

const findAll = async () => {
  return Feedback.find()
}

const findByProperty = async ({ property }, ctx) => {
  return Feedback.find({ property })
}

module.exports = {
  recordFeedback,
  findAll,
  findByProperty
};
