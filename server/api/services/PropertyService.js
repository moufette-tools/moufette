const { get, pick } = require('lodash');
const Property = require('../models/property');
const Team = require('../models/team');

const findByTeam = async ({ properties }) => {
  return Property.find({ _id: properties })
}

const findByUser = async (ctx) => {
  const user = await ctx.getUser()
  // const team = await Team.findOneById(user.team)
  return Property.find({ team: user.team })
}

const updateProperty = async ({ property }, ctx) => {
  const user = await ctx.getUser()
  if (property._id) {
    return Property.findOneAndUpdate({ ...property })
  } else {
    return Property.create({ ...property, team: user.team })
  }
};

const findProperty = async ({ _id }, ctx) => {
  const user = await ctx.getUser()
  return Property.findOne({ _id, team: user.team })
};

const updateWidget = async ({ config, property: _id }, ctx) => {
  // const user = await ctx.getUser()
  // const team = await Team.findOne({ _id: user.team })
  const property = await Property.findOneAndUpdate({ _id }, { widgetConfig: config }, { new: true })
  return property.widgetConfig
};

const getConfig = async (ctx) => {
  const user = await ctx.getUser()
  let team
  if (user) {
    team = await Team.findOne({ _id: user.team })
  } else {
    const token = get(ctx, 'req.headers.token')
    property = await Property.findOne({ token })
  }


  return property.widgetConfig
};

module.exports = {
  findByTeam,
  findByUser,
  updateProperty,
  findProperty,
  updateWidget,
  getConfig
};
