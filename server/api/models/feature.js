const mongoose = require('mongoose');

const featureSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      default: 0
    },
    votes: {
      type: [{}],
      default: []
    }
  },
  { timestamps: {} },
);

// create the model for features and expose it to our app
module.exports = mongoose.model('Feature', featureSchema);
