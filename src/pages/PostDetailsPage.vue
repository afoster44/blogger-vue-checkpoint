<template>
  <div class="post-details-page container-fluid bg-success" v-if="state.activePost.creator">
    <div class="row">
      <div class="post col-md-10 col-sm-12 offset-md-1">
        <div class="card border shadow bg-secondary">
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
            <div class="row">
              <div class="col-4">
                <div class="row">
                  <div class="col-12 text-center">
                    <p>Click here to delete blog!</p>
                  </div>
                </div>
                <div class="row">
                  <div class="col-12">
                    <button type="button" class="btn btn-primary btn-block" v-if="state.user.email === state.activePost.creator.email" @click="deletePost">
                      <i class="fa fa-trash" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div class="col-4">
                <div class="row">
                  <div class="col-12 text-center">
                    <p>Click here to make a comment!</p>
                  </div>
                </div>
                <div class="row">
                  <div class="col-12">
                    <CreateCommentModal v-if="state.user.isAuthenticated" />
                  </div>
                </div>
              </div>
              <div class="col-4">
                <div class="row">
                  <div class="col-12 text-center">
                    <p>Click here to edit blog!</p>
                  </div>
                </div>
                <div class="row">
                  <div class="col-12">
                    <EditBlogModal />
                  </div>
                </div>
              </div>
            </div>
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

  <div v-else>
    Loading...
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { postsService } from '../services/PostsService'
import { useRoute, useRouter } from 'vue-router'
export default {
  name: 'PostDetailsPage',
  setup() {
    const router = useRouter()
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
        postsService.createComment(state.newComment)
      },
      async deletePost() {
        await postsService.deletePost(route.params.id)
        router.push({ name: 'Home' })
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
