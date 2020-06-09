const mongoose = require('mongoose');

const feedbackSchema = mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true
    },
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "Person",
      required: true
    }

  },
  { timestamps: {} },
);

// methods ======================

// create the model for feedbacks and expose it to our app
module.exports = mongoose.model('Feedback', feedbackSchema);
