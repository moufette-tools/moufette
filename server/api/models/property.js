const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
// const bcrypt = require('bcrypt')
// const SALT_WORK_FACTOR = 10;

const propertySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    team: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Team"
    },
    widgetConfig: {
      header: {
        type: String,
        default: 'Help us improve Moufette'
      },
      theme: {
        colors: {
          primary: {
            type: String,
            default: '#1890ff'
          }
        }
      },
      mode: {
        style: {
          type: String,
          enum: ['fab', 'tab'],
          default: 'fab'
        },
        text: {
          type: String,
          default: 'We Love Feedback'
        }
      },
      tabs: {
        feedback: { type: Boolean, default: true },
        features: { type: Boolean, default: true },
      }
    }
  },
  { timestamps: {} },
);



// index ======================
// propertySchema.index({ name: 'text' });

// // methods ======================
// propertySchema.methods.isMember = function (userId) {
//   return this.members.includes(userId)
// };

propertySchema.pre('validate', function (next) {
  const property = this;
  // TODO check 
  // https://github.com/encrypted-dev/userbase/blob/e443ae07de47262d0e468f461a7cdd472123269c/src/userbase-server/admin.js#L1161
  const token = jwt.sign({}, process.env.JWT_SECRET, {
    algorithm: 'HS256',
  })
  // console.log({token})
  property.token = token
  next();
});

// create the model for teams and expose it to our app
module.exports = mongoose.model('Property', propertySchema);
