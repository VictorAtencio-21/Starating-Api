const mongoose = require('mongoose');
const {Schema, model} = require('mongoose')

const CommentSchema = new Schema(
    {
        User: {type: String},
        Movie: {type: String},
        Date: {type: String},
        Content: {type: String},
        Likes: {type: Number, default: 0},
        rep: {type: Boolean, default: false},
        Replies: [{
            User: {type: String},
            Date: {type: String},
            Content: {type: String},
            Likes: {type: Number, default: 0},
        }]
    }
)

module.exports = model('Comments', CommentSchema);