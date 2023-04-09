import axios from "axios";

// =================== (USERS) ================

// ----------- get users ---------
export const addNewUser = (form) => {
  console.log("form: ", form);
  return axios.post(`http://localhost:8080/users`, form);
};

// ----------- get users ---------
export const getAllUsers = () => {
  return axios.get(`http://localhost:8080/users`);
};

// ----------- delete user ---------
export const deleteUser = (id) => {
  return axios.delete(`http://localhost:8080/users/${id}`);
};

// ----------- update user ---------
export const updateUser = (id, form) => {
  return axios.put(`http://localhost:8080/users/${id}`, form);
};

// =================== (POST) ================

// ----------- get posts ---------
export const addNewPost = (form) => {
  return axios.post(`http://localhost:8080/posts`, form);
};

// ----------- get posts ---------
export const getAllPosts = () => {
  return axios.get(`http://localhost:8080/posts`);
};

// ----------- delete post ---------
export const deletePost = (id) => {
  return axios.delete(`http://localhost:8080/posts/${id}`);
};

// ----------- update post ---------
export const updatePost = (id, form) => {
  return axios.put(`http://localhost:8080/posts/${id}`, form);
};

// ----------- like post ---------
export const likePost = (id) => {
  return axios.post(`http://localhost:8080/posts/${id}/like`);
};

// ----------- unlike post ---------
export const unlikePost = (id) => {
  return axios.post(`http://localhost:8080/posts/${id}/unlike`);
};

// ----------- top posts ---------
export const getTopPosts = () => {
  return axios.get(`http://localhost:8080/posts/analytics/posts/top-liked`);
};

// ----------- get total posts ---------
export const getTotalPosts = () => {
  return axios.get(`http://localhost:8080/posts/analytics/posts`);
};
