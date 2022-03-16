const mongoose = require('mongoose');
const {Schema, model} = require('mongoose')

const MovieSchema = new Schema(
    {
        title: {type: String, trim: true, unique: true},
        genre: {type: String,},
        description: {type: String},
        rating: {type: Number, default: 0},
        director: {type: String},
        length: {type: String},
        trailers: [{
            type: String,
            unique: true
        }],
        photos: [{
            type: String,
            unique: true
        }],
        comments: [{
            type: mongoose.Schema.Types.ObjectId, ref:'Comments'
        }]
    }
)

module.exports = model('Movie', MovieSchema);