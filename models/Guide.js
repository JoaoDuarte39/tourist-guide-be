const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const guideSchema = new Schema({
      
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
    business: [{ type: Schema.Types.ObjectId, ref: 'Business' }],
    roadMaps: [{ type: Schema.Types.ObjectId, ref: 'RoadMap' }],
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }], 
    
    
});

const Guide = mongoose.model('Guide', guideSchema);

module.exports = Guide;