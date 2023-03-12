const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const comments = new Schema({
    comment: { 
        type: 'string',
        required: [true, "title needed to create comment"], 
        maxLength: 280 
    },
    ownerID: {
        type: Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true,
    },
    postID : {
        type: Schema.Types.ObjectId,
        ref: 'PostModel',
        required: true, 
    },
    deleted: {
        type: "boolean",
        default: false,
        required: true,
    }
},  { timestamps: true })

commentModel = mongoose.model('comment', comments)
module.exports = commentModel