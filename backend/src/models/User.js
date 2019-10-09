const { model, Schema } = require('mongoose');

const UserSchema = new Schema(
  {
    name: String,
    email: String
  },
  {
    timestamps: true
  }
);

module.exports = model('User', UserSchema);
