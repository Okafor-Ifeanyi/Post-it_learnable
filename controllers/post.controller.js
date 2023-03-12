const PostService = require('../services/post.service')
const UserService = require('../services/user.service')

class PostController {
    
    // create a post
    async createPost(req, res){
        const info = req.body;

        console.log(info.ownerID.length)
        console.log(req.originalUrl)

        // Verify user
        // First if statement solves a Common mistake occurance of passing uncomplete string without going into the system
        try {
            await UserService.findbyID({ _id: info.ownerID})  
        } catch (error) {
            res.status(403).json({
                success: false, 
                message: 'User not found', error})
        };


        // Validate and verify Post (Twitter Tweet Standard)
        // First If statment solves a Common mistake occurance of exceeding string limit without sending a request to server db 

        try {
            await PostService.findbyID({ post: info.post, deleted: false })  
        } catch (error) {
            res.status(403).json({
                success: false,
                message: error})
        };

        // Create Post
        const newPost = await PostService.createPost(info)

        // Success Alert
        res.status(200).json({
            success: true,
            message: 'User created',
            data: newPost
        })
    }

    // Update a user
    async updatePost(req, res){ 
        const infoID = req.params.id
        const updateData = req.body
        console.log(updateData)
        
         // check if use does not exist
         try {
            await PostService.findbyID({ _id: infoID, deleted: false })
         } catch (error) {
            res.status(403).json({
                success: false,
                message: 'Post does not exists',
                error: error
            })
         }
        //  const existingPost = 
        
        // if(!existingPost)
         
        // Since the username is a unique key, we have to make it consistent 
        // if (existingPost) {
        //     const available = await PostService.findbyID({
        //         _id: updateData.id
        //     })

        //     if (available._id.toString() == existingPost._id.toString()){
        //         res.status(403).json({
        //             success: false,
        //             message: 'User with update name already exists'
        //         })
        //     }
        // }

        // Updates Post
        const updatedData = await PostService.update(infoID, updateData)

        res.status(200).json({
            success: true,
            message: 'Body updated successfully',
            data: updatedData
        })
    }

    // Delete a single post
    async deletePost(req, res) {
        const postID = req.params.id
        
        const category = await PostService.findbyID({ _id: postID, deleted: false });
        if (!category || category.deleted == true) {
            res.status(404).json({
                success: false,
                message: 'Post does not exist'
            })
        } else { 
            try {
            await PostService.update(postID, { deleted: true }); // <= change delete status to 'true'
            res.status(200).json({
                success: true,
                message: 'User deleted successfully'});
          } catch (error) {
            res.status(500).json(error)
          }
        }
    }


    // Fetch a single Post by ID
    async getOnePost(req, res){
        const infoID = req.params.id
        
        // Check if the post is the database except deleted
        const existingPost = await PostService.findbyID({
            _id: infoID, deleted: false
        })
        console.log(existingPost)
        if (!existingPost) {
            res.status(403).json({
                success: false,
                message: 'Post does not not exist'
            })
        } else {
            res.status(201).json({
                success: true,
                message: 'Post Fetched successfully',
                data: existingPost
            })
        }
    }

    // Fetch all users in the db
    async fetchAll(req, res){
        const existingPost = await PostService.getAll({deleted: false})

        res.status(200).json({
            success: true,
            message: 'Post fetched successfully',
            data: existingPost
        })
    }
}

module.exports = new PostController()