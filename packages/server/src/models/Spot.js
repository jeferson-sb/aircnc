import { model, Schema } from 'mongoose'
import config from '../config/index.js'

const SpotSchema = new Schema(
  {
    thumbnail: String,
    company: String,
    price: Number,
    techs: [String],
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    timestamps: true,
  }
);

SpotSchema.virtual('thumbnail_url').get(function() {
  return `${config.host}:${config.port}/files/${this.thumbnail}`;
});

export default model('Spot', SpotSchema);
