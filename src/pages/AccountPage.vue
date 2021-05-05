<template>
  <div class="about text-center container-fluid bg-success">
    <div class="row">
      <div class="col-6">
        <h1>Welcome {{ state.account.name }}</h1>
        <img class="rounded" :src="state.account.picture" alt="" />
        <p>{{ state.account.email }}</p>
        <CreatePostModal />
      </div>
      <div class="col-6 overflow-auto" style="height: 80vh;">
        <div class="row d-flex justify-content-center">
          <MyPost v-for="post in state.posts" :key="post._id" :my-post="post" />
        </div>
      </div>
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

row {
  height: 100vh;
  overflow: auto;
}
</style>
