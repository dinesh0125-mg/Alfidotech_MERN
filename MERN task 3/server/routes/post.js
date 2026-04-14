const express = require('express');
const Post = require('../models/Post');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

// GET /api/posts — list all posts (public)
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'name email')
      .sort({ createdAt: -1 });
    res.status(200).json({ posts });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch posts.' });
  }
});

// GET /api/posts/:id — get single post (public)
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'name email');
    if (!post) {
      return res.status(404).json({ message: 'Post not found.' });
    }
    res.status(200).json({ post });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch post.' });
  }
});

// POST /api/posts — create post (protected)
router.post('/', verifyToken, async (req, res) => {
  try {
    const { title, body } = req.body;

    if (!title || !body) {
      return res.status(400).json({ message: 'Title and body are required.' });
    }

    const post = await Post.create({ title, body, author: req.userId });
    const populated = await post.populate('author', 'name email');

    res.status(201).json({ message: 'Post created.', post: populated });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Failed to create post.' });
  }
});

// PUT /api/posts/:id — update post (protected, owner only)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found.' });
    }

    if (post.author.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to edit this post.' });
    }

    const { title, body } = req.body;
    if (title !== undefined) post.title = title;
    if (body !== undefined) post.body = body;

    await post.save();
    const populated = await post.populate('author', 'name email');

    res.status(200).json({ message: 'Post updated.', post: populated });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Failed to update post.' });
  }
});

// DELETE /api/posts/:id — delete post (protected, owner only)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found.' });
    }

    if (post.author.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this post.' });
    }

    await post.deleteOne();
    res.status(200).json({ message: 'Post deleted.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete post.' });
  }
});

module.exports = router;
