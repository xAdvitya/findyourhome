import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const getPosts = async (req, res) => {
  const { city, type, property, bedroom, minPrice, maxPrice } = req.query;
  console.log(req.query);
  try {
    const posts = await prisma.post.findMany({
      where: {
        city: city || undefined,
        type: type || undefined,
        property: property || undefined,
        bedroom: parseInt(bedroom) ? parseInt(bedroom) : undefined,
        price: {
          gte: parseInt(minPrice) ? parseInt(minPrice) : undefined,
          lte: parseInt(maxPrice) ? parseInt(maxPrice) : undefined,
        },
      },
    });

    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to get posts" });
  }
};

export const getPost = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        postDetail: true,
        user: {
          select: {
            avatar: true,
            username: true,
          },
        },
      },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const token = req.cookies?.token;

    if (token) {
      try {
        const payload = await new Promise((resolve, reject) => {
          jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) reject(err);
            else resolve(decoded);
          });
        });

        // Check if the post is saved by the user
        const saved = await prisma.savedPost.findUnique({
          where: {
            userId_postId: {
              postId: id,
              userId: payload.id,
            },
          },
        });

        return res.status(200).json({
          ...post,
          postDetail: post.postDetail,
          user: post.user,
          isSaved: saved ? true : false,
        });
      } catch (err) {
        return res.status(401).json({ message: "Unauthorized" });
      }
    }

    return res.status(200).json({
      ...post,
      postDetail: post.postDetail,
      user: post.user,
      isSaved: false,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to get post" });
  }
};

export const addPosts = async (req, res) => {
  const { postData, postDetail } = req.body;
  const tokenUserId = req.userId;

  console.log("det");
  console.log(postDetail);
  if (!tokenUserId) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  try {
    const newPost = await prisma.post.create({
      data: {
        ...postData,
        userId: tokenUserId,
      },
    });
    console.log("Post Created:", newPost);

    if (postDetail) {
      const newPostDetail = await prisma.postDetail.create({
        data: {
          ...postDetail,
          postId: newPost.id,
        },
      });
      console.log("PostDetail Created:", newPostDetail);
    }

    return res.status(201).json(newPost);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to create post" });
  }
};

export const updatePost = async (req, res) => {
  const id = req.params.id;
  const { postData } = req.body;
  const tokenUserId = req.userId;

  try {
    const post = await prisma.post.findUnique({ where: { id } });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.userId !== tokenUserId) {
      return res.status(403).json({ message: "Not Authorized!" });
    }

    const updatedPost = await prisma.post.update({
      where: { id },
      data: postData,
    });

    return res.status(200).json(updatedPost);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to update post" });
  }
};

export const deletePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  try {
    const post = await prisma.post.findUnique({ where: { id } });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.userId !== tokenUserId) {
      return res.status(403).json({ message: "Not Authorized!" });
    }

    await prisma.post.delete({ where: { id } });

    return res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to delete post" });
  }
};
