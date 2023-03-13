const postModel = require('../models/post.model')

class PostService {
    // create a new post
    async createPost(post) {
        return await postModel.create(post)
    }

    // Edit aa post
    async update(id, userData) {
        return await postModel.findByIdAndUpdate(id, userData), {
            new: true
        }
    }
    
    // find a posts by their id
    async findbyID(filter){
        return await postModel.findOne(filter)
    }

    // Get all posts
    async getAll(filter) {
        return await postModel.find(filter)
    }

    // Get all posts by a user
    async getAllByUser(user, filter) {
        return await postModel.find(filter, user)
    }
}

module.exports = new PostService()