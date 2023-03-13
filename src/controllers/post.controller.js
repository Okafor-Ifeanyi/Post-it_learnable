const PostService = require('../services/post.service')
const { decodeToken } = require("../utils/jwt.util")



class PostController {
    
    // create a post
    async createPost(req, res){
        const info = req.body;
        let token = req.params.token;

        // Validate and verify Post (Twitter Tweet Standard)
        try{
            // Verify post
            const post = await PostService.findbyID({ post: info.post, deleted: false })
            if (post){
                throw { status: 403, message: 'Post already exists' };
            }

            // extract token and get current user
            token = req.headers.authorization.split(' ')[1]
            const currentUser_id = decodeToken(token)

            // Owner ID == current user (If you think about it)
            const ownerID = currentUser_id
            
            // Create post
            const newPost = await PostService.createPost({...info, ownerID})
            // Success Alert
            return res.status(200).json({ success: true, message: 'Post created', data: newPost })
        } 
        catch (error) {
            return res.status(403).json({ success: false, message: error })           
        }
    }

    // Update a user
    async updatePost(req, res){ 
        const infoID = req.params.id
        const updateData = req.body
        let token = req.params.token;
        

        try {
            // check if post exists
            const post = await PostService.findbyID({ _id: infoID, deleted: false })

            // If post not found throw error
            if (!post) {
                throw { status: 404, message: 'Post not found' };
            }

            // Since the username is a unique key, we have to make it consistent 
            if (post) {
                const available = await PostService.findbyID({ post: updateData.post, deleted: false })

                // throws an error if the username selected is taken
                if (available){ 
                    return res.status(403).json({ success: false, message: 'Post with update name already exists'})
                }
            }

            // extract token and get current user
            token = req.headers.authorization.split(' ')[1]
            const currentUser_id = decodeToken(token)
            
            const ownerID = post.ownerID.toString()
            // Authorize only admin and owner of acc to feature
            if ( currentUser_id == ownerID ) {
                const updatedData = await PostService.update(infoID, updateData)

                return res.status(200).json({ 
                    success: true, 
                    message: 'Body updated successfully', 
                    data: updatedData })
                    
            } else {
                res.status(403).json({ success: false, message: 'Unauthorized User' })
            }
            
        } catch (error) {
            return res.status(403).json({ success: false, error: error })
        }        
    }

    // Delete a single post
    async deletePost(req, res) {
        const postID = req.params.id
        let token = req.params.token;
        
        try {
            // Check if the post is the database except deleted
            const category = await PostService.findbyID({ _id: postID, deleted: false });
            
            if (!category || category.deleted == true) {
                throw { success: false, message: 'post does not exist'}
            } 

            // extract token and get current user
            token = req.headers.authorization.split(' ')[1]
            const currentUser_id = decodeToken(token)
            
            // Authorize only admin and owner of acc to feature
            if ( currentUser_id == category.ownerID ) {
                await PostService.update(postID, { deleted: true }); // <= change delete status to 'true'
                return res.status(200).json({ success: true, message: 'Post deleted successfully'});
            } else{
                res.status(403).json({ success: false, message: 'Unauthorized User' })
            }
        } 
        catch (error) {
            res.status(403).json({ success: false, message: error })                       
        }
    }


    // Fetch a single Post by ID
    async getOnePost(req, res){
        const infoID = req.params.id

        // Check if the post is the database except deleted
        try{
            const existingpost = await PostService.findbyID({
                _id: infoID, deleted: false
            })

            if (!existingpost) {
                throw { success: false, message: 'Post does not not exist'}

            } else {
                res.status(201).json({ success: true, message: 'Post Fetched successfully', data: existingpost })
            }
        } catch (error) {
            res.status(403).json({ success: false, message: error })                       
        }
    }

    // Fetch all posts in the db
    async fetchAllPosts(req, res){
        try{
            const existingPost = await PostService.getAll({deleted: false})
            res.status(200).json({ success: true, message: 'comment fetched successfully', data: existingPost }) 

        } catch (error) {
            res.status(403).json({ success: false, message: error })                       
        }
    }

    // Fetch all deleted posts in the db
    async deletedPosts(req, res){
        // Check if the comment is the database except deleted
        try{
            const existingPost = await PostService.getAll({deleted: true})

            res.status(200).json({ success: true, message: 'comment fetched successfully', data: existingPost})
        } catch (error) {
            res.status(403).json({ success: false, message: error })                       
        }
    }
}

module.exports = new PostController()