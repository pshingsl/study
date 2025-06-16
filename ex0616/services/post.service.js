const postRepository = require('../repository/post.repository');

class PostService {

    async createPost(userId, title, content) {
        return await postRepository.createPost(userId, title, content)
    }

    async findAllPosts() {
        return await postRepository.findAllPosts();
    }

    async findPostById(postId) {
        return await postRepository.findPostById(postId)
    }
    async updatePost(postId, title, content) {
        return await postRepository.updatePost(postId, title, content );
    }
    async deletePost(postId) {
        return await postRepository.deletePost(postId)
    }
}

module.exports = new PostService();