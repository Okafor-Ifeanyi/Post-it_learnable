const PostService = require('../services/post.service')
const UserService = require('../services/user.service')

class PostController {
    
    // create a post
    async createPost(req, res){
        const info = req.body;

        console.log(info.ownerID.length)
        console.log(req.originalUrl)

        // Validate and verify Post (Twitter Tweet Standard)
        try{
            // Verify post
            const post = await PostService.findbyID({ post: info.post, deleted: false })
            if (post){
                throw { status: 403, message: 'Post already exists' };
            }
            // Create post
            const newPost = await PostService.createPost(info)
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
        const ownerId = req.body.ownerId 
        console.log(ownerId)

        try {
            // check if post exists
            const post = await PostService.findbyID({ _id: infoID, deleted: false })

            // If post not found throw error
            if (!post) {
                throw { status: 404, message: 'Post not found' };
            }

            const updatedData = await PostService.update(infoID, updateData)
            return res.status(200).json({ success: true, message: 'Body updated successfully', data: updatedData })

        } catch (error) {
            return res.status(403).json({ success: false, error: error })
        }        
    }

    // Delete a single post
    async deletePost(req, res) {
        const postID = req.params.id
        
        try {
            // Check if the post is the database except deleted
            const category = await PostService.findbyID({ _id: postID, deleted: false });

            if (!category || category.deleted == true) {
                throw { success: false, message: 'post does not exist'}
            } 

            await PostService.update(postID, { deleted: true }); // <= change delete status to 'true'
            
            return res.status(200).json({ success: true, message: 'Post deleted successfully'});
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
    async fetchAll(req, res){
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