const { get, pick } = require('lodash');
const Person = require('../models/person');

const findOneById = async (_id) => {
  return Person.findOne({ _id })
}

module.exports = {
  findOneById
};
