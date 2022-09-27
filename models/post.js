import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
  postCreator: String,
  title: String,
  body: String,
  author: String,
  imageFile: String,
  likes: { type: [String], default: [] },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

var Post = mongoose.model('Post', postSchema);

export default Post;
