const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const businessSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "name is required."],
  },
  image: {
    type: String,
    default: "https://eu.ui-avatars.com/api/?background=random",
  },
  description: String,
  location: String,
  ticketPrice: String,
  schedule: String,
  monuments: [{ type: Schema.Types.ObjectId, ref: 'Monument' }],
  guides: [{ type: Schema.Types.ObjectId, ref: 'Guide' }],
  owners: [
    {
      type: Schema.Types.ObjectId, ref: 'User', required: true
    }
  ],
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
});

const Business = mongoose.model('Business', businessSchema);

module.exports = Business;