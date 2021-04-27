const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
      
    name: String,
    image: String,
    description: String,
    transportation: {
        enum: ['bike', 'segway', 'onfoot', 'tuktuk', 'car', 'bus'],
        required: true,
    },
    business: [{ type: Schema.Types.ObjectId, ref: 'Business' }],
    guides: [{ type: Schema.Types.ObjectId, ref: 'Guide' }],
    monuments: [{ type: Schema.Types.ObjectId, ref: 'Monument' }],
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }], 
        
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;