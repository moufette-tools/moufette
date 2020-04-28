const mongoose = require('mongoose');

const feedbackSchema = mongoose.Schema(
  {
    from: {
      type: String,
    },
    text: {
      type: String,
      default: '',
      required: true
    },
    image: {
      type: String,
      default: null,
    },
    person: {
      type: String,
      required: true
    }

  },
  { timestamps: {} },
);

// methods ======================

// create the model for feedbacks and expose it to our app
module.exports = mongoose.model('Feedback', feedbackSchema);
