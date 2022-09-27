import express from 'express';

import {
  getPosts,
  getPostsBySearch,
  getPost,
  createPost,
  updatePost,
  likePost,
  deletePost,
} from '../controllers/posts.js';

const router = express.Router();
import auth from '../middleware/auth.js';

router.get('/', getPosts);
router.post('/', auth, createPost);
router.get('/search', getPostsBySearch);
router.patch('/:id', updatePost);

router.get('/:id', auth, getPost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);

export default router;
