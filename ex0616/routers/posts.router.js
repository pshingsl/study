// routes/posts.router.js
const express = require('express');
const router = express.Router();
const prisma = require('../utils/prisma/index.js')
const authenticateToken = require('../middleware/authenticate-middleware.js')
const postControllers = require('../controllers/post.controller.js');
const { checkPostOwner } = require('../middleware/authorization.middleware.js')
const { postsValidator, getPostsValidator, putPostsValidate, handleValidationResult } = require('../middleware/validation-result-handler');

// 1. 게시글 생성
router.post('/posts',
  authenticateToken,
  postsValidator,
  handleValidationResult,
  postControllers.createPost,
  async (req, res, next) => {

    const userId = req.user.userId;
    const { title, content } = req.body;
    const newPost = await prisma.post.create({
      data: { userId, title, content },
    })
    return res.status(201).json({ message: '게시글 등록되었습니다.', data: newPost })
  })

// 2. 특정 게시글 조회
router.get('/posts/:postId',
  getPostsValidator,
  handleValidationResult,
  postControllers.findPostById,
  async (req, res, next) => {
    const { postId } = req.params;
    console.log(postId)
    const post = await prisma.post.findUnique({
      where: { postId: +postId },
      include: {
        User: {
          select: {
            userId: true,
            name: true,
          }
        }
      }
    });
    return res.status(200).json({ data: post });
  });

// 3. 전체 게시글 조회
router.get('/posts',
  postControllers.findAllPosts,
  async (req, res, next) => {
    const posts = await prisma.post.findMany({
      include: {
        User: {
          select: {
            userId: true,
            name: true,
          }
        }
      }, orderBy: {
        createdAt: "desc"
      }
    })
    res.send({
      data: posts
    })
  })

// // 4.게시글 수정하기
router.put('/posts/:postId',
  authenticateToken,
  putPostsValidate,
  handleValidationResult,
  checkPostOwner,
  postControllers.updatePosts,
  async (req, res, next) => {

    const { postId } = req.params;
    const { title, content } = req.body;
    console.log(postId)

    const updatePost = await prisma.post.update({
      where: { postId: +postId },
      data: {
        title: title,
        content: content,
      },
    })
    return res.status(200).json({ message: '게시글이 성공적으로 수정되었습니다.', data: updatePost });
  })


// 5. 게시글 삭제
router.delete('/posts/:postId',
  authenticateToken,
 getPostsValidator,
  handleValidationResult,
  checkPostOwner,
  postControllers.deletePosts)
module.exports = router;