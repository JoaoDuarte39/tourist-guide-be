const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const museumSchema = new Schema({
      
    name: String,
    image: String,
    description: String,
    tickets: String,
    tourGuide: String,
    reviews: String,
    event: {
    type: Schema.Types.ObjectId,
    ref: 'Event'
  }  
});

const Museum = mongoose.model('Museum', museumSchema);

module.exports = Museum;