const PostService = require('../services/post.service')
const UserService = require('../services/user.service')
const commentService = require('../services/comment.service')


class commentController {
    
    // create a comment
    async createComment(req, res){
        const info = req.body;
        const token = req.params.token
        console.log(token)

        try{
            // Verify post
            const post = await PostService.findbyID({ _id: info.postID, delete: false })
            if (!post){
                throw { status: 404, message: 'Post not found' };
            }
            // Create comment
            const newcomment = await commentService.createcomment(info)
            // Success Alert
            return res.status(200).json({ success: true, message: 'Comment created', data: newcomment })
        } catch (error) {
            return res.status(403).json({ success: false, message: error })           
        }
        
    }

    // Update a user
    async updateComment(req, res){ 
        const infoID = req.params.id
        const updateData = req.body
        console.log(updateData)
        
        try{
            // Verify comment
            const comment = await commentService.findbyID({ _id: infoID, deleted: false })
            if(!comment) {
                throw{ success: false, message: 'comment does not exists', error: error }
            }

            // Updates comment
            const updatedData = await commentService.update(infoID, updateData)

            return res.status(200).json({ success: true, message: 'Body updated successfully', data: updatedData })
        } catch (error) {
            return res.status(403).json({ success: false, message: error })                       
        }
        
    }

    // Delete a single comment
    async deleteComment(req, res) {
        const commentID = req.params.id
        
        try{
            // Check if the comment is the database except deleted
            const category = await commentService.findbyID({ _id: commentID, deleted: false });

            if (!category || category.deleted == true) {
                throw { success: false, message: 'comment does not exist'}
            } 
            await commentService.update(commentID, { deleted: true }); // <= change delete status to 'true'
            
            res.status(200).json({ success: true, message: 'Post deleted successfully'});
        } catch (error) {
            res.status(403).json({ success: false, message: error })                       
        }
        
    }


    // Fetch a single comment by ID
    async getOneComment(req, res){
        const infoID = req.params.id
        
        // Check if the comment is the database except deleted
        try{
            const existingcomment = await commentService.findbyID({
                _id: infoID, deleted: false
            })

            if (!existingcomment) {
                throw { success: false, message: 'comment does not not exist'}

            } else {
                res.status(201).json({ success: true, message: 'comment Fetched successfully', data: existingcomment })
            }
        } catch (error) {
            res.status(403).json({ success: false, message: error })                       
        }
        
    }

    // Fetch all comments in the db
    async fetchAll(req, res){
        // Check if the comment is the database except deleted
        try{
            const existingcomment = await commentService.getAll({deleted: false})

            res.status(200).json({ success: true, message: 'comment fetched successfully', data: existingcomment }) 
        } catch (error) {
            res.status(403).json({ success: false, message: error })                       
        }
        
    }

    // Fetch all deleted comments in the db
    async deletedComments(req, res){
        // Check if the comment is the database except deleted
        try{
            const existingcomment = await commentService.getAll({deleted: true})

            res.status(200).json({ success: true, message: 'comment fetched successfully', data: existingcomment })
        } catch (error) {
            res.status(403).json({ success: false, message: error })                       
        }
       
    }
}

module.exports = new commentController()

try{
            
} catch (error) {
    res.status(200).json({ success: false, message: error })                       
}