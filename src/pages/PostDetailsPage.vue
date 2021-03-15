<template>
  <div class="post-details-page" v-if="state.activePost.creator">
    <div class="container">
      <div class="row">
        <div class="post col-12">
          <div class="card border shadow" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">
                {{ state.activePost.title }}
              </h5>
              <p>
                {{ state.activePost.body }}
              </p>
              <p class="card-text">
                {{ state.activePost.creator.email }}
              </p>

              <form v-if="state.user.isAuthenticated">
                <div class="form-group">
                  <label for="exampleInputEmail1">Comment</label>
                  <input type="text" class="form-control" aria-describedby="text" placeholder="Comment" v-model="state.newComment.body">
                </div>
              </form>
              <button type="button" class="btn btn-primary" v-if="state.user.email === state.activePost.creator.email" @click="deletePost">
                Delete
              </button>
              <button type="button" class="btn btn-primary" v-if="state.user.isAuthenticated" @click="createComment">
                Comment
              </button>
              <div class="row">
                <div class="col">
                  <form v-if="state.user.email === state.activePost.creator.email">
                    <p>Edit Blog Below</p>
                    <div class="form-group">
                      <label for="bodyEdit">Title Edit</label>
                      <input type="text" class="form-control" aria-describedby="text" placeholder="Body Edit" v-model="state.activePost.title">
                    </div>
                    <div class="form-group">
                      <label for="bodyEdit">Body Edit</label>
                      <input type="text" class="form-control" aria-describedby="text" placeholder="Body Edit" v-model="state.activePost.body">
                    </div>
                    <button type="button" class="btn btn-primary" v-if="state.user.isAuthenticated" @click="editPost">
                      Edit
                    </button>
                  </form>
                </div>
              </div>
              <Comment v-for="comment in state.comments" :key="comment._id" :comment="comment" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else>
    Loading...
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { postsService } from '../services/PostsService'
import { useRoute } from 'vue-router'
export default {
  name: 'PostDetailsPage',
  setup() {
    const route = useRoute()
    const state = reactive({
      activePost: computed(() => AppState.activePost),
      comments: computed(() => AppState.comments),
      user: computed(() => AppState.user),
      newComment: {
        blog: route.params.id
      },
      postEdit: {
        blog: route.params.id
      }
    })
    onMounted(async() => {
      AppState.activePost = {}
      await postsService.getActivePost(route.params.id)
      await postsService.getComments(route.params.id)
    })
    return {
      state,
      async createComment() {
        postsService.createComment(state.newComment, route.params.id)
      },
      async deletePost() {
        await postsService.deletePost(route.params.id)
      },
      async editPost() {
        await postsService.editPost(state.activePost, route.params.id)
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
