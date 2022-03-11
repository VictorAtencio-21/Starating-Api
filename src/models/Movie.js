const mongoose = require('mongoose');
const {Schema, model} = require('mongoose')

const MovieSchema = new Schema(
    {
        title: {type: String, trim: true},
        genre: {type: String},
        description: {type: String},
        rating: {type: String},
        director: {type: String},
        length: {type: String},
        trailers: [{
            type: String
        }],
        photos: [{
            type: String
        }],
        ratingNumber: {type: Float},
        comments: [{
            type: mongoose.Schema.Types.ObjectId, ref:'Comments'
        }]
    }
)

module.exports = model('Movie', MovieSchema);