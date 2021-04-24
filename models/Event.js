const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
      
    name: String,
    image: String,
    description: String,
    tickets: String,
    tourGuide: String,
    reviews: String,
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Museum' }]
    
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;