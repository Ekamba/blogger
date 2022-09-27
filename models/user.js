import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  emailAddress: { type: String, required: true },
  password: { type: String, required: true },
  avatar: [],
  id: { type: String },
});

export default mongoose.model('User', userSchema);
