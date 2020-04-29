const axios = require('axios');
const { get, pick } = require('lodash');

const User = require('../models/user');
const Team = require('../models/team');
const Person = require('../models/person');
const Feature = require('../models/feature');
const { produce } = require("immer")

const findFeatures = async () => {
  return Feature.find()
};

const updateFeature = async ({ feature }, ctx) => {
  if (feature._id) {
    return Feature.findOneAndUpdate({ ...feature })
  } else {
    return Feature.create({ ...feature })
  }
};


const vote = async ({ voting, feature: _id }, { req }) => {
  const uuid = get(req, 'headers.mf_uuid')
  const person = await Person.findOne({ uuid })
  const feature = await Feature.findOne({ _id })

  await feature.update(produce(feature, draft => {
    const i = draft.votes.findIndex(v => v.person === person._id.toString())
    if (i > -1) {
      if (voting === draft.votes[i].voting) {
        draft.score -= voting
        draft.votes.splice(i, 1);
      } else {
        draft.score += voting - draft.votes[i].voting
        draft.votes[i].voting = voting
      }
    } else {
      draft.votes.push({
        person: person._id.toString(),
        voting
      })
      draft.score += voting
    }
  }))

  return feature

};

const myVote = async (feature, { req }) => {
  const uuid = get(req, 'headers.mf_uuid')
  const person = await Person.findOneAndUpdate({ uuid }, {}, { upsert: true, new: true })

  return feature.votes.find(v => v.person === person._id.toString())

};


module.exports = {
  findFeatures,
  updateFeature,
  vote,
  myVote
};
