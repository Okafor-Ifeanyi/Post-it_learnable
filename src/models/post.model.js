const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Posts = new Schema({
    post: { 
        type: 'string',
        unique: [true, "Post already exists"], 
        required: [true, "title needed to create post"], 
        maxLength: 280 
    },
    ownerID: {
        type: Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true,
    },
    deleted: {
        type: "boolean",
        default: false,
        required: true,
    }
},  { timestamps: true })

PostModel = mongoose.model('Post', Posts)
module.exports = PostModel