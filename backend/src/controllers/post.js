import Post from "../models/post.js";
import { apiResponse } from "../utils/common.js";

export const createPost = async (req, res) => {
  const userId = req.user._id;
  const { title, content, tags, category } = req.body;

  if (!title || !content || !category) {
    return apiResponse(res, 400, "error", "All field are required!");
  }

  try {
    const newPost = new Post({
      title,
      content,
      user: userId,
      tags,
      category,
    });

    await newPost.save();

    apiResponse(res, 201, "success", "Post created successfully!", newPost);
  } catch (err) {
    console.log("Error in create post: ", err.message);
    apiResponse(res, 500, "error", "Error in create post!", err.message);
  }
};
