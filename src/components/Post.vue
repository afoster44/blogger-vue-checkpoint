<template>
  <div class="post col-4" v-if="post.creator">
    <router-link :to="{name: 'PostDetailsPage', params: {id: post.id}}">
      <div class="card" style="width: 50vh;">
        <div class="card-body">
          <h5 class="card-title">
            {{ post.title }}
          </h5>
          <p class="card-text">
            {{ post.creator.email }}
          </p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  name: 'Post',
  props: {
    post: Object
  },
  setup() {
    const state = reactive({
      user: computed(() => AppState.user),
      thisPost: computed(() => AppState.activePost)
    })
    return {
      state
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
