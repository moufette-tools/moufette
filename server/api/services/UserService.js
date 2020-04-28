const axios = require('axios');
const { get, pick } = require('lodash');

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

module.exports = {
  findUserById,
  getConfig,
  updateWidget
};
