const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const monumentSchema = new Schema({
      
  name: String,
  image: String,
  description: String,
  location: String,
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }], 
    
});

const Monument = mongoose.model('Monument', monumentSchema);

module.exports = Monument;