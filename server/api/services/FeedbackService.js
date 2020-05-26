const { WebClient } = require('@slack/web-api');
const { get, pick } = require('lodash');
const Person = require('../models/person');
const Team = require('../models/team');
const Feedback = require('../models/feedback');

const recordFeedback = async ({ message, image, email }, ctx) => {
  const user = await ctx.getUser()
  const team = await Team.findOne({ _id: user.team })

  const uuid = get(ctx.req, 'headers.mf_uuid')
  const person = await Person.findOneAndUpdate({ uuid }, { email }, { upsert: true, new: true })

  const feed = Feedback.create({
    person: person._id,
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

module.exports = {
  recordFeedback,
  findAll
};
