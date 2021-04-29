const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  username: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true
  },
  passwordHashAndSalt: {
    type: String
  },
  createTour: {
    type: String
  },

});

module.exports = mongoose.model('User', schema);
