const mongoose = require('mongoose');

const isDev = process.env.NODE_ENV !== 'production';

const mongoUrl = isDev
  ? 'mongodb://localhost/moufette'
  : process.env.MONGO_URI

mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
mongoose.connect(mongoUrl);

module.exports = mongoose.connection;
