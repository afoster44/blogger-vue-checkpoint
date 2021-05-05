<template>
  <div class="edit-blog-modal">
    <i class="fa fa-plus btn btn-danger btn-block"
       aria-hidden="true"
       type="button"
       data-toggle="modal"
       data-target="#blogModal"
    ></i>

    <!-- Modal -->
    <div class="modal fade"
         id="blogModal"
         tabindex="-1"
         role="dialog"
         aria-labelledby="exampleModalLabel"
         aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Edit your Blog please ☃️
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="editBlog">
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Blog Title"
                  name="blogTitle"
                  id="blogTitle"
                  aria-describedby="helpId"
                  v-model="state.blog.title"
                />
              </div>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control m-1"
                  placeholder="Blog Body"
                  name="blogBody"
                  id="blogBody"
                  aria-describedby="helpId"
                  v-model="state.blog.body"
                >
              </div>
              <button type="submit" class="btn btn-primary">
                Edit Blog
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
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { postsService } from '../services/PostsService'
import { useRoute } from 'vue-router'

export default {
  name: 'EditBlogModal',
  setup() {
    const route = useRoute()
    const state = reactive({
      blog: computed(() => AppState.activePost)
    })
    return {
      state,
      async editBlog() {
        await postsService.editPost(state.blog, route.params.id)
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
