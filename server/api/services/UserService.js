const axios = require('axios');
const { get, pick } = require('lodash');

const User = require('../models/user');

const findUserById = async (_id) => {
  return User.findOne({ _id })
};

module.exports = {
  findUserById,

};
