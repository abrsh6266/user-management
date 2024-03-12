import { Router } from "express";
import Post from "../models/Post.js";
import isLoggedIn from "../middleware/isLoggedIn.js";
import {
  createPostValidation,
  fetchPostValidation,
} from "../utils/validationSchema.js";

const router = Router();

router.post("/create", isLoggedIn, async (req, res) => {
  try {
    const { error } = createPostValidation.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ error: true, message: error.details[0].message });
    }

    const { title, content } = req.body;
    const newPost = new Post({
      title,
      content,
      author: req.user._id,
    });
    await newPost.save();
    res
      .status(201)
      .json({ error: false, message: "Post created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});
router.get("/get", async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "username");
    res.status(200).json({ error: false, posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});
router.get("/get/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).populate("author", "username");
      if (!post) {
        return res.status(404).json({ error: true, message: "Post not found" });
      }
      res.status(200).json({ error: false, post });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: true, message: "Internal Server Error" });
    }
  });
export default router;
