const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    description: String, 
    
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;