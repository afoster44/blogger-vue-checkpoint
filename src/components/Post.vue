<template>
  <div class="post col-lg-3" v-if="post.creator">
    <router-link :to="{name: 'PostDetailsPage', params: {id: post.id}}">
      <div class="card bg-secondary">
        <div class="card-body">
          <h5 class="card-title">
            <span class="text-info">{{ post.title }}</span>
          </h5>
          <p class="card-text">
            <span class="text-info">{{ post.creator.email }}</span>
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
    post: {
      type: Object,
      required: true
    }
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

.card {
  height: 100%;
  padding: 20px 20px 10px;
}

[class*="col-"] {
  margin-bottom: 30px;
}

</style>
