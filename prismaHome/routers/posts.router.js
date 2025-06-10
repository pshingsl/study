// routes/posts.router.js

import express from 'express';
import { prisma } from '../utils/prisma/index.js';

const router = express.Router();

// 1. 전체 게시글 조회
router.get('/posts', async (req, res, next) => {
    try {
        const posts = await prisma.post.findMany({
            select: {
                postId: true,
                title: true,
                content: true,
                userId: true,
            },
        });
        return res.status(200).json(posts);
    } catch (error) {
        next(error);
    }
});

// 2. 특정 게시글 조회
router.get('/posts/:postId', async (req, res, next) => {
    try {
        const { postId } = req.params;
        const post = await prisma.post.findUnique({
            where: { postId: +postId },
            select: {
                postId: true,
                title: true,
                content: true,
                userId: true,
                updatedAt: true,
            },
        });
        if (!post) {
            return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
        }
        return res.status(200).json({ data: post });
    } catch (error) {
        next(error);
    }
});


// 3. 게시글 생성
router.post('/posts', async (req, res, next) => {
    try {
        const { title, content, userId } = req.body;
        // userId 유효성 검사 (선택 사항)
        const user = await prisma.users.findUnique({ where: { userId } });
        if (!user) return res.status(400).json({ message: 'Invalid userId' });

        const newPost = await prisma.post.create({
            data: { title, content, userId },
            select: {
                postId: true,
                title: true,
                content: true,
                userId: true,
            },
        });
        return res.status(201).json(newPost);
    } catch (error) {
        next(error);
    }
});

// 4. 게시글 수정
router.put('/posts/:postId', async (req, res, next) => {
    try {
        const { postId } = req.params;
        const { title, content } = req.body;

        const post = await prisma.post.findUnique({
            where: { postId: +postId }
        });

        if (!post) {
            return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
        }

        await prisma.post.update({
            where: { postId: +postId },
            data: {
                title: title || post.title,
                content: content || post.content,
                updatedAt: new Date(),
            },
        });

        return res.status(200).json({ message: '게시글이 성공적으로 수정되었습니다.' });
    } catch (error) {
        next(error);
    }
});




// 5. 게시글 삭제
router.delete('/posts/:id', async (req, res, next) => {
    try {
        const postId = +req.params.id;

        const post = await prisma.post.findUnique({
            where: { postId },
        });

        if (!post) {
            return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
        }

        await prisma.post.delete({
            where: { postId },
        });

        return res.status(200).json({ message: '게시글이 성공적으로 삭제되었습니다.' });
    } catch (error) {
        next(error);
    }
});


export default router;
