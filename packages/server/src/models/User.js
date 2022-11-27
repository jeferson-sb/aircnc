import { model, Schema } from 'mongoose'

const UserSchema = new Schema(
  {
    name: String,
    email: String
  },
  {
    timestamps: true
  }
);

export default model('User', UserSchema);
