const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const monumentSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "name is required."],
  },
  image: {
    type: String,
    default: "https://eu.ui-avatars.com/api/?background=random",
    required: [true, "image is required."],
  },
  description: String,
  location: String,
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
});

const Monument = mongoose.model('Monument', monumentSchema);

module.exports = Monument;