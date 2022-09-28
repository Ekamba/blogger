import axios from 'axios';

const API = axios.create({ baseURL: process.env.REACT_APP_BASE_URL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('user')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('user')).token
    }`;
  }

  return req;
});

// Create a new post
const createPost = async (postData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await API.post('api/posts', postData, config);

  return response.data;
};

// Get all posts
const getPosts = async () => {
  const response = await API.get('api/posts');

  return response.data;
};

// Get post by search parameters
const getPostBySearch = (searchQuery) =>
  API.get(`api/posts/search?searchQuery=${searchQuery}`);
//update a post
const updatePost = async (id, postData) => {
  const response = await API.patch('api/posts/' + id, postData);
  return response.data;
};

// Delete post
const deletePost = async (postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await API.delete('api/posts/' + postId, config);
  if (response.data) {
    return postId;
  }
};
//like a post
const likePost = async (id) => await API.patch(`api/posts/${id}/likePost`);

const postService = {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  likePost,
  getPostBySearch,
};

export default postService;
