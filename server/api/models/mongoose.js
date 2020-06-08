const mongoose = require('mongoose');

const mongoUrl = process.env.MONGODB_URI

mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
mongoose.connect(mongoUrl);

module.exports = mongoose.connection;
