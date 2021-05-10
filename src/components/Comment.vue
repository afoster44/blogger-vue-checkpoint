<template>
  <div class="comment col-12 border border-info mb-2 bg-success" v-if="comment.creator">
    <div class="row">
      <div class="col-md-11 col-sm-9">
        <p class="text-danger">
          {{ comment.body }}
        </p>
      </div>
      <div class="col-md-1 col-sm-3">
        <button type="button" class="btn btn-secondary" v-if="comment.creator.email === state.user.email" @click="deleteComment">
          <i class="fa fa-trash" aria-hidden="true"></i>
        </button>
      </div>
    </div>
    <p class="text-danger">
      {{ comment.creator.email }}
    </p>
  </div>
  <div v-else>
    loading...
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { postsService } from '../services/PostsService'
export default {
  name: 'Comment',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      user: computed(() => AppState.user)
    })
    return {
      state,
      async deleteComment() {
        postsService.deleteComment(props.comment._id)
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

button {
  position: absolute;
  top: 0;
  right: 0;
}

</style>
