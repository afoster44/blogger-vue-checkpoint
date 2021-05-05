<template>
  <div class="about text-center container-fluid bg-success">
    <div class="row">
      <div class="col-6 bg-danger">
        <div class="row top">
          <div class="col-12">
            <h1>Welcome {{ state.account.name }}</h1>
            <img class="rounded" :src="state.account.picture" alt="" />
            <p class="mt-1">
              Just a place to share how you feel
            </p>
          </div>
        </div>
        <div class="row bottom bg-info align-items-center">
          <div class="col-6 offset-3">
            <CreatePostModal />
          </div>
        </div>
      </div>
      <div class="col-6 scroll overflow-auto" style="height: 80vh;">
        <div class="row">
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
.top {
  height: 50vh;
}

.bottom {
  height: 50vh;
}

.scroll {
  height: 100vh;
  overflow: auto;
}
</style>
