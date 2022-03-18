const mongoose = require('mongoose');
const {Schema, model} = require('mongoose')

const MovieSchema = new Schema(
    {
        title: {type: String, trim: true, unique: true},
        genre: {type: String,},
        description: {type: String},
        rating: {type: Number},
        director: {type: String},
        length: {type: String},
        trailers:{type: String},
        poster:{type: String},
        photos: [{
            type: String,
            unique: true
        }],
        comments: [{
            type: mongoose.Schema.Types.ObjectId, ref:'Comments'
        }],
        cloudinary_id: {
            type: String,
          }
    }
)

module.exports = model('Movie', MovieSchema);