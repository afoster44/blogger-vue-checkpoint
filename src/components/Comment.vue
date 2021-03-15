<template>
  <div class="comment col-12 border shadow" v-if="comment.creator">
    <p>
      {{ comment.body }}
    </p>
    <p>
      {{ comment.creator.email }}
    </p>
    <button type="button" class="btn btn-primary" v-if="comment.creator.email === state.user.email" @click="deleteComment">
      Delete
    </button>
  </div>
  <div v-else>
    loading...
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { Comment, computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { postsService } from '../services/PostsService'
export default {
  name: 'Comment',
  props: {
    comment: Object
  },
  setup() {
    const state = reactive({
      user: computed(() => AppState.user)
    })
    return {
      state,
      async deleteComment() {
        postsService.deleteComment(Comment._id)
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
