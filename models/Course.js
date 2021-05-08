const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "name is required."],
    },
    image: String,
    description: String,
    transportation: {
        type: String,
        enum: ['bike', 'segway', 'onfoot', 'tuktuk', 'car', 'bus'],
        required: [true, "transportation is required"],
    },
    business: [{ type: Schema.Types.ObjectId, ref: 'Business' }],
    guides: [{ type: Schema.Types.ObjectId, ref: 'Guide' }],
    monuments: [{ type: Schema.Types.ObjectId, ref: 'Monument' }],
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;