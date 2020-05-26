const axios = require('axios');
const { get, pick } = require('lodash');
const { WebClient } = require('@slack/web-api');


const User = require('../models/user');
const Team = require('../models/team');

const findUserById = async (_id) => {
  return User.findOne({ _id })
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
  connectSlack
};
