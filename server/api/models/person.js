const mongoose = require('mongoose');

const personSchema = mongoose.Schema(
  {
    uuid: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String
    }
  },
  { timestamps: {} },
);

// create the model for persons and expose it to our app
module.exports = mongoose.model('Person', personSchema);
