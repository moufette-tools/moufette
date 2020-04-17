const mongoose = require('mongoose');

const isDev = process.env.NODE_ENV !== 'production';

const mongoUrl = isDev
  ? 'mongodb://localhost/moufette'
  : `mongodb://${process.env.MONGOLAB_USER}:${process.env.MONGOLAB_PASS}@ds035147.mlab.com:35147/${process.env.MONGOLAB_DB}`;

mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
mongoose.connect(mongoUrl);

module.exports = mongoose.connection;
