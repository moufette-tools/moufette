const axios = require('axios');
const { get, pick } = require('lodash');
const { WebClient } = require('@slack/web-api');

const mailer = require('../lib/mailer')

const User = require('../models/user');
const Team = require('../models/team');

const findUserById = async (_id) => {
  return User.findOne({ _id })
};

const forgotPassword = async ({ email }, ctx) => {
  if (!process.env.EMAIL_HOST) {
    throw new Error(`There are no SMTP credentials set on this server, which means we can't send password reset emails. Please set SMTP credentials`)
  }
  const user = await User.findOne({ email })

  if (!user) { return false }

  // TODO
  const tempPassword = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  user.password = tempPassword
  await user.save()

  let info = await mailer.sendMail({
    from: process.env.EMAIL_DEFAULT_FROM,
    to: user.email,
    subject: "New Password",
    text: `Here is your new password: ${tempPassword}
    please use it to login and then change it`, // plain text body
    html: `<p>Here is your new password: ${tempPassword}</p>
    <p>please use it to login and then change it</p>`, // html body
  });

  return !!info.messageId
};

const getConfig = async (ctx) => {
  const user = await ctx.getUser()
  let team
  if (user) {
    team = await Team.findOne({ _id: user.team })
  } else {
    const token = get(ctx, 'req.headers.token')
    team = await Team.findOne({ token })
  }


  return team.widgetConfig
};

const updateWidget = async ({ config }, ctx) => {
  const user = await ctx.getUser()
  const team = await Team.findOne({ _id: user.team })
  await team.update({ widgetConfig: config })
  return team.widgetConfig
};

// Integrations 

const connectSlack = async ({ code }, ctx) => {
  const user = await ctx.getUser()
  const team = await Team.findOne({ _id: user.team })

  const result = await (new WebClient()).oauth.v2.access({
    client_id: process.env.REACT_APP_SLACK_CLIENT_ID,
    client_secret: process.env.SLACK_CLIENT_SECRET,
    code
  });

  if (result.ok) {
    await team.update({ 'integrations.slack': result })
  }

};


module.exports = {
  findUserById,
  getConfig,
  updateWidget,
  connectSlack,
  forgotPassword
};
