const PostService = require('../services/post.service')
const UserService = require('../services/user.service')

class PostController {
    
    // create a post
    async createPost(req, res){
        const info = req.body;
        const extra_text = info.post.length - 280

        console.log(info.ownerID.length)
        console.log(req.originalUrl)

        // Verify user
        // First if statement solves a Common mistake occurance of passing uncomplete string without going into the system
        if(info.ownerID.length != 24){
            res.status(403).json({
                success: false,
                message: 'Crosscheck User ID'})
        } else{
            try {
                await UserService.findbyID({ _id: info.ownerID })  
            } catch (error) {
                res.status(403).json({
                    success: false, 
                    message: 'User not found'})
            };
        }


        // Validate and verify Post (Twitter Tweet Standard)
        // First If statment solves a Common mistake occurance of exceeding string limit without sending a request to server db 
        if(info.post.length > 280){ 
            res.status(403).json({
                success: false,
                message: `Max password length exceded by "${extra_text}" characters`})
        } // else{
        //     try {
        //         await PostService.findbyID({ post: info.post })  
        //     } catch (error) {
        //         res.status(403).json({
        //             success: false,  
        //             message: 'Post already exists'})
        //     };
        // };

        const available = await PostService.findbyID({ post: info.post })
        if (available){
            res.status(403).json({
                success: false,
                message: 'Post already exists'
            })
        }

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
         const existingPost = await PostService.findbyID({
            _id: infoID
        })
        
        if(!existingPost)res.status(403).json({
             success: false,
             message: 'Post does not exists'
         })
         
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

    // Delete a single user 
    async deletePost(req, res) {
        const postID = req.params.id
        const deleteInfo = {
            post: "Tweet has been deleted by owner",
            ownerID: ""
        }


        // Check if the book to delete is the database
        // const existingPost = await PostService.findbyID({
        //     _id: postID
        // })
 
        // if (!existingPost) res.status(403).json({
        //     success: false,
        //     message: 'Post to edit does not exist'
        // })
        if (postID == deleteInfo){
            res.status(403).json({
                success: false,
                message: 'Post has already been deleted'
            })
        } else {
            try {
                await PostService.findbyID({ _id: postID })
            } catch (error) {
                res.status(403).json({
                    success: false,
                    message: 'Post to edit does not exist'
                })
            }
        }
        

        // deletes Post
        const softDelete = await PostService.update(postID, deleteInfo)

        // Success Alert
        res.status(200).json({
            success: true,
            message: 'Post deleted successfully',
            data: softDelete
        })
    }

    // Fetch a single Post by ID
    async getOnePost(req, res){
        const infoID = req.params.id

        // Check if the post is the database
        const existingPost = await PostService.findbyID({
            _id: infoID
        })

        if (!existingPost) res.status(403).json({
            success: false,
            message: 'Post does not not exist'
        })
        

        res.status(201).json({
            success: true,
            message: 'Post Fetched successfully',
            data: existingPost
        })
    }

    // Fetch all users in the db
    async fetchAll(req, res){
        const existingPost = await PostService.getAll({})

        res.status(200).json({
            success: true,
            message: 'Post fetched successfully',
            data: existingPost
        })
    }
}

module.exports = new PostController()