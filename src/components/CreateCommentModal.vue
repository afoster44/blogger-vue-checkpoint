<template>
  <div class="create-comment-modal">
    <div class="create-vault-modal">
      <i class="fa fa-plus btn btn-danger btn-block"
         aria-hidden="true"
         type="button"
         data-toggle="modal"
         data-target="#exampleModal"
      ></i>

      <!-- Modal -->
      <div class="modal fade"
           id="exampleModal"
           tabindex="-1"
           role="dialog"
           aria-labelledby="exampleModalLabel"
           aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Make a new Comment please ☃️
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="createComment">
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Blog Title"
                    name="blogTitle"
                    id="blogTitle"
                    aria-describedby="helpId"
                    v-model="state.comment.body"
                  />
                </div>
                <button type="submit" class="btn btn-primary">
                  Create Comment
                </button>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { postsService } from '../services/PostsService'
import { useRoute } from 'vue-router'

export default {
  name: 'CreateCommentModal',
  setup() {
    const route = useRoute()
    const state = reactive({
      comment: {}
    })
    return {
      state,
      async createComment() {
        state.comment.blog = route.params.id
        await postsService.createComment(state.comment)
        state.comment = {}
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
