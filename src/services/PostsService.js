import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class PostsService {
  async getPosts() {
    const res = await api.get('api/blogs')
    AppState.posts = res.data
    logger.log(AppState.posts)
  }

  async getActivePost(id) {
    try {
      const res = await api.get('api/blogs/' + id)
      logger.log(res)
      AppState.activePost = res.data
    } catch (error) {
      logger.error(error)
    }
  }

  async getComments(id) {
    const res = await api.get('api/blogs/' + id + '/comments')
    logger.log(res.data)
    AppState.comments = res.data
  }

  async createBlog(newBlog) {
    await api.post('api/blogs', newBlog)
    this.getPosts()
  }

  async createComment(newComment) {
    const res = await api.post('api/comments', newComment)
    AppState.myComments = res.data
    logger.log(AppState.myComments)
    this.getComments(newComment.blog)
  }

  async deleteComment(commentId) {
    await api.delete('api/comments/' + commentId._id)
    // this.getComments(commentId.blog)
  }

  async deletePost(postId) {
    await api.delete('api/blogs/' + postId)
  }

  async getAccountPosts() {
    const res = await api.get('account/blogs')
    AppState.myAccountPosts = res.data
  }

  async editPost(postEdit, postId) {
    const res = await api.put('api/blogs/' + postId, postEdit)
    logger.log(res.data)
    AppState.activePost = res.data
  }
}

export const postsService = new PostsService()
