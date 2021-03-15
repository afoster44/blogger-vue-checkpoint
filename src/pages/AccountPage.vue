<template>
  <div class="about text-center container">
    <div class="row">
      <h1>Welcome {{ state.account.name }}</h1>
      <img class="rounded" :src="state.account.picture" alt="" />
      <p>{{ state.account.email }}</p>
      <!-- {{ state.posts }} -->
      <MyPost v-for="post in state.posts" :key="post._id" :my-post="post" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { postsService } from '../services/PostsService'
export default {
  name: 'Account',
  setup() {
    const state = reactive({
      account: computed(() => AppState.account),
      posts: computed(() => AppState.myAccountPosts)
    })
    onMounted(() => {
      postsService.getAccountPosts()
    })
    return {
      state
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
