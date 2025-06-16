const prisma = require('../utils/prisma/index')

class PostRepository {

  async createPost(userId, title, content) {
    const post = await prisma.posts.create({
      data: { userId, title, content }
    })

    if (!post) {
      throw new Error('DataBaseError')
    }
    return post
  }

  async findAllPosts() {
    const posts = await prisma.posts.findMany({
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
    if (!posts) {
      throw new Error('DataBaseError')
    }
    return posts
  }

  async findPostById(postId) {
    const post = await prisma.posts.findUnique({
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
    if (!post) {
      throw new Error('DataBaseError')
    }
    return post
  }

  async updatePost(postId, content, title) {
    const updatePost = await prisma.posts.update({
      where: { postId:+postId },
      data: { title, content }
    });
    
    if (!updatePost) {
      throw new Error('DataBaseError')
    }
    return updatePost
  }




  async deletePost(postId) {
    const deletPost = await prisma.posts.delete({
      where: { postId: +postId }
    })
    if (!deletPost) {
      throw new Error('DataBaseError')
    }
    return deletPost
  }

}

module.exports = new PostRepository();