const mongoose = require('mongoose');
const {Schema, model} = require('mongoose')

const CommentSchema = new Schema(
    {
        User: {type: String},
        Movies: {type: String},
        Date: {type: Date}
    }
)

module.exports = model('Comments', CommentSchema);