const postService = require('../services/post.service');

class PostController {
  // 글 생성
async createPost(req, res, next) {
  try {
    const { title, content } = req.body;
    const userId = req.user.userId;

    const newPost = await postService.createPost(userId, title, content);
    return res.status(201).json({ message: '게시글 등록되었습니다.', data: newPost });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ errorMessage: '데이터베이스 오류가 있습니다.' });
  }
}

  // 모든 글조회
  async findAllPosts(req, res, next) {
    const posts = await postService.findAllPosts();

    res.send({ data: posts })
  }

  // 특정 글 조회
  async findPostById(req, res, next) {

    const { postId } = req.params
    const post = await postService.findPostById(+postId)

    return res.status(200).json({ data: post });
  }

  // 글 수정
  async updatePosts(req, res, next) {
    const { postId } = req.params;
    const { title, content } = req.body;

    const updatePost = await postService.updatePost(
     +postId,
      title,
      content)
      
    return res.status(200).json({
      message: '수정 되었습니다',
      data: updatePost,
    })
  }
  // 글삭제
  async deletePosts(req, res, next) {
    const { postId } = req.params;
    const deletePost = await postService.deletePost(postId)

    return res.status(200).json({
      message: '삭제 되었습니다', deletePost
    })
  }
}
module.exports = new PostController();