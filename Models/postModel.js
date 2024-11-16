import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    title:String,
    subtitle:String,
    desc:String
    
});

const Post = mongoose.model('posts', postSchema);

export default Post;