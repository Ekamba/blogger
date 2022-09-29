import mongoose, { Schema } from 'mongoose';

const postSchema = mongoose.Schema({
  postCreator: String,
  title: String,
  body: String,
  author: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  imageFile: String,
  likes: { type: [String], default: [] },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

var Post = mongoose.model('Post', postSchema);

export default Post;
